<template>
  <v-data-table
      :headers="detailHeaders"
      :items="users"
      :search="search"
      :items-per-page="10"
      sort-by="activeTicket"
      :sort-desc="true"
  >
    <template v-slot:item.no="{ index }">
      <tr>{{ ++index }}</tr>
    </template>
    <template v-slot:top>
      <v-toolbar flat>
        <v-toolbar-title>Manajemen Penunjung</v-toolbar-title>
        <v-divider class="mx-4" inset vertical></v-divider>
        <v-spacer></v-spacer>
        <v-toolbar flat class="pt-3">
            <v-text-field
                v-model="search"
                append-icon="mdi-magnify"
                label="Search"
                placeholder="Sila ketik keyword pencarian"
            ></v-text-field>
        </v-toolbar>
        <v-dialog v-model="dialog" persistent max-width="500px">
          <v-card>
            <v-card-title>
              <span class="text-h5">Edit Pengunjung</span>
            </v-card-title>

            <v-card-text>
              <v-container>
                <v-row>
                  <v-col cols="12" sm="12" md="12">
                    <v-text-field
                      v-model="editedItem.nama"
                      :counter="50"
                      label="Nama Lengkap"
                      prepend-icon="mdi-face-man"
                      required
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="12" md="12">
                    <v-select
                      v-model="editedItem.jenis_kelamin"
                      :items="jenisKelaminItem"
                      item-text="state"
                      item-value="val"
                      :rules="[v => !!v || 'Jenis Kelamin harus terisi']"
                      label="Jenis Kelamin"
                      prepend-icon="mdi-gender-male-female"
                      required
                    ></v-select>
                  </v-col>
                  <v-col cols="12" sm="12" md="12">
                    <v-text-field
                      v-model="editedItem.tahun_lahir"
                      label="Tahun Lahir"
                      :counter="4"
                      :maxlength="4"
                      prepend-icon="mdi-account-clock-outline"
                      :rules="[validateTahunLahir]"
                      required
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="12" md="12">
                    <v-text-field
                      v-model="editedItem.email"
                      label="E-mail"
                      :counter="150"
                      :rules="[v => !!v || 'Email harus terisi', v => /.+@.+\..+/.test(v) || 'Format email tidak valid']"
                      :error-messages="errorMessages.email ? [errorMessages.email] : []"
                      @input="clearError('email')"
                      prepend-icon="mdi-email-outline"
                      required
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="12" md="12">
                    <v-text-field
                      v-model="editedItem.nohp"
                        :rules="nohpRules"
                        :counter="14"
                        @keypress="numberOnly"
                      label="No Handphone (WhatsApp)"
                      prepend-icon="mdi-whatsapp"
                      required
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="12" md="12">
                    <v-select
                      v-model="editedItem.pekerjaan"
                      :items="jobItems"
                      item-text="state"
                      item-value="val"
                      :rules="[v => !!v || 'Pekerjaan harus terisi']"
                      label="Pekerjaan"
                      prepend-icon="mdi-briefcase"
                      required
                    ></v-select>
                  </v-col>
                  <v-col cols="12" sm="12" md="12">
                    <v-select
                      v-model="editedItem.pendidikan"
                      :items="pendidikanItems"
                      item-text="state"
                      item-value="val"
                      :rules="[v => !!v || 'Pendidikan harus terisi']"
                      label="Pendidikan Terakhir"
                      prepend-icon="mdi-home-map-marker"
                      required
                    ></v-select>
                  </v-col>
                  <v-col cols="12" sm="12" md="12">
                    <v-expansion-panels>
                      <v-expansion-panel v-for="(detail, index) in filteredDetailTicket" :key="index">
                        <v-expansion-panel-header color="#3498db">
                          Ticket ke-{{ index + 1 }}: {{ detail.noticket }}
                        </v-expansion-panel-header>
                        <v-expansion-panel-content>
                          <v-container>
                            <v-row>
                              <v-col cols="12" sm="12" md="12">
                                <v-checkbox
                                  v-model="detail.is_show"
                                  label="Tampilkan"
                                  true-value="1"
                                  false-value="0"
                                ></v-checkbox>
                              </v-col>
                            </v-row>
                          </v-container>
                        </v-expansion-panel-content>
                      </v-expansion-panel>
                    </v-expansion-panels>
                  </v-col>
                </v-row>
                <v-snackbar
                  v-model="varSnackbar"
                  color="red darken-4"
                >
                  No Handphone atau Email Duplikat!

                  <template v-slot:action="{ attrs }">
                    <v-btn
                      color="white"
                      text
                      v-bind="attrs"
                      @click="varSnackbar = false"
                    >
                      Tutup
                    </v-btn>
                  </template>
                </v-snackbar>
              </v-container>
            </v-card-text>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue-darken-1" text @click="close">
                Batalkan
              </v-btn>
              <v-btn color="blue-darken-1" text @click="edit">
                Edit
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
        <!-- <v-dialog v-model="dialogDelete" max-width="500px">
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
        </v-dialog> -->
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
    <!-- <template v-slot:activator="{ on, attrs }">
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
    </template> -->
  </v-data-table>
