<template>
   <v-main>
    <v-container>
        <v-layout class="hidden-md-and-down" align-center justify-center>
            <h1 class="pb-10">SELAMAT DATANG DI PELAYANAN STATISTIK TERPADU</h1>
      </v-layout>
      <v-layout class="hidden-md-and-down" align-center justify-center>
            <h1 class="pb-16">BPS PROVINSI KALIMANTAN TENGAH</h1>
      </v-layout>
      <v-layout class="hidden-lg-and-up" align-center justify-center>
            <h3 class="pb-10">SELAMAT DATANG DI PELAYANAN STATISTIK TERPADU</h3>
      </v-layout>
      <v-layout class="hidden-lg-and-up" align-center justify-center>
            <h3 class="pb-16">BPS PROVINSI KALIMANTAN TENGAH</h3>
      </v-layout>
      <v-layout class="pb-10" align-center justify-center>
        <v-btn
          :disabled="isLoadingB || isLoadingA"
          style="min-width: 50%; height: 4em; font-size: 20px; color:black;"
          color="#F5BEBC"
          @click="addQueue('A')"
          dark
        >
          <v-icon
            v-if="!isLoadingA"
            style="color: black;"
            class="mr-2"
          >
            mdi-book-open-variant-outline
          </v-icon>
          <span v-if="!isLoadingA">Permintaan Data</span>
          <v-progress-circular v-if="isLoadingA" indeterminate color="black"></v-progress-circular>
        </v-btn>
      </v-layout>
      <v-layout class="pb-10" align-center justify-center>
            <v-btn
                style="min-width: 50%; height: 4em; font-size: 20px; color:black;"
                color="#99D1E3"
                :disabled="isLoadingB || isLoadingA"
                @click="addQueue('B')"
                dark
                >
                <v-icon
                    v-if="!isLoadingB"
                    style="color: black;"
                    class="mr-2"
                >
                mdi-head-lightbulb
                </v-icon>
                <span v-if="!isLoadingB">Konsultasi Data</span>
                <v-progress-circular v-if="isLoadingB" indeterminate color="black"></v-progress-circular>
                </v-btn>
      </v-layout>

      <v-dialog
        v-model="dialogQueue"
        max-width="500"
        max-height="300"
        justify="center"
      >
        <v-card color="#333" dark>
            <v-card-title class="justify-center">Antrian Anda:</v-card-title>
            <v-card-text class="display-2 text-center">{{ queueNumber }}</v-card-text>
            <v-card-text class="text-center">Mohon tunggu, hingga dipanggil. Terima kasih.</v-card-text>
        </v-card>
      </v-dialog>
    </v-container>
  </v-main>
</template>

<script>
import axios from 'axios'
axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest'
axios.defaults.headers.common['Content-Type'] = 'application/json'

export default {
  data: () => ({
    dialogQueue: false,
    queueNumber: '',
    isLoadingA: false,
    isLoadingB: false
  }),
  methods: {
    addQueue (status) {
      if (status === 'A') {
        this.isLoadingA = true
        this.isLoadingB = false
      } else if (status === 'B') {
        this.isLoadingA = false
        this.isLoadingB = true
      }
      axios.post('queue', {
        prefix: status
      },
      { headers: { Authorization: 'Bearer ' + this.$store.getters['userAuth/activeToken'] } }
      )
        .then((response) => {
          if (response.status === 200) {
            // console.log(response.data.antrian)
            this.queueNumber = response.data.antrian
            this.dialogQueue = true
            // setTimeout(() => {
            //   this.dialogQueue = false
            // }, 5000)
          }
        })
        .catch((error) => {
          console.log(error)
        })
        .finally(() => {
          if (status === 'A') {
            this.isLoadingA = false
          } else if (status === 'B') {
            this.isLoadingB = false
          }
        })
    }
  }
}
</script>
