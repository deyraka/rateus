<template>
  <v-container>
    <v-row justify="center">
      <v-col cols="12" md="6">
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
                  <v-toolbar flat>
                    <v-toolbar-title>Daftar Pengunjung</v-toolbar-title>
                    <v-spacer></v-spacer>
                    <v-spacer></v-spacer>
                    <v-text-field
                      v-model="search"
                      append-icon="mdi-magnify"
                      label="Search"
                      single-line
                      hide-details
                    ></v-text-field>
                  </v-toolbar>
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
                  <td :colspan="headers.length">
                    <v-row>
                      <v-col
                        cols="12"
                        sm="3"
                      >
                        <v-btn
                          icon
                          color="pink"
                          :to="chatSiCantik(item.nohp, item.nama, item.noticket, item.perihal)"
                        >
                          <v-icon>mdi-heart</v-icon>
                        </v-btn>
                      </v-col>

                      <v-col
                        cols="12"
                        sm="3"
                      >
                        <v-btn
                          icon
                          color="indigo"
                        >
                          <v-icon>mdi-star</v-icon>
                        </v-btn>
                      </v-col>

                      <v-col
                        cols="12"
                        sm="3"
                      >
                        <v-btn
                          icon
                          color="green"
                        >
                          <v-icon>mdi-cached</v-icon>
                        </v-btn>
                      </v-col>

                      <v-col
                        cols="12"
                        sm="3"
                      >
                        <v-btn
                          icon
                          color="deep-orange"
                        >
                          <v-icon>mdi-thumb-up</v-icon>
                        </v-btn>
                      </v-col>
                    </v-row>
                  </td>
                </template>
              </v-data-table>
            </v-skeleton-loader>
          </v-col>
        </v-row>
      </v-col>
      <v-col cols="12" md="6">
        <v-card-text class="py-0">
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
        </v-card-text>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  data: () => ({
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
      { text: 'Tiket - Status', value: 'status' },
      { text: 'Tanggal', value: 'tanggal' },
      { text: '', value: 'data-table-expand' }
    ],
    details: [
      {
        noticket: 'XYZ120',
        status: '1',
        tanggal: '25/09/2022',
        nama: 'Citra Kirana',
        nohp: '0811520011',
        perihal: 'Permohonan data PDRB series tahun 2000 - 2021 menurut lapangan usaha'
      },
      {
        noticket: 'VIW432',
        status: '1',
        tanggal: '20/09/2022',
        nama: 'Eca Syahrun',
        nohp: '081234567890',
        perihal: 'Permohonan data PDRB series tahun 2000 - 2021 menurut lapangan usaha'
      },
      {
        noticket: 'OHQ648',
        status: '0',
        tanggal: '19/09/2022',
        nama: 'Andre Taulani',
        nohp: '08967834562',
        perihal: 'Permohonan data PDRB series tahun 2000 - 2021 menurut lapangan usaha'
      },
      {
        noticket: 'CPQ157',
        status: '2',
        tanggal: '17/09/2022',
        nama: 'Budi Doremi',
        nohp: '08115378654',
        perihal: 'Permohonan data PDRB series tahun 2000 - 2021 menurut lapangan usaha'
      },
      {
        noticket: 'SGR953',
        status: '2',
        tanggal: '16/09/2022',
        nama: 'Mahalini',
        nohp: '081367451289',
        perihal: 'Permohonan data PDRB series tahun 2000 - 2021 menurut lapangan usaha'
      },
      {
        noticket: 'ASF246',
        status: '0',
        tanggal: '15/09/2022',
        nama: 'Keisya Levronka',
        nohp: '085686792746',
        perihal: 'Permohonan data PDRB series tahun 2000 - 2021 menurut lapangan usaha'
      },
      {
        noticket: 'NLK567',
        status: '1',
        tanggal: '12/09/2022',
        nama: 'Anya Geraldine',
        nohp: '08524563789',
        perihal: 'Permohonan data PDRB series tahun 2000 - 2021 menurut lapangan usaha'
      },
      {
        noticket: 'GHJ867',
        status: '2',
        tanggal: '10/09/2022',
        nama: 'Wendy Cagur',
        nohp: '08539678254',
        perihal: 'Permohonan data PDRB series tahun 2000 - 2021 menurut lapangan usaha'
      }
    ]
  }),
  methods: {
    namingStatus (status) {
      if (status === '0') return 'open'
      if (status === '1') return 'on progress'
      else return 'closed'
    },
    getColor (status) {
      if (status === 'open') return 'success'
      if (status === 'on progress') return 'primary'
      else return 'red'
    },
    chatSiCantik (nohp, nama, noticket, perihal) {
      var msg = 'Terima kasih ' + nama + ' sudah menghubungi SiCantik\nNo Tiket Anda : ' + noticket + '\n' + 'Perihal : ' + perihal
      window.open('wa.me/62' + nohp.substring('2') + '?text=' + encodeURI(msg))
    }
  },
  computed: {
    customDetails () {
      return this.details.map(item => {
        return { ...item, status: this.namingStatus(item.status) }
      })
    }
  }
}
</script>
