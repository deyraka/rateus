<template>
    <div class="app-header" style="height: 100vh">
      <v-row no-gutters class="header-top">
        <v-col cols="2" class="logo-container hidden-md-and-down">
          <img src="http://cdn.bps.go.id/bps.png" class="logo">
        </v-col>
        <v-col cols="3" class="title-container hidden-md-and-down">
          <div class="text-logo pl-3">BADAN PUSAT STATISTIK</div>
          <div class="text-logo pl-3">PROVINSI KALIMANTAN TENGAH</div>
        </v-col>
        <v-col cols="5" offset="2" class="time-display hidden-md-and-down">
          {{ currentTime }}
        </v-col>
        <v-col cols="4" class="logo-container hidden-lg-and-up">
          <img src="http://cdn.bps.go.id/bps.png" class="logo">
        </v-col>
        <v-col cols="8" class="title-container hidden-lg-and-up">
          <div class="text-logo-sm pl-3">BADAN PUSAT STATISTIK</div>
          <div class="text-logo-sm pl-3">PROVINSI KALIMANTAN TENGAH</div>
        </v-col>
      </v-row>
      <v-container fluid>
        <v-row no-gutters>
        <v-col cols="12" md="8">
          <v-row cols="12">
            <v-col cols="12" md="6">
              <v-card
                class="mx-auto rounded-xl"
                color="#F6ADB4"
                height="100%"
              >
              <p class="antrian pt-8 text-center">
                Antrian
              </p>
              <v-divider class="thick-divider"></v-divider>
              <p class="no-antrian d-flex flex-column justify-center align-center">
                {{ noAntrian }}
                <!-- A001 -->
              </p>
              <div class="loket d-flex flex-column justify-center align-center">
                Silakan menuju loket
              </div>
              </v-card>
            </v-col>
            <v-col cols="12" md="3">
              <v-card
                class="mx-auto rounded-xl"
                color="#B4F7C2"
                dark
                height="100%"
              >
              <p class="wa-sicantik pt-10 text-center">
                Petugas Pelayanan
              </p>
              <v-img
                    :src="fotoPetugas"
                    contain
                    height="280"
                    width="100%"
                  />
              </v-card>
            </v-col>
            <v-col cols="12" md="3">
              <v-card
                class="mx-auto rounded-xl"
                color="#F1E6EC"
                dark
                height="100%"
              >
              <p class="wa-sicantik pt-8 text-center">
                WhatsApp SiCantik
              </p>
              <v-img
                    :src="require('../assets/qr_code_sicantik.png')"
                    contain
                    height="280"
                  />
              </v-card>
            </v-col>
          </v-row>
          <v-row cols="12" align="center" justify="center">
            <v-col cols="12" md="12">
              <v-card class="mx-auto rounded-xl" max-width="100%" height="250px" color="#B3DAF7" style="display: flex; align-items: center;">
                <v-card-text class="text-h5 runningText" style="margin: auto;">
                  {{ runningText }}
                </v-card-text>
              </v-card>
            </v-col>
          </v-row>
        </v-col>
        <v-col cols="12" md="4">
          <v-card class="mx-auto rounded-xl" color="#FEFBEA" height="100%" flat tile>
            <v-container fill-height fluid>
              <v-row align="center" justify="center" class="fill-height">
                <video class="video-player" ref="videoPlayer" :key="videoUrl" @ended="playNextVideo" controls height="600" autoplay width="100%" :poster="whiteImage">
                  <source :src="videoUrl" type="video/mp4">
                  Your browser does not support the video tag.
                </video>

              </v-row>
            </v-container>
          </v-card>
        </v-col>
      </v-row>
      </v-container>
        <v-footer padless >
          <v-col
          class="footer"
          >
            <span class="text-h6">
              <marquee>LAPORKAN! Jika terjadi hal-hal yang kurang berkenan atau petugas meminta imbalan/tip, melalui WhatsApp: 0811 521 6200 atau bisa lakukan scan barcode.</marquee>
            </span>
          </v-col>
        </v-footer>
    </div>
</template>

<script>
import axios from 'axios'
import Echo from 'laravel-echo'
import audioFile from '@/assets/tingtung.mp3'
import whiteImage from '@/assets/logo-bps.png'

// import Swal from 'sweetalert2'
axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest'
axios.defaults.headers.common['Content-Type'] = 'application/json'
window.Pusher = require('pusher-js')
window.Echo = new Echo({
  broadcaster: 'pusher',
  key: '72b390d6913fa906ab84',
  cluster: 'ap1',
  forceTLS: true,
  encrypted: false
})

