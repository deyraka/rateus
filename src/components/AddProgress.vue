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
              @keydown.enter="validate"
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
      // alert(this.$store.getters['userAuth/activeToken'])
      axios.post('progresslogs', {
        ticket_id: this.noticket,
        user_id: this.$store.getters['userAuth/activeUserId'],
        note: this.note
      },
      { headers: { Authorization: 'Bearer ' + this.$store.getters['userAuth/activeToken'] } }
      )
        .then(function (response) {
          if (response.status === 200) {
<<<<<<< HEAD
            // console.log(response)
=======
            console.log(response)
>>>>>>> master
            // change AddProgressModal.value in parent Component using $emit
            vm.$emit('close-progress', false)
          }
        })
        .catch(function (error) {
          console.log(error)
        })
        .finally(function () {
<<<<<<< HEAD
          vm.note = ''

=======
>>>>>>> master
          /* vm.$router.push({
            name: 'guesthome'
          }) */
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
