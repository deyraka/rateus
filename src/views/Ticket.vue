<template>
  <v-main>
    <v-container>
      <div class="ticket">
        <h1>Request new Ticket here</h1>
      </div>
      <form>
        <v-text-field
          v-model="name"
          :error-messages="nameErrors"
          :counter="10"
          label="Name"
          required
          @input="$v.name.$touch()"
          @blur="$v.name.$touch()"
        ></v-text-field>
        <v-text-field
          v-model="email"
          :error-messages="emailErrors"
          label="E-mail"
          required
          @input="$v.email.$touch()"
          @blur="$v.email.$touch()"
        ></v-text-field>
        <v-select
          v-model="select"
          :items="items"
          :error-messages="selectErrors"
          label="Item"
          required
          @change="$v.select.$touch()"
          @blur="$v.select.$touch()"
        ></v-select>
        <v-checkbox
          v-model="checkbox"
          :error-messages="checkboxErrors"
          label="Saya bersedia dihubungi oleh BPS Provinsi Kalimantan Tengah untuk program ?"
          required
          @change="$v.checkbox.$touch()"
          @blur="$v.checkbox.$touch()"
        ></v-checkbox>

        <v-btn
          class="mr-4"
          @click="submit"
        >
          submit
        </v-btn>
        <v-btn @click="clear">
          clear
        </v-btn>
      </form>
    </v-container>
  </v-main>
</template>

<script>
import useVuelidate from '@vuelidate/core'
import { required, maxLength, email } from '@vuelidate/validators'

export default {
  setup () {
    return { v$: useVuelidate() }
  },
  validations: {
    name: { required, maxLength: maxLength(25) },
    email: { required, email },
    select: { required },
    checkbox: {
      checked (val) {
        return val
      }
    }
  },
  data: () => ({
    name: '',
    email: '',
    select: null,
    items: [
      'Konsultasi',
      'Permohonan Data'
    ],
    checkbox: false
  })
}
</script>
