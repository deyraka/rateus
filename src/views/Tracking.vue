<template>
  <v-container>
    <v-row justify="center">
      <v-col cols="12" md="6">
        <v-row justify="center">
<<<<<<< HEAD
          <v-btn
              color="success"
              class="mt-6 my-auto"
              rounded
              @click="contact(detail[0].noticket, detail[0].name)"
            >
            <v-icon dark>
              mdi-whatsapp
            </v-icon>
              Hubungi Petugas via WhatsApp
          </v-btn>
          <v-btn
              color="#8e44ad"
              :disabled = "disableRatings"
              class="mt-6 ml-2 my-auto"
              @click="ratings(detail[0].noticket)"
              rounded
            >
            <v-icon dark>
              mdi-star-check
            </v-icon>
              Beri Penilaian
=======
          <v-col cols="10" md="8">
            <v-text-field
              label="Lacak Ticket Anda disini"
              class="mt-6 my-auto"
              solo
              rounded
              filled
              dense
              light
              outline
              background-color="white"
              prepend-inner-icon="mdi-ticket"
            ></v-text-field>
          </v-col>
          <v-btn
            color="#81D4FA"
            class="ml-n2 my-auto"
            small
            dark
            fab
            to="#"
          >
            <v-icon dark>
              mdi-magnify
            </v-icon>
>>>>>>> master
          </v-btn>
        </v-row>
        <v-row justify="center">
          <v-col cols="12" md="12"
            v-for="(info, i) in detail"
            :key="i"
          >
            <v-simple-table
              fixed-header
              height="300px"
            >
              <template v-slot:default>
                <tbody
                  v-for="(info, i) in customDetail"
                    :key="i"
                >
                  <tr>
                    <td>No Tiket</td>
                    <td>: {{ info.noticket }}</td>
                  </tr>
                  <tr>
                    <td>Status</td>
                    <td>:&nbsp;
                      <v-chip :color="getColor(info.status)" small>
                        {{getStatus(info.status)}}
                      </v-chip>
                    </td>
                  </tr>
                  <tr>
                    <td>Tanggal</td>
                    <td>: {{ info.tanggal }}</td>
                  </tr>
                  <tr>
                    <td>Nama</td>
<<<<<<< HEAD
                    <td>: {{ info.name }}</td>
=======
                    <td>: {{ info.nama }}</td>
>>>>>>> master
                  </tr>
                  <tr>
                    <td>No HP</td>
                    <td>: {{ info.nohp}}</td>
                  </tr>
                  <tr>
                    <td>Perihal</td>
<<<<<<< HEAD
                    <td>: {{ info.necessity }}</td>
=======
                    <td>: {{ info.perihal }}</td>
>>>>>>> master
                  </tr>
                </tbody>
              </template>
            </v-simple-table>
          </v-col>
        </v-row>
<<<<<<< HEAD
        <v-row justify="center" v-if="getTicket">
          <v-col cols="12" md="12">
            <v-expansion-panels>
              <v-expansion-panel>
                <v-expansion-panel-header
                color="#8e44ad">
                  Anda memiliki {{ countTicket }} Ticket yang belum diberikan feedback
                </v-expansion-panel-header>
                <v-expansion-panel-content>
                  <!-- Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. -->
                  <v-simple-table
                    fixed-header
                  >
                    <template v-slot:default>
                      <thead>
                        <tr>
                          <th>No Ticket</th>
                          <th>Perihal</th>
                          <th>Beri Nilai</th>
                        </tr>
                      </thead>
                      <tbody
                        v-for="(itemTicket, i) in ticketNoRating"
                          :key="i"
                      >
                        <tr>
                          <td>{{ itemTicket.noticket }}</td>
                          <td>{{ itemTicket.necessity }}</td>
                          <td>
                            <v-btn
                                color="#8e44ad"
                                class="my-auto"
                                rounded
                                @click="ratings(itemTicket.noticket)"
                              >
                              <v-icon dark>
                                mdi-star-check
                              </v-icon>
                                Beri Penilaian
                            </v-btn>
                          </td>
                        </tr>
                      </tbody>
                    </template>
                  </v-simple-table>
                </v-expansion-panel-content>
              </v-expansion-panel>
            </v-expansion-panels>
          </v-col>
        </v-row>
      </v-col>
      <v-col cols="12" md="6">
        <Timeline :progress="progress" />
      </v-col>
    </v-row>
    <v-snackbar
    v-model="varSnackbar"
    color="red darken-4"
  >
    Anda sudah mengisi penilaian ini

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
=======
      </v-col>
      <v-col cols="12" md="6">
        <!-- <v-card-text class="py-0">
          <v-timeline
            align-top
            dense
          >
            <v-timeline-item
              v-for="(item, i) in progress"
              :key="i"
              :color="i==0 ? 'success' : 'grey'"
              icon="mdi-check"
              :large="i==0 ? true : false"
            >
              <div class="text-caption font-weight-light font-italic">
                {{item.timestamp}}
              </div>
              <div>
                {{item.user}}&nbsp;
                <v-icon
                  right color="blue" size="15px"
                  class="mt-n1 ml-n1"
                  v-if="item.verified==true"
                >
                  mdi-check-decagram
                </v-icon>
              </div>
              <v-chip
                class="overflow-x-auto"
                label
                :color="i==0 ? 'success' : 'grey'"
              >
                {{item.desc}}
              </v-chip>
            </v-timeline-item>
          </v-timeline>
        </v-card-text> -->
        <Timeline :progress="progress" />
      </v-col>
    </v-row>
