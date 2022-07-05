<template>
  <v-app>
    <v-snackbar v-model="snackbar" :timeout="5000">
      Username yang anda masukkan telah digunakan
      <template #action="{ attrs }">
        <v-btn color="warning" text v-bind="attrs" @click="snackbar = false"
          >Close</v-btn
        >
      </template>
    </v-snackbar>
    <v-row justify="center" align="center" class="pa-0 ma-0">
      <v-col cols="4">
        <v-list-item three-line>
          <v-list-item-content>
            <h1 class="mb-4">Daftar</h1>
            <v-form v-model="valid" @submit.prevent="register">
              <v-text-field
                v-model="email"
                :rules="emailRules"
                placeholder="E-mail"
                required
                outlined
                dense
                clearable
                class="rounded-lg"
              ></v-text-field>
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
                name="input-10-2"
                placeholder="Password"
                class="input-group--focused rounded-lg"
                outlined
                dense
                @click:append="showPassword = !showPassword"
              ></v-text-field>
              <v-text-field
                v-model="confirmPassword"
                :append-icon="showPassword2 ? 'mdi-eye' : 'mdi-eye-off'"
                :rules="confirmPasswordRules"
                :type="showPassword2 ? 'text' : 'password'"
                name="input-10-2"
                placeholder="Confirm Password"
                hint="Sesuaikan dengan password!"
                autocomplete="confirm-password"
                class="input-group--focused rounded-lg"
                outlined
                dense
                @click:append="showPassword2 = !showPassword2"
              ></v-text-field>
              <v-btn
                type="submit"
                color="primary"
                class="rounded-lg"
                style="width: 100%"
                :disabled="!valid"
              >
                Daftar
              </v-btn>
            </v-form>
            <v-spacer />
            <small>
              Sudah Daftar?
              <nuxt-link to="/login">Masuk</nuxt-link>
            </small>
          </v-list-item-content>
        </v-list-item>
      </v-col>
    </v-row>
  </v-app>
</template>
<script>
import { mapMutations } from 'vuex'
import axios from 'axios'

export default {
  name: 'LoginPage',
  layout: 'registration',
  middleware: 'guest',
  data() {
    return {
      valid: false,
      username: '',
      password: '',
      confirmPassword: '',
      email: '',
      message: '',
      snackbar: false,
      showPassword: false,
      showPassword2: false,
      nameRules: [(v) => !!v || 'Masukkan username anda'],
      emailRules: [
        (v) => !!v || 'Masukkan alamat e-mail anda',
        (v) =>
          !v ||
          /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) ||
          'E-mail tidak valid',
      ],
      rules: [
        (value) => !!value || 'Masukkan password anda',
        (value) => (value && /\d/.test(value)) || 'Password harus mengandung setidaknya satu angka',
        (value) =>
          (value && /[A-Z]{1}/.test(value)) || 'Password harus mengandung setidaknya satu huruf kapital',
        (value) =>
          (value && /[^A-Za-z0-9]/.test(value)) ||
          'Password harus mengandung setidaknya satu karakter spesial',
        (value) => (value && value.length >= 8) || 'Password minimal 8 karakter',
      ],
      confirmPasswordRules: [
        (v) => !!v || 'Masukkan ulang password anda',
        (v) =>
          v ===
            (document.getElementById('password')
              ? document.getElementById('password').value
              : undefined) || 'Passwords tidak sama',
      ],
    }
  },
  computed: {
    error() {
      return this.$store.state.error
    },
  },
  methods: {
    ...mapMutations('auth', ['setAccessToken', 'setRefreshToken']),
    register() {
      this.message = ''
      axios
        .post(
          'https://staking-spade-production.up.railway.app/register',
          {
            email: this.email,
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
          this.$router.push('/login')
        })
        .catch((error) => {
          this.message = error.message
          this.snackbar = true
        })
    },
  },
}
</script>
