<template>
    <v-container fluid>
      <v-row justify="center">
        <v-col cols="12" md="6" lg="3" v-for="(card, index) in cards" :key="index">
          <v-card :class="getColor(card)" outlined class="queue-card">
            <v-list-item three-line>
              <v-list-item-content>
                <v-list-item-title class="headline mb-1">{{ card.number }}</v-list-item-title>
                <v-list-item-subtitle>{{ card.label }}</v-list-item-subtitle>
              </v-list-item-content>
              <v-list-item-avatar tile size="80">
                <v-icon large>{{ card.icon }}</v-icon>
              </v-list-item-avatar>
            </v-list-item>
          </v-card>
        </v-col>
        <v-col cols="12">
        <v-data-table
                :headers="headersQueue"
                :items="queueNumbers"
                item-key="noticket"
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
                          <v-toolbar-title>Daftar Antrian</v-toolbar-title>
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
                <template v-slot:item.action="{ item }">
                  <v-tooltip bottom color="primary">
                    <template v-slot:activator="{ on }">
                      <v-btn class="mr-2" color="primary" @click="callNumber(item)" v-on="on" :disabled="item.is_serve === '1'">
                        <v-icon large>mdi-bullhorn</v-icon>
                      </v-btn>
                    </template>
                    <span>Panggil</span>
                  </v-tooltip>

                  <v-tooltip bottom color="#2ecc71" v-if="item.is_call === '1'">
                    <template v-slot:activator="{ on }">
                      <v-btn class="mr-2" color="#2ecc71" @click="serve(item)" v-on="on" :disabled="item.is_serve === '1'">
                        <v-icon large>mdi-sticker-check-outline</v-icon>
                      </v-btn>
                    </template>
                    <span>Layani</span>
                  </v-tooltip>
                </template>
              </v-data-table>
      </v-col>
      </v-row>
    </v-container>
</template>