>>>>>>> master
  </v-container>
</template>

<script>
import Timeline from '@/components/Timeline.vue'
<<<<<<< HEAD
import axios from 'axios'
=======
>>>>>>> master

export default {
  components: {
    Timeline
  },
  data: () => ({
<<<<<<< HEAD
    disableRatings: true,
    detail: '',
    getTicket: false,
    varSnackbar: false,
    countTicket: '',
    ticketNoRating: '',
    progress: ''
  }),
  created () {
    const noTicket = this.$route.params.noticket
    return this.loadData(noTicket)
  },
  computed: {
    customDetail () {
      return this.detail.map(info => {
        return {
          ...info,
          nohp: info.nohp.substring(0, 4) + 'xxx' + info.nohp.substring(info.nohp.length - 3),
          tanggal: this.reformatDate(info.created_at)
        }
=======
    detail: [
      {
        noticket: 'XYZ120',
        status: '1',
        tanggal: '25/09/2022',
        nama: 'Citra Kirana',
        nohp: '081234567890',
        perihal: 'Permohonan data PDRB series tahun 2000 - 2021 menurut lapangan usaha'
      }
    ],
    progress: [
      {
        timestamp: '12/9/22 08.30',
        user: 'Grasela Trifosa N.',
        verified: 1,
        desc: 'Data sedang diproses'
      },
      {
        timestamp: '11/9/22 14.30',
        user: 'Grasela Trifosa N.',
        verified: 1,
        desc: 'Konfirmasi data ke subject matter'
      },
      {
        timestamp: '11/9/22 11.30',
        user: 'Grasela Trifosa N.',
        verified: 1,
        desc: 'Memproses permintaan data'
      },
      {
        timestamp: '11/9/22 08.30',
        user: 'Grasela Trifosa N.',
        verified: 1,
        desc: 'Merespon tiket'
      },
      {
        timestamp: '11/9/22 08.30',
        user: 'Guest',
        verified: 0,
        desc: 'Tiket berhasil diajukan'
      }
    ]
  }),
  computed: {
    customDetail () {
      return this.detail.map(info => {
        return { ...info, nohp: info.nohp.substring(0, 4) + 'xxx' + info.nohp.substring(info.nohp.length - 3) }
>>>>>>> master
      })
    }
  },
  methods: {
<<<<<<< HEAD
    ratings (noTicket) {
      axios.get('detail-rating/' + noTicket)
        .then((response) => {
          console.log(response.data.total)
          if (response.data.total > 0) {
            this.varSnackbar = true
          } else {
            window.open(`${process.env.BASE_URL}` + 'rating/' + encodeURI(noTicket))
          }
        })
        .catch(function (errorLogs) {
          console.log(errorLogs)
        })
    },
    getColor (status) {
      if (status === 0) return 'success'
      if (status === 1) return 'primary'
      else return 'red'
    },
    getStatus (status) {
      if (status === 0) return 'open'
      if (status === 1) return 'on progress'
      else return 'closed'
    },
    reformatDate (date) {
      const options = { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric' }
      const tanggal = new Date(date)
      // return new Date(date)
      const tanggalString = tanggal.toLocaleDateString('id-ID', options)
      return tanggalString
    },
    contact (noticket, nama) {
      var msg = 'Hi, kak. Kenalin saya ' + nama + ' dengan Nomor Ticket: *' + noticket + '*. \n\n\n '
      // var msg = 'sempak'
      window.open('https://wa.me/628115216200?text=' + encodeURI(msg))
    },
    loadData (noTicket) {
      axios.get('tickets/' + noTicket)
        .then((response) => {
          axios.get('ticket-no-ratings/' + noTicket)
            .then((responseTickets) => {
              // console.log(responseTickets)
              this.countTicket = responseTickets.data.total
              if (this.countTicket > 0) {
                this.getTicket = true
                this.ticketNoRating = responseTickets.data.data
              }
            })
            .catch((ticketError) => {
              console.log(ticketError)
            })

          this.detail = response.data

          if (this.detail[0].status === 9) {
            this.disableRatings = false
          }

          axios.get('progresslogs/showLogs/' + noTicket)
            .then((responseLogs) => {
              const formattedLog = {
                timestamp: this.reformatDate(response.data[0].created_at),
                user: response.data[0].name,
                verified: 0, // You might want to adjust this based on your data
                desc: 'Tiket berhasil diajukan'
              }

              if (response.data[0].necessity === '') {
                this.progress = [formattedLog]
              } else {
                this.progress = [
                  ...responseLogs.data.logs.map(log => ({
                    ...log,
                    timestamp: this.reformatDate(log.timestamp)
                  })),
                  formattedLog
                ]
              }
              // console.log(response.data[0].necessity)
              this.progress = this.progress.filter(log => log.user !== null)
              console.log(this.progress)

              // console.log(response.data.logs)
              // this.progress = response.data.logs
              this.loadingTL = false
            // console.log(response)
            })
            .catch(function (errorLogs) {
              console.log(errorLogs)
            })
        })
        .catch(function (error) {
          console.log(error)
        })
=======
    getColor (status) {
      if (status === '0') return 'success'
      if (status === '1') return 'primary'
      else return 'red'
    },
    getStatus (status) {
      if (status === '0') return 'open'
      if (status === '1') return 'on progress'
      else return 'closed'
>>>>>>> master
    }
  }
}
</script>
