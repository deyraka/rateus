<template>
    <v-app-bar
      flat
      color="rgba(0, 0, 0, 0)"
    >
      <v-menu transition="scroll-y-transition">
        <template v-slot:activator="{ on, attrs }">
            <v-app-bar-nav-icon
              color="white"
              v-bind="attrs"
              v-on="on"
            ></v-app-bar-nav-icon>
        </template>
        <v-list>
          <v-list-item
            v-for="(item, index) in items"
            :key="index"
            :to="item.url"
            link
          >
            <v-list-item-icon><v-icon>{{ item.icon }}</v-icon></v-list-item-icon>
            <v-list-item-title v-text=item.title></v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
      <span>Hi, {{userLogedIn}}</span>
      <v-spacer></v-spacer>
      <v-toolbar-title class="text-h6 white--text pl-0">
        <v-btn
          depressed
          color="red lighten-4"
          class="black--text text-capitalize"
          to="/h/ticket"
        >
          <v-icon left>
            mdi-plus
          </v-icon>
          Buka Tiket
        </v-btn>
      </v-toolbar-title>
      <v-btn
        class="ml-2"
        color="white"
        icon
        to="/auth/login"
        title="Log out"
      >
        <v-icon>mdi-power</v-icon>
      </v-btn>
    </v-app-bar>
</template>

<script>
export default {
  name: 'AppNavigation',
  data () {
    return {
      userLogedIn: '',
      items: [
        { title: 'Rank Board', icon: 'mdi-home', url: '/h/home' },
        { title: 'Daftar Pengunjung', icon: 'mdi-list-status', url: '/h/list-guest' },
        { title: 'Profil', icon: 'mdi-account', url: '/h/profile' },
        { title: 'About', icon: 'mdi-information', url: '/h/about' }
      ]
    }
  },

  created () {
    return (this.userLogedIn = this.$store.getters.commonToken)
  }
}
</script>

<style scoped>
</style>
