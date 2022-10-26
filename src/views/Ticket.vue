<template>
  <v-main>
    <v-container>
      <v-form
        ref="form"
        v-model="valid"
        lazy-validation
        @submit.prevent="validate"
      >
        <v-row>
          <v-col
            cols="12"
            md="4"
          >
            <div class="ticket">
              <h2>Request new Ticket here</h2>
            </div>
          </v-col>
        </v-row>
        <v-row>
          <v-col
            cols="12"
            md="6"
          >
            <v-text-field
              v-model="name"
              :counter="25"
              :rules="nameRules"
              label="Nama Lengkap"
              prepend-icon="mdi-face-man"
              required
            ></v-text-field>
          </v-col>

          <v-col
            cols="12"
            md="6"
          >
            <v-text-field
              v-model="nohp"
              :rules="nohpRules"
              :counter="12"
              type="number"
              label="Nomor Whatsapp"
              prepend-icon="mdi-cellphone-check"
              @keypress="numberOnly"
              required
            ></v-text-field>
          </v-col>

          <v-col
            cols="12"
            md="6"
          >
            <v-select
              v-model="select"
              :items="jobItems"
              item-text="state"
              item-value="val"
              :rules="[v => !!v || 'Pekerjaan harus terisi']"
              label="Pekerjaan"
              prepend-icon="mdi-briefcase"
              required
            ></v-select>
          </v-col>

          <v-col
            cols="12"
            md="6"
          >
            <v-text-field
              v-model="institution"
              :rules="institutionRules"
              label="Asal Instansi/Universitas/Sekolah"
              :counter="150"
              prepend-icon="mdi-home-map-marker"
              required
            ></v-text-field>
          </v-col>

          <v-col
            cols="12"
          >
            <v-textarea
              v-model="necessity"
              :rules="necessityRules"
              :counter="500"
              label="Keperluan"
              rows="3"
              prepend-icon="mdi-comment"
              hint="(silakan jelaskan secara rinci)"
            ></v-textarea>
          </v-col>
        </v-row>
        <p class="text-overline">Pernyataan *)</p>
        <p class="text-caption">Apakah Anda setuju dengan syarat dan ketentuan yang berlaku dalam standar pelayanan ini serta bersedia untuk dihubungi kembali terkait survei kepuasan data yang dilakukan oleh BPS.</p>
        <v-checkbox
          v-model="checkbox"
          :rules="[v => !!v || 'You must agree to continue!']"
          label="Apakah Anda bersedia?"
          required
        ></v-checkbox>

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
  data: () => ({
    valid: true,
    name: '',
    nameRules: [
      v => !!v || 'Nama lengkap harus diisi',
      v => (v && v.length <= 25) || 'Name must be less than 25 characters'
    ],
    nohp: '',
    nohpRules: [
      v => !!v || 'Nomor Whatsapp harus diisi',
      v => (v && v.length <= 12) || 'Nomor whatsapp must be less than 12 characters'
    ],
    select: null,
    jobItems: [
      { state: 'ASN/PNS/TNI/POLRI', val: 'ASN/PNS/TNI/POLRI' },
      { state: 'Karyawan Swasta', val: 'Karyawan Swasta' },
      { state: 'Wiraswasta', val: 'Wiraswasta' },
      { state: 'Mahasiswa', val: 'Mahasiswa' },
      { state: 'Siswa (SMP/SMA)', val: 'Siswa (SMP/SMA)' },
      { state: 'Lainnya', val: 'Lainnya' }
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
      this.$refs.form.validate()
      const vm = this // `this` cannot be accessed inside .then .catch or .finnaly. So, we need helper in this case we named it 'vm'
      //  for baseUrl checkout file main.js in root dir
      axios.post('tickets', {
        name: this.name,
        nohp: this.nohp,
        job: this.select,
        institution: this.institution,
        necessity: this.necessity,
        bersedia: this.checkbox,
        status: 0
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
    },
    numberOnly (evt) {
      evt = (evt) || window.event
      var charCode = (evt.which) ? evt.which : evt.keyCode
      if ((charCode > 31 && (charCode < 48 || charCode > 57)) && charCode !== 46) {
        evt.preventDefault()
      } else {
        return true
      }
    }
  }
}
</script>
