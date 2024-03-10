<template ref="lg">
  <v-container>
    <v-row justify="center">
      <v-col cols="12" md="10">
        <v-row justify="center">
          <v-col cols="12" md="12">
            <v-skeleton-loader
              class="mx-auto"
              max-width="300"
              type="list-item-two-line: sentences"
            >
              <v-data-table
                :headers="detailHeaders"
                :items="customDetails"
                single-expand
                :expanded.sync="expanded"
                item-key="noticket"
                show-expand
                class="elevation-1"
                :search="search"
                :loading="loading"
                loading-text="Loading... Please wait"
              >
                <template v-slot:top>
                  <v-row justify="center">
                    <v-toolbar
                      rounded
                      flat
                      min-height="96"
                      class="mb-3 pt-5"
                      color="#81D4FA"
                      light
                    >
                      <v-row justify="center">
                        <v-col cols="12" md="6">
                          <v-toolbar-title>Daftar Pengunjung</v-toolbar-title>
                        </v-col>
                        <v-col cols="12" md="6">
                          <v-text-field
                            v-model="search"
                            append-icon="mdi-magnify"
                            label="Search"
                            single-line
                            hide-details
                          ></v-text-field>
                        </v-col>
                      </v-row>
                    </v-toolbar>
                  </v-row>
                </template>
                <template v-slot:item.status="{ item }">
                  <v-chip
                    :color="getColor(item.status)"
                    dark
                    small
                  >
                    {{ item.status }}
                  </v-chip>
                </template>
                <template v-slot:expanded-item="{ headers, item }">
                  <td :colspan="headers.length" class="px-1">
                    <v-card color="grey darken-3 mb-1 pb-1 px-2">
                      <v-row class="mt-2" justify="start">
                        <v-col>
                          <div class="text-caption font-weight-thin font-italic text">Name: {{item.nama}}</div>
                          <div class="text-caption font-weight-thin font-italic text">Nomor HP: {{item.nohp}}</div>
                          <div class="text-caption font-weight-thin font-italic text">Date: {{item.tanggal}}</div>
                          <div class="text-caption font-weight-thin font-italic text">Handled by: <strong class="primary--text">{{item.serveBy}}</strong></div>
                          <div class="text-caption font-weight-thin font-italic text">Request: {{item.perihal}}</div>
                        </v-col>
                      </v-row>
                      <v-row class="mb-2 px-3" justify="start" v-if="item.serveBy !== null && item.status === 'on progress'">
                        <v-tooltip bottom color="red">
                          <template v-slot:activator="{ on, attrs }">
                            <v-btn
                              fab x-small dark
                              color="red"
                              v-bind="attrs"
                              v-on="on"
                              @click="closeTicket(item.nohp, item.nama, item.noticket)"
                            >
                              <v-icon>mdi-close-circle-outline</v-icon>
                            </v-btn>
                          </template>
                          <span>Close this ticket</span>
                        </v-tooltip>
                        <v-spacer></v-spacer>
                        <v-tooltip bottom color="#81D4FA">
                          <template v-slot:activator="{ on, attrs }">
                            <v-btn
                              class="ml-2"
                              fab x-small dark
                              color="#81D4FA"
                              v-bind="attrs"
                              v-on="on"
                              @click="showAddProgress(item.noticket)"
                            >
                              <v-icon>mdi-progress-check</v-icon>
                            </v-btn>
                          </template>
                          <span>Add ticket's progress</span>
                        </v-tooltip>
                        <v-tooltip bottom color="pink lighten-4">
                          <template v-slot:activator="{ on, attrs }">
                            <v-btn
                              class="ml-2"
                              fab x-small dark
                              color="pink lighten-4"
                              v-bind="attrs"
                              v-on="on"
                              @click="showTimeline(item.noticket)"
                            >
                              <v-icon>mdi-timeline-text</v-icon>
                            </v-btn>
                          </template>
                          <span>Show ticket's timeline</span>
                        </v-tooltip>
                      </v-row>
                      <v-row class="mb-2 px-3" justify="end" v-else-if="item.serveBy !== null && item.status === 'closed'">
                        <v-tooltip bottom color="#8e44ad" v-if="item.status_rating !== 1">
                          <template v-slot:activator="{ on, attrs }">
                            <v-btn
                              class="ml-2"
                              fab x-small dark
                              color="#8e44ad"
                              v-bind="attrs"
                              v-on="on"
                              @click="giveScore(item.noticket)"
                            >
                              <v-icon>mdi-star</v-icon>
                            </v-btn>
                          </template>
                          <span>Beri Nilai</span>
                        </v-tooltip>
                        <v-spacer></v-spacer>
                        <v-tooltip bottom color="warning" v-if="item.status_rating !== 1">
                          <template v-slot:activator="{ on, attrs }">
                            <v-btn
                              class="ml-2"
                              fab x-small dark
                              color="warning"
                              v-bind="attrs"
                              v-on="on"
                              @click="askRating(item.nohp, item.nama,item.noticket)"
                            >
                              <v-icon>mdi-link-variant</v-icon>
                            </v-btn>
                          </template>
                          <span>Re-send survei rating link to guest</span>
                        </v-tooltip>
                      </v-row>
                      <v-row class="mb-2 px-3" justify="end" v-else-if="item.editable === '1'">
                        <v-tooltip bottom color="#e74c3c">
                          <template v-slot:activator="{ on, attrs }">
                            <v-btn
                              class="ml-2"
                              fab x-small dark
                              color="#e74c3c"
                              v-bind="attrs"
                              v-on="on"
                              @click="deleteTicket(item.noticket)"
                            >
                              <v-icon>mdi-delete</v-icon>
                            </v-btn>
                          </template>
                          <span>Hapus tiket</span>
                        </v-tooltip>
                        <v-spacer></v-spacer>
                        <v-tooltip bottom color="warning">
                          <template v-slot:activator="{ on, attrs }">
                            <v-btn
                              class="ml-2"
                              fab x-small dark
                              color="warning"
                              v-bind="attrs"
                              v-on="on"
                              @click="editPengunjung(item.noticket,item.nohp)"
                            >
                              <v-icon>mdi-file-edit-outline</v-icon>
                            </v-btn>
                          </template>
                          <span>Edit Isi Pengunjung</span>
                        </v-tooltip>
                      </v-row>
                      <v-row class="mb-2 px-3" justify="end" v-else>
                        <v-tooltip bottom color="#e74c3c">
                          <template v-slot:activator="{ on, attrs }">
                            <v-btn
                              class="ml-2"
                              fab x-small dark
                              color="#e74c3c"
                              v-bind="attrs"
                              v-on="on"
                              @click="deleteTicket(item.noticket)"
                            >
                              <v-icon>mdi-delete</v-icon>
                            </v-btn>
                          </template>
                          <span>Hapus tiket</span>
                        </v-tooltip>
                        <v-spacer></v-spacer>
                        <v-tooltip bottom color="info" v-if="item.status === 'postpone'">
                          <template v-slot:activator="{ on, attrs }">
                            <v-btn
                              class="ml-2"
                              fab x-small dark
                              color="info"
                              v-bind="attrs"
                              v-on="on"
                              @click="openTicket(item.noticket)"
                            >
                              <v-icon>mdi-lock-open-outline</v-icon>
                            </v-btn>
                          </template>
                          <span>Open Ticket</span>
                        </v-tooltip>
                        <v-tooltip bottom color="success" v-if="item.status !== 'postpone'">
                          <template v-slot:activator="{ on, attrs }">
                            <v-btn
                              class="ml-2"
                              fab x-small dark
                              color="success"
                              v-bind="attrs"
                              v-on="on"
                              @click="showChatConfirmation(item.nohp, item.nama, item.noticket, item.perihal)"
                            >
                              <v-icon>mdi-whatsapp</v-icon>
                            </v-btn>
                          </template>
                          <span>Take this ticket and chat</span>
                        </v-tooltip>
                      </v-row>
                    </v-card>
                  </td>
                </template>
              </v-data-table>
            </v-skeleton-loader>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
        <!-- dialog untuk confirm take order and chat -->
    <v-dialog
      v-model="beriRating"
      max-width="50%"
      max-height="300"
      scrollable
      persistent
    >
    <v-card>
      <v-container>
      <v-row>
        <v-col
          cols="12"
          md="12"
        >
          <div class="ticket">
            <h2 class="text-center">Berikan nilai untuk pelayanan kami</h2>
          </div>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12">
            <div class="yellow-card">
              Pop up ini akan otomatis hilang dan tidak bisa diakses lagi, ketika Anda sudah mengirim penilaian. Kerahasiaan penilaian Anda terjamin.
            </div>
        </v-col>
      </v-row>
      <v-form
        ref="form"
        v-model="validRating"
        lazy-validation
        @submit.prevent="validate"
      >
        <v-row justify="center" class="text-center">
          <v-col
            cols="12"
            md="8"
          >
            <v-rating
              v-model="rating"
              length="5"
              color="orange"
              background-color="orange lighten-3"
              large
              half-increments
              hover
            ></v-rating>
            <div>
              <span class="font-weight-bold">
                ( {{ rating }} of 5)
              </span>
            </div>
          </v-col>
          <v-col
            cols="12"
            md="10"
          >
            <v-textarea
              v-model="advice"
              :rules="adviceRules"
              :counter="500"
              label="Kritik dan Saran"
              rows="3"
              prepend-icon="mdi-comment"
              hint="(Masukan Anda sangat berarti bagi kami)"
            ></v-textarea>
          </v-col>
          <v-col
            cols="12"
            md="12"
          >
            <v-btn
              :disabled="!validRating"
              color="success"
              class="mr-2"
              @click="giveRating(ratingTicket)"
            >
              Simpan dan Lanjutkan
            </v-btn>

            <v-btn
              color="warning"
              class="mr-2"
              @click="reset"
            >
              Reset Isian
            </v-btn>
            <v-btn
              color="error"
              class="mr-2"
              @click="beriRating = false"
            >
             Batalkan
            </v-btn>
          </v-col>
        </v-row>
      </v-form>
    </v-container>
    </v-card>
    </v-dialog>

    <!-- dialog untuk confirm take order and chat -->
    <v-dialog
      v-model="editPengunjungDialog"
      max-width="500"
      max-height="300"
      scrollable
    >
      <v-card>
        <v-card-title v-model="choosenTicket" class="text-h5">
          Confirmation of : {{choosenTicket}}
        </v-card-title>
        <v-card-text>
          <v-form
            ref="form"
            lazy-validation
            @submit.prevent="validate">

            <v-row>
              <v-col
                cols="12"
                md="12"
              >
                <v-text-field
                  v-model="nohp"
                  :counter="14"
                  :rules="nohpRules"
                  @keypress="numberOnly"
                  label="No Handphone"
                  prepend-icon="mdi-whatsapp"
                  hint="(Wajib yang memiliki WhatsApp)"
                  required
                ></v-text-field>

              </v-col>
              <v-col
                cols="12"
                md="12"
              >
                <v-textarea
                v-model="necessity"
                :rules="necessityRules"
                required
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

          </v-form>

        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            :disabled="!validRating"
            color="green darken-1"
            text
            @click="kirimPerbaikan(choosenTicket)"
          >
            Kirim
          </v-btn>
          <v-btn
            color="red darken-1"
            text
            @click="editPengunjungDialog = false"
          >
            Batalkan
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <!-- dialog untuk confirm take order and chat -->
    <v-dialog
      v-model="takeChatModal"
      max-width="500"
      max-height="300"
      scrollable
    >
      <v-card light>
        <v-card-title v-model="choosenOrder" class="text-h5">
          Confirmation of : {{choosenOrder.noticket}}
        </v-card-title>
        <v-card-text>
          <v-skeleton-loader
            boilerplate
            elevation="2"
            type="date-picker"
          >
            Anda yakin mau melayani pengguna data ini? Keputusan Anda tidak bisa dibatalkan ya.
          </v-skeleton-loader>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="green darken-1"
            text
            @click="chatSiCantik(choosenOrder.nohp, choosenOrder.nama, choosenOrder.noticket, choosenOrder.perihal)"
          >
            Ya, saya mengerti
          </v-btn>
          <v-btn
            color="red darken-1"
            text
            @click="takeChatModal = false"
          >
            Tidak, batalkan
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <!-- dialog untuk time line -->
    <v-dialog
      v-model="timelineModal"
      max-width="500"
      max-height="300"
      scrollable
      persistent
    >
      <v-card>
        <v-card-title v-model="choosenTicket" class="text-h5">
          Timeline of : {{choosenTicket}}
        </v-card-title>
        <v-card-text>
          <div
            v-if="loadingTL"
            class="text-center"
          >
            <v-progress-circular
              indeterminate
              :size="50"
              :value="75"
              color="red lighten-4"
            ></v-progress-circular>
          </div>
          <Timeline v-else :progress="progress"/>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="red darken-1"
            text
            @click="(timelineModal = false, loadingTL = true)"
          >
            Close
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <!-- dialog untuk addProgress -->
    <v-dialog
      v-model="addProgressModal"
      max-width="500"
      max-height="300"
      scrollable
    >
      <v-card>
        <v-card-title v-model="choosenTicket" class="text-h5">
          Add Progress Ticket Number : {{choosenTicket}}
        </v-card-title>
        <v-card-text>
          <v-skeleton-loader
            boilerplate
            elevation="2"
            type="date-picker"
          >
            <AddProgress :noticket="choosenTicket" v-on:close-progress="closeAddprogressModal"/>
          </v-skeleton-loader>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="red darken-1"
            text
            @click="addProgressModal = false"
          >
            Close
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-snackbar
      v-model="varSnackbar"
      color="red darken-4"
    >
      {{ errorMessage }}

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
</template>