<script>
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
  props: {
    card: Object
  },
  data () {
    return {
      search: '',
      loading: true,
      queueNumbers: [],
      cards: [
        { number: '-', icon: 'mdi-account-check-outline', label: 'Antrian sekarang', color: 'hijau' },
        { number: 0, icon: 'mdi-account-group', label: 'Jumlah Antrian', color: 'biru' },
        { number: 0, icon: 'mdi-account-arrow-right', label: 'Antrian Terlayani', color: 'ungu' },
        { number: 0, icon: 'mdi-account-switch', label: 'Sisa Antrian', color: 'merah' }
        // Data kartu Anda
      ],
      headersQueue: [
        { text: 'Nomor Antrian', align: 'start', sortable: false, value: 'noantrian', width: '30%' },
        { text: 'Waktu Kehadiran', align: 'start', sortable: true, value: 'waktu', width: '40%' },
        { text: 'Aksi', value: 'action', sortable: false, width: '30%' }
      ]
    }
  },
  created () {
    return this.loadData()
  },
  mounted () {
    window.Echo.channel('queue-channel')
      .listen('.queue-created', (event) => {
        this.loadData()
      })
  },
  methods: {
    loadData () {
      this.loading = true
      var config = {
        method: 'get',
        url: 'queue',
        headers: {
          Authorization: 'Bearer ' + this.$store.getters['userAuth/activeToken']
        }
      }

      axios(config)
        .then((response) => {
          this.loading = false
          // console.log(JSON.stringify(response.data))
          // var tableData = response.data.map(function (item) {
          //   return { noantrian: item.noantrian, waktu: item.waktu }
          // })
          this.queueNumbers = response.data

          this.cards[0].number = this.queueNumbers.filter(obj => obj.is_call === '1').sort((a, b) => new Date(b.updated_at) - new Date(a.updated_at))[0]?.noantrian || '-'
          this.cards[1].number = this.queueNumbers.length
          this.cards[2].number = this.queueNumbers.reduce((acc, curr) => {
            return acc + (curr.is_serve === '1' ? 1 : 0)
          }, 0)

          this.cards[3].number = this.cards[1].number - this.cards[2].number

          // console.log(this.queueNumbers)
        })
    },
    getColor (card) {
      if (card.color === 'biru') {
        return 'blue darken-1'
      } else if (card.color === 'hijau') {
        return 'teal lighten-1'
      } else if (card.color === 'ungu') {
        return 'deep-purple darken-1'
      } else if (card.color === 'merah') {
        return 'red darken-1'
      }
    },
    callNumber (item) {
      // console.log('Memanggil nomor antrian:', item.noantrian)
      axios.post('updateQueueCall', {
        noantrian: item
      },
      { headers: { Authorization: 'Bearer ' + this.$store.getters['userAuth/activeToken'] } }
      )
        .then((response) => {
          if (response.status === 200) {
            // console.log(response)
            this.queueNumbers = response.data

            this.cards[0].number = this.queueNumbers.filter(obj => obj.is_call === '1').sort((a, b) => new Date(b.updated_at) - new Date(a.updated_at))[0]?.noantrian || '-'
            this.cards[1].number = this.queueNumbers.length
            this.cards[2].number = this.queueNumbers.reduce((acc, curr) => {
              return acc + (curr.is_serve === '1' ? 1 : 0)
            }, 0)

            this.cards[3].number = this.cards[1].number - this.cards[2].number
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
    },
    serve (item) {
      console.log(item)
      Swal.fire({
        title: 'Apakah Anda yakin akan melayani nomor ' + item.noantrian + '?',
        text: 'Jika sudah dilayani, maka tidak dapat dipanggil kembali',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Ya, Layani antrian ini'
      }).then((result) => {
        if (result.isConfirmed) {
          axios.post('updateQueueUpdate', {
            noantrian: item
          },
          { headers: { Authorization: 'Bearer ' + this.$store.getters['userAuth/activeToken'] } }
          )
            .then((response) => {
              if (response.status === 200) {
                console.log(response)
                this.queueNumbers = response.data

                this.cards[0].number = this.queueNumbers.filter(obj => obj.is_call === '1').sort((a, b) => new Date(b.updated_at) - new Date(a.updated_at))[0]?.noantrian || '-'
                this.cards[1].number = this.queueNumbers.length
                this.cards[2].number = this.queueNumbers.reduce((acc, curr) => {
                  return acc + (curr.is_serve === '1' ? 1 : 0)
                }, 0)

                this.cards[3].number = this.cards[1].number - this.cards[2].number

                try {
                  this.loading = true
                  const today = new Date()
                  const year = today.getFullYear()
                  const month = String(today.getMonth() + 1).padStart(2, '0')
                  const day = String(today.getDate()).padStart(2, '0')

                  const perpustakaanConfig = {
                    method: 'post',
                    url: 'fetchPerpustakaan',
                    data: {
                      year: year,
                      month: month,
                      day: day
                    },
                    headers: {
                      Authorization: 'Bearer ' + this.$store.getters['userAuth/activeToken']
                    }
                  }

                  axios(perpustakaanConfig)
                    .then((responseWeb) => {
                      if (responseWeb.status === 200) {
                        // console.log(responseWeb)
                        // this.$router.push({
                        //   name: 'list-guest'
                        // })
                        const routeURL = this.$router.resolve({
                          name: 'list-guest'
                        }).href
                        window.open(routeURL, '_blank')
                      }
                    })
                    .catch((error) => {
                      // this.cookiesDialog = !this.cookiesDialog
                      console.error('Error in fetchPerpustakaan:', error)
                    })
                    .finally(() => {
                      this.loading = false
                    })
                } catch (error) {
                  console.error('Error in sinkron:', error)
                } finally {
                  this.loading = false // Set loading to false when the request is completed
                }
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
        }
      })
    }
  }
}
</script>

<style scoped>
.queue-card {
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0,0,0,0.1);
}
.blue-grey.lighten-2 {
  background-color: #b0bec5; /* Ini adalah warna blue-grey lighten-2 */
}
</style>
