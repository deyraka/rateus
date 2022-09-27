<template>
  <v-container>
    <v-row justify="center">
      <v-col cols="12" md="4">
        <v-row justify="center">
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
                <!-- <thead>
                  <tr>
                    <th class="text-left">
                      Name
                    </th>
                    <th class="text-left">
                      Calories
                    </th>
                  </tr>
                </thead> -->
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
                    <td>: {{ info.nama }}</td>
                  </tr>
                  <tr>
                    <td>No HP</td>
                    <td>: {{ info.nohp}}</td>
                  </tr>
                  <tr>
                    <td>Perihal</td>
                    <td>: {{ info.perihal }}</td>
                  </tr>
                </tbody>
              </template>
            </v-simple-table>
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
    ]
  }),
  computed: {
    customDetail () {
      return this.detail.map(info => {
        return { ...info, nohp: info.nohp.substring(0, 4) + 'xxx' + info.nohp.substring(info.nohp.length - 3) }
      })
    }
  },
  methods: {
    getColor (status) {
      if (status === '0') return 'success'
      if (status === '1') return 'primary'
      else return 'red'
    },
    getStatus (status) {
      if (status === '0') return 'open'
      if (status === '1') return 'on progress'
      else return 'closed'
    }
  }
}
</script>
