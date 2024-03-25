<template>
   <v-container fill-height align-content="space-between">
    <div v-if="loading" class="loading-overlay">
      <!-- Gaya CSS untuk loading screen -->
      <div class="loading-spinner"></div>
    </div>
    <v-row
      justify="center"
    >
      <v-col cols="10" md="6">
        <v-text-field
          label="Masukkan Email/No.HP yang memiliki WhatsApp"
          class="mt-6 my-auto"
          solo
          rounded
          filled
          dense
          light
          outline
          background-color="white"
          prepend-inner-icon="mdi-ticket"
          v-model="phoneNumber"
        ></v-text-field>
      </v-col>
      <v-btn
        :disabled="isSearchDisabled"
        color="#81D4FA"
        class="ml-n2 my-auto"
        small
        dark
        fab
        @click="searchPhoneNumber"
      >
        <v-icon dark>
          mdi-magnify
        </v-icon>
      </v-btn>
    </v-row>
    <v-row v-if="statNumber===true">
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
            md="4"
          >
            <div class="ticket">
              <h2>Buat Tiket Anda disini</h2>
            </div>
          </v-col>
        </v-row>
        <v-row>
          <v-col
            cols="12"
            md="6"
          >
            <v-text-field
              v-model="name"
              :counter="50"
              label="Nama Lengkap"
              prepend-icon="mdi-face-man"
              required
              readonly
            ></v-text-field>
          </v-col>

          <v-col
            cols="12"
            md="6"
          >
          <v-text-field
              v-model="email"
              label="E-mail"
              :counter="150"
              prepend-icon="mdi-email-outline"
              required
              readonly
            ></v-text-field>
          </v-col>

          <v-col
            cols="12"
            md="6"
          >
            <v-text-field
              v-model="job"
              :counter="150"
              label="Pekerjaan"
              prepend-icon="mdi-briefcase"
              required
              readonly
            ></v-text-field>
          </v-col>

          <v-col
            cols="12"
            md="6"
          >
            <v-text-field
              v-model="pendidikan"
              label="Pendidikan Terakhir"
              :counter="150"
              prepend-icon="mdi-home-map-marker"
              required
              readonly
            ></v-text-field>
          </v-col>

          <v-col
            cols="12"
          >
            <v-textarea
              v-model="necessity"
              :rules="necessityRules"
              :counter="500"
              label="Keperluan"
              rows="3"
              prepend-icon="mdi-comment"
              hint="(silakan jelaskan secara rinci)"
            ></v-textarea>
          </v-col>
        </v-row>
        <p class="text-overline">Pernyataan *)</p>
        <p class="text-caption">Apakah Anda setuju dengan syarat dan ketentuan yang berlaku dalam standar pelayanan ini serta bersedia untuk dihubungi kembali terkait survei kepuasan data yang dilakukan oleh BPS.</p>
        <v-checkbox
          v-model="checkbox"
          :rules="[v => !!v || 'You must agree to continue!']"
          label="Apakah Anda bersedia?"
          required
        ></v-checkbox>

        <v-btn
          :disabled="!valid"
          color="success"
          class="mr-4"
          @click="validate"
        >
          Kirim
        </v-btn>

        <v-btn
          color="error"
          class="mr-4"
          @click="reset"
        >
          Reset Isian
        </v-btn>
      </v-form>
      </v-container>

    </v-row>
   <v-container v-else-if="statNumber===false">
      <v-row justify="center">
          <p>Anda belum pernah terdaftar</p>
        </v-row>
        <v-row justify="center">
          <v-btn
            rounded
            color="#FFCDD2"
            light
            class="my-auto"
            to="ticket"
          >
            Daftar Sekarang!
          </v-btn>
        </v-row>
        <v-row><br><br></v-row>
   </v-container>
   <v-container class="mt-5" v-else>
      <v-row justify="center">
          <h1>Formulir Permintaan/Konsultasi Data</h1>
        </v-row>
        <v-row class="mt-8">
          <v-col>
            <h3>1. Isikan nomor handphone (PASTIKAN YANG MEMILIKI WHATSAPP) atau email di kolom diatas terlebih dahulu, kemudian lakukan pencarian dengan menekan tombol <v-icon dark>mdi-magnify</v-icon></h3>
          </v-col>
        </v-row>
        <v-row class="mt-5">
          <v-col>
            <h3>2. Jika nomor handphone Anda pernah terdaftar, maka akan muncul data diri Anda dan Anda tinggal isi keperluannya</h3>
          </v-col>
        </v-row>
        <v-row class="mt-5">
          <v-col>
            <h3>3. Jika nomor handphone Anda BELUM pernah terdaftar, maka akan muncul tombol daftar sekarang. Silahkan klik tombol tersebut, dan isikan data diri Anda dengan benar.</h3>
          </v-col>
        </v-row>
        <v-row><br><br></v-row>
   </v-container>
  </v-container>
</template>

