<template>
  <v-main>
    <v-container>
      <v-layout align-center justify-center>
        <v-card
          class="mx-auto elevation-12"
          max-width="400"
        >
          <v-img
            class="white--text align-end"
            height="200px"
            src="https://cdn.vuetifyjs.com/images/cards/docks.jpg"
          >
            <v-card-title>Login Here</v-card-title>
          </v-img>
          <v-card-text class="text--primary">
            <v-form>
                <v-text-field
                  prepend-icon="mdi-account"
                  name="login"
                  label="Login"
                  type="text"
                ></v-text-field>
                <v-text-field
                  id="password"
                  prepend-icon="mdi-lock"
                  name="password"
                  label="Password"
                  type="password"
                ></v-text-field>
            </v-form>
            <p class="text-lowercase text-caption">forget password? click here</p>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
              color="blue"
            >
              <v-icon left>
                mdi-login-variant
              </v-icon>
              Login
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-layout>
    </v-container>
  </v-main>
</template>

<script>

export default {
  name: 'Login'

}
</script>
