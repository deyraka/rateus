<template>
  <!-- <v-container fill-height class="mx-auto">
      <v-row
        :align="center"
        :justify="center"
      >
        <v-col>
          <v-text-field
            cols="12" md="6"
            class="mx-auto"
            label="Lacak Ticket Anda disini"
            solo
            light
            filled
            dense
          ></v-text-field>
        </v-col>
        <v-col>
          <v-btn
            rounded
            color="primary"
            dark
            class="my-auto"
            to="tracking"
          >
            Cari
          </v-btn>
        </v-col>
      </v-row>
      <v-row>
        <p>belum memiliki ticket? Ajukan ticket baru!</p>
      </v-row>
      <v-row>
        <v-btn
          rounded
          color="success"
          dark
          class="my-auto"
          to="ticket"
        >
          Ajukan ticket baru
        </v-btn>
      </v-row>
  </v-container> -->
   <v-container fill-height align-content="space-between">
    <v-row
      justify="center"
    >
      <v-col cols="10" md="3">
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
      <p>belum memiliki ticket? Ajukan ticket baru!</p>
    </v-row>
    <v-row justify="center">
      <v-btn
        rounded
        color="#FFCDD2"
        light
        class="my-auto"
        to="ticket"
      >
        Ajukan ticket baru
      </v-btn>
    </v-row>
  </v-container>
</template>

<script>
export default {
  data: () => ({
    marker: true
  }),
  methods: {
    submitFunction () {
      this.marker = !this.marker
    }
  }
}
</script>
