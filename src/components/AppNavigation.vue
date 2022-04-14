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
      <v-spacer></v-spacer>
      <v-toolbar-title class="text-h6 white--text pl-0">
        <v-btn
          depressed
          color="red lighten-3"
          class="black--text text-capitalize"
        >
          <v-icon left>
            mdi-plus
          </v-icon>
          Open Ticket
        </v-btn>
      </v-toolbar-title>
      <v-btn
        class="ml-2"
        color="white"
        icon
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
      items: [
        { title: 'Rank Board', icon: 'mdi-home', url: '/' },
        { title: 'Profil', icon: 'mdi-account', url: '#' },
        { title: 'About', icon: 'mdi-information', url: '/about' }
      ]
    }
  }
}
</script>

<style scoped>
</style>