</template>

<script>
import axios from 'axios'
import Swal from 'sweetalert2'
axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest'
axios.defaults.headers.common['Content-Type'] = 'application/json'
function isValidPhoneNumber (value) {
  const phoneNumberRegex = /^08[0-9]{8,13}$/
  return phoneNumberRegex.test(value)
}
export default {
  data: () => ({
    dialog: false,
    dialogDelete: false,
    search: '',
    varSnackbar: false,
    detailHeaders: [
      { text: 'No', value: 'no', key: 'id' },
      { text: 'Nama', value: 'nama' },
      { text: 'Email', value: 'email' },
      { text: 'No Handphone', value: 'nohp' },
      { text: 'Jumlah Tiket', value: 'activeTicket' },
      { text: 'Aksi', value: 'actions', sortable: false }
    ],
    jobItems: [
      { state: 'Aparatur Sipil Negara', val: 'Aparatur Sipil Negara' },
      { state: 'Karyawan Swasta', val: 'Karyawan Swasta' },
      { state: 'Wiraswasta', val: 'Wiraswasta' },
      { state: 'Pelajar/Mahasiswa', val: 'Pelajar/Mahasiswa' },
      { state: 'Peneliti', val: 'Peneliti' },
      { state: 'Lembaga Pendidikan', val: 'Lembaga Pendidikan' },
      { state: 'Lainnya', val: 'Lainnya' }
    ],
    errorMessages: {
      email: null
      // Tambahkan properti lainnya sesuai kebutuhan
    },
    pendidikanItems: [
      { state: '<= SLTA', val: '1' },
      { state: 'D1/D2/D3', val: '2' },
      { state: 'D4/S1', val: '3' },
      { state: 'S2/S3', val: '4' }
    ],
    jenisKelaminItem: [
      { state: 'Laki-Laki', val: 'L' },
      { state: 'Perempuan', val: 'P' }
    ],
    nohpRules: [
      v => !!v || 'Nomor Whatsapp harus diisi',
      v => (v && v.length <= 14) || 'Nomor whatsapp must be less than 14 characters',
      v => isValidPhoneNumber(v) || 'Format Nomor Handphone tidak valid'

    ],
    users: [],
    editedIndex: -1,
    iteration: 0,
    editedItem: {
      name: '',
      email: ''
    },
    defaultItem: {
      name: '',
      email: ''
    },
    overlay: false
  }),
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
    }
  },
  created () {
    this.loadData()
  },
  computed: {
    filteredDetailTicket () {
      if (this.editedItem && this.editedItem.detailTicket) {
        return this.editedItem.detailTicket.slice(0, this.editedItem.activeTicket)
      }
      return []
    }
  },
  methods: {
    loadData () {
      this.loading = true
      var config = {
        method: 'get',
        url: 'getAllCustomerDetail',
        headers: {
          Authorization: 'Bearer ' + this.$store.getters['userAuth/activeToken']
        }
      }
      axios(config)
        .then((response) => {
          this.users = response.data
          this.loading = false
          // console.log('Load Data respose :')
          // console.log(response.data)
        })
        .catch((e) => {
          console.log(e)
        })
    },
    // editItem (item) {
    //   this.editedIndex = this.users.indexOf(item)
    //   this.editedItem = Object.assign({}, item)
    //   // console.log(this.editedItem)
    //   this.dialog = true
    // },

    deleteItem (item) {
      Swal.fire({
        title: 'Apa Anda yakin?',
        text: 'Anda akan menghapus semua tiket, log dan penliaian yang berkaitan dengan user ini',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Ya, saya mengerti!'
      }).then((result) => {
        if (result.isConfirmed) {
          this.editedItem = Object.assign({}, item)
          axios.delete('deleteCustomer/' + this.editedItem.id,
            { headers: { Authorization: 'Bearer ' + this.$store.getters['userAuth/activeToken'] } }
          ).then((resp) => {
            this.editedIndex = this.users.indexOf(item)
            this.editedItem = Object.assign({}, item)
            this.users.splice(this.editedIndex, 1)
            this.editedIndex = -1
          }).catch(error => {
            this.varSnackbar = true
            console.error(error)
            // console.log(JSON.stringify(error))
            // this.dialog = true
          })
          this.editedIndex = this.users.indexOf(item)
          this.editedItem = Object.assign({}, item)
          // this.users.splice(this.editedIndex, 1)
          // this.editedIndex = -1
          // console.log(JSON.stringify(this.editedItem))
        }
      })
      // this.dialogDelete = true
    },

    // deleteItemConfirm () {
    //   axios.delete('users/' + this.editedItem.id)
    //   this.users.splice(this.editedIndex, 1)
    //   this.closeDelete()
    // },

    close () {
      this.dialog = false
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
      })
    },

    // closeDelete () {
    //   this.dialogDelete = false
    //   this.$nextTick(() => {
    //     this.editedItem = Object.assign({}, this.defaultItem)
    //     this.editedIndex = -1
    //   })
    //   // axios.delete('users/' + this.editItem.id)
    // },
    editItem (item) {
      this.editedIndex = this.users.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.dialog = true
    },

    edit () {
      if (this.editedIndex > -1) {
        // console.log(JSON.stringify(this.editedItem))
        axios.put('updateCustomer/' + this.editedItem.id,
          this.editedItem,
          { headers: { Authorization: 'Bearer ' + this.$store.getters['userAuth/activeToken'] } }
        ).then((resp) => {
          this.editedItem.nama = this.editedItem.nama.toUpperCase()
          Object.assign(this.users[this.editedIndex], this.editedItem)
          this.dialog = false
        }).catch(error => {
          this.varSnackbar = true
          // console.log(JSON.stringify(error))
          console.error(error)
          this.dialog = true
        })
      }
      this.overlay = true
    },
    validateTahunLahir (value) {
      if (!value) return 'Tahun Lahir harus terisi'

      const parsedYear = parseInt(value, 10)

      if (isNaN(parsedYear)) {
        return 'Format tahun tidak valid'
      }

      const currentYear = new Date().getFullYear()
      const minYear = 1940 // Ganti sesuai kebutuhan
      const maxYear = currentYear

      if (parsedYear < minYear || parsedYear > maxYear) {
        return `Masukkan tahun antara ${minYear} dan ${maxYear}`
      }

      // Tambahkan aturan lain sesuai kebutuhan

      return true // Validasi berhasil
    },
    clearError (fieldName) {
      this.errorMessages[fieldName] = null
    },
    numberOnly (evt) {
      evt = (evt) || window.event
      var charCode = (evt.which) ? evt.which : evt.keyCode
      if ((charCode > 31 && (charCode < 48 || charCode > 57)) && charCode !== 46) {
        evt.preventDefault()
      } else {
        return true
      }
    }
  }
}
</script>
