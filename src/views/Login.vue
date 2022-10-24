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
                  prepend-icon="mdi-account"
                  name="login"
                  label="Email"
                  type="text"
                ></v-text-field>
                <v-text-field
                  v-model="password"
                  id="password"
                  prepend-icon="mdi-lock"
                  name="password"
                  label="Password"
                  type="password"
                ></v-text-field>
            </v-form>
            <p class="text-lowercase text-caption">forgot password? <a href="#" class="white--text">click here</a></p>
          </v-card-text>
          <v-card-actions class="d-flex justify-center mb-6">
            <v-btn
              color="red lighten-3"
              class="black--text"
              @click="login()"
            >
              <v-icon left>
                mdi-login-variant
              </v-icon>
              Login
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-layout>
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
    password: ''
  }),

  methods: {
    login () {
      const vm = this
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
        })
        .finally(function () {})
    }
  }

}
</script>
