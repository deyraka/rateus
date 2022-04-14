<template>
  <v-app>
    <v-main app class="grey lighten-4 d-flex align-center">
      <v-container>
        <v-layout align-center justify-center>
          <v-card
            class="mx-auto elevation-12 rounded-lg"
          >
            <v-img
              class="white--text align-end"
              max-height="150"
              src="https://images.pexels.com/photos/9821386/pexels-photo-9821386.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
            >
              <v-card-title class="d-flex justify-end black--text">Rate Us</v-card-title>
              <v-card-subtitle class="d-flex justify-end black--text">(Aplikasi Penilaian Pelayanan)</v-card-subtitle>
            </v-img>
            <AppNavigation />
            <v-card-text class="text--primary">
              <router-view />
            </v-card-text>
          </v-card>
        </v-layout>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import AppNavigation from '../components/AppNavigation.vue'

export default {
  name: 'AppLayout',
  components: {
    AppNavigation
  }
}
</script>
