<template>
  <div>
  <v-data-table
      :headers="detailHeaders"
      :items="users"
      :items-per-page="10"
  >
    <template v-slot:item.no="{ index }">
      <tr>{{ ++index }}</tr>
    </template>
    <template v-slot:top>
      <v-toolbar flat>
        <v-toolbar-title>Manajemen Pengguna</v-toolbar-title>
        <v-divider class="mx-4" inset vertical></v-divider>
        <v-spacer></v-spacer>
        <v-btn
              color="#f39c12"
              dark
              class="mb-2 mr-2"
              :disabled="disabledPSTButton"
              @click="petugasHariIni"
              title="Ubah Petugas Hari Ini"
            >
              <v-icon>
                mdi-face-man
              </v-icon>
        </v-btn>
        <v-dialog v-model="dialogPetugas" max-width="500px">
          <v-card>
            <v-card-title>
              <span class="text-h5">Ubah Petugas PST Hari Ini</span>
            </v-card-title>
            <v-container>
              <v-row>
                <v-col
                  cols="12"
                  md="12"
                >
                <v-select
                  v-model="petugasPSTHariIni"
                  :items="items"
                  item-value="id"
                  item-text="name"
                  label="Pilih petugas PST hari ini">
                </v-select>
              </v-col>
            </v-row>
          </v-container>
          <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue-darken-1" text @click="closePetugas"
                >Cancel</v-btn
              >
              <v-btn
                color="blue-darken-1" text @click="submitPetugas"
                >Kirim</v-btn
              >
              <v-spacer></v-spacer>
            </v-card-actions>
          </v-card>
        </v-dialog>
        <v-btn
              color="#2ecc71"
              dark
              class="mb-2 mr-2"
              :disabled="disabledPSTButton"
              @click="polaPST"
              title="Atur Pola PST"
            >
              <v-icon>
                mdi-repeat
              </v-icon>
        </v-btn>
        <v-dialog v-model="dialogAturPola" max-width="500px" persistent>
          <v-card>
            <v-card-title>
              <span class="text-h5">Ubah Pola Petugas PST</span>
            </v-card-title>
            <v-container>
              <v-row>
                <v-col
                  cols="12"
                  md="12"
                >
                <v-select
                v-for="(selected, index) in selectedItems"
                :key="index"
                :items="getAvailableItems(index)"
                item-text="name"
                item-value="id"
                v-model="selectedItems[index]"
                @change="handleChange"
                :label="`Pilih orang ke-${index + 1}`"
              ></v-select>
              </v-col>
              </v-row>
              <v-row>
                <v-col
                    cols="12"
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
                            label="Tanggal Orang Pertama Bertugas"
                            persistent-hint
                            v-bind="attrs"
                            :rules="[v => !!v || 'Tanggal harus terisi']"
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
            </v-container>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue-darken-1" text @click="closeAturPola"
                >Cancel</v-btn
              >
              <v-btn color="blue-darken-1" text @click="resetDropdown"
                >Reset</v-btn
              >
              <v-btn
                color="blue-darken-1" text @click="submitAturPola"
                >Kirim</v-btn
              >
              <v-spacer></v-spacer>
            </v-card-actions>

            <!-- <v-btn @click="addDropdown" :disabled="selectedItems.length >= items.length">Add Dropdown</v-btn> -->
          </v-card>
        </v-dialog>
        <v-dialog v-model="dialog" max-width="500px">
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              color="primary"
              dark
              class="mb-2"
              v-bind="attrs"
              v-on="on"
              title="Tambah Pengguna"
            >
              <v-icon>
                mdi-account-plus
              </v-icon>
            </v-btn>
          </template>
          <v-card>
            <v-card-title>
              <span class="text-h5">{{ formTitle }}</span>
            </v-card-title>

            <v-card-text>
              <v-container>
                <v-row>
                  <v-col cols="12" sm="12" md="12">
                    <v-text-field
                      v-model="editedItem.email"
                      label="Email BPS"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="12" md="12">
                    <v-text-field
                      v-model="editedItem.name"
                      label="Nama Lengkap"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="12" md="12">
                    <v-text-field
                      v-model="editedItem.password"
                      label="Password (nip panjang)"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="12" md="12">
                    <v-checkbox
                      v-model="editedItem.is_pelayan"
                      label="Petugas PST"
                      true-value="1"
                      false-value="0"
                    ></v-checkbox>
                  </v-col>
                    <v-col cols="12" sm="12" md="12" v-if="editedItem.is_pelayan == '1'">
                      <v-file-input
                        label="Upload Foto Pelayanan"
                        v-model="editedItem.foto"
                        accept="image/*"
                        @change="save"
                      ></v-file-input>
                    </v-col>

                </v-row>
              </v-container>
            </v-card-text>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue-darken-1" text @click="close">
                Cancel
              </v-btn>
              <v-btn color="blue-darken-1" text @click="save">
                Save
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
        <v-dialog v-model="dialogDelete" max-width="500px">
          <v-card>
            <v-card-title class="text-h5"
              >Are you sure you want to delete this item?</v-card-title
            >
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue-darken-1" text @click="closeDelete"
                >Cancel</v-btn
              >
              <v-btn
                color="blue-darken-1" text @click="deleteItemConfirm"
                >OK</v-btn
              >
              <v-spacer></v-spacer>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-toolbar>
      <v-overlay :value="overlay">
          <v-progress-circular
            indeterminate
            size="64"
          ></v-progress-circular>
        </v-overlay>
    </template>
    <template v-slot:item.actions="{ item }">
      <v-icon small class="mr-2" @click="editItem(item)">mdi-pencil</v-icon>
      <v-icon small @click="deleteItem(item)">mdi-delete</v-icon>
    </template>
    <template v-slot:activator="{ on, attrs }">
      <v-btn
        class="ml-2"
        fab x-small dark
        color="#e74c3c"
        v-bind="attrs"
        v-on="on"
        @click="deleteTicket(item.users)"
      >
        <v-icon>mdi-delete</v-icon>
      </v-btn>
    </template>
  </v-data-table>
  <v-snackbar
            v-model="errorSnackbar"
            color="red darken-4">
            {{ errMessageSnackbar }}

              <template v-slot:action="{ attrs }">
                  <v-btn
                    color="white"
                    text
                    v-bind="attrs"
                    @click="errorSnackbar = false">
                    Tutup
                  </v-btn>
              </template>
          </v-snackbar>
          <v-snackbar
            v-model="succesSnackbar"
            color="green darken-4">
              {{ successMessageSnackbar }}

              <template v-slot:action="{ attrs }">
                  <v-btn
                    color="white"
                    text
                    v-bind="attrs"
                    @click="succesSnackbar = false">
                    Tutup
                  </v-btn>
              </template>
          </v-snackbar>
        </div>
