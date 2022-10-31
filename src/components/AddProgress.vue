<template>
  <v-main>
    <v-container>
      <v-form
        ref="form"
        v-model="valid"
        lazy-validation
      >
        <v-row>
          <v-col
            cols="12"
            md="12"
          >
            <v-text-field
              v-model="note"
              :counter="100"
              :rules="noteRules"
              label="Keterangan"
              prepend-icon="mdi-text"
              required
            ></v-text-field>
          </v-col>
        </v-row>
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
      </v-form>
    </v-container>
  </v-main>
</template>

<script>
import axios from 'axios'

export default {
  name: 'AddProgress',
  props: {
    noticket: String
  },
  data: () => ({
    valid: true,
    note: '',
    noteRules: [
      v => !!v || 'Keterangan harus diisi',
      v => (v && v.length <= 100) || 'Name must be less than 100 characters'
    ]
  }),

  methods: {
    validate () {
      // this.$refs.form.validate()
      const vm = this // `this` cannot be accessed inside .then .catch or .finnaly. So, we need helper in this case we named it 'vm'
      //  for baseUrl checkout file main.js in root dir
      axios.post('progresslogs', {
        ticket_id: this.noticket,
        user_id: this.$store.getters['userAuth/activeUserId'],
        note: this.note
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
    },
    reset () {
      this.$refs.form.reset()
    },
    resetValidation () {
      this.$refs.form.resetValidation()
    }
  }
}
</script>