export default {
  data () {
    return {
      currentTime: this.formatDateTime(new Date()),
      // videoUrl: 'https://www.youtube.com/embed/lfFAuRtioE8?autoplay=1&mute=0',
      noAntrian: '',
      currentIndex: 0,
      runningText: 'Data lainnya dapat diakses di kalteng.bps.go.id',
      intervalId: null,
      audio: null,
      instagramVideos: [],
      currentVideoIndex: 0,
      videoUrl: '',
      whiteImage: whiteImage,
      fotoPetugas: ''
    }
  },
  watch: {
    currentVideoIndex (newVal, oldVal) {
      this.videoUrl = this.instagramVideos[newVal].media_url
      console.log(this.videoUrl)
    },
    instagramVideos (newVal, oldVal) {
    // When instagramVideos updates, update the videoUrl to the first video's URL
      if (newVal.length > 0) {
        this.videoUrl = newVal[0].media_url
      }
    },
    videoUrl (newVal, oldVal) {
      this.$nextTick(() => {
        this.$refs.videoPlayer.load()
      })
    }
  },

  created () {
    this.getPressRelease()
    this.getInstagram()
    this.getPetugasHariIni()
    return this.loadData()
  },
  mounted () {
    this.audio = new Audio(audioFile)
    window.Echo.channel('queue-updated-channel')
      .listen('.queue-updated', (event) => {
        this.loadData()
        // var noAntrian = event.queue.noantrian
        this.$refs.videoPlayer.pause()
        this.playSequence().then(() => {
          var textSpeech = 'Nomor Antrian '
          // console.log(textSpeech)
          const speech = new SpeechSynthesisUtterance(textSpeech)
          speech.lang = 'id-ID'
          speech.rate = 0.95
          speech.voice = speechSynthesis.getVoices().find(voice => voice.lang === 'id-ID')
          window.speechSynthesis.speak(speech)

          // + event.queue.noantrian + '. silahkan menuju loket. Terima Kasih.'
          const speechAntrian = new SpeechSynthesisUtterance(event.queue.noantrian)
          speechAntrian.lang = 'id-ID'
          speechAntrian.rate = 0.8
          speechAntrian.voice = speechSynthesis.getVoices().find(voice => voice.lang === 'id-ID')
          window.speechSynthesis.speak(speechAntrian)

          var finalSpeech = 'Silakan menuju loket. Terima kasih'
          // console.log(textSpeech)
          const speechFinal = new SpeechSynthesisUtterance(finalSpeech)
          speechFinal.lang = 'id-ID'
          speechFinal.rate = 0.95
          speechFinal.voice = speechSynthesis.getVoices().find(voice => voice.lang === 'id-ID')
          window.speechSynthesis.speak(speechFinal)

          speechFinal.onend = () => {
            // Resume the video
            this.$refs.videoPlayer.play()
          }
        }).catch((error) => {
          console.error('Error playing audio:', error)
        })
      })
    this.intervalId = setInterval(() => {
      this.currentTime = this.formatDateTime(new Date())
    }, 1000)
  },
  beforeDestroy () {
    clearInterval(this.intervalId)
  },
  methods: {
    loadData () {
      var config = {
        method: 'get',
        url: 'getTodayQueue'
      }
      axios(config)
        .then((response) => {
          if (response.status === 200) {
            this.noAntrian = response.data.filter(obj => obj.is_call === '1').sort((a, b) => new Date(b.updated_at) - new Date(a.updated_at))[0]?.noantrian || '-'
          // var antrianSpeech = event.queue.noantrian.split('').join(' ')
          }
        })
        .catch((error) => {
          console.log(error)
        })
        .finally(() => {
        /* vm.$router.push({
          name: 'guesthome'
        }) */
        })
    },
    playAudio () {
      return new Promise((resolve, reject) => {
        if (!this.audio) {
          this.audio = new Audio(audioFile)
        }
        this.audio.onended = () => {
          resolve()
        }
        this.audio.onerror = (e) => {
          reject(e)
        }

        this.audio.play()
      })
    },
    async playSequence () {
      try {
        await this.playAudio()
      } catch (error) {
        console.error('Error playing audio:', error)
      }
    },
    getPressRelease () {
      const year = new Date().getFullYear()
      axios.post('getBRS', {
        year: year
      })
        .then((response) => {
          this.runningText = response.data[this.currentIndex].title
          setInterval(() => {
            this.currentIndex = (this.currentIndex + 1) % response.data.length
            this.runningText = response.data[this.currentIndex].title
          }, 15000)
        })
        .catch(function (error) {
          console.log(error)
        })
        .finally(function () {
        })
    },
    getPetugasHariIni () {
      var config = {
        method: 'get',
        url: 'getPetugasHariIni'
      }
      axios(config)
        .then((response) => {
          if (response.status === 200) {
            console.log(response.data[0].foto_petugas)
            const baseURLWithoutApi = axios.defaults.baseURL.replace('/api/', '/')
            // console.log(baseURLWithoutApi + response.data[0].foto_petugas)
            this.fotoPetugas = baseURLWithoutApi + response.data[0].foto_petugas
            // this.noAntrian = response.data.filter(obj => obj.is_call === '1').sort((a, b) => new Date(b.updated_at) - new Date(a.updated_at))[0]?.noantrian || '-'
          // var antrianSpeech = event.queue.noantrian.split('').join(' ')
          }
        })
        .catch((error) => {
          console.log(error)
        })
        .finally(() => {
        /* vm.$router.push({
          name: 'guesthome'
        }) */
        })
    },
    getInstagram () {
      axios.get('getInstagram')
        .then((response) => {
          this.instagramVideos = response.data
          // console.log(JSON.stringify(this.instagramVideos))
          if (this.instagramVideos.length > 0) {
            this.videoUrl = this.instagramVideos[this.currentVideoIndex].media_url
            // console.log(this.videoUrl)
          }
        })
        .catch((error) => {
          console.log(error)
        })
    },
    playNextVideo () {
      this.currentVideoIndex = (this.currentVideoIndex + 1) % this.instagramVideos.length
      this.videoUrl = this.instagramVideos[this.currentVideoIndex].media_url
    },
    formatDateTime (now) {
      const day = now.getDate()
      const month = now.getMonth()
      const year = now.getFullYear()
      const hours = String(now.getHours()).padStart(2, '0')
      const minutes = String(now.getMinutes()).padStart(2, '0')
      const seconds = String(now.getSeconds()).padStart(2, '0')

      const months = ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember']

      const formattedDate = `${day} ${months[month]} ${year}`
      const formattedTime = `${hours}:${minutes}:${seconds}`

      return `${formattedDate} ${formattedTime}`
    }
  }
}
</script>

