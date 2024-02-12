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
      <v-row>
        <v-col cols="12" md="4">
          <v-card class="mx-auto" max-width="100%" height="350">
            <v-card-text>
              <!-- <div>Word of the Day</div> -->
              <p class="text-h4 text-center text--primary">
                Antrian
              </p>
              <v-divider :thickness="5"></v-divider>
              <p class="text-h2 d-flex flex-column justify-center align-center pt-16">
                {{ noAntrian }}
              </p>
              <div class="text-h4 d-flex flex-column justify-center align-center text--primary pt-16">
                Silakan menuju loket
              </div>
            </v-card-text>
          </v-card>
        </v-col>
        <v-col cols="12" md="8">
          <div id="youtube-player" @click="togglePlayPause"></div>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12">
          <v-card class="mx-auto" max-width="100%">
            <v-row>
              <v-col cols="12" md="8">
                <p class="text-h4 report-text pl-5 mt-4 d-flex flex-column justify-center align-center pt-16">
                  {{ runningText }}
                </p>
              </v-col>
              <v-col cols="12" md="4">
                <v-img
                    :src="require('../assets/qr_code_sicantik.png')"
                    class="my-2"
                    contain
                    height="260"
                  />
              </v-col>
            </v-row>
          </v-card>
        </v-col>
      </v-row>
      <v-row class="footer-running-text">
        <!-- <v-col cols="12"> -->
        <div class="running-text">
          <span class="text-h6">LAPORKAN! Jika terjadi hal-hal yang kurang berkenan atau petugas meminta imbalan/tip, melalui WhatsApp: 0811 521 6200 atau bisa lakukan scan barcode.</span>
        </div>
        <!-- </v-col> -->
      </v-row>
    </div>
  </template>
