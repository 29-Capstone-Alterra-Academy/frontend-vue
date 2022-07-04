<template>
  <v-app>
    <v-row justify="center" align="center" class="pa-0 ma-0">
      <v-col cols="4">
        <v-list-item three-line>
          <v-list-item-content>
            <h1 class="mb-4">Daftar</h1>
            <v-form v-model="valid" @submit.prevent="register">
              <v-text-field
                v-model="email"
                :rules="emailRules"
                label="E-mail"
                required
                outlined
                dense
                clearable
                class="rounded-lg"
              ></v-text-field>
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
              <v-text-field
                v-model="confirmPassword"
                :append-icon="showPassword2 ? 'mdi-eye' : 'mdi-eye-off'"
                :rules="confirmPasswordRules"
                :type="showPassword2 ? 'text' : 'password'"
                name="input-10-2"
                label="Confirm Password"
                hint="Must be equal to password"
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
export default {
  name: 'LoginPage',
  layout: 'registration',
  data() {
    return {
      valid: false,
      username: '',
      password: '',
      confirmPassword: '',
      email: '',
      showPassword: false,
      showPassword2: false,
      nameRules: [(v) => !!v || 'This Field is required'],
      emailRules: [
        (v) => !!v || 'E-mail is required',
        (v) => /.+@.+/.test(v) || 'E-mail must be valid',
      ],
      rules: {
        required: (value) => !!value || 'Required.',
        min: (v) => v.length >= 8 || 'Min 8 characters',
      },
      confirmPasswordRules: [
        (v) => !!v || 'Password is required',
        (v) =>
          v ===
            (document.getElementById('password')
              ? document.getElementById('password').value
              : undefined) || 'Passwords do not match',
      ],
    }
  },
  computed: {
    error() {
      return this.$store.state.error
    },
  },
}
</script>
