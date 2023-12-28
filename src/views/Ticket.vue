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
            md="12"
          >
            <div class="ticket">
              <h2>Buat tiket</h2>
              <!-- <h4>Silahkan lakukan pendaftaran</h4> -->
            </div>
          </v-col>
        </v-row>
        <v-row>
          <v-col
            cols="12"
            md="12"
          >
            <v-text-field
              v-model="name"
              :counter="25"
              label="Nama Lengkap"
              prepend-icon="mdi-face-man"
              required
            ></v-text-field>
          </v-col>
          <v-col
            cols="12"
            md="6"
          >
            <v-select
                v-model="jenisKelamin"
                :items="jenisKelaminItem"
                item-text="state"
                item-value="val"
                :rules="[v => !!v || 'Jenis Kelamin harus terisi']"
                label="Jenis Kelamin"
                prepend-icon="mdi-gender-male-female"
                required
              ></v-select>
          </v-col>

          <v-col
            cols="12"
            md="6"
          >
          <v-text-field
              v-model="tahunLahir"
              label="Tahun Lahir"
              :counter="4"
              :maxlength="4"
              prepend-icon="mdi-account-clock-outline"
              :rules="[validateTahunLahir]"
              required
            ></v-text-field>
          </v-col>

          <v-col
            cols="12"
            md="6"
          >
          <v-text-field
              v-model="email"
              label="E-mail"
              :counter="150"
              :rules="[v => !!v || 'Email harus terisi', v => /.+@.+\..+/.test(v) || 'Format email tidak valid']"
              :error-messages="errorMessages.email ? [errorMessages.email] : []"
              @input="clearError('email')"
              prepend-icon="mdi-email-outline"
              required
            ></v-text-field>
          </v-col>

          <v-col
            cols="12"
            md="6"
          >
          <v-text-field
              v-model="phoneNumber"
                :rules="nohpRules"
                :counter="14"
                @keypress="numberOnly"
              label="No Handphone (WhatsApp)"
              prepend-icon="mdi-whatsapp"
              required
            ></v-text-field>
          </v-col>

          <v-col
            cols="12"
            md="6"
          >
            <v-select
                v-model="job"
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
            <v-select
                v-model="pendidikan"
                :items="pendidikanItems"
                item-text="state"
                item-value="val"
                :rules="[v => !!v || 'Pendidikan harus terisi']"
                label="Pendidikan Terakhir"
                prepend-icon="mdi-home-map-marker"
                required
              ></v-select>
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
    <!-- <v-container>
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
    </v-container> -->
  </v-main>
</template>