<script>
import axios from 'axios'
import Echo from 'laravel-echo'
import audioFile from '@/assets/tingtung.mp3'

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
  name: 'YoutubePlayer',
  data () {
    return {
      currentTime: this.formatDateTime(new Date()),
      videoIds: [], // Array of video IDs, not full URLs
      currentVideoIndex: 0,
      currentIndex: 0,
      noAntrian: '',
      runningText: 'Data lainnya dapat diakses di kalteng.bps.go.id',
      intervalId: null,
      audio: null,
      player: null,
      isPlaying: false
    }
  },
  created () {
    this.getPressRelease()
    return this.loadData()
  },
  mounted () {
    this.getYoutube()
    this.audio = new Audio(audioFile)
    window.Echo.channel('queue-updated-channel')
      .listen('.queue-updated', (event) => {
        this.loadData()
        // var noAntrian = event.queue.noantrian
        this.playSequence().then(() => {
          // var textSpeech = 'Nomor Antrian '
          // // console.log(textSpeech)
          // const speech = new SpeechSynthesisUtterance(textSpeech)
          // speech.lang = 'id-ID'
          // speech.rate = 0.95
          // speech.voice = speechSynthesis.getVoices().find(voice => voice.lang === 'id-ID')
          // window.speechSynthesis.speak(speech)

          // // + event.queue.noantrian + '. silahkan menuju loket. Terima Kasih.'
          // const speechAntrian = new SpeechSynthesisUtterance(event.queue.noantrian)
          // speechAntrian.lang = 'id-ID'
          // speechAntrian.rate = 0.8
          // speechAntrian.voice = speechSynthesis.getVoices().find(voice => voice.lang === 'id-ID')
          // window.speechSynthesis.speak(speechAntrian)

          // var finalSpeech = 'Silakan menuju loket. Terima kasih'
          // // console.log(textSpeech)
          // const speechFinal = new SpeechSynthesisUtterance(finalSpeech)
          // speechFinal.lang = 'id-ID'
          // speechFinal.rate = 0.95
          // speechFinal.voice = speechSynthesis.getVoices().find(voice => voice.lang === 'id-ID')
          // window.speechSynthesis.speak(speechFinal)
        }).catch((error) => {
          console.error('Error playing audio:', error)
        })
      })
    if (/Chrome/.test(navigator.userAgent) && /Google Inc/.test(navigator.vendor)) {
      const appHeader = document.querySelector('.app-header')
      appHeader.classList.add('chrome-scrollbar')
    }
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
    speakText (text, options = {}) {
      return new Promise((resolve, reject) => {
        const speech = new SpeechSynthesisUtterance(text)
        speech.lang = options.lang || 'id-ID'
        speech.rate = options.rate || 0.95
        speech.voice = speechSynthesis.getVoices().find(voice => voice.lang === speech.lang)

        speech.onend = resolve
        speech.onerror = reject

        window.speechSynthesis.speak(speech)
      })
    },
    async playSequence () {
      try {
        this.player.pauseVideo()
        await this.playAudio()
        await this.speakText('Nomor Antrian')
        await this.speakText(this.noAntrian, { rate: 0.8 })
        await this.speakText('Silakan menuju loket. Terima kasih')
        this.player.playVideo()
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
          // console.log(response)
          this.runningText = response.data[this.currentIndex].title
          setInterval(() => {
            this.currentIndex = (this.currentIndex + 1) % response.data.length
            this.runningText = response.data[this.currentIndex].title
          }, 15000)

          console.log(this.runningText)
        })
        .catch(function (error) {
          console.log(error)
        })
        .finally(function () {
        })
    },
    getYoutube () {
      axios.get('getYoutube')
        .then((response) => {
          const videoIds = response.data.map(url => {
            const urlParts = url.split('/')
            return urlParts[urlParts.length - 1].split('?')[0]
          })

          this.videoIds = videoIds
          this.loadYoutubeIframeApi()

          // console.log(JSON.stringify(this.videoUrls))
        })
        .catch(function (error) {
          console.log(error)
        })
    },
    loadYoutubeIframeApi () {
      const tag = document.createElement('script')
      tag.src = 'https://www.youtube.com/iframe_api'
      const firstScriptTag = document.getElementsByTagName('script')[0]
      firstScriptTag.parentNode.insertBefore(tag, firstScriptTag)
      window.onYouTubeIframeAPIReady = this.initPlayer
    },
    initPlayer () {
      if (this.videoIds.length > 0) {
        this.player = new YT.Player('youtube-player', {
          height: '350',
          width: '100%',
          videoId: this.videoIds[this.currentVideoIndex],
          playerVars: { autoplay: 1, controls: 1, rel: 0 },
          events: {
            onReady: this.onPlayerReady,
            onStateChange: this.onPlayerStateChange
          }
        })
      }
    },
    onPlayerReady (event) {
      // event.target.playVideo()
      this.isPlaying = true
    },
    onPlayerStateChange (event) {
      if (event.data === YT.PlayerState.ENDED) {
        this.currentVideoIndex++
        if (this.currentVideoIndex >= this.videoIds.length) {
          this.currentVideoIndex = 0
        }
        this.player.loadVideoById(this.videoIds[this.currentVideoIndex])
      } else if (event.data === YT.PlayerState.PLAYING) {
        this.isPlaying = true
      } else {
        this.isPlaying = false
      }
    },
    togglePlayPause () {
      if (this.isPlaying) {
        this.player.pauseVideo()
        this.isPlaying = false
      } else {
        this.player.playVideo()
        this.isPlaying = true
      }
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
  .header-top {
    background-color: #1E4D8C;
    color: white;
    padding: 20px 0;
  }

  .logo-container {
    display: flex;
    align-items: right;
    justify-content: right;
  }

  .logo {
    height: 60px;
  }

  .title-container {
    display: flex;
    flex-direction: column;
    justify-content: center;
  }

  .text-logo {
    font-size: 1.2em;
    text-align: left;
    font-family: Arial, sans-serif;
    font-weight: bold;
    font-style: italic;
  }

  .text-logo-sm {
    font-size: 0.8em;
    text-align: left;
    font-family: Arial, sans-serif;
    font-weight: bold;
    font-style: italic;
  }

  .time-display {
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.5em;
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
    width: 0;
  }

  .chrome-scrollbar {
  -ms-overflow-style: none;
  scrollbar-width: none;

  overflow-y: none;
}

.footer-running-text {
  background-color: #1E4D8C;
  color: white;
  padding: 1% 0;
  white-space: nowrap;
  overflow: hidden;
  box-sizing: border-box;
}

@keyframes marquee {
  0% { transform: translateX(100%); }
  100% { transform: translateX(-100%); }
}

.running-text span {
  display: inline-block;
  padding-left: 100%;
  animation: marquee 40s linear infinite;
}

@media (max-width: 600px) {
  .footer-running-text {
  background-color: #1E4D8C;
  color: white;
  padding-bottom: 10%;
  white-space: nowrap;
  overflow: hidden;
  box-sizing: border-box;
}
}

  </style>
