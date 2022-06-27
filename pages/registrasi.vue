<template>
  <v-app>
    <v-row class="pa-0 ma-0">
      <v-col cols="10" class="pa-0 ma-0" style="position: relative">
        <v-img
          :src="require(`~/assets/registration-image.png`)"
          alt=""
          style="
            max-height: 100%;
            max-width: 100%;
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            object-fit: contain;
            object-position: center;
            margin: auto;
          "
        >
        </v-img>
      </v-col>
      <v-col cols="2" style="position: relative">
        <div
          style="
            position: absolute;
            margin: 0;
            top: 50%;
            -ms-transform: translateY(-50%);
            transform: translateY(-50%);
          "
        >
          <v-list-item three-line>
            <v-list-item-content>
              <div class="overline mb-4">Daftar</div>
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
        </div>
      </v-col>
    </v-row>
  </v-app>
</template>
<script>
import { mapMutations } from "vuex";

export default {
  name: 'LoginPage',
  layout: 'registration',
  data() {
    return {
      valid: false,
      username: '',
      password: '',
      email: '',
      showPassword: false,
      nameRules: [(v) => !!v || 'This Field is required'],
      emailRules: [
        (v) => !!v || 'E-mail is required',
        (v) => /.+@.+/.test(v) || 'E-mail must be valid',
      ],
      rules: {
        required: (value) => !!value || 'Required.',
        min: (v) => v.length >= 8 || 'Min 8 characters',
      },
    }
  },
  computed: {
    error() {
      return this.$store.state.error
    },
  },
  methods: {
    ...mapMutations('auth', ["setAccessToken", "setRefreshToken"]),
    async register(e) {
      e.preventDefault();
      const response = await fetch("https://virtserver.swaggerhub.com/etrnal70/nomizo/1.0.0/register", {
        method: "POST",
        headers: {
          "accept": "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: this.username,
          password: this.password,
          email: this.email,
        }),
      });
      // eslint-disable-next-line camelcase
      const { accesss_token, refresh_token } = await response.json();
      // eslint-enable-next-line camelcase
      this.setAccessToken(accesss_token);
      this.setRefreshToken(refresh_token);
      this.$router.push("/login");
    },
  },
}
</script>
