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
                :headers="dessertHeaders"
                :items="desserts"
                :expanded.sync="expanded"
                item-key="names"
                show-expand
                class="elevation-1"
                :search="search"
              >
                <template v-slot:top>
                  <v-toolbar flat>
                    <v-toolbar-title>Daftar Pengunjung</v-toolbar-title>
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
                <template v-slot:item.isopen="{ item }">
                  <v-chip
                    :color="getColor(item.isopen)"
                    dark
                    small
                  >
                    {{ item.isopen }}
                  </v-chip>
                </template>
                <template v-slot:expanded-item="{ headers, item }">
                  <td :colspan="headers.length">
                    More info about {{ item.name }}
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
    dessertHeaders: [
      {
        text: 'Nomor WA',
        align: 'start',
        sortable: false,
        value: 'nohp'
      },
      { text: 'Tiket - Status', value: 'isopen' },
      { text: 'Tanggal', value: 'tanggal' },
      { text: '', value: 'data-table-expand' }
    ],
    desserts: [
      {
        noticket: 'XYZ120',
        isopen: true,
        tanggal: '25/09/2022',
        nama: 'Citra Kirana',
        nohp: '0811520011',
        perihal: 'Permohonan data PDRB series tahun 2000 - 2021 menurut lapangan usaha'
      },
      {
        noticket: 'VIW432',
        isopen: false,
        tanggal: '20/09/2022',
        nama: 'Eca Syahrun',
        nohp: '081234567890',
        perihal: 'Permohonan data PDRB series tahun 2000 - 2021 menurut lapangan usaha'
      },
      {
        noticket: 'OHQ648',
        isopen: true,
        tanggal: '19/09/2022',
        nama: 'Andre Taulani',
        nohp: '08967834562',
        perihal: 'Permohonan data PDRB series tahun 2000 - 2021 menurut lapangan usaha'
      },
      {
        noticket: 'CPQ157',
        isopen: true,
        tanggal: '17/09/2022',
        nama: 'Budi Doremi',
        nohp: '08115378654',
        perihal: 'Permohonan data PDRB series tahun 2000 - 2021 menurut lapangan usaha'
      },
      {
        noticket: 'SGR953',
        isopen: true,
        tanggal: '16/09/2022',
        nama: 'Mahalini',
        nohp: '081367451289',
        perihal: 'Permohonan data PDRB series tahun 2000 - 2021 menurut lapangan usaha'
      },
      {
        noticket: 'ASF246',
        isopen: false,
        tanggal: '15/09/2022',
        nama: 'Keisya Levronka',
        nohp: '085686792746',
        perihal: 'Permohonan data PDRB series tahun 2000 - 2021 menurut lapangan usaha'
      },
      {
        noticket: 'NLK567',
        isopen: false,
        tanggal: '12/09/2022',
        nama: 'Anya Geraldine',
        nohp: '08524563789',
        perihal: 'Permohonan data PDRB series tahun 2000 - 2021 menurut lapangan usaha'
      },
      {
        noticket: 'GHJ867',
        isopen: true,
        tanggal: '10/09/2022',
        nama: 'Wendy Cagur',
        nohp: '08539678254',
        perihal: 'Permohonan data PDRB series tahun 2000 - 2021 menurut lapangan usaha'
      }
    ]
  }),
  methods: {
    getColor (isopenstatus) {
      if (isopenstatus) return 'success'
      else return 'red'
    }
  },
  computed: {
    customDetail () {
      return this.detail.map(info => {
        return { ...info, nohp: info.nohp.substring(0, 4) + 'xxx' + info.nohp.substring(info.nohp.length - 3) }
      })
    }
  }
}
</script>
