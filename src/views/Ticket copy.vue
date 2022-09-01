<template>
  <v-main>
    <v-container>
      <v-form
        ref="form"
        v-model="valid"
        lazy-validation
      >
        <v-container>
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
              md="4"
              class="white--text"
            >
              <v-text-field
                v-model="name"
                :rules="nameRules"
                :counter="25"
                label="Nama Lengkap"
                required
              ></v-text-field>
            </v-col>
            <v-col
              cols="12"
              md="4"
            >
              <v-text-field
                v-model="nohp"
                :rules="nohpRules"
                :counter="12"
                label="Nomor WA"
                required
                @keypress="numberOnly"
              ></v-text-field>
            </v-col>
            <v-col
              cols="12"
              md="4"
            >
              <v-select
                v-model="job"
                :items="jobItems"
                :rules="jobRules"
                label="Pekerjaan"
                required
              ></v-select>
            </v-col>
            <v-col
              cols="12"
              md="4"
            >
              <v-text-field
                v-model="institution"
                :rules="institutionRules"
                label="Asal Instansi/Universitas/Sekolah"
                required
              ></v-text-field>
            </v-col>
            <v-col
              cols="12"
              md="4"
            >
              <v-text-field
                v-model="necessity"
                :rules="necessityRules"
                label="Keperluan"
                :counter="500"
                required
                hint="(silakan jelaskan secara rinci)"
              ></v-text-field>
            </v-col>
          </v-row>
          <v-checkbox
            v-model="agreement"
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
            Validate
          </v-btn>

          <v-btn
            color="error"
            class="mr-4"
            @click="reset"
          >
            Reset Form
          </v-btn>
        </v-container>
      </v-form>
    </v-container>
  </v-main>
</template>

<script>
export default {
  data: () => ({
    valid: false,
    name: '',
    nameRules: [
      v => !!v || 'Name is required',
      v => v.length <= 25 || 'Name must be less than 25 characters'
    ],
    nohp: '',
    nohpRules: [
      v => !!v || 'Nomor whatsapp is required',
      v => v.length <= 12 || 'Nomor whatsapp must be less than 12 characters'
    ],
    job: null,
    jobRules: [
      v => !!v || 'Pekerjaan is required'
    ],
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
      v => !!v || 'Asal is required'
    ],
    necessity: '',
    necessityRules: [
      v => !!v || 'Keperluan is required',
      v => v.length <= 250 || 'Keperluan must be less than 12 characters'
    ]
  }),
  methods: {
    numberOnly (evt) {
      evt = (evt) || window.event
      var charCode = (evt.which) ? evt.which : evt.keyCode
      if ((charCode > 31 && (charCode < 48 || charCode > 57)) && charCode !== 46) {
        evt.preventDefault()
      } else {
        return true
      }
    },
    validate () {
      this.$refs.form.validate()
    },
    reset () {
      this.$refs.form.reset()
    }
  }
}
</script>
