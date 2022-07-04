<template>
  <v-app>
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
                label="Username"
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
                :rules="[rules.required, rules.min]"
                :type="showPassword ? 'text' : 'password'"
                name="input-10-2"
                label="Password"
                hint="At least 8 characters"
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
export default {
  name: 'LoginPage',
  layout: 'registration',
  data() {
    return {
      valid: false,
      username: '',
      password: '',
      showPassword: false,
      nameRules: [(v) => !!v || 'This Field is required'],
      rules: {
        required: (value) => !!value || 'Required.',
        min: (v) => v.length >= 8 || 'Min 8 characters',
        emailMatch: () => `The email and password you entered don't match`,
      },
    }
  },
  computed: {
    error() {
      return this.$store.state.error
    },
  },
}
</script>
