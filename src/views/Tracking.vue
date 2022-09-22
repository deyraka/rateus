<template>
  <v-card
    class="mx-auto"
    max-width=720px
    dark
  >
    <v-card-title class="grey">
      <p>Nomor Ticket: SDK154</p>
    </v-card-title>
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
  </v-card>
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
