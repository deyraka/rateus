<template>
    <v-main>
        <v-container>
            <v-form
                ref="form"
                v-model="valid"
                lazy-validation
                @submit.prevent="validate"
            >
            <v-row>
                <v-col
                    cols="12"
                    md="12">
                    <h2>Reservasi Kunjungan</h2>
                </v-col>
            </v-row>

            <v-row
            >
                <v-col
                    cols="12"
                    md="6"
                >
                    <v-select
                    v-model="jenisLayanan"
                    :items="itemLayanan"
                    item-text="state"
                    item-value="val"
                    :rules="[v => !!v || 'Layanan harus terisi']"
                    label="Layanan"
                    prepend-icon="mdi-ticket-account"
                    required
                ></v-select>
                </v-col>
                <v-col
                    cols="12"
                    md="6"
                >
                    <v-menu
                    ref="menu1"
                    v-model="menu1"
                    :close-on-content-click="false"
                    transition="scale-transition"
                    offset-y
                    max-width="100%"
                    min-width="auto"
                    >
                        <template v-slot:activator="{ on, attrs }">
                            <v-text-field
                            v-model="dateFormatted"
                            label="Tanggal Reservasi"
                            persistent-hint
                            prepend-icon="mdi-calendar"
                            v-bind="attrs"
                            :rules="[v => !!v || 'Layanan harus terisi']"
                            v-on="on"
                            ></v-text-field>
                        </template>
                        <v-date-picker
                            v-model="date"
                            no-title
                            @input="menu1 = false"
                            :allowed-dates="allowedDates"
                            :min="minDate"
                            :max="maxDate"
                        ></v-date-picker>
                    </v-menu>
                </v-col>
            </v-row>
            <v-row v-if="alreadyRequest" justify="center">
              <v-col cols="12" md="6">
                  <div class="yellow-card" style="position: relative;">
                    Anda sebelumnya sudah melakukan reservasi untuk tanggal <b>{{ pastDate }}</b> untuk layanan <b>{{ pastLayanan }}</b> dan mendapat nomor antrian <b>{{ pastQueue }}</b>.
                    <v-btn icon small @click="closeCard" style="position: absolute; right: 0; top: 0; color:black">
                      <v-icon>mdi-close</v-icon>
                    </v-btn>
                  </div>
              </v-col>
            </v-row>
          <v-row class="mt-10" justify="center">
            <v-btn
            :disabled="!valid || isLoading"
            color="success"
            class="mr-4"
            @click="getQueue"
            >
                <span v-if="!isLoading">Kirim</span>
                <v-progress-circular v-if="isLoading" indeterminate color="black"></v-progress-circular>
            </v-btn>

            <v-btn
            color="error"
            class="mr-4"
            @click="reset"
            :disabled="isLoading"
            >
                Reset Isian
            </v-btn>
          </v-row>

            </v-form>
            <v-dialog
                v-model="createQueue"
                max-width="500"
                max-height="300"
                scrollable
                persistent
              >
              <v-card>
                <v-container>
                  <v-card-title class="justify-center">Antrian Anda pada {{ dateFormatted }} :</v-card-title>
                  <v-card-text class="display-2 text-center">{{ queueNumber }}</v-card-text>
                  <v-card-text class="text-center">Mohon jangan lupa lakukan screenshot nomor antrian ini dan tunjukkan pada petugas saat baru memasuki PST. Terima Kasih.</v-card-text>
                  <v-card-actions class="d-flex justify-end">
                    <v-btn
                      variant="text"
                      color="error"
                      @click="closeQueue(dateFormatted,queueNumber)"
                    >
                      Tutup
                    </v-btn>
                  </v-card-actions>
                </v-container>
              </v-card>
            </v-dialog>
        </v-container>
    </v-main>
</template>

<script>
import axios from 'axios'