<script>
import axios from 'axios'
function isValidPhoneNumber (value) {
  const phoneNumberRegex = /^(?:\+62|0)[0-9]{9,13}$/ // Format: +62 or 0 followed by 9 to 13 digits
  return phoneNumberRegex.test(value)
}
export default {
  data: () => ({
    // valid: true,
    // name: '',
    // nameRules: [
    //   v => !!v || 'Nama lengkap harus diisi',
    //   v => (v && v.length <= 25) || 'Name must be less than 25 characters'
    // ],
    // nohp: '',
    // nohpRules: [
    //   v => !!v || 'Nomor Whatsapp harus diisi',
    //   v => (v && v.length <= 12) || 'Nomor whatsapp must be less than 12 characters'
    // ],
    // select: null,
    // jobItems: [
    //   { state: 'ASN/PNS/TNI/POLRI', val: 'ASN/PNS/TNI/POLRI' },
    //   { state: 'Karyawan Swasta', val: 'Karyawan Swasta' },
    //   { state: 'Wiraswasta', val: 'Wiraswasta' },
    //   { state: 'Mahasiswa', val: 'Mahasiswa' },
    //   { state: 'Siswa (SMP/SMA)', val: 'Siswa (SMP/SMA)' },
    //   { state: 'Lainnya', val: 'Lainnya' }
    // ],
    // institution: '',
    // institutionRules: [
    //   v => !!v || 'Asal is required',
    //   v => (v && v.length <= 150) || 'Keperluan must be less than 150 characters'
    // ],
    // necessity: '',
    // necessityRules: [
    //   v => !!v || 'Keperluan is required',
    //   v => (v && v.length <= 500) || 'Keperluan must be less than 500 characters'
    // ],
    // checkbox: false
    valid: true,
    checkbox: '',
    marker: true,
    statNumber: null,
    foundPhoneNumber: null,
    selectedCustomer: null,
    searchResults: [],
    isDropdownDisabled: false,
    menu: false,
    name: '',
    email: '',
    job: '',
    pendidikan: '',
    tahunLahir: '',
    hasOldData: true,
    necessity: '',
    jenisKelamin: '',
    phoneNumber: '',
    customer_id: '',
    errorMessages: {
      email: null
      // Tambahkan properti lainnya sesuai kebutuhan
    },
    jobItems: [
      { state: 'Aparatur Sipil Negara', val: 'Aparatur Sipil Negara' },
      { state: 'Karyawan Swasta', val: 'Karyawan Swasta' },
      { state: 'Wiraswasta', val: 'Wiraswasta' },
      { state: 'Pelajar/Mahasiswa', val: 'Pelajar/Mahasiswa' },
      { state: 'Peneliti', val: 'Peneliti' },
      { state: 'Lembaga Pendidikan', val: 'Lembaga Pendidikan' },
      { state: 'Lainnya', val: 'Lainnya' }
    ],

    pendidikanItems: [
      { state: '<= SLTA', val: '1' },
      { state: 'D1/D2/D3', val: '2' },
      { state: 'D4/D1', val: '3' },
      { state: 'S2/S3', val: '4' }
    ],
    jenisKelaminItem: [
      { state: 'Laki-Laki', val: 'L' },
      { state: 'Perempuan', val: 'P' }
    ],
    nohpRules: [
      v => !!v || 'Nomor Whatsapp harus diisi',
      v => (v && v.length <= 14) || 'Nomor whatsapp must be less than 14 characters',
      v => isValidPhoneNumber(v) || 'Format Nomor Handphone tidak valid'

    ],
    // isSearchDisabled: true,
    necessityRules: [
      v => !!v || 'Keperluan is required',
      v => (v && v.length <= 500) || 'Keperluan must be less than 500 characters'
    ]
  }),

  methods: {
    submitFunction () {
      this.marker = !this.marker
    },
    validateTahunLahir (value) {
      if (!value) return 'Tahun Lahir harus terisi'

      const parsedYear = parseInt(value, 10)

      if (isNaN(parsedYear)) {
        return 'Format tahun tidak valid'
      }

      const currentYear = new Date().getFullYear()
      const minYear = 1940 // Ganti sesuai kebutuhan
      const maxYear = currentYear

      if (parsedYear < minYear || parsedYear > maxYear) {
        return `Masukkan tahun antara ${minYear} dan ${maxYear}`
      }

      // Tambahkan aturan lain sesuai kebutuhan

      return true // Validasi berhasil
    },
    clearError (fieldName) {
      this.errorMessages[fieldName] = null
    },
    numberOnly (evt) {
      evt = (evt) || window.event
      var charCode = (evt.which) ? evt.which : evt.keyCode
      if ((charCode > 31 && (charCode < 48 || charCode > 57)) && charCode !== 46) {
        evt.preventDefault()
      } else {
        return true
      }
    },
    reset () {
      this.$refs.form.resetValidation()
      // this.$refs.form.reset()

      this.phoneNumber = ''
      this.jenisKelamin = ''
      this.tahunLahir = ''
      this.email = ''
      this.job = ''
      this.necessity = ''
      this.phoneNumber = ''
      this.pendidikan = ''
      this.pekerjaan = ''
      this.checkbox = ''
    },
    validate () {
      this.$refs.form.validate()
      const vm = this
      // console.log(this.tahunLahir)
      axios.post('register-customer', {
        nohp: this.phoneNumber,
        name: this.name,
        email: this.email,
        jeniskelamin: this.jenisKelamin,
        tahunlahir: this.tahunLahir,
        bersedia: this.checkbox,
        pendidikan: this.pendidikan,
        necessity: this.necessity,
        editable: '0',
        job: this.job
      })
        .then((response) => {
          if (response.status === 200) {
            // console.log(response)
            this.phoneNumber = ''
            this.jenisKelamin = ''
            this.tahunLahir = ''
            this.email = ''
            this.job = ''
            this.necessity = ''
            this.phoneNumber = ''
            this.pendidikan = ''
            this.pekerjaan = ''
            this.checkbox = ''
            vm.$router.push({
              name: 'tracking',
              params: { noticket: response.data.noticket }
            })
          }
        })
        .catch((error) => {
          if (error.response && error.response.data && error.response.data.email) {
            // Terdapat kesalahan validasi email
            // this.errorMessages.email = error.response.data.email[0]
            this.errorMessages.email = 'Email sudah digunakan'
          } else {
            // Kesalahan lainnya
            console.log(error.response)
          }
        })
      // this.$refs.form.validate()
      // const vm = this // `this` cannot be accessed inside .then .catch or .finnaly. So, we need helper in this case we named it 'vm'
      // //  for baseUrl checkout file main.js in root dir
      // axios.post('tickets', {
      //   name: this.name,
      //   nohp: this.nohp,
      //   job: this.select,
      //   institution: this.institution,
      //   necessity: this.necessity,
      //   bersedia: this.checkbox,
      //   status: 0
      // })
      //   .then(function (response) {
      //     if (response.status === 200) {
      //       console.log(response)
      //     }
      //   })
      //   .catch(function (error) {
      //     console.log(error)
      //   })
      //   .finally(function () {
      //     vm.$router.push({
      //       name: 'guesthome'
      //     })
      //   })
    }
    // reset () {
    //   this.$refs.form.reset()
    // },
    // resetValidation () {
    //   this.$refs.form.resetValidation()
    // },

  }
}
</script>
