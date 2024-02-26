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
      <span>Hi, {{ $store.state.userAuth.user.name }}</span>
      <v-spacer></v-spacer>
      <v-toolbar-title class="text-h6 white--text pl-0">
        <v-btn
          depressed
          color="red lighten-4"
          class="black--text text-capitalize"
          to="/h/ticket"
          title="Buka Ticket"
        >
          <v-icon>
            mdi-plus
          </v-icon>
        </v-btn>
        <v-btn
          depressed
          color="green lighten-4"
          @click="sinkron"
          to="/h/list-guest"
          :loading="loading"
          class="black--text text-capitalize ml-2"
          title="Sinkronisasi"
        >
          <v-icon>
            mdi-sync
          </v-icon>
        </v-btn>

      </v-toolbar-title>
      <v-btn
        class="ml-2"
        color="white"
        icon
        @click="logout()"
        title="Log out"
      >
        <v-icon>mdi-power</v-icon>
      </v-btn>
    </v-app-bar>
</template>

<script>
import axios from 'axios'
axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest'
axios.defaults.headers.common['Content-Type'] = 'application/json'

export default {
  name: 'AppNavigation',
  data () {
    return {
      // cookiesDialog: false,
      // cookies: '',
      // token: '',
      loading: false,

      // isUserLogedIn: [],
      tokens: this.$store.getters['userAuth/activeToken'],
      items: [
        { title: 'Rank Board', icon: 'mdi-home', url: '/h/home' },
        { title: 'Daftar Pengunjung', icon: 'mdi-list-status', url: '/h/list-guest' },
        { title: 'Pengaturan Pengguna', icon: 'mdi-account-cog', url: '/h/pengguna' },
        { title: 'Profil', icon: 'mdi-account', url: '/h/profile' },
        { title: 'Antrian Admin', icon: 'mdi-account-lock', url: '/h/queue' },
        { title: 'Antrian Pengunjung', icon: 'mdi-account-supervisor', url: '/antri' },
        { title: 'About', icon: 'mdi-information', url: '/h/about' }
      ]
    }
  },

  // created () {
  //   return (this.userLogedIn = this.$store.getters.activeUser)
  // },

  methods: {
    logout () {
      const vm = this
      var config = {
        method: 'post',
        url: 'logout',
        headers: {
          Authorization: 'Bearer ' + this.tokens
        }
      }
      // axios.post('logout', {
      //   headers: { 'Authorization': 'Bearer $(this.tokens)' }
      // })
      axios(config)
        .then(function (response) {
          if (response.status === 200) {
            console.log(response)
            // vm.$store.dispatch('userAuth/logout')
            // vm.$router.push({
            //   name: 'login'
            //   // params: { keyword: this.form.search },
            // })
          }
        })
        .catch(function (error) {
          console.log(error)
          console.log(config)
        })
        .finally(function () {
          vm.$store.dispatch('userAuth/logout')
          vm.$router.push({
            name: 'login'
          })
        })
    },
    // ubahToken () {
    //   // console.log(this.cookies)
    //   // console.log(this.token)
    //   this.loading = true
    //   const editConfig = {
    //     // method: 'post',
    //     // url: 'getcookie',
    //     // cookies: this.cookies,
    //     // token: this.token,
    //     headers: {
    //       Authorization: 'Bearer ' + this.$store.getters['userAuth/activeToken']
    //     }
    //   }

    //   const payload = {
    //     cookies: this.cookies,
    //     token: this.token
    //   }

    //   axios.post('getcookie', payload, editConfig)
    //     .then((responseToken) => {
    //       if (responseToken.data.stats === 200) {
    //         const today = new Date()
    //         const year = today.getFullYear()
    //         const month = String(today.getMonth() + 1).padStart(2, '0')
    //         const day = String(today.getDate()).padStart(2, '0')
    //         // const formattedDate = `${year}-${month}-${day}`

    //         const config = {
    //           method: 'get',
    //           url: 'getcookie',
    //           headers: {
    //             Authorization: 'Bearer ' + this.$store.getters['userAuth/activeToken']
    //           }
    //         }

    //         axios(config)
    //           .then((response) => {
    //             const cookieWeb = response.data.data.cookie
    //             const tokenWeb = response.data.data.token

    //             const perpustakaanConfig = {
    //               method: 'post',
    //               url: 'fetchPerpustakaan',
    //               data: {
    //                 cookiesWeb: cookieWeb,
    //                 token: tokenWeb,
    //                 start: formattedDate,
    //                 finish: formattedDate
    //               },
    //               headers: {
    //                 Authorization: 'Bearer ' + this.$store.getters['userAuth/activeToken']
    //               }
    //             }

    //             axios(perpustakaanConfig)
    //               .then((responseWeb) => {
    //                 if (responseWeb.status === 200) {
    //                   this.cookiesDialog = !this.cookiesDialog
    //                   console.log(responseWeb)
    //                 }
    //               })
    //               .catch((error) => {
    //                 this.cookiesDialog = !this.cookiesDialog
    //                 console.error('Error in fetchPerpustakaan:', error)
    //               })
    //               .finally(() => {
    //                 this.loading = false
    //               })
    //           })
    //           .catch((error) => {
    //             console.error('Error in getcookie:', error.message)
    //           })
    //           .finally(() => {
    //             this.loading = false
    //           })
    //       }
    //     })
    //     .catch((error) => {
    //       console.error('Error in menyimpan Cookie:', error.message)
    //       console.log('Response:', error.response)
    //     })
    //     .finally(() => {
    //       this.loading = false
    //     })
    // },
    sinkron () {
      try {
        this.loading = true
        const today = new Date()
        const year = today.getFullYear()
        const month = String(today.getMonth() + 1).padStart(2, '0')
        const day = String(today.getDate()).padStart(2, '0')

        const perpustakaanConfig = {
          method: 'post',
          url: 'fetchPerpustakaan',
          data: {
            year: year,
            month: month,
            day: day
          },
          headers: {
            Authorization: 'Bearer ' + this.$store.getters['userAuth/activeToken']
          }
        }

        axios(perpustakaanConfig)
          .then((responseWeb) => {
            if (responseWeb.status === 200) {
              console.log(responseWeb)
            }
          })
          .catch((error) => {
            // this.cookiesDialog = !this.cookiesDialog
            console.error('Error in fetchPerpustakaan:', error)
          })
          .finally(() => {
            this.loading = false
          })
      } catch (error) {
        console.error('Error in sinkron:', error)
      } finally {
        this.loading = false // Set loading to false when the request is completed
      }
      // try {
      //   this.loading = true
      //   const today = new Date()
      //   const year = today.getFullYear()
      //   const month = String(today.getMonth() + 1).padStart(2, '0')
      //   const day = String(today.getDate()).padStart(2, '0')
      //   const formattedDate = `${year}-${month}-${day}`

      //   const config = {
      //     method: 'get',
      //     url: 'getcookie',
      //     headers: {
      //       Authorization: 'Bearer ' + this.$store.getters['userAuth/activeToken']
      //     }
      //   }

      //   axios(config)
      //     .then((response) => {
      //       const cookieWeb = response.data.data.cookie
      //       const tokenWeb = response.data.data.token

      //       const perpustakaanConfig = {
      //         method: 'post',
      //         url: 'fetchPerpustakaan',
      //         data: {
      //           cookiesWeb: cookieWeb,
      //           token: tokenWeb,
      //           start: formattedDate,
      //           finish: formattedDate
      //         },
      //         headers: {
      //           Authorization: 'Bearer ' + this.$store.getters['userAuth/activeToken']
      //         }
      //       }

      //       axios(perpustakaanConfig)
      //         .then((responseWeb) => {
      //           if (responseWeb.status === 200) {
      //             console.log(responseWeb)
      //           }
      //         })
      //         .catch((error) => {
      //           this.cookiesDialog = !this.cookiesDialog
      //           console.error('Error in fetchPerpustakaan:', error)
      //         })
      //         .finally(() => {
      //           this.loading = false
      //         })
      //     })
      //     .catch((error) => {
      //       this.cookiesDialog = !this.cookiesDialog
      //       console.error('Error in getcookie:', error)
      //     })
      //     .finally(() => {
      //       this.loading = false
      //     })
      // } catch (error) {
      //   console.error('Error in sinkron:', error)
      // } finally {
      //   this.loading = false // Set loading to false when the request is completed
      // }
    }

  }

}
</script>

<style scoped>
</style>