<script>
import axios from 'axios'
export default {
  data: () => ({
    valid: true,
    checkbox: false,
    marker: true,
    statNumber: null,
    foundPhoneNumber: null,
    name: '',
    email: '',
    job: '',
    pendidikan: '',
    necessity: '',
    phoneNumber: '',
    customer_id: '',
    loading: false,
    necessityRules: [
      v => !!v || 'Keperluan is required',
      v => (v && v.length >= 20) || 'Keperluan minimal 20 karakter',
      v => (v && v.length <= 500) || 'Keperluan must be less than 500 characters'
    ]

  }),
  computed: {
    isSearchDisabled () {
      // console.log(this.selectedCustomer)
      return this.phoneNumber === null || this.phoneNumber === ''
    }
  },
  watch: {

    phoneNumber (newVal, oldVal) {
      // Code to run when selectedCustomer changes
      // console.log('selectedCustomer changed:', newVal);
      this.statNumber = ''
      // if (/^\d+$/.test(newVal)) {
      //   this.phoneNumber = this.formatPhoneNumber(newVal)
      // }

      const cleanedNumber = newVal.replace(/\D/g, '')

      // Jika depannya adalah '08', tambahkan '-' tiap 4 digit
      if (cleanedNumber.startsWith('08')) {
        const formattedNumber = cleanedNumber.replace(/(\d{4})(\d{0,4})(\d{0,4})(\d{0,4})/, (_, p1, p2, p3, p4) => {
          const parts = [p1]
          if (p2) parts.push(p2)
          if (p3) parts.push(p3)
          if (p4) parts.push(p4)
          return parts.join('-')
        })
        this.phoneNumber = formattedNumber
      } else {
        // Jika tidak, kembalikan nomor tanpa pemformatan
        this.phoneNumber = newVal
      }

      // You can add additional logic or trigger other events here
    }
  },
  methods: {

    submitFunction () {
      this.marker = !this.marker
    },
    searchPhoneNumber () {
      const vm = this
      this.foundPhoneNumber = null
      const clearVal = this.phoneNumber.replace(/\D/g, '')
      let cleanPhoneNumber = ''
      if (clearVal.startsWith('08')) {
        cleanPhoneNumber = this.phoneNumber.replace(/-/g, '')
      } else {
        cleanPhoneNumber = this.phoneNumber
      }
      this.loading = true

      axios.post('/checklog', { nohp: cleanPhoneNumber })
        .then(response => {
          if (response.data.message === '1') {
            axios.post('/search', { number: cleanPhoneNumber })
              .then(responseSearch => {
                this.foundPhoneNumber = responseSearch.data.data
                if (responseSearch.data.message === '200') {
                  this.statNumber = true
                  this.loading = false

                  // Data ditemukan
                  this.customer_id = this.foundPhoneNumber.id
                  this.name = this.foundPhoneNumber.nama
                  this.email = this.foundPhoneNumber.email
                  this.job = this.foundPhoneNumber.pekerjaan

                  switch (this.foundPhoneNumber.pendidikan) {
                    case '1':
                      this.pendidikan = '<= SLTA Sederajat'
                      break
                    case '2':
                      this.pendidikan = 'D1/D2/D3'
                      break
                    case '3':
                      this.pendidikan = 'D4/S1'
                      break
                    default:
                      this.pendidikan = 'S2/S3'
                  }
                } else {
                  // Data tidak ditemukan
                  this.statNumber = false
                  this.loading = false

                  console.log('Data tidak ditemukan')
                }
              })
              .catch(error => {
                console.log(error)
                this.foundPhoneNumber = null
                this.statNumber = false
                this.loading = false
              })
          } else {
            // response.data.message !== 200
            this.loading = false
            vm.$router.push({
              name: 'tracking',
              params: { noticket: response.data.data.noticket }
            })
          }
        })
        .catch(error => {
          console.log(error)
        })
    },
    reset () {
      this.checkbox = false
      this.necessity = ''
    },
    validate () {
      this.loading = true
      this.$refs.form.validate()
      this.foundPhoneNumber = null
      const clearVal = this.phoneNumber.replace(/\D/g, '')
      let cleanPhoneNumber = ''
      if (clearVal.startsWith('08')) {
        cleanPhoneNumber = this.phoneNumber.replace(/-/g, '')
      } else {
        cleanPhoneNumber = this.phoneNumber
      }
      axios.post('tickets', {
        nohp: cleanPhoneNumber,
        customer_id: this.customer_id,
        name: this.name,
        email: this.email,
        editable: '0',
        necessity: this.necessity,
        bersedia: this.checkbox,
        status: 0
      })
        .then((response) => {
          if (response.status === 200) {
            axios.post('/checklog', { nohp: response.data.detail.nohp })
              .then(responseLog => {
                axios.post('/relayWhatsApp', {
                  nohp: response.data.detail.nohp,
                  noticket: responseLog.data.data.noticket,
                  message: 'intro'
                }, {
                  headers: {
                    'Content-Type': 'application/json'
                  }
                })
                  .then(responseWhatsApp => {
                    // console.log(responseWhatsApp)
                    this.$router.push({
                      name: 'tracking',
                      params: { noticket: responseLog.data.data.noticket }
                    })
                  }).catch(errorWhatsApp => {
                    this.loading = false
                    console.log(errorWhatsApp)
                  })
              })
              .catch(errorLog => {
                this.loading = false
                console.log(errorLog)
              })
          }
        })
        .catch((error) => {
          this.loading = false
          console.log(error.response)
        })
    }
  }
}
</script>
<style scoped>
.loading-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(255, 255, 255, 0.8);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.loading-spinner {
  border: 8px solid #f3f3f3; /* Warna latar belakang untuk spinner */
  border-top: 8px solid #3498db; /* Warna untuk spinner */
  border-radius: 50%;
  width: 50px;
  height: 50px;
  animation: spin 1s linear infinite; /* Animasi spinner */
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
</style>
