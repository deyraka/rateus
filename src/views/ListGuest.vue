<template>
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
                      <v-row class="mb-2 px-3" justify="start">
                        <v-tooltip bottom color="red">
                          <template v-slot:activator="{ on, attrs }">
                            <v-btn
                              v-if="item.status === 'on progress'"
                              fab x-small dark
                              color="red"
                              v-bind="attrs"
                              v-on="on"
                              @click="closeTicket(item.noticket)"
                            >
                              <v-icon>mdi-close-circle-outline</v-icon>
                            </v-btn>
                          </template>
                          <span>Close this ticket</span>
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
                              @click="askRating(item.noticket)"
                            >
                              <v-icon>mdi-link-variant</v-icon>
                            </v-btn>
                          </template>
                          <span>Send survei rating link to guest</span>
                        </v-tooltip>
                        <v-tooltip bottom color="success">
                          <template v-slot:activator="{ on, attrs }">
                            <v-btn
                              class="ml-2"
                              fab x-small dark
                              color="success"
                              v-bind="attrs"
                              v-on="on"
                              @click="chatSiCantik(item.nohp, item.nama, item.noticket, item.perihal)"
                            >
                              <v-icon>mdi-whatsapp</v-icon>
                            </v-btn>
                          </template>
                          <span>Take this ticket and chat him/her</span>
                        </v-tooltip>
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
                    </v-card>
                  </td>
                </template>
              </v-data-table>
            </v-skeleton-loader>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
    <!-- dialog untuk time line -->
    <v-dialog
      v-model="timelineModal"
      max-width="500"
      max-height="300"
      scrollable
    >
      <v-card>
        <v-card-title v-bind="choosenTicket" class="text-h5">
          Timeline of : {{choosenTicket}}
        </v-card-title>
        <v-card-text>
          <v-skeleton-loader
            boilerplate= true
            elevation="2"
            type="date-picker"
          >
            <Timeline :progress="progress"/>
          </v-skeleton-loader>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="red darken-1"
            text
            @click="timelineModal = false"
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
        <v-card-title v-bind="choosenTicket" class="text-h5">
          Add Progress Ticket Number : {{choosenTicket}}
        </v-card-title>
        <v-card-text>
          <v-skeleton-loader
            boilerplate= true
            elevation="2"
            type="date-picker"
          >
            <AddProgress :noticket="choosenTicket"/>
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

// window.setTimeout(function () { // untuk sementara. sambil mempelajari websocket. karena reload every 5 seconds ini bukan best pratice!!!
//   window.location.reload()
// }, 30000)

export default {
  components: {
    Timeline,
    AddProgress
  },
  data: () => ({
    details: [],
    timelineModal: false,
    addProgressModal: false,
    choosenTicket: '',
    progress: [
      {
        timestamp: '12/9/22 08.30',
        user: 'Grasela Trifosa N.',
        verified: true,
        desc: 'Data sedang diproses'
      },
      {
        timestamp: '11/9/22 14.30',
        user: 'Grasela Trifosa N.',
        verified: true,
        desc: 'Konfirmasi data ke subject matter'
      },
      {
        timestamp: '11/9/22 11.30',
        user: 'Grasela Trifosa N.',
        verified: true,
        desc: 'Memproses permintaan data'
      },
      {
        timestamp: '11/9/22 08.30',
        user: 'Grasela Trifosa N.',
        verified: true,
        desc: 'Merespon tiket'
      },
      {
        timestamp: '11/9/22 08.30',
        user: 'Guest',
        verified: false,
        desc: 'Tiket berhasil diajukan'
      }
    ],
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
    ],
    dummy: [
      {
        noticket: 'XYZ120',
        status: '1',
        tanggal: '25/09/2022',
        nama: 'Citra Kirana',
        nohp: '0811520011',
        perihal: 'Permohonan data PDRB series tahun 2000 - 2021 menurut lapangan usaha',
        serveBy: 'Grasela Trifosa N.'
      },
      {
        noticket: 'VIW432',
        status: '1',
        tanggal: '20/09/2022',
        nama: 'Eca Syahrun',
        nohp: '081234567890',
        perihal: 'Permohonan data PDRB series tahun 2000 - 2021 menurut lapangan usaha',
        serveBy: 'Grasela Trifosa N.'
      },
      {
        noticket: 'OHQ648',
        status: '0',
        tanggal: '19/09/2022',
        nama: 'Andre Taulani',
        nohp: '08967834562',
        perihal: 'Permohonan data PDRB series tahun 2000 - 2021 menurut lapangan usaha',
        serveBy: null
      },
      {
        noticket: 'CPQ157',
        status: '2',
        tanggal: '17/09/2022',
        nama: 'Budi Doremi',
        nohp: '08115378654',
        perihal: 'Permohonan data PDRB series tahun 2000 - 2021 menurut lapangan usaha',
        serveBy: 'Grasela Trifosa N.'
      },
      {
        noticket: 'SGR953',
        status: '2',
        tanggal: '16/09/2022',
        nama: 'Mahalini',
        nohp: '081290298414',
        perihal: 'Permohonan data PDRB series tahun 2000 - 2021 menurut lapangan usaha',
        serveBy: 'Grasela Trifosa N.'
      },
      {
        noticket: 'ASF246',
        status: '0',
        tanggal: '15/09/2022',
        nama: 'Keisya Levronka',
        nohp: '085686792746',
        perihal: 'Permohonan data PDRB series tahun 2000 - 2021 menurut lapangan usaha',
        serveBy: null
      },
      {
        noticket: 'NLK567',
        status: '1',
        tanggal: '12/09/2022',
        nama: 'Anya Geraldine',
        nohp: '08524563789',
        perihal: 'Permohonan data PDRB series tahun 2000 - 2021 menurut lapangan usaha',
        serveBy: 'Grasela Trifosa N.'
      },
      {
        noticket: 'GHJ867',
        status: '2',
        tanggal: '10/09/2022',
        nama: 'Wendy Cagur',
        nohp: '08539678254',
        perihal: 'Permohonan data PDRB series tahun 2000 - 2021 menurut lapangan usaha',
        serveBy: 'Grasela Trifosa N.'
      }
    ]
  }),

  mounted () {
    // var vm = this
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
        console.log(response)
      })
      .catch((e) => {
        console.log(e)
      })
  },

  methods: {
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
    chatSiCantik (nohp, nama, noticket, perihal) {
      var msg = 'Terima kasih kakak *' + nama + '* sudah menghubungi layanan SiCantik BPS Prov. Kalimantan Tengah\n\nNo Tiket Anda : *' + noticket + '*\n' + 'Perihal _: ' + perihal + '_'
      alert('You have taken this ticket!')
      window.open('https://wa.me/62' + nohp.substring('1') + '?text=' + encodeURI(msg))
    },
    addProgress (noticket) {
      alert('You will add progress for ticket number : ' + noticket)
    },
    showTimeline (noticket) {
      this.timelineModal = !this.timelineModal
      this.choosenTicket = noticket
      // alert('You will show timeline of ticket number : ' + noticket)
    },
    showAddProgress (noticket) {
      this.addProgressModal = !this.addProgressModal
      this.choosenTicket = noticket
    },
    closeTicket (noticket) {
      alert('Are you sure want to close this ticket number : ' + noticket + '?')
    },
    askRating (noticket) {
      // alert('Comming soon!')
      this.$router.push({ name: 'rating', params: { noticket } })
    }
  },
  computed: {
    customDetails () {
      return this.details.map(item => {
        return { ...item, status: this.namingStatus(item.status), tanggal: this.reformatDate(item.tanggal) }
      })
    }
  }
}
</script>