</template>

<script>
import axios from 'axios'
axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest'
axios.defaults.headers.common['Content-Type'] = 'application/json'

export default {
  data: () => ({
    errorSnackbar: false,
    errMessageSnackbar: 'Terjadi kesalahan. Hubungi Admin!',
    succesSnackbar: false,
    successMessageSnackbar: '',
    dialog: false,
    disabledPSTButton: true,
    dialogDelete: false,
    dialogAturPola: false,
    dialogPetugas: false,
    search: '',
    detailHeaders: [
      { text: 'No', value: 'no', key: 'id' },
      { text: 'Email', value: 'email' },
      { text: 'Nama Lengkap', value: 'name' },
      { text: 'Aksi', value: 'actions', sortable: false }
    ],
    users: [],
    editedIndex: -1,
    iteration: 0,
    editedItem: {
      name: '',
      email: '',
      is_pelayan: '',
      foto: null
    },
    defaultItem: {
      name: '',
      email: '',
      is_pelayan: '',
      foto: 'null'
    },
    overlay: false,
    items: [],
    selectedItems: [null],
    petugasPSTHariIni: null,
    date: (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10),
    dateFormatted: '',
    menu1: false,
    minDate: '',
    maxDate: '',
    blockingDates: [],
    tanggalReservasi: ''
  }),
  computed: {
    formTitle () {
      return this.editedIndex === -1 ? 'Tambah Pengguna' : 'Edit Pengguna'
    },
    computedDateFormatted () {
      return this.formatDate(this.date)
    }
  },
  watch: {
    dialog (val) {
      val || this.close()
    },
    dialogDelete (val) {
      val || this.closeDelete()
    },
    overlay (val) {
      val && setTimeout(() => {
        this.overlay = false
      }, 3000)
    },
    date () {
      this.dateFormatted = this.formatDate(this.date)
    }
  },
  async created () {
    this.setMinMaxDates()
    this.loadData()
    this.loadDataPST()
    await this.fetchBlockingDates()
  },
  methods: {
    loadData () {
      this.loading = true
      var config = {
        method: 'get',
        url: 'users',
        headers: {
          Authorization: 'Bearer ' + this.$store.getters['userAuth/activeToken']
        }
      }
      axios(config)
        .then((response) => {
          this.users = response.data[0]
          this.loading = false
          console.log('Load Data respose :')
          // console.log(response.data[0])
        })
        .catch((e) => {
          console.log(e)
        })
    },
    loadDataPST () {
      this.loading = true
      var config = {
        method: 'get',
        url: 'getAllPetugasLayanan',
        headers: {
          Authorization: 'Bearer ' + this.$store.getters['userAuth/activeToken']
        }
      }
      axios(config)
        .then((response) => {
          console.log(JSON.stringify(response.data))
          this.items = response.data
          if (this.items.length > 0) {
            this.disabledPSTButton = false
          }
          // this.users = response.data[0]
          // this.loading = false
          // console.log('Load Data respose :')
          // console.log(response.data[0])
        })
        .catch((e) => {
          console.log(e)
        })
    },
    petugasHariIni () {
      const selectedPetugas = this.items.find(item => item.is_selected_petugas === '1')
      this.petugasPSTHariIni = selectedPetugas ? selectedPetugas.id : null
      this.dialogPetugas = true
    },
    closePetugas () {
      this.dialogPetugas = false
    },
    submitPetugas () {
      // console.log(this.petugasPSTHariIni)
      axios.get('changePetugasPST/' + this.petugasPSTHariIni,
        { headers: { Authorization: 'Bearer ' + this.$store.getters['userAuth/activeToken'] } }
      ).then((response) => {
        // console.log(response)
        this.loadDataPST()
        this.successMessageSnackbar = 'Sukses mengubah Petugas PST'
        this.succesSnackbar = true
        this.dialogPetugas = false
      }).catch((error) => {
        console.log(error)
        this.errorSnackbar = true
      })
    },
    polaPST () {
      this.dialogAturPola = true
    },
    getAvailableItems (index) {
      // return this.items.filter(item => !this.selectedItems.includes(item.id))
      return this.items.filter(item =>
        !this.selectedItems.includes(item.id) || this.selectedItems[index] === item.id
      )
    },
    handleChange () {
      console.log(this.selectedItems)
      this.selectedItems = this.selectedItems.filter(item => item !== null)
      if (this.selectedItems.length < this.items.length) {
        this.addDropdown()
      }
    },
    addDropdown () {
      if (this.selectedItems.length < this.items.length) {
        this.selectedItems.push(null)
      }
    },
    resetDropdown () {
      this.selectedItems = [null]
      this.dateFormatted = ''
    },
    closeAturPola () {
      this.dialogAturPola = false
    },
    submitAturPola () {
      const names = this.selectedItems.map(itemId => {
        const selectedItem = this.items.find(item => item.id === itemId)
        return selectedItem ? selectedItem.name : null
      }).filter(name => name !== null)
      const tanggalReservasi = this.dateFormatted
      let revertTanggal
      if (this.dateFormatted) {
        const [day, monthName, year] = tanggalReservasi.split(' ')
        const months = ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember']
        const month = months.indexOf(monthName) + 1
        revertTanggal = `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`
      }
      console.log(names)
      console.log(revertTanggal)
      axios.post('updatePolaPST/', {
        names: names,
        startDate: revertTanggal
      }, {
        headers: {
          Authorization: 'Bearer ' + this.$store.getters['userAuth/activeToken']
        }
      }).then(response => {
        // console.log(response)
        this.successMessageSnackbar = 'Sukses mengubah pola petugas PST'
        this.succesSnackbar = true
        this.dialogAturPola = false
      }).catch(error => {
        this.errorSnackbar = true
        console.log(error)
      })
    },
    setMinMaxDates () {
      const today = new Date()
      const yearEnd = new Date(today.getFullYear(), 11, 31)
      this.minDate = today.toISOString().substr(0, 10)
      this.maxDate = yearEnd.toISOString().substr(0, 10)
    },
    formatDate (date) {
      if (!date) return null

      const [year, month, day] = date.split('-')
      const months = ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember']
      const monthModified = (parseInt(month, 10)) - 1
      return `${day} ${months[monthModified]} ${year}`
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
    editItem (item) {
      this.editedIndex = this.users.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.dialog = true
    },

    deleteItem (item) {
      this.editedIndex = this.users.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.dialogDelete = true
    },

    deleteItemConfirm () {
      // axios.delete('users/' + this.editedItem.id)
      axios.delete('users/' + this.editedItem.id, {
        headers: {
          Authorization: 'Bearer ' + this.$store.getters['userAuth/activeToken']
        }
      }).then(response => {
        // console.log(responseFoto)
        this.users.splice(this.editedIndex, 1)
        this.closeDelete()
      }).catch(error => {
        console.log(error)
      })
      // this.users.splice(this.editedIndex, 1)
      // this.closeDelete()
    },

    close () {
      this.dialog = false
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
      })
    },

    closeDelete () {
      this.dialogDelete = false
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
      })
    },

    save () {
      if (this.editedIndex > -1) {
        console.log(this.editedItem) // ada
        const originalItem = {
          ...this.editedItem
        }
        Object.assign(this.users[this.editedIndex], this.editedItem)
        axios.put('users/' + this.editedItem.id,
          this.editedItem,
          { headers: { Authorization: 'Bearer ' + this.$store.getters['userAuth/activeToken'] } }
        ).then((response) => {
          // console.log(originalItem)
          if (response.status === 200 && originalItem.is_pelayan === '1') {
            const formData = new FormData()
            // console.log('Okee')
            formData.append('foto', originalItem.foto)
            axios.post('uploadFoto/' + originalItem.id, formData, {
              headers: {
                'Content-Type': 'multipart/form-data',
                Authorization: 'Bearer ' + this.$store.getters['userAuth/activeToken']
              }
            }).then(responseFoto => {
              // console.log(responseFoto)
              this.successMessageSnackbar = 'Sukses mengubah Pengguna'
              this.succesSnackbar = true
              this.loadDataPST()
            }).catch(errorFoto => {
              console.log(errorFoto)
              this.errorSnackbar = true
            })
            // formData
          } else if (response.status === 200 && originalItem.is_pelayan === '0') {
            axios.post('batalkanPelayan/' + originalItem.id, {}, {
              headers: {
                Authorization: 'Bearer ' + this.$store.getters['userAuth/activeToken']
              }
            })
              .then(responseCancel => {
                this.successMessageSnackbar = 'Sukses mengubah Pengguna'
                this.succesSnackbar = true
                this.loadDataPST()
                console.log(responseCancel)
              })
              .catch(errorCancel => {
                console.log(errorCancel)
                this.errorSnackbar = true
              })
          }
        }).catch(error => {
          console.error(error)
        })
        this.dialog = false
      } else {
        this.users.push(this.editedItem)
        const originalItem = {
          ...this.editedItem
        }
        this.loading = true
        axios.post('users',
          this.editedItem,
          { headers: { Authorization: 'Bearer ' + this.$store.getters['userAuth/activeToken'] } }
        ).then((response) => {
          if (response.status === 200 && originalItem.is_pelayan === '1') {
            const formData = new FormData()
            // console.log('Okee')
            formData.append('foto', originalItem.foto)
            axios.post('uploadFoto/' + response.data.details.id, formData, {
              headers: {
                'Content-Type': 'multipart/form-data',
                Authorization: 'Bearer ' + this.$store.getters['userAuth/activeToken']
              }
            }).then(responseFoto => {
              console.log(responseFoto)
            }).catch(errorFoto => {
              console.log(errorFoto)
            })
            // formData
          }
        }).catch(error => {
          console.error(error)
        })
        this.dialog = false
      }
      this.overlay = true
    }
  }
}
</script>
