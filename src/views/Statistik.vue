<template>
  <v-container fluid>
    <v-row justify="center">
      <div class="statistik text-h4">Statistik Layanan</div>
    </v-row>
    <v-row>
      <p class="text-overline cyan--text text--lighten-3">Tickets and Visitors</p>
    </v-row>
    <v-row>
      <v-col cols="12" md="6" lg="6" xs="12">
        <v-card hover color="grey darken-4">
          <v-card-subtitle class="font-weight-black">Ticket Statistics</v-card-subtitle>
          <v-card-text>
            <v-row>
              <v-col cols="12" md="6" lg="6" v-for="(card, index) in cards" :key="index">
                <v-card :class="getColor(card)" outlined class="queue-card">
                  <v-list-item three-line>
                    <v-list-item-content>
                      <v-list-item-title
                        v-if="index == 0"
                        class="headline mb-1"
                      >
                        {{ dataTicketSummary.jml_tiket }}
                      </v-list-item-title>
                      <v-list-item-title
                        v-if="index == 1"
                        class="headline mb-1"
                      >
                        {{ dataTicketSummary.open }}
                      </v-list-item-title>
                      <v-list-item-title
                        v-if="index == 2"
                        class="headline mb-1"
                      >
                        {{ dataTicketSummary.onprogress }}
                      </v-list-item-title>
                      <v-list-item-title
                        v-if="index == 3"
                        class="headline mb-1"
                      >
                        {{ dataTicketSummary.closed }}
                      </v-list-item-title>
                      <v-list-item-subtitle>{{ card.label }}</v-list-item-subtitle>
                    </v-list-item-content>
                    <v-list-item-avatar tile size="80">
                      <v-icon large>{{ card.icon }}</v-icon>
                    </v-list-item-avatar>
                  </v-list-item>
                </v-card>
              </v-col>
            </v-row>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
              text
              small
              color="red lighten-4"
              to="list-guest"
            >
              See More >
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
      <v-col cols="12" md="6" lg="6" xs="12">
        <v-card hover color="grey darken-4">
          <v-card-subtitle class="font-weight-black">Unique Visitor</v-card-subtitle>
          <v-card-text>
            <v-skeleton-loader
              type="table"
            >
              <template>
                <v-data-table
                    :headers="headersVisitor"
                    :items="dataVisitors"
                    :loading="loading"
                    :items-per-page="3"
                    :sort-by="['activeTicket']"
                    :sort-desc="['true']"
                    class="elevation-1"
                ></v-data-table>
              </template>
            </v-skeleton-loader>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
              text
              small
              color="red lighten-4"
              to="pengunjung"
            >
              See More >
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
    <v-row>
      <p class="text-overline cyan--text text--lighten-3">Visitor Statistic</p>
    </v-row>
    <v-row>
      <v-col cols="12" md="3" lg="3" xs="12">
        <v-select
          :items="years"
          label="Pilih Tahun"
          v-model="yearSelected"
        ></v-select>
      </v-col>
      <v-col cols="12" md="3" lg="3" xs="12">
        <v-select
          :items="bulans"
          label="Pilih Bulan"
          v-model="bulanSelected"
          clearable
        ></v-select>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12" md="6" lg="6" xs="12">
        <v-card hover color="grey darken-4">
          <v-card-subtitle class="font-weight-black">Visitor Numbers : {{ bulanSelected }}</v-card-subtitle>
          <v-card-text>
            <v-skeleton-loader
              type="table"
            >
              <template>
                <v-data-table
                    :headers="headersVisitorByMonth"
                    :items="filteredDataVisitorNumbers"
                    :loading="loading"
                    :items-per-page="3"
                    class="elevation-1"
                ></v-data-table>
              </template>
            </v-skeleton-loader>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
              text
              small
              color="red lighten-4"
              to="pengunjung"
            >
              See More >
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
      <v-col cols="12" md="6" lg="6" xs="12">
        <v-card hover color="grey darken-4">
          <v-card-subtitle class="font-weight-black">Visitor Numbers : {{ bulanSelected }} (by Date)</v-card-subtitle>
          <v-sparkline
            :value="customDataVisitorDetailByMonth[0]"
            :labels="customDataVisitorDetailByMonth[1]"
            :gradient="gradient"
            :smooth="radius || false"
            :padding="padding"
            :line-width="width"
            :stroke-linecap="lineCap"
            :gradient-direction="gradientDirection"
            :fill="fill"
            :type="type"
            :auto-line-width="autoLineWidth"
            auto-draw
          >
            <template v-slot:label="item">
              {{ item.value }}/{{ parseInt(bulans.indexOf(bulanSelected)) + 1 }}
            </template>
          </v-sparkline>
        </v-card>
      </v-col>
    </v-row>
    <v-row>
      <p class="text-overline cyan--text text--lighten-3">Agent Achievement</p>
    </v-row>
    <v-row>
      <v-col cols="12" md="4" lg="4" xs="12">
        <v-card hover color="grey darken-4">
          <v-card-subtitle class="font-weight-black">Agent of the Month</v-card-subtitle>
          <v-card-text>
            <v-skeleton-loader
              class="mx-auto"
              max-width="300"
              type="card"
            >
              <v-img
                lazy-src="http://localhost:8000/uploads/fikry.png"
                src="http://localhost:8000/uploads/fikry.png"
              ></v-img>
            </v-skeleton-loader>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col cols="12" md="8" lg="8" xs="12">
        <v-card hover color="grey darken-4">
          <v-card-subtitle>
            <v-row>
              <v-col><p class="font-weight-black">Agent Rank Board</p></v-col>
              <v-spacer></v-spacer>
              <v-col cols="12" md="3" lg="3" xs="12">
                <v-select
                  :items="periodItems"
                  label="Pilih Periode Bulan"
                  v-model="periodSelected"
                  dense
                ></v-select>
              </v-col>
            </v-row>
          </v-card-subtitle>
          <v-card-text>
            <v-skeleton-loader
              type="table"
            >
              <template>
                <v-data-table
                    :headers="headers"
                    :items="dataAgent"
                    :items-per-page="4"
                    class="elevation-1"
                    :loading="loading"
                    loading-text="Loading... Please wait"
                >
                  <template v-slot:item.stars="{ item }">
                    <v-icon small color="orange">mdi-star</v-icon>
                    <span>&nbsp;&nbsp;( {{ item.stars }} )</span>
                  </template>
                </v-data-table>
              </template>
            </v-skeleton-loader>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
              text
              small
              color="red lighten-4"
              to="#"
            >
              See More >
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
    <v-row>
      <p class="text-overline cyan--text text--lighten-3">Visitor Reviews</p>
    </v-row>
    <v-row>
      <v-col cols="12" md="4" lg="4" xs="12">
        <v-card hover color="grey darken-4" justify="center">
          <v-card-subtitle><p class="font-weight-black">Overall Team Rating</p></v-card-subtitle>
          <v-card-text>
            <v-container>
              <v-row justify="center" cols="12" md="12" lg="12" xs="12">
                <p class="text-h2">4.8</p>
              </v-row>
              <v-row justify="center" cols="12" md="12" lg="12" xs="12">
                <v-rating
                  :value="5"
                  color="amber"
                  dense
                  readonly
                  size="10"
                ></v-rating>
                <p>&nbsp;(154)</p>
              </v-row>
              <v-container v-for="(csd, i) in customStarDetails" :key="i">
                <v-row class="d-flex flex-row align-center">
                  <v-col class="align-center">
                    {{ csd.star }}&nbsp;
                    <v-icon :color="csd.color">mdi-star</v-icon>
                  </v-col>
                  <v-col class="align-center pl-0" cols="9">
                    <v-progress-linear rounded :color="csd.color" :value="csd.percent" background-color="blue-grey darken-1"></v-progress-linear>
                  </v-col>
                </v-row>
              </v-container>
            </v-container>
            <v-divider></v-divider>
          </v-card-text>
          <v-card-subtitle><p class="font-weight-black">Sentiment Analysis</p></v-card-subtitle>
          <v-card-text>
            <v-container>
              <v-row justify="center" cols="12" md="12" lg="12" xs="12">
                <p class="text-h6"># POSITIVE OVERALL #</p>
              </v-row>
              <v-container v-for="(cs, i) in customSentiment" :key="i">
                <v-row class="d-flex flex-row align-center">
                  <v-col class="align-center">
                    <v-tooltip right :color="cs.color">
                      <template v-slot:activator="{ on, attrs }">
                        <v-icon
                          :color="cs.color"
                          v-bind="attrs"
                          v-on="on"
                        >
                        {{ cs.icon }}
                        </v-icon>
                      </template>
                      <span>{{ cs.type }}</span>
                    </v-tooltip>
                  </v-col>
                  <v-col class="align-center pl-0" cols="9">
                    <v-progress-linear rounded :color="cs.color" :value="cs.percent" background-color="blue-grey darken-1"></v-progress-linear>
                  </v-col>
                </v-row>
              </v-container>
            </v-container>
            <v-divider></v-divider>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col cols="12" md="8" lg="8" xs="12">
        <v-card hover color="grey darken-4">
          <v-card-subtitle><p class="font-weight-black">Reviews</p></v-card-subtitle>
          <v-card-text>
            <v-skeleton-loader
              type="table"
            >
              <template>
                <v-data-table
                    :headers="headersRating"
                    :hide-default-header="true"
                    :hide-default-footer="false"
                    :items="dataRatings"
                    :items-per-page="5"
                    :loading="loading"
                    class="elevation-1"
                >
                  <template v-slot:item.star="{ item }">
                    <v-container>
                      <v-row>
                        <v-col cols="12" md="3" lg="3" xs="12">
                          <v-rating
                            :value="item.star"
                            color="amber"
                            dense
                            half-increments
                            readonly
                            size="10"
                          ></v-rating>
                        </v-col>
                        <v-spacer></v-spacer>
                        <v-col cols="12" md="4" lg="4" xs="12">
                          <span class="text-caption font-italic grey--text lighten-2">{{ reformatDate(item.updated_at) }}</span>
                        </v-col>
                      </v-row>
                      <v-row class="pl-md-4 pr-md-10">
                        <v-icon v-if="item.id%5===0" color="grey" cols="10" md="10" lg="10" xs="12">mdi-emoticon-neutral</v-icon>
                        <v-icon v-else-if="item.id%2===0" color="green" cols="10" md="10" lg="10" xs="12">mdi-emoticon-kiss</v-icon>
                        <v-icon v-else color="red" cols="10" md="10" lg="10" xs="12">mdi-emoticon-angry</v-icon>
                        <p class="text-caption font-weight-light font-italic" cols="10" md="10" lg="10" xs="12">{{ item.comment }}</p>
                      </v-row>
                    </v-container>
                  </template>
                </v-data-table>
              </template>
            </v-skeleton-loader>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
              text
              small
              color="red lighten-4"
              to="#"
            >
              See More >
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
    <v-row>
      <div class="text-subtitle-1">Others</div>
    </v-row>
  </v-container>