export default {
  data () {
    return {
      valid: true,
      jenisLayanan: '',
      isLoading: false,
      createQueue: false,
      itemLayanan: [
        { state: 'Permintaan Data', val: 'A' },
        { state: 'Konsultasi Data', val: 'B' }
      ],
      date: (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10),
      dateFormatted: '',
      menu1: false,
      minDate: '',
      maxDate: '',
      blockingDates: [],
      tanggalReservasi: '',
      queueNumber: '',
      alreadyRequest: false,
      pastQueue: '',
      pastDate: '',
      pastLayanan: ''
    }
  },
  async created () {
    await this.fetchBlockingDates()
    this.setMinMaxDates()
  },
  computed: {
    computedDateFormatted () {
      return this.formatDate(this.date)
    }
  },
  watch: {
    date () {
      this.dateFormatted = this.formatDate(this.date)
    }
  },
  methods: {
    formatDate (date) {
      if (!date) return null

      const [year, month, day] = date.split('-')
      const months = ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember']
      const monthModified = (parseInt(month, 10)) - 1
      return `${day} ${months[monthModified]} ${year}`
    },
    reset () {
      this.$refs.form.resetValidation()
      this.date = ''
      this.jenisLayanan = ''
      this.dateFormatted = ''
    },
    setMinMaxDates () {
      const today = new Date()
      const yearEnd = new Date(today.getFullYear(), 11, 31)
      this.minDate = today.toISOString().substr(0, 10)
      this.maxDate = yearEnd.toISOString().substr(0, 10)
    },
    async fetchBlockingDates () {
      try {
        const response = await axios.get('blockingDates')
        this.blockingDates = response.data
      } catch (error) {
        console.error('Error fetching blocking dates:', error)
        this.blockingDates = []
      }
    },
    allowedDates (date) {
      const today = new Date()
      today.setHours(0, 0, 0, 0)
      const selectedDate = new Date(date)
      selectedDate.setHours(0, 0, 0, 0)

      const isWeekend = d => d.getDay() === 6 || d.getDay() === 0

      const isPastDate = d => d <= today

      const isBlockedDate = d => {
        d.setDate(d.getDate() + 1)
        const formattedDate = d.toISOString().split('T')[0]
        return this.blockingDates.some(blocked => blocked.tanggal === formattedDate)
      }

      return !isWeekend(selectedDate) && !isPastDate(selectedDate) && !isBlockedDate(selectedDate)
    },
    getQueue () {
      console.log(this.valid)

      this.$refs.form.validate()
      this.isLoading = true

      // console.log(this.jenisLayanan)
      console.log(this.dateFormatted)
      const tanggalReservasi = this.dateFormatted
      let revertTanggal
      if (this.dateFormatted) {
        const [day, monthName, year] = tanggalReservasi.split(' ')
        const months = ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember']
        const month = months.indexOf(monthName) + 1
        revertTanggal = `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`
      } else {
        revertTanggal = null
      }
      axios.post('reservasi', {
        prefix: this.jenisLayanan,
        reservasi: revertTanggal
      })
        .then((response) => {
          if (response.status === 200) {
            this.isLoading = false

            this.createQueue = !this.createQueue

            console.log(response.data.antrian)
            this.queueNumber = response.data.antrian
            // setTimeout(() => {
            //   this.dialogQueue = false
            // }, 5000)
          }
        })
        .catch((error) => {
          console.log(error)
          this.isLoading = false
        })
        .finally(() => {
          // if (status === 'A') {
          //   this.isLoadingA = false
          // } else if (status === 'B') {
          //   this.isLoadingB = false
          // }
        })
    },
    closeQueue (dateFormatted, queueNumber) {
      this.alreadyRequest = true
      this.pastQueue = queueNumber
      this.pastDate = dateFormatted
      var layanan = this.pastQueue[0]
      if (layanan === 'A') {
        this.pastLayanan = 'Permintaan Data'
      } else if (layanan === 'B') {
        this.pastLayanan = 'Konsultasi Data'
      }
      this.$refs.form.resetValidation()
      this.date = ''
      this.jenisLayanan = ''
      this.dateFormatted = ''
      this.createQueue = !this.createQueue
    },
    closeCard () {
      // Logika untuk menutup atau menghilangkan card, misalnya dengan mengubah nilai alreadyRequest
      this.alreadyRequest = false
    }
  }
}
</script>
<style scoped>
.yellow-card {
    background-color:#f1c40f;
    color: black;
    padding: 30px;
    border-radius: 8px;
    text-align: center;
  }
</style>
