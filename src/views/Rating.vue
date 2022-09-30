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
              v-model="necessity"
              :rules="necessityRules"
              :counter="500"
              label="Saran / Masukan"
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
export default {
  name: 'Rating',
  props: ['noticket'],
  data: () => ({
    justify: [
      'start',
      'center',
      'end',
      'space-around',
      'space-between'
    ],
    valid: true,
    name: '',
    nameRules: [
      v => !!v || 'Nama lengkap harus diisi',
      v => (v && v.length <= 25) || 'Name must be less than 25 characters'
    ],
    rating: 0,
    select: null,
    jobItems: [
      'ASN/PNS/TNI/POLRI',
      'Karyawan Swasta',
      'Wiraswasta',
      'Mahasiswa',
      'Siswa (SMP/SMA)',
      'Lainnya'
    ],
    institution: '',
    institutionRules: [
      v => !!v || 'Asal is required',
      v => (v && v.length <= 150) || 'Keperluan must be less than 150 characters'
    ],
    necessity: '',
    necessityRules: [
      v => !!v || 'Keperluan is required',
      v => (v && v.length <= 500) || 'Keperluan must be less than 500 characters'
    ],
    checkbox: false
  }),

  methods: {
    validate () {
      if (this.rating === '') {
        alert('Tolong isi rating untuk menilai kualitas layanan kami')
      }
      this.$refs.form.validate()
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