<script>
import Timeline from '@/components/Timeline.vue'
import AddProgress from '@/components/AddProgress.vue'
import axios from 'axios'
import Echo from 'laravel-echo'
import Swal from 'sweetalert2'
axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest'
axios.defaults.headers.common['Content-Type'] = 'application/json'

window.Pusher = require('pusher-js')
window.Echo = new Echo({
  broadcaster: 'pusher',
  key: '72b390d6913fa906ab84',
  cluster: 'ap1',
  forceTLS: true,
  encrypted: false
})

export default {
  components: {
    Timeline,
    AddProgress
  },
  data: () => ({
    // formErrors: {},
    errorMessage: '',
    varSnackbar: false,
    valid: true,
    validRating: true,
    loading: true,
    details: [],
    rating: 0,
    advice: '',
    ratingTicket: '',
    adviceRules: [
      v => !!v || 'Kritik dan saran is required',
      v => (v && v.length <= 500) || 'Kritik dan saran must be less than 500 characters'
    ],
    loadingTL: true,
    takeChatModal: false,
    editPengunjungDialog: false,
    beriRating: false,
    timelineModal: false,
    addProgressModal: false,
    choosenTicket: '',
    choosenOrder: {},
    progress: [],
    search: '',
    expanded: [],
    cookie_web: '',
    token_web: '',
    nohp: '',
    necessity: '',
    checkbox: '',
    nohpRules: [
      v => !!v || 'Nomor Whatsapp harus diisi',
      v => (v && v.length <= 12) || 'Nomor whatsapp must be less than 12 characters'
    ],
    necessityRules: [
      v => !!v || 'Keperluan harus diisi',
      v => (v && v.length <= 500) || 'Deskripsi Keperluan Maksimal 500 karakter'
    ],
    detailHeaders: [
      {
        text: 'Nomor WA',
        align: 'start',
        sortable: false,
        value: 'nohp'
      },
      { text: 'Nama', value: 'nama' },
      { text: 'No Ticket', value: 'noticket' },
      { text: 'Status', value: 'status' },
      { text: 'Petugas', value: 'serveBy' },
      { text: '', value: 'data-table-expand' }
    ]
  }),

  mounted () {
    // console.log(this.$store.getters['userAuth/activeUserId'])
    // Code for listening/subscribe into channel websocket. So, it can automatically update if there is an event occure
    window.Echo.channel('tickets-channel')
      .listen('.tickets-created', (event) => {
        this.loadData()
        this.checkAndShowNotif(event.ticket.nama, event.ticket.noticket)
        // console.log(this.details)
        // console.log(event)
      })
  },

  created () {
    return this.loadData()
  },

  methods: {
    closeAddprogressModal (v) {
      this.addProgressModal = !this.addProgressModal
      // alert(v)
    },
    namingStatus (status) {
      if (status === 0) return 'open'
      if (status === 1) return 'on progress'
      if (status === 5) return 'postpone'
      else return 'closed'
    },
    numberOnly (evt) {
      evt = (evt) || window.event
      var charCode = (evt.which) ? evt.which : evt.keyCode
      if ((charCode > 31 && (charCode < 48 || charCode > 57)) && charCode !== 46) {
        evt.preventDefault()
      } else {
        return true
      }
    },
    reformatDate (date) {
      const options = { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric' }
      const tanggal = new Date(date)
      // return new Date(date)
      const tanggalString = tanggal.toLocaleDateString('id-ID', options)
      return tanggalString
    },
    kirimPerbaikan (noticket) {
      // axios
      this.$refs.form.validate()
      axios.put('updatesync/' + noticket, {
        nohp: this.nohp,
        necessity: this.necessity,
        bersedia: this.checkbox,
        editable: '0',
        user_id: this.$store.getters['userAuth/activeUserId'],
        status: '1'
      },
      { headers: { Authorization: 'Bearer ' + this.$store.getters['userAuth/activeToken'] } }
      )
        .then((response) => {
          if (response.status === 200) {
            this.editPengunjungDialog = !this.editPengunjungDialog
            console.log('berhasil update')
          }
        })
        .catch((error) => {
          // console.log(JSON.stringify(error))
          if (error.response.status === 422) {
            // this.formErrors = error.response.data.errors
            this.varSnackbar = true
            this.errorMessage = 'Error No HP sudah digunakan atau ada isian yang kosong'
          } else {
            this.varSnackbar = true
            this.errorMessage = 'Gagal mendapatkan data dari server'
          }
        })
        .finally(() => {
          /* vm.$router.push({
            name: 'guesthome'
          }) */
        })
    },
    getColor (status) {
      if (status === 'open') return 'success'
      if (status === 'on progress') return 'primary'
      if (status === 'postpone') return 'blue-grey'
      else return 'red'
    },
    giveScore (noticket) {
      // this.nohp = this.details.nohp
      this.beriRating = !this.beriRating
      this.ratingTicket = noticket
    },
    editPengunjung (noticket, nohp) {
      // this.nohp = this.details.nohp
      this.editPengunjungDialog = !this.editPengunjungDialog
      this.choosenTicket = noticket
      this.nohp = nohp

      // const config = {
      //   method: 'get',
      //   url:
      // }
      // console.log(this.choosenTicket)
    },
    showChatConfirmation (nohp, nama, noticket, perihal, agreement) {
      /* this.takeChatModal = !this.takeChatModal
      this.choosenOrder = { nohp: nohp, nama: nama, noticket: noticket, perihal: perihal } */
      // this.choosenTicket = noticket
      Swal.fire({
        title: 'Apa Anda yakin?',
        text: 'Anda tidak dapat membatalkan aksi ini',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Ya, saya mengerti!'
      }).then((result) => {
        if (result.isConfirmed) {
          Swal.fire({
            title: 'Anda sudah mengambil tiket ini untuk dilayani',
            text: 'Anda akan diarahkan ke WhatsApp menuju pengunjung.',
            icon: 'success',
            confirmButtonText: 'OK'
          }).then((result) => {
            /* Read more about isConfirmed, isDenied below */
            if (result.isConfirmed) {
              this.chatSiCantik(nohp, nama, noticket, perihal)
              this.loadData()
            }
          })
        }
      })
    },
    chatSiCantik (nohp, nama, noticket, perihal) {
      // Edit status ticket from 'open' become 'on progress'
      axios.put('tickets/' + noticket, {
        status: 1
      },
      { headers: { Authorization: 'Bearer ' + this.$store.getters['userAuth/activeToken'] } }
      )
        .then((response) => {
          if (response.status === 200) {
            console.log(response)
          }
        })
        .catch((error) => {
          console.log(error)
        })
        .finally(() => {
          /* vm.$router.push({
            name: 'guesthome'
          }) */
        })

      axios.post('progresslogs', {
        ticket_id: noticket,
        user_id: this.$store.getters['userAuth/activeUserId'],
        note: 'Merespon ticket'
      },
      { headers: { Authorization: 'Bearer ' + this.$store.getters['userAuth/activeToken'] } }
      )
        .then((responseTicket) => {
          if (responseTicket.status === 200) {
            console.log(responseTicket)
            var msg = 'Hi, kak. Kenalin saya ' + this.$store.getters['userAuth/activeUserName'] + '\nTerima kasih kakak *' + nama + '* sudah menghubungi layanan SiCantik BPS Prov. Kalimantan Tengah\n\nNomor Tiket Anda : *' + noticket + '*\n' + 'Perihal _: ' + perihal + '_' + '\n\nBoleh ceritakan lebih detail kak kebutuhan data yang dicari?'
            window.open('https://wa.me/62' + nohp.substring('1') + '?text=' + encodeURI(msg))
            // axios.post('/relayWhatsApp', { nohp: nohp, nama: nama, noticket: noticket, message: 'closeBot' })
            //   .then(responseWhatsApp => {
            //     var msg = 'Hi, kak. Kenalin saya ' + this.$store.getters['userAuth/activeUserName'] + '\nTerima kasih kakak *' + nama + '* sudah menghubungi layanan SiCantik BPS Prov. Kalimantan Tengah\n\nNomor Tiket Anda : *' + noticket + '*\n' + 'Perihal _: ' + perihal + '_' + '\n\nBoleh ceritakan lebih detail kak kebutuhan data yang dicari?'
            //     window.open('https://wa.me/62' + nohp.substring('1') + '?text=' + encodeURI(msg))
            //   }).catch(errorWhatsApp => {
            //     console.log(errorWhatsApp)
            //   })
          }
        })
        .catch(function (errorTicket) {
          console.log(errorTicket)
        })
        .finally(function () {
          /* vm.$router.push({
            name: 'guesthome'
          }) */
        })
      // Add progress logs ticket was handled by agent then continue chat into whatsapp

      // var msg = 'Hi, kak. Kenalin saya ' + this.$store.getters['userAuth/activeUserName'] + '\nTerima kasih kakak *' + nama + '* sudah menghubungi layanan SiCantik BPS Prov. Kalimantan Tengah\n\nNomor Tiket Anda : *' + noticket + '*\n' + 'Perihal _: ' + perihal + '_' + '\n\nBoleh ceritakan lebih detail kak kebutuhan data yang dicari?'
      // window.open('https://wa.me/62' + nohp.substring('1') + '?text=' + encodeURI(msg))
    },
    addProgress (noticket) {
      alert('You will add progress for ticket number : ' + noticket)
    },
    showTimeline (noticket) {
      this.timelineModal = !this.timelineModal
      this.choosenTicket = noticket
      // get progress logs ticket based on ticket number
      axios.get('progresslogs/showLogs/' + noticket)
        .then((response) => {
          /* if (response.status === 200) {
            this.progress = response.data.logs
            console.log(this.progress)
          } */

          const logs = response.data.logs

          // Mengubah setiap timestamp menggunakan metode reformatDate
          this.progress = logs.map(log => {
            return {
              ...log,
              timestamp: this.reformatDate(log.timestamp)
            }
          })

          // console.log(response.data.logs)
          // this.progress = response.data.logs
          this.loadingTL = false
          console.log(response)
        })
        .catch(function (error) {
          console.log(error)
        })
        .finally(function () {
        })
      // alert('You will show timeline of ticket number : ' + noticket)
    },
    showAddProgress (noticket) {
      this.addProgressModal = !this.addProgressModal
      this.choosenTicket = noticket
    },
    deleteTicket (noticket) {
      Swal.fire({
        title: 'Apa Anda yakin akan menghapus tiket ini?',
        text: 'Tindakan Anda tidak bisa dibatalkan',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Ya, hapus tiket!'
      }).then((result) => {
        if (result.isConfirmed) {
          // Edit status ticket from 'on progress' become 'closed'
          axios.delete('tickets/' + noticket,
            { headers: { Authorization: 'Bearer ' + this.$store.getters['userAuth/activeToken'] } }
          )
            .then((response) => {
              if (response.status === 200) {
                // console.log(response)
                this.loadData()
              }
            })
            .catch((error) => {
              console.log(error)
            })
            .finally(() => {
            })
        }
      })
    },
    closeTicket (nohp, nama, noticket) {
      Swal.fire({
        title: 'Apa Anda yakin akan menutup tiket ini?',
        text: 'Anda tidak bisa membatalkan kembali, jika aksi ini sudah dilakukan',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Ya, tutup ticket!'
      }).then((result) => {
        if (result.isConfirmed) {
          // Edit status ticket from 'on progress' become 'closed'
          axios.put('tickets/' + noticket, {
            status: 9
          },
          { headers: { Authorization: 'Bearer ' + this.$store.getters['userAuth/activeToken'] } }
          )
            .then(function (response) {
              if (response.status === 200) {
                axios.post('/relayWhatsApp', {
                  nohp: nohp,
                  noticket: noticket,
                  message: 'closeBot'
                }, {
                  headers: {
                    'Content-Type': 'application/json'
                  }
                })
                  .then(responseWhatsApp => {
                    console.log(responseWhatsApp)
                  }).catch(errorWhatsApp => {
                    this.loading = false
                    console.log(errorWhatsApp)
                  })
              }
            })
            .catch(function (error) {
              console.log(error)
            })
            .finally(function () {
            })
          // Add progress logs ticket was closed by agent
          axios.post('progresslogs', {
            ticket_id: noticket,
            user_id: this.$store.getters['userAuth/activeUserId'],
            note: 'Permintaan telah dilayani dan ticket ditutup'
          },
          { headers: { Authorization: 'Bearer ' + this.$store.getters['userAuth/activeToken'] } }
          )
            .then(function (response) {
              if (response.status === 200) {
                console.log(response)
              }
            })
            .catch(function (error) {
              console.log(error)
            })
            .finally(function () {
            })
          Swal.fire({
            title: 'You have closed this ticket',
            text: 'You will redirect into whatsapp to send survei link for customer.',
            icon: 'success',
            allowOutsideClick: false,
            allowEscapeKey: false,
            confirmButtonText: 'OK'
          }).then((result) => {
            /* Read more about isConfirmed, isDenied below */
            if (result.isConfirmed) {
              // axios.post('/relayWhatsApp', { nohp: nohp, nama: nama, noticket: noticket })
              //   .then(responseWhatsApp => {
              //     this.loadData()
              // var msg = 'Hi, kak. Kenalin saya ' + this.$store.getters['userAuth/activeUserName'] + '\nTerima kasih kakak *' + nama + '* sudah menghubungi layanan SiCantik BPS Prov. Kalimantan Tengah\n\nNomor Tiket Anda : *' + noticket + '*\n' + 'Perihal _: ' + perihal + '_' + '\n\nBoleh ceritakan lebih detail kak kebutuhan data yang dicari?'
              // window.open('https://wa.me/62' + nohp.substring('1') + '?text=' + encodeURI(msg))
              // }).catch(errorWhatsApp => {
              //   console.log(errorWhatsApp)
              // })
              // var msg = 'Hi, kak ' + nama + '\nTerima kasih sudah menghubungi layanan SiCantik BPS Prov. Kalimantan Tengah\n\nPermohonan Anda dengan nomor tiket: ' + noticket + ' sudah selesai.\n' + 'Sebagai bentuk komitmen kami untuk terus meningkatkan pelayanan, kami sangat mengharap feedback dari kakak. Tolong isi survei kepuasan layanan kami melalui link berikut y kak: \n\n' + this.$appBaseUrl + 'rating/' + noticket + '\n\nTerima kasih 🙏'
              // // I use link api.whatsapp.com instead of wa.me because there is a problem in redirect from wa.me for emoji shortcode
              // window.open('https://api.whatsapp.com/send/?phone=62' + nohp.substring('1') + '&text=' + encodeURI(msg) + '&type=phone_number&app_absent=0')
              // window.open('https://wa.me/62' + nohp.substring('1') + '?text=' + encodeURI(msg))
              this.loadData()
            }
          })
        }
      })
    },
    openTicket (noticket) {
      Swal.fire({
        title: 'Apa Anda yakin akan membuka tiket ini?',
        text: 'Anda tidak bisa membatalkan kembali, jika aksi ini sudah dilakukan',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Ya, buka ticket!'
      }).then((result) => {
        if (result.isConfirmed) {
          // Edit status ticket from 'postpone' become 'open'
          axios.put('tickets/' + noticket, {
            status: 0
          },
          { headers: { Authorization: 'Bearer ' + this.$store.getters['userAuth/activeToken'] } }
          )
            .then(function (response) {
              if (response.status === 200) {
                console.log(response)
              }
            })
            .catch(function (error) {
              console.log(error)
            })
            .finally(function () {
            })
        }
      })
    },
    askRating (nohp, nama, noticket) {
      // alert('Comming soon!')
      // this.$router.push({ name: 'rating', params: { noticket } })
      var msg = 'Hi, kak ' + nama + '\nTerima kasih sudah menghubungi layanan SiCantik BPS Prov. Kalimantan Tengah\n\nPermohonan Anda dengan nomor tiket: ' + noticket + ' sudah selesai.\n' + 'Sebagai bentuk komitmen kami untuk terus meningkatkan pelayanan, kami sangat mengharap feedback dari kakak. Tolong isi survei kepuasan layanan kami melalui link berikut y kak: \n\n' + this.$appBaseUrl + 'rating/' + noticket + '\n\nTerima kasih 🙏'
      // I use link api.whatsapp.com instead of wa.me because there is a problem in redirect from wa.me for emoji shortcode
      window.open('https://api.whatsapp.com/send/?phone=62' + nohp.substring('1') + '&text=' + encodeURI(msg) + '&type=phone_number&app_absent=0')
    },
    loadData () {
      this.loading = true
      var config = {
        method: 'get',
        url: 'listguests',
        headers: {
          Authorization: 'Bearer ' + this.$store.getters['userAuth/activeToken']
        }
      }
      axios(config)
        .then((response) => {
          this.details = response.data.details
          this.loading = false
          console.log('Load Data respose :')
          console.log(response)
        })
        .catch((e) => {
          console.log(e)
        })
    },
    /* Start
     * Method to play sound and show Notification
     */
    playsound () {
      // alert('sound will played. it is okay?')
      const audio = new Audio('https://notificationsounds.com/storage/sounds/file-sounds-1325-smile.mp3')
      audio.play()
    },
    showNotification (name, noticket) {
      // create a new notification
      let notification

      if (noticket !== null || name !== null) {
        notification = new Notification('Hai! Ada update ticket terbaru ', {
          body: 'Hey, ada pengunjung baru, dengan nama ' + name
        })
      } else if (name !== null) {
        notification = new Notification('Hai! Ada update ticket terbaru ', {
          body: 'Ada update dari pengunjung baru dengan no tiket '
        })
      } else {
        notification = new Notification('Hai! Ada update ticket terbaru ', {
          body: 'Jangan lupa cek ya! Namanya: ' + name
        })
      }

      this.playsound()

      // uncomment this code if you want close the notification automatically from windows notification after 10 seconds
      // setTimeout(() => {
      //   notification.close()
      // }, 10 * 1000)

      // navigate to a URL when clicked
      notification.addEventListener('click', () => {
        window.open(this.$appBaseUrl + '/h/list-guest', '_blank')
      })
    },
    giveRating (noticket) {
      this.$refs.form.validate()
      if (!this.rating || !this.advice) {
        alert('Tolong isi rating dan kritik/saran untuk menilai kualitas layanan kami')
      } else {
        // const vm = this // `this` cannot be accessed inside .then .catch or .finnaly. So, we need helper in this case we named it 'vm'
        //  for baseUrl checkout file main.js in root dir
        axios.post('ratings', {
          ticket_id: noticket,
          star: this.rating,
          comment: this.advice
        })
          .then((response) => {
            if (response.status === 200) {
              this.beriRating = !this.beriRating
              window.open('http://s.bps.go.id/skd2024kalteng', '_blank')
            }
          })
          .catch((error) => {
            console.log(error)
          })
      }
    },
    reset () {
      this.rating = ''
      this.advice = ''
      this.$refs.form.reset()
    },
    showError () {
      console.log('You blocked the notifications')
    },
    checkAndShowNotif (name, noticket) {
      // check notification permission
      let granted = false

      if (Notification.permission === 'granted') {
        granted = true
        // console.log('notif granted')
      } else if (Notification.permission !== 'denied') {
        // let permission = await Notification.requestPermission();
        Notification.requestPermission((permission) => {
          // console.log('notif permission requested')
          if (permission === 'granted') {
            granted = true
            console.log('notif request granted')
          }
        })
        // granted = permission === 'granted' ? true : false;
      }

      // show notification or error
      granted ? this.showNotification(name, noticket) : this.showError()
    }
    /* End off
     * Method to playsound and show notification
    */
  },
  computed: {
    customDetails () {
      return this.details.map(item => {
        return { ...item, status: this.namingStatus(item.status), tanggal: this.reformatDate(item.tanggal) }
      })
    }
  }
  /* watch: {
    window.Echo.channel('tickets-channel').listen('TicketCreated', (event) => {
      console.log(event)
      // alert('sukses');
      this.$refs.lg.renewData()
      // App.renewData()
    })
  } */
}
</script>
<style scoped>
.yellow-card {
    background-color:#f1c40f;
    color: black;
    padding: 20px;
    border-radius: 8px;
    text-align: center;
  }
</style>
