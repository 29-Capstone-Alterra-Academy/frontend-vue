<template>
  <v-app>
    <v-snackbar v-model="snackbar" :timeout="5000">
      Username atau password yang anda masukkan salah
      <template #action="{ attrs }">
        <v-btn color="warning" text v-bind="attrs" @click="snackbar = false"
          >Close</v-btn
        >
      </template>
    </v-snackbar>
    <v-row justify="center" align="center" class="pa-0 ma-0">
      <v-col cols="4">
        <v-row justify="center">
          <v-col cols="auto">
            <v-img src="/Logo.svg" class="" width="110"></v-img>
          </v-col>
        </v-row>
        <v-list-item three-line>
          <v-list-item-content>
            <h1 class="mb-4">Masuk</h1>
            <v-form v-model="valid" @submit.prevent="handlelogin">
              <v-text-field
                v-model="username"
                :rules="nameRules"
                placeholder="Username"
                required
                outlined
                dense
                clearable
                class="rounded-lg"
              ></v-text-field>
              <v-text-field
                id="password"
                v-model="password"
                :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                :rules="rules"
                :type="showPassword ? 'text' : 'password'"
                placeholder="Password"
                name="input-10-2"
                class="input-group--focused rounded-lg"
                outlined
                dense
                @click:append="showPassword = !showPassword"
              ></v-text-field>
              <v-spacer />
              <small>
                Lupa
                <nuxt-link to="/registrasi">Username</nuxt-link>
                atau
                <nuxt-link to="/registrasi">Password</nuxt-link>?
              </small>
              <v-btn
                type="submit"
                color="primary"
                class="rounded-lg"
                style="width: 100%"
                :disabled="!valid"
              >
                Masuk
              </v-btn>
            </v-form>
            <v-spacer />
            <small>
              Pengguna Baru?
              <nuxt-link to="/registrasi">Daftar</nuxt-link>
            </small>
          </v-list-item-content>
        </v-list-item>
      </v-col>
    </v-row>
  </v-app>
</template>
<script>
import { mapMutations } from 'vuex'

export default {
  name: 'LoginPage',
  layout: 'registration',
  middleware: 'guest',
  data() {
    return {
      valid: false,
      username: '',
      password: '',
      message: '',
      snackbar: false,
      showPassword: false,
      nameRules: [(v) => !!v || 'Masukkan username anda'],
      rules: [
        (value) => !!value || 'Masukkan password anda',
        (value) =>
          (value && value.length >= 8) || 'Password minimal 8 karakter',
      ],
    }
  },
  computed: {
    error() {
      return this.$store.state.error
    },
  },
  methods: {
    ...mapMutations('auth', [
      'setAccessToken',
      'setRefreshToken',
      'setUserProfile',
    ]),
    handlelogin(e) {
      e.preventDefault()
      try {
        this.message = ''
        this.$axios
          .post(
            '/login',
            {
              username: this.username,
              password: this.password,
            },
            {
              headers: {
                'Content-Type': 'application/json',
              },
            }
          )
          .then((response) => {
            this.setAccessToken(response.data.access_token)
            this.setRefreshToken(response.data.refresh_token)
            this.$router.push('/')
          })
          .catch((error) => {
            this.message = error.message
            this.snackbar = true
          })
      } catch (exception) {
        console.log(exception)
      }
    },
  },
}
</script>
