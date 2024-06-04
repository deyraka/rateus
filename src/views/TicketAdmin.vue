<template>
  <v-container fill-height align-content="space-between">
    <v-row justify="center">
      <v-col cols="10" md="6">
        <v-menu v-model="menu" :close-on-content-click="false" transition="scale-transition" offset-y min-width="290px">
          <template v-slot:activator="{ on, attrs }">
            <v-text-field
              v-model="selectedCustomer"
              :items="searchResults"
              item-text="nama"
              item-value="id"
              label="Ketik Nama"
              solo
              rounded
              filled
              dense
              light
              outline
              background-color="white"
              prepend-inner-icon="mdi-ticket"
              @input="searchCustomer"
              v-bind="attrs"
              v-on="on"
            ></v-text-field>
          </template>
          <v-list v-if="searchResults.length > 0 && selectedCustomer !== ''">
            <v-list-item v-for="(item, index) in searchResults" :key="index" @click="selectCustomer(item)">
              <v-list-item-content>{{ item.nama }}</v-list-item-content>
            </v-list-item>
          </v-list>
        </v-menu>
      </v-col>
      <v-btn
        :disabled="isSearchDisabled"
        color="#81D4FA"
        class="ml-1 mt-3"
        small
        dark
        fab
        @click="searchByName"
      >
        <v-icon dark>
          mdi-magnify
        </v-icon>
      </v-btn>
    </v-row>
   <v-row v-if="statNumber===true">
     <v-container v-if="hasOldData===true">
     <v-form
       ref="form"
       v-model="valid"
       :lazy-validation="false"
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
             :counter="50"
             :readonly = "isNameReadOnly"
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
             v-model="email"
             :readonly = "isEmailReadOnly && isDropdownDisabled"
             label="E-mail"
             :counter="150"
             prepend-icon="mdi-email-outline"
             required
           ></v-text-field>
         </v-col>

         <v-col
           cols="12"
           md="6"
         >
           <!-- <v-text-field
             v-model="job"
             :counter="150"
             label="Pekerjaan"
             prepend-icon="mmdi-briefcase"
             required
           ></v-text-field> -->
           <v-select
              v-model="job"
              :readonly="isJobReadOnly && isDropdownDisabled"
              :items="jobItems"
              item-text="state"
              item-value="val"
              :rules="[v => !!v || 'Pekerjaan harus terisi']"
              label="Pekerjaan"
              prepend-icon="mdi-briefcase"
              required
            ></v-select>
         </v-col>

         <!-- new field {asal} since v2.1.0 -->
         <v-col
            cols="12"
            md="6"
          >
            <v-text-field
              v-model="asal"
              :counter="200"
              :rules="asalRules"
              label="Asal Instansi/Sekolah/Universitas"
              prepend-icon="mdi-home"
              required
            ></v-text-field>
          </v-col>

         <v-col
           cols="12"
           md="6"
         >
           <!-- <v-text-field
             v-model="pendidikan"
             label="Pendidikan Terakhir"
             :counter="150"
             prepend-icon="mdi-home-map-marker"
             required
           ></v-text-field> -->
           <v-select
              v-model="pendidikan"
              :readonly="isPendidikanReadOnly  && isDropdownDisabled"
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
   <v-container v-else>
    <v-form
       ref="form"
       v-model="valid"
       :lazy-validation="false"
       @submit.prevent="validate"
     >
       <v-row>
         <v-col
           cols="12"
           md="12"
         >
           <div class="ticket">
             <h2>Nama "{{ selectedCustomer }}" belum terdaftar.</h2>
             <h4>Silahkan lakukan pendaftaran</h4>
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
             :counter="50"
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

         <!-- new field {asal} since v2.1.0 -->
         <v-col
            cols="12"
            md="6"
          >
            <v-text-field
              v-model="asal"
              :counter="200"
              :rules="asalRules"
              label="Asal Instansi/Sekolah/Universitas"
              prepend-icon="mdi-home"
              required
            ></v-text-field>
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
         @click="submitNewAccount"
       >
         Kirim
       </v-btn>

       <v-btn
         color="error"
         class="mr-4"
         @click="resetNewAccount"
       >
         Reset Isian
       </v-btn>
     </v-form>

  </v-container>

   </v-row>
 </v-container>
</template>

