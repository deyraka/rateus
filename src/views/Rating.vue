<template>
  <v-main>
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
              label="Kritik dan Saran"
              rows="3"
              prepend-icon="mdi-comment"
              hint="(Masukan Anda sangat berarti bagi kami)"
            ></v-textarea>
          </v-col>
          <v-col
            cols="12"
            md="8"
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
    rating: 0,
    advice: '',
    adviceRules: [
      v => !!v || 'Keperluan is required',
      v => (v && v.length <= 500) || 'Kritik dan saran must be less than 500 characters'
    ]
    // checkbox: false
  }),

  methods: {
    validate () {
      if (this.rating === '') {
        alert('Tolong isi rating untuk menilai kualitas layanan kami')
      } else {
        const vm = this // `this` cannot be accessed inside .then .catch or .finnaly. So, we need helper in this case we named it 'vm'
        //  for baseUrl checkout file main.js in root dir
        axios.post('ratings', {
          ticket_id: this.noticket,
          star: this.rating,
          comment: this.advice
        })
          .then(function (response) {
            if (response.status === 200) {
              console.log(response)
            }
          })
          .catch(function (error) {
            console.log(error)
          })
          .finally(function () {
            vm.$router.push({
              name: 'guesthome'
            })
          })
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
