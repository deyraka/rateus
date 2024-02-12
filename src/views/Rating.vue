<template>
  <v-main>
    <div v-if="loading" class="loading-overlay">
      <!-- Gaya CSS untuk loading screen -->
      <div class="loading-spinner"></div>
    </div>
    <v-container>
      <v-row>
        <v-col
          cols="12"
          md="12"
        >
          <div class="ticket">
            <h2>Give rate for ticket number : {{noticket}}</h2>
          </div>
        </v-col>
      </v-row>
      <v-form
        ref="form"
        v-model="valid"
        lazy-validation
      >
        <v-row justify="center" class="text-center">
          <v-col
            cols="12"
            md="8"
          >
            <v-rating
              v-model="rating"
              length="5"
              color="orange"
              background-color="orange lighten-3"
              large
              :readonly="readOnlyStat"
              half-increments
              hover
            ></v-rating>
            <div>
              <span class="font-weight-bold">
                ( {{ rating }} of 5)
              </span>
            </div>
          </v-col>
          <v-col
            cols="12"
            md="8"
          >
            <v-textarea
              v-model="advice"
              :rules="adviceRules"
              :counter="500"
              :readonly="readOnlyStat"
              label="Kritik dan Saran"
              rows="3"
              prepend-icon="mdi-comment"
              hint="(Masukan Anda sangat berarti bagi kami)"
            ></v-textarea>
          </v-col>
          <v-col v-if="!readOnlyStat"
            cols="12"
            md="12"
          >
            <v-btn
              :disabled="!valid"
              color="success"
              class="mr-4"
              @click="validate"
            >
              Kirim
            </v-btn>

            <v-btn
              color="error"
              class="mr-4"
              @click="reset"
            >
              Reset Isian
            </v-btn>
          </v-col>
          <v-col v-else cols="6">
            <div class="yellow-card">
              Anda sudah mengisi penilaian Ini
            </div>
          </v-col>
        </v-row>
      </v-form>
    </v-container>
  </v-main>
</template>

<script>
import axios from 'axios'

export default {
  name: 'Rating',
  props: ['noticket'],
  data: () => ({
    valid: true,
    readOnlyStat: false,
    loading: true,
    rating: 0,
    advice: '',
    adviceRules: [
      v => !!v || 'Kritik dan saran is required',
      v => (v && v.length <= 500) || 'Kritik dan saran must be less than 500 characters'
    ]
    // checkbox: false
  }),
  created () {
    const noTicket = this.$route.params.noticket

    this.loading = true
    // console.log(this.valid)
    axios.get('ratings/' + noTicket)
      .then((response) => {
        this.rating = response.data[0].star
        this.advice = response.data[0].comment
        this.readOnlyStat = true
        this.valid = false

        this.loading = false
        // console.log(this.valid)

        // if (response.data.total > 0) {
        //   this.varSnackbar = true
        // } else {
        //   window.open(`${process.env.BASE_URL}` + 'rating/' + encodeURI(noTicket))
        // }
      })
      .catch((errorLogs) => {
        // console.log(this.loading)
        this.loading = false
        console.log(this.loading)
        console.log(errorLogs)
      })
  },
  methods: {
    validate () {
      this.$refs.form.validate()
      if (!this.rating || !this.advice) {
        alert('Tolong isi rating dan kritik/saran untuk menilai kualitas layanan kami')
      } else {
        // const vm = this // `this` cannot be accessed inside .then .catch or .finnaly. So, we need helper in this case we named it 'vm'
        //  for baseUrl checkout file main.js in root dir
        axios.post('ratings', {
          ticket_id: this.noticket,
          star: this.rating,
          comment: this.advice
        })
          .then(function (response) {
            if (response.status === 200) {
              // console.log(response)
              window.close()
            }
          })
          .catch(function (error) {
            console.log(error)
          })
          // .finally(function () {
          //   vm.$router.push({
          //     name: 'guesthome'
          //   })
          // })
        // this.$refs.form.validate()
      }
    },
    reset () {
      this.rating = ''
      this.$refs.form.reset()
    },
    resetValidation () {
      this.$refs.form.resetValidation()
    }
  }
}
</script>

<style scoped>
.loading-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(255, 255, 255, 0.8); /* Warna latar belakang dengan transparansi */
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000; /* Pastikan di atas elemen-elemen lain */
}

.loading-spinner {
  border: 8px solid #f3f3f3; /* Warna latar belakang untuk spinner */
  border-top: 8px solid #3498db; /* Warna untuk spinner */
  border-radius: 50%;
  width: 50px;
  height: 50px;
  animation: spin 1s linear infinite; /* Animasi spinner */
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

.yellow-card {
    background-color:#f1c40f;
    color: black;
    padding: 20px;
    border-radius: 8px;
    text-align: center;
  }
</style>