<script>
import axios from 'axios'
function isValidPhoneNumber (value) {
  const phoneNumberRegex = /^08[0-9]{8,13}$/
  return phoneNumberRegex.test(value)
}
export default {
  data: () => ({
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
    asal: '', // new field since v2.10
    asalRules: [
      v => !!v || 'Asal harus diisi',
      v => (v && v.length >= 3) || 'Keperluan minimal 3 karakter',
      v => (v && v.length <= 200) || 'Keperluan maksimal 200 karakter'
    ],
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
      { state: 'D4/S1', val: '3' },
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
      v => (v && v.length >= 20) || 'Keperluan minimal 20 karakter',
      v => (v && v.length <= 500) || 'Keperluan must be less than 500 characters'
    ]

  }),
  computed: {
    isSearchDisabled () {
      // console.log(this.selectedCustomer)
      return this.selectedCustomer === null || this.selectedCustomer === ''
    },
    isNameReadOnly () {
      return this.name !== null || this.name !== ''
    },
    isEmailReadOnly () {
      return this.email !== null || this.email !== ''
    },
    isJobReadOnly () {
      return this.job !== null || this.job !== ''
    },
    isPendidikanReadOnly () {
      return this.pendidikan !== null || this.pendidikan !== ''
    }

  },
  watch: {
    selectedCustomer (newVal, oldVal) {
      // Code to run when selectedCustomer changes
      // console.log('selectedCustomer changed:', newVal);
      this.statNumber = false

      // You can add additional logic or trigger other events here
    }
  },
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
    numberOnly (evt) {
      evt = (evt) || window.event
      var charCode = (evt.which) ? evt.which : evt.keyCode
      if ((charCode > 31 && (charCode < 48 || charCode > 57)) && charCode !== 46) {
        evt.preventDefault()
      } else {
        return true
      }
    },
    clearError (fieldName) {
      this.errorMessages[fieldName] = null
    },
    searchCustomer () {
      // console.log(this.$store.getters['userAuth/activeToken'])
      axios.post('/searchname', { nama: this.selectedCustomer }, { headers: { Authorization: 'Bearer ' + this.$store.getters['userAuth/activeToken'] } })
        .then((response) => {
          if (response.data.status === '200') {
            this.searchResults = response.data.data
            // if (this.searchResults.length === 0) {
            //   this.searchResults.push({ nama: 'Tidak ditemukan', id: null })
            // }
            this.menu = true // Show the dropdown menu
          }
        })
        .catch((error) => {
          console.log(error.response)
        })
    },
    selectCustomer (item) {
      this.selectedCustomer = item.nama
      this.menu = false // Close the dropdown menu
      // Additional logic if needed when a customer is selected
    },
    searchByName () {
      const vm = this
      // this.foundPhoneNumber = null

      axios.post('/checklogbyname', { nama: this.selectedCustomer })
        .then(response => {
          if (response.data.message === '1') {
            this.hasOldData = true

            this.isDropdownDisabled = true
            console.log(this.isJobReadOnly || this.isDropdownDisabled)

            axios.post('/search', { number: response.data.data.nohp })
              .then(responseSearch => {
                this.foundPhoneNumber = responseSearch.data.data
                console.log(responseSearch.data)
                if (responseSearch.data.message === '200') {
                  this.statNumber = true
                  // Data ditemukan
                  this.phoneNumber = this.foundPhoneNumber.nohp
                  this.customer_id = this.foundPhoneNumber.id
                  this.name = this.foundPhoneNumber.nama
                  this.email = this.foundPhoneNumber.email
                  this.job = this.foundPhoneNumber.pekerjaan
                  this.pendidikan = this.foundPhoneNumber.pendidikan
                } else {
                  // Data tidak ditemukan
                  // Lakukan tindakan atau berikan pesan kepada pengguna
                  this.statNumber = false
                  console.log('Data tidak ditemukan')
                }
              })
              .catch(error => {
                console.log(error)
                this.foundPhoneNumber = null
                this.statNumber = false
              })
          } else if (response.data.message === '0') {
            this.hasOldData = true

            // response.data.message !== 200
            vm.$router.push({
              name: 'list-guest'
            })
            // this.statNumber = true
            // this.name = this.selectedCustomer
          } else {
            // console.log(this.jobItems)
            this.hasOldData = false
            this.isDropdownDisabled = false
            // console.log(this.isJobReadOnly || this.isDropdownDisabled)
            this.statNumber = true
            this.name = this.selectedCustomer
            this.email = ''
            this.phoneNumber = ''
            this.job = ''
            this.pendidikan = ''
            this.necessity = ''
            this.checkbox = ''
          }
        })
        .catch(error => {
          console.log(error)
        })
    },
    reset () {
      // this.$refs.form.reset()
      this.checkbox = ''
      this.necessity = ''
    },
    resetNewAccount () {
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
      this.asal = '' // add new field since v2.1.0
      this.pekerjaan = ''
      this.checkbox = ''
    },
    submitNewAccount () {
      // this.$refs.form.validate()
      // const vm = this
      // console.log(this.tahunLahir)
      axios.post('register-customer', {
        nohp: this.phoneNumber,
        name: this.selectedCustomer,
        email: this.email,
        jeniskelamin: this.jenisKelamin,
        tahunlahir: this.tahunLahir,
        bersedia: this.checkbox,
        pendidikan: this.pendidikan,
        asal: this.asal, // new field since v2.1.0
        necessity: this.necessity,
        is_show: '1',
        editable: '0',
        job: this.job
      })
        .then((response) => {
          if (response.status === 200) {
            // console.log(response)
            /* this.phoneNumber = ''
            this.jenisKelamin = ''
            this.email = ''
            this.necessity = ''
            this.pendidikan = ''
            this.asal = '' // add new field since v2.1.0
            this.pekerjaan = '' */
            // validate form and submit ticket
            this.$refs.form.validate()
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
        .finally(() => {
          this.$router.push({
            name: 'list-guest'
          })
        })
    },
    validate () {
      // this.$refs.form.validate()
      // const vm = this
      axios.post('tickets', {
        nohp: this.phoneNumber,
        customer_id: this.customer_id,
        name: this.name,
        email: this.email,
        editable: '0',
        is_show: '1',
        necessity: this.necessity,
        bersedia: this.checkbox,
        status: 0
      })
        .then((response) => {
          console.log(response)
          if (response.status === 200) {
            console.log(response.status)
            axios.post('/checklog', { nohp: response.data.detail.nohp })
              .then(responseLog => {
                console.log(responseLog)
                /* this.phoneNumber = ''
                this.jenisKelamin = ''
                this.email = ''
                this.necessity = ''
                this.pendidikan = ''
                this.pekerjaan = '' */

                this.$router.push({
                  name: 'list-guest'
                })
              })
              .catch(errorLog => {
                console.log(errorLog)
              })
              .finally(() => {
                this.$router.push({
                  name: 'list-guest'
                })
              })
          }
        })
        .catch(function (error) {
          console.log(error.response)
        })
      // const vm = this // `this` cannot be accessed inside .then .catch or .finnaly. So, we need helper in this case we named it 'vm'
      //  for baseUrl checkout file main.js in root dir
    }
  }
}
</script>
