<template>
  <v-app>
    <v-main app class="grey lighten-4 d-flex">
      <v-container>
        <v-layout align-center justify-center>
          <v-card
            class="mx-auto elevation-12 rounded-lg"
          >
            <Header />
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
import Header from '../components/Header.vue'

export default {
  name: 'GuestLayout',
  components: {
    Header
  }
}
</script>
