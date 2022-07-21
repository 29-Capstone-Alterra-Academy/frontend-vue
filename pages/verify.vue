<template>
  <v-app>
    <v-snackbar v-model="snackbar" :timeout="5000">
      Kode OTP yang anda masukkan salah
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
            <h1 class="mb-4">Masukkan kode verifikasi</h1>
            <p>Masukkan 6 kode verifikasi yang anda terima</p>
            <v-form v-model="valid" @submit.prevent="reset">
              <v-otp-input
                v-model="otp"
                :rules="otpRules"
                required
                type="password"
                length="6"
              ></v-otp-input>
              <v-btn
                type="submit"
                color="primary"
                class="rounded-lg"
                style="width: 100%"
                :disabled="!valid"
              >
                Kirim Kode Verifikasi
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

export default {
  name: 'LoginPage',
  layout: 'registration',
  middleware: 'guest',
  data() {
    return {
      valid: false,
      otp: '',
      message: '',
      snackbar: false,
      otpRules: [
        (v) => !!v || 'Masukkan kode OTP anda',
        (value) =>
          (value && value.length >= 6) || 'Kode OTP minimal 6 karakter',
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
    reset() {
      this.message = ''
      this.$axios
        .post(
          '/reset/code',
          {
            code: this.otp,
          },
          {
            headers: {
              'Content-Type': 'application/json',
            },
          }
        )
        .then((response) => {
          this.$router.push('/reset-password')
        })
        .catch((error) => {
          this.message = error.message
          this.snackbar = true
        })
    },
  },
}
</script>
