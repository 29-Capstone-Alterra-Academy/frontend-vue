<template>
  <v-app>
    <v-snackbar v-model="snackbar" :timeout="5000">
      Email yang anda masukkan tidak tersedia
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
                v-model="email"
                :rules="emailRules"
                placeholder="E-mail"
                required
                outlined
                dense
                clearable
                class="rounded-lg py-2"
                hide-details="auto"
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
      email: '',
      message: '',
      snackbar: false,
      emailRules: [
        (v) => !!v || 'Masukkan alamat e-mail anda',
        (v) =>
          !v ||
          /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) ||
          'E-mail tidak valid',
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
          '/reset',
          {
            email: this.email,
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