</template>

<script>
import axios from 'axios'
export default {
  data: () => ({
    bulans: ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'],
    bulanSelected: '',
    years: [(new Date().getFullYear() - 1).toString(), new Date().getFullYear().toString()],
    yearSelected: new Date().getFullYear().toString(),
    dataTicketSummary: [],
    loading: true,
    // START of data for sparkline
    width: 2,
    radius: 10,
    padding: 8,
    lineCap: 'round',
    gradient: ['#00c6ff', '#F0F', '#FF0'],
    dataVisitorDetailByMonth: [],
    gradientDirection: 'top',
    fill: false,
    type: 'trend',
    autoLineWidth: false,
    // END of data for sparkline
    periodSelected: (new Date().getMonth() + 1).toString(),
    // periodItems: ['all-time', '1', '2', '3','4','5','6','7','8','9','10','11','12'],
    periodItems: [
      { value: '-', text: '-', disabled: false, header: 'Periode' },
      { value: 'all-time', text: 'all-time' },
      { value: 'tw1', text: 'Triwulan 1' },
      { value: 'tw2', text: 'Triwulan 2' },
      { value: 'tw3', text: 'Triwulan 3' },
      { value: 'tw4', text: 'Triwulan 4' },
      { value: '-', text: '-', disabled: false, divider: true, header: 'Bulan' },
      { value: '1', text: 'Januari' },
      { value: '2', text: 'Februari' },
      { value: '3', text: 'Maret' },
      { value: '4', text: 'April' },
      { value: '5', text: 'Mei' },
      { value: '6', text: 'Juni' },
      { value: '7', text: 'Juli' },
      { value: '8', text: 'Agustus' },
      { value: '9', text: 'September' },
      { value: '10', text: 'Oktober' },
      { value: '11', text: 'November' },
      { value: '12', text: 'Desember' }
    ],
    cards: [
      { number: '-', icon: 'mdi-account-check-outline', label: 'Jumlah Tiket', color: 'ungu' },
      { number: 0, icon: 'mdi-account-group', label: 'Belum di Layani', color: 'hijau' },
      { number: 0, icon: 'mdi-account-arrow-right', label: 'Sedang di Layani', color: 'biru' },
      { number: 0, icon: 'mdi-account-switch', label: 'Selesai di Layani', color: 'merah' }
      // Data kartu Anda
    ],
    headers: [
      {
        text: 'Name',
        align: 'start',
        sortable: false,
        value: 'agent_name'
      },
      { text: 'Individual Rating (avg)', align: 'start', value: 'stars' },
      { text: 'Services', align: 'center', value: 'services' },
      { text: 'Review', align: 'center', value: 'rated_services' },
      { text: 'Score', value: 'score' }
    ],
    dataAgent: [],
    headersVisitor: [
      {
        text: 'Nama',
        align: 'start',
        sortable: false,
        value: 'nama'
      },
      { text: 'Jumlah Kunjungan', align: 'center', value: 'activeTicket' }
    ],
    dataVisitors: [],
    temp_year: [],
    headersVisitorByMonth: [
      {
        text: 'Bulan',
        align: 'start',
        sortable: false,
        value: 'bulan'
      },
      { text: 'Jumlah Pengunjung', align: 'center', value: 'jml_pengunjung' },
      { text: 'tahun', align: 'center', value: 'tahun' }
    ],
    dataVisitorNumbers: [],
    headersRating: [
      {
        text: 'Rating',
        align: 'start',
        sortable: false,
        value: 'star'
      }
      // { text: 'Komentar', value: 'comment' }
    ],
    dataRatings: [],
    starDetails: [
      { star: '5', percent: 70 },
      { star: '4', percent: 20 },
      { star: '3', percent: 10 },
      { star: '2', percent: 0 },
      { star: '1', percent: 0 }
    ],
    sentiment: [
      { type: 'positive', percent: 75 },
      { type: 'neutral', percent: 20 },
      { type: 'negative', percent: 5 }
    ]
  }),
  created () {
    return this.loadData()
  },
  methods: {
    loadData () {
      this.loadDataTicketSummary()
      this.loadDataRank()
      this.loadDataVisitors()
      this.loadDataRatings()
      this.loadDataVisitorByMonth()
      // this.loadDataVisitorDetailByMonth()
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
    loadDataTicketSummary () {
      this.loading = true
      var config = {
        method: 'get',
        url: 'ticketSummary',
        headers: {
          Authorization: 'Bearer ' + this.$store.getters['userAuth/activeToken']
        }
      }
      axios(config)
        .then((response) => {
          this.dataTicketSummary = response.data.data[0]
          this.loading = false
          // console.log('Load Data respose :')
          // console.log('data : ' + response.data.data)
        })
        .catch((e) => {
          console.log(e)
        })
    },
    loadDataVisitors () {
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
          this.dataVisitors = response.data
          this.loading = false
          // console.log('Load Data respose :')
          // console.log(response.data)
        })
        .catch((e) => {
          console.log(e)
        })
    },
    loadDataVisitorByMonth () {
      this.loading = true
      var config = {
        method: 'get',
        // url: 'visitorsByMonth/' + (parseInt(this.bulans.indexOf(this.bulanSelected)) + 1) + '&' + this.yearSelected,
        url: 'visitorsByMonth/' + this.yearSelected,
        headers: {
          Authorization: 'Bearer ' + this.$store.getters['userAuth/activeToken']
        }
      }
      axios(config)
        .then((response) => {
          this.dataVisitorNumbers = response.data.data
          // var yearsHelp = response.data.exist_year
          // this.years = Object.keys(yearsHelp).map((key) => [yearsHelp[key]])
          this.loading = false
          // console.log('Load Data respose :')
          // console.log('Tahun : ' + this.yearsHelp)
        })
        .catch((e) => {
          console.log(e)
        })
    },
    loadDataVisitorDetailByMonth () {
      this.loading = true
      var config = {
        method: 'get',
        url: 'visitorDetailsByMonth/' + this.yearSelected + '&' + (parseInt(this.bulans.indexOf(this.bulanSelected)) + 1),
        headers: {
          Authorization: 'Bearer ' + this.$store.getters['userAuth/activeToken']
        }
      }
      axios(config)
        .then((response) => {
          this.dataVisitorDetailByMonth = response.data.data
          this.loading = false
          // console.log('Load Data respose :')
          // console.log(this.dataVisitorDetailByMonth)
        })
        .catch((e) => {
          console.log(e)
        })
    },
    loadDataRank () {
      this.loading = true
      var config = {
        method: 'get',
        url: 'agentRank/' + this.periodSelected,
        headers: {
          Authorization: 'Bearer ' + this.$store.getters['userAuth/activeToken']
        }
      }
      axios(config)
        .then((response) => {
          this.dataAgent = response.data.data
          this.loading = false
          // console.log('Load Data respose :')
          // console.log(response)
        })
        .catch((e) => {
          console.log(e)
        })
    },
    loadDataRatings () {
      this.loading = true
      var config = {
        method: 'get',
        url: 'ratings',
        headers: {
          Authorization: 'Bearer ' + this.$store.getters['userAuth/activeToken']
        }
      }
      axios(config)
        .then((response) => {
          this.dataRatings = response.data[0]
          this.loading = false
          // console.log('Load Data respose :')
          // console.log(response.data)
        })
        .catch((e) => {
          console.log(e)
        })
    },
    monthsName (m) {
      return this.bulans[parseInt(m) - 1]
    },
    reformatDate (date) {
      const options = { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric' }
      const tanggal = new Date(date)
      // return new Date(date)
      const tanggalString = tanggal.toLocaleDateString('id-ID', options)
      return tanggalString
    },
    starColoring (star) {
      if (star === '5') return 'green accent-4'
      if (star === '4') return 'light-green accent-1'
      if (star === '3') return 'lime accent-2'
      if (star === '2') return 'amber darken-2'
      else return 'deep-orange darken-2'
    },
    sentimentColoring (type) {
      if (type === 'positive') return 'green accent-4'
      if (type === 'neutral') return 'grey'
      else return 'red'
    }
  },
  computed: {
    customVisitorNumbers () {
      return this.dataVisitorNumbers.map(item => {
        return { ...item, bulan: this.monthsName(item.bulan) }
      })
    },
    customDataVisitorDetailByMonth () {
      var groupdata = []
      const jp = this.dataVisitorDetailByMonth.map(detail => detail.jml_pengunjung)
      const tgl = this.dataVisitorDetailByMonth.map(detail => detail.tanggal)
      groupdata = [jp, tgl]
      return groupdata
    },
    filteredDataVisitorNumbers () {
      return this.customVisitorNumbers.filter((i) => {
        // return !this.bulanSelected || ((i.bulan === this.bulanSelected) && (i.tahun === this.yearSelected))
        return !this.bulanSelected || (i.bulan === this.bulanSelected)
      })
    },
    customStarDetails () {
      return this.starDetails.map(item => {
        return { ...item, color: this.starColoring(item.star) }
      })
    },
    customSentiment () {
      return this.sentiment.map(item => {
        return { ...item, color: this.sentimentColoring(item.type), icon: (item.type === 'positive') ? 'mdi-emoticon-kiss' : ((item.type === 'neutral') ? 'mdi-emoticon-neutral' : 'mdi-emoticon-angry') }
      })
    }
  },
  watch: {
    periodSelected: function (newPeriodSelected, OldPeriodSelected) {
      this.loadDataRank()
    },
    bulanSelected: function (newPeriodSelected, OldPeriodSelected) {
      // this.loadDataVisitorByMonth()
      this.loadDataVisitorDetailByMonth()
      // this.filteredDataVisitorNumbers()
    },
    yearSelected: function (newPeriodSelected, OldPeriodSelected) {
      this.bulanSelected = ''
      this.loadDataVisitorByMonth()
    }
  }
}
</script>
