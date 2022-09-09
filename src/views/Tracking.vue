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
          color="success"
          icon="mdi-check"
          icon-color="white"
          large
        >
          <div class="text-caption font-weight-light font-italic">
            09/09/2022, 10.30
          </div>
          <div>
            Grasela Novita T.
            <v-icon
              right color="blue" size="15px"
              class="ml-n1 mt-n1"
            >
              mdi-check-decagram
            </v-icon>
          </div>
          <v-chip
            label
            color="success"
          >
            Data sedang diproses
          </v-chip>
        </v-timeline-item>

        <v-timeline-item
          color="grey"
          icon="mdi-check"
          icon-color="white"
          small
        >
          <div class="text-caption font-weight-light font-italic">
            5/09/2022, 08.30
          </div>
          <div>
            Grasela Novita T.
            <v-icon
              right color="blue" size="15px"
              class="ml-n1 mt-n1"
            >
              mdi-check-decagram
            </v-icon>
          </div>
          <div>
            <v-chip
              label
              style="overflow-x: auto;overflow-y: hidden;white-space: nowrap;"
            >
              Konfirmasi data kepada subject matter
            </v-chip>
          </div>
          <!-- <v-responsive>
            <v-card color="grey">
              <v-card-text>
                This card will always be 16:9 (unless you put more stuff in it)
              </v-card-text>
            </v-card>
          </v-responsive> -->
        </v-timeline-item>

        <v-timeline-item
          color="grey"
          icon="mdi-check"
          icon-color="white"
          small
        >
          <div class="text-caption font-weight-light font-italic">
            5/09/2022, 08.30
          </div>
          <div>
            Grasela Novita T.
            <v-icon
              right color="blue" size="15px"
              class="ml-n1 mt-n1"
            >
              mdi-check-decagram
            </v-icon>
          </div>
          <v-chip
            label
          >
            Merespon ticket
          </v-chip>
        </v-timeline-item>

        <v-timeline-item
          color="grey"
          icon="mdi-check"
          icon-color="white"
          small
        >
          <div class="text-caption font-weight-light font-italic">
            5/09/2022, 08.30
          </div>
          <div>
            Pengunjung
          </div>
          <v-chip
            label
          >
            Ticket berhasil dibuat
          </v-chip>
        </v-timeline-item>
      </v-timeline>
    </v-card-text>
  </v-card>
</template>

<script>
export default {

}
</script>
