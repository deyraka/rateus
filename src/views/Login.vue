<template>
  <v-main>
    <v-container>
      <v-layout align-center justify-center>
        <v-card
          class="mx-auto elevation-12 rounded-xl"
          max-width="350"
        >
          <!-- <v-img
            class="white--text align-end"
            max-height="150"
            src="https://images.pexels.com/photos/9821386/pexels-photo-9821386.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
          >
            <v-card-title class="d-flex justify-end black--text">Rate Us</v-card-title>
            <v-card-subtitle class="d-flex justify-end black--text">(Aplikasi Penilaian Pelayanan)</v-card-subtitle>
          </v-img> -->
          <Header />
          <v-card-text class="text--primary">
            <v-form>
                <v-text-field
                  v-model="email"
                  :rules="emailRules"
                  prepend-icon="mdi-account"
                  name="login"
                  label="Email"
                  type="text"
                  placeholder="(email bps, tanpa `@bps.go.id`)"
                  @keydown.enter="login()"
                ></v-text-field>
                <v-text-field
                  v-model="password"
                  :rules="passwordRules"
                  id="password"
                  prepend-icon="mdi-lock"
                  name="password"
                  label="Password"
                  type="password"
                  @keydown.enter="login()"
                ></v-text-field>
            </v-form>
            <p class="text-lowercase text-caption">forgot password? <a href="#" class="white--text">click here</a></p>
          </v-card-text>
          <v-card-actions class="d-flex justify-center">
            <v-btn
              color="red lighten-3"
              class="black--text"
              :disabled = isDisabled
              @click="login()"
            >
            <span v-if="!isLoading">
                <v-icon left>
                  mdi-login-variant
                </v-icon>
                Login
            </span>
            <v-progress-circular v-if="isLoading" indeterminate color="black"></v-progress-circular>

            </v-btn>
          </v-card-actions>
          <v-card-actions class="d-flex justify-center mb-6">
            <v-btn
              color="blue lighten-3"
              class="black--text"
              :disabled = isDisabled
              @click="loginSSO()"
            >

              <span v-if="!isLoading">
                <v-icon left>
                  mdi-login-variant
                </v-icon>
                Login SSO
              </span>
              <v-progress-circular v-if="isLoadingSSO" indeterminate color="black"></v-progress-circular>

            </v-btn>
          </v-card-actions>
        </v-card>
      </v-layout>
      <v-snackbar
      v-model="varSnackbar"
      color="red darken-4"
    >
      Gagal login! Silahkan hubungi Admin.

      <template v-slot:action="{ attrs }">
        <v-btn
          color="white"
          text
          v-bind="attrs"
          @click="varSnackbar = false"
        >
          Tutup
        </v-btn>
      </template>
    </v-snackbar>
    </v-container>
  </v-main>
</template>

<script>
import Header from '../components/Header.vue'
import axios from 'axios'

export default {
  name: 'Login',
  components: {
    Header
  },
  data: () => ({
    email: '',
    emailRules: [
      v => !!v || 'E-mail is required'
    ],
    password: '',
    passwordRules: [
      v => !!v || 'Password is required'
    ],
    username: '',
    session: '',
    isLoading: false,
    isLoadingSSO: false,
    isDisabled: false,
    varSnackbar: false
  }),
  mounted () {
    const params = new URLSearchParams(window.location.search)
    this.username = params.get('username')
    this.session = params.get('session')
    if (this.username !== null && this.session !== null) {
      this.isLoadingSSO = true
      this.isDisabled = true
      const username = this.username

      axios.post('verifySSO', {
        username: username,
        session: this.session
      })
        .then((responseSSO) => {
          // console.log(responseSSO)
          if (responseSSO.data.success) {
            axios.post('loginSSO', {
              username: username
            })
              .then((response) => {
                if (response.status === 200) {
                  console.log(response)
                  this.$store.dispatch('userAuth/renewUserInfo',
                    {
                      name: response.data.name,
                      id: response.data.user_id
                    }
                  )
                  // this.$store.dispatch('renewLoginStatus', 'true')
                  this.$store.dispatch('userAuth/renewToken', response.data.access_token)
                  this.$router.push({
                    name: 'list-guest'
                    // params: { keyword: this.form.search },
                  })
                }
              })
              .catch((error) => {
                console.log(error)
                this.varSnackbar = true
              })
              .finally(() => {})
          } else {
            console.log(responseSSO.data)
            this.varSnackbar = true
          }
        })
        .catch((error) => {
          console.log(error)
          this.varSnackbar = true
        })
        .finally(() => {
          this.isLoadingSSO = false
          this.isDisabled = false
        })
    }

    // console.log(this.username)
  },

  methods: {
    loginSSO () {
      this.isLoadingSSO = true
      this.isDisabled = true
      // CHANGE THIS
      // window.location.href = 'https://webapps.bps.go.id/kalteng/auth/api/authenticate?link_app=https://tiket.bpskalteng.id/auth/login'
      window.location.href = 'https://webapps.bps.go.id/kalteng/auth/api/authenticate?link_app=10.62.6.180:8080/auth/login'
    },
    login () {
      const vm = this
      this.isLoading = true
      this.isDisabled = true
      //  for baseUrl checkout file main.js in root dir
      axios.post('login', {
        email: this.email + '@bps.go.id',
        password: this.password
      })
        .then(function (response) {
          if (response.status === 200) {
            console.log(response)
            vm.$store.dispatch('userAuth/renewUserInfo',
              {
                name: response.data.name,
                id: response.data.user_id
              }
            )
            // vm.$store.dispatch('renewLoginStatus', 'true')
            vm.$store.dispatch('userAuth/renewToken', response.data.access_token)
            vm.$router.push({
              name: 'list-guest'
              // params: { keyword: this.form.search },
            })
          }
        })
        .catch(function (error) {
          console.log(error)
          vm.varSnackbar = true
          vm.isLoading = false
          vm.isDisabled = false
        })
        .finally(function () {
          vm.isLoading = false
          vm.isDisabled = false
        })
    }
  }

}
</script>