<style scoped>

.thick-divider {
  border-top: 5px solid #FEFBE8; /* Ubah angka 4 sesuai dengan ketebalan yang Anda inginkan */
}
.header-top {
  background-color: #EFEDEE;
  color: white;
  padding: 20px 0;
}

.footer{
  background-color: #EFEDEE;
  color: black;
}
.logo-container {
  display: flex;
  align-items: right;
  justify-content: right;
}

.logo {
  height: 90px;
}

.title-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.text-logo {
  color: #508DA9;
  font-size: 1.2em;
  text-align: left;
  font-family: Arial, sans-serif;
  font-weight: bold;
  font-style: italic;
}

.text-logo-sm {
  color: #508DA9;
  font-size: 0.8em;
  text-align: left;
  font-family: Arial, sans-serif;
  font-weight: bold;
  font-style: italic;
}

.time-display {
  color: black;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5em;
  font-family: Arial, sans-serif;
  font-weight: bold;
}

.antrian{
  color: black;
  font-size: 2em;
  font-family: Arial, sans-serif;
  font-weight: bold;
}

.no-antrian{
  color: black;
  font-size: 8em;
  font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
  font-weight: bold;
}

.wa-sicantik{
  color: black;
  font-size: 1.3em;
  font-family: Arial, sans-serif;
  font-weight: bold;
}

.loket{
  color: black;
  font-size: 2em;
  font-family: Arial, sans-serif;
  font-weight: bold;
}

.runningText{
  color: black !important;;
  font-size: 2em;
  font-family: Arial, sans-serif;
  font-weight: bold;
}
.queue-section {
  margin-top: 20px;
  text-align: center;
}

.queue-display {
  background-color: #f0f0f0;
  padding: 10px 0;
}

.queue-number {
  font-size: 3em;
  font-weight: bold;
}

.clinic-name {
  font-size: 1.5em;
}

.app-header {
  scrollbar-width: none;
  -ms-overflow-style: none;
  scrollbar-width: thin;
  scrollbar-color: transparent transparent;
  overflow-y: scroll;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.app-header::-webkit-scrollbar {
  width: 0; /* Mengatur lebar scrollbar menjadi 0 untuk Chrome */
}

.chrome-scrollbar {
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
  overflow-y: none;
}

</style>
