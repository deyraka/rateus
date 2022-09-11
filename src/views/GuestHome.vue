<template>
  <v-container
    class="justify-center"
  >
    <v-row>
      <v-col
          cols="12"
          sm="6"
          md="4"
        >
          <v-text-field
            label="Lacak Ticket Anda disini"
            filled
            rounded
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
  </v-container>
</template>

<script>
export default {

}
</script>
