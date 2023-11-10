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
                          <div class="text-caption font-weight-thin font-italic text--disabled">Name: {{item.nama}}</div>
                          <div class="text-caption font-weight-thin font-italic text--disabled">Nomor HP: {{item.nohp}}</div>
                          <div class="text-caption font-weight-thin font-italic text--disabled">Date: {{item.tanggal}}</div>
                          <div class="text-caption font-weight-thin font-italic text--disabled">Handled by: <strong class="primary--text">{{item.serveBy}}</strong></div>
                          <div class="text-caption font-weight-thin font-italic text--disabled">Request: {{item.perihal}}</div>
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
                        <v-tooltip bottom color="warning">
                          <template v-slot:activator="{ on, attrs }">
                            <v-btn
                              class="ml-2"
                              fab x-small dark
                              color="warning"
                              v-bind="attrs"
                              v-on="on"
                              @click="askRating(item.noticket)"
                            >
                              <v-icon>mdi-link-variant</v-icon>
                            </v-btn>
                          </template>
                          <span>Re-send survei rating link to guest</span>
                        </v-tooltip>
                      </v-row>
                      <v-row class="mb-2 px-3" justify="end" v-else>
                        <v-tooltip bottom color="success">
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
                          <span>Take this ticket and chat him/her</span>
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
  </v-container>
</template>

<script>
import Timeline from '@/components/Timeline.vue'
import AddProgress from '@/components/AddProgress.vue'
import axios from 'axios'
import Echo from 'laravel-echo'
import Swal from 'sweetalert2'

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
    loading: true,
    details: [],
    loadingTL: true,
    takeChatModal: false,
    timelineModal: false,
    addProgressModal: false,
    choosenTicket: '',
    choosenOrder: {},
    progress: [],
    search: '',
    expanded: [],
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
    // Code for listening/subscribe into channel websocket. So, it can automatically update if there is an event occure
    window.Echo.channel('tickets-channel')
      .listen('.tickets-created', (event) => {
        this.loadData()
        this.checkAndShowNotif(event.ticket.name, event.ticket.noticket)
        console.log(event)
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
      else return 'closed'
    },
    reformatDate (date) {
      return new Date(date)
    },
    getColor (status) {
      if (status === 'open') return 'success'
      if (status === 'on progress') return 'primary'
      else return 'red'
    },
    showChatConfirmation (nohp, nama, noticket, perihal, agreement) {
      /* this.takeChatModal = !this.takeChatModal
      this.choosenOrder = { nohp: nohp, nama: nama, noticket: noticket, perihal: perihal } */
      // this.choosenTicket = noticket
      Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Ya, saya mengerti!'
      }).then((result) => {
        if (result.isConfirmed) {
          Swal.fire({
            title: 'You have taken this ticket',
            text: 'You will redirect into whatsapp to chat with the customer.',
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
        .then(function (response) {
          if (response.status === 200) {
            console.log(response)
          }
        })
        .catch(function (error) {
          console.log(error)
        })
        .finally(function () {
          /* vm.$router.push({
            name: 'guesthome'
          }) */
        })
      // Add progress logs ticket was handled by agent then continue chat into whatsapp
      axios.post('progresslogs', {
        ticket_id: noticket,
        user_id: this.$store.getters['userAuth/activeUserId'],
        note: 'Merespon ticket'
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
          /* vm.$router.push({
            name: 'guesthome'
          }) */
        })
      var msg = 'Hi, kak. Kenalin saya ' + this.$store.getters['userAuth/activeUserName'] + '\nTerima kasih kakak *' + nama + '* sudah menghubungi layanan SiCantik BPS Prov. Kalimantan Tengah\n\nNomor Tiket Anda : *' + noticket + '*\n' + 'Perihal _: ' + perihal + '_' + '\n\nBoleh ceritakan lebih detail kak kebutuhan data yang dicari?'
      window.open('https://wa.me/62' + nohp.substring('1') + '?text=' + encodeURI(msg))
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
          this.progress = response.data.logs
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
    closeTicket (nohp, nama, noticket) {
      Swal.fire({
        title: 'Are you sure want to close this ticket?',
        text: "You won't be able to revert this!",
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
                console.log(response)
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
              var msg = 'Hi, kak ' + nama + '\nTerima kasih sudah menghubungi layanan SiCantik BPS Prov. Kalimantan Tengah\n\nPermohonan Anda dengan nomor tiket: ' + noticket + ' sudah selesai.\n' + 'Sebagai bentuk komitmen kami untuk terus meningkatkan pelayanan, kami sangat mengharap feedback dari kakak. Tolong isi survei kepuasan layanan kami melalui link berikut y kak: \n\n' + this.$appBaseUrl + 'rating/' + noticket + '\n\nTerima kasih 🙏'
              // I use link api.whatsapp.com instead of wa.me because there is a problem in redirect from wa.me for emoji shortcode
              window.open('https://api.whatsapp.com/send/?phone=62' + nohp.substring('1') + '&text=' + encodeURI(msg) + '&type=phone_number&app_absent=0')
              // window.open('https://wa.me/62' + nohp.substring('1') + '?text=' + encodeURI(msg))
              this.loadData()
            }
          })
        }
      })
    },
    askRating (noticket) {
      // alert('Comming soon!')
      this.$router.push({ name: 'rating', params: { noticket } })
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
      const notification = new Notification('New Ticket SiCantik, no : ' + noticket, {
        body: 'Hey, ada pengunjung baru, namanya ' + name
      })

      this.playsound()

      // uncomment this code if you want close the notification automatically from windows notification after 10 seconds
      // setTimeout(() => {
      //   notification.close()
      // }, 10 * 1000)

      // navigate to a URL when clicked
      notification.addEventListener('click', () => {
        window.open('http://localhost:8080/h/list-guest', '_blank')
      })
    },
    showError () {
      console.log('You blocked the notifications')
    },
    checkAndShowNotif (name, noticket) {
      // check notification permission
      let granted = false

      if (Notification.permission === 'granted') {
        granted = true
        console.log('notif granted')
      } else if (Notification.permission !== 'denied') {
        // let permission = await Notification.requestPermission();
        Notification.requestPermission((permission) => {
          console.log('notif permission requested')
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
