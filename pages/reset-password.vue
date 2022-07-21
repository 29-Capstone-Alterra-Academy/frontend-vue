<template>
  <v-app>
    <v-snackbar v-model="snackbar" :timeout="5000">
      Password yang anda masukkan tidak memenuhi syarat
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
            <h1 class="mb-4">Reset Password</h1>
            <v-form v-model="valid" @submit.prevent="reset">
              <v-text-field
                id="password"
                v-model="password"
                :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                :rules="rules"
                :type="showPassword ? 'text' : 'password'"
                name="input-10-2"
                placeholder="Password"
                class="input-group--focused rounded-lg py-2"
                hide-details="auto"
                outlined
                dense
                @input="confirmPassword = ''"
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
                class="input-group--focused rounded-lg py-2 pb-4"
                hide-details="auto"
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
                Reset Password
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
      password: '',
      confirmPassword: '',
      message: '',
      snackbar: false,
      rules: [
        (value) => !!value || 'Masukkan password anda',
        (value) =>
          (value && /\d/.test(value)) ||
          'Password harus mengandung setidaknya satu angka',
        (value) =>
          (value && /[A-Z]{1}/.test(value)) ||
          'Password harus mengandung setidaknya satu huruf kapital',
        (value) =>
          (value && value.length >= 8) || 'Password minimal 8 karakter',
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
    reset() {
      this.message = ''
      this.$axios
        .post(
          '/reset/newpassword',
          {
            newpassword: this.password,
          },
          {
            headers: {
              'Content-Type': 'application/json',
            },
          }
        )
        .then((response) => {
          this.$router.push('/verify')
        })
        .catch((error) => {
          this.message = error.message
          this.snackbar = true
        })
    },
  },
}
</script>
