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
            to="tracking"
          >
            <v-icon dark>
              mdi-magnify
            </v-icon>
          </v-btn>
        </v-row>
        <v-row justify="center">
          <v-col cols="12" md="6">
            <div>Nomor tiket : xxxxx</div>
            <div>Nama : Guest1</div>
            <div>Tanggal tiket : 22/09/2022</div>
            <div>Permohonan : Data PDRB Tahun 2010-2022</div>
          </v-col>
        </v-row>
      </v-col>
      <v-col cols="12" md="8">
        <v-card-text class="py-0">
          <v-timeline
            align-top
            dense
          >
            <v-timeline-item
              v-for="(item, i) in items"
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
    items: [
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
  })
}
</script>
