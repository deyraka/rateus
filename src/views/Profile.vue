<template>
  <v-container>
        <v-skeleton-loader
            class="mx-auto"
            max-width="300"
            type="card"
        >
            <v-card
                light
                width="80%"
                class="mt-16 mx-auto elevation-12 rounded-lg"
            >
                <v-card-actions class="mb-n16 mr-2 d-flex justify-end">
                  <v-btn
                    class="ml-2 mt-3"
                    fab
                    icon
                    height="40px"
                    right
                    width="40px"
                    title="Edit Profile"
                    @click="checkAndShowNotif()"
                  >
                    <v-icon color="blue lighten-2">mdi-pencil</v-icon>
                  </v-btn>
                </v-card-actions>
                <div class="d-flex justify-center">
                    <v-avatar color="mt-n16 white" size="150">
                        <v-avatar size="140">
                            <img
                                alt="user"
                                src="https://images.pexels.com/photos/8523081/pexels-photo-8523081.jpeg"
                            >
                        </v-avatar>
                    </v-avatar>
                </div>
                <v-card-title class="white--text mt-1 d-flex justify-center">
                    <p class="black--text">
                        Grasella Novita Trifosa
                    </p>
                </v-card-title>
                <v-card-text class="mt-n8 d-flex justify-center">
                    <p>(email@domain.com)</p>
                </v-card-text>
                <v-card-subtitle class="mt-n8 d-flex justify-center">
                    <v-rating
                    :value="4.5"
                    color="amber"
                    dense
                    half-increments
                    readonly
                    size="18"
                    ></v-rating>

                    <div class="grey--text ms-4">
                    4.5 (413)
                    </div>
                </v-card-subtitle>
                <v-card-subtitle class="mt-n4 d-flex justify-center">
                    <div class="grey--text ms-4">
                    Your coins : 50
                    <v-icon
                        dense
                        color="orange darken-2"
                    >
                        mdi-bitcoin
                    </v-icon>
                    </div>
                </v-card-subtitle>
            </v-card>
        </v-skeleton-loader>
        <v-card-subtitle class="mt-8 d-flex justify-center">
            <p>
                Ticket yang telah Anda Layani
            </p>
        </v-card-subtitle>
        <v-skeleton-loader
            type="table"
        >
            <template>
                <v-text-field
                    v-model="search"
                    append-icon="mdi-magnify"
                    label="Search"
                    single-line
                    hide-details
                    class="mt-n6 mx-4"
                ></v-text-field>
                <v-data-table
                    :search="search"
                    :headers="headers"
                    :items="desserts"
                    :items-per-page="8"
                    class="elevation-1"
                ></v-data-table>
            </template>
        </v-skeleton-loader>
  </v-container>
</template>

<script>

export default {
  name: 'Profile',
  data () {
    return {
      search: '',
      headers: [
        {
          text: 'Dessert (100g serving)',
          align: 'start',
          sortable: false,
          value: 'name'
        },
        { text: 'Calories', value: 'calories' },
        { text: 'Fat (g)', value: 'fat' },
        { text: 'Carbs (g)', value: 'carbs' },
        { text: 'Protein (g)', value: 'protein' },
        { text: 'Iron (%)', value: 'iron' }
      ],
      desserts: [
        {
          name: 'Frozen Yogurt',
          calories: 159,
          fat: 6.0,
          carbs: 24,
          protein: 4.0,
          iron: '1%'
        },
        {
          name: 'Ice cream sandwich',
          calories: 237,
          fat: 9.0,
          carbs: 37,
          protein: 4.3,
          iron: '1%'
        },
        {
          name: 'Eclair',
          calories: 262,
          fat: 16.0,
          carbs: 23,
          protein: 6.0,
          iron: '7%'
        },
        {
          name: 'Cupcake',
          calories: 305,
          fat: 3.7,
          carbs: 67,
          protein: 4.3,
          iron: '8%'
        }
      ]
    }
  },
  methods: {
    playsound () {
      alert('sound will played. it is okay?')
      const audio = new Audio('https://notificationsounds.com/storage/sounds/file-sounds-1325-smile.mp3')
      audio.play()
    },
    showNotification () {
      // create a new notification
      const notification = new Notification('JavaScript Notification API', {
        body: 'This is a JavaScript Notification API demo'
      })

      this.playsound()

      // close the notification after 10 seconds
      setTimeout(() => {
        notification.close()
      }, 10 * 1000)

      // navigate to a URL when clicked
      notification.addEventListener('click', () => {
        window.open('https://www.javascripttutorial.net/web-apis/javascript-notification/', '_blank')
      })
    },
    showError () {
      console.log('You blocked the notifications')
    },
    checkAndShowNotif () {
      // check notification permission
      let granted = false

      if (Notification.permission === 'granted') {
        granted = true
        console.log('notif granted')
      } else if (Notification.permission !== 'denied') {
        // let permission = await Notification.requestPermission();
        Notification.requestPermission((permission) => {
          console.log('notif permission requested')
          if (permission === 'granted') {
            granted = true
            console.log('notif request granted')
          }
        })
        // granted = permission === 'granted' ? true : false;
      }

      // show notification or error
      granted ? this.showNotification() : this.showError()
    }
  }
}
</script>
