<template>
  <v-dialog :value="value" max-width="500" @input="$emit('input', $event)">
    <v-snackbar v-model="snackbar" :timeout="5000">
      Topik baru berhasil dibuat
      <template #action="{ attrs }">
        <v-btn color="primary" text v-bind="attrs" @click="snackbar = false"
          >Close</v-btn
        >
      </template>
    </v-snackbar>
    <v-snackbar v-model="snackbarFalse" :timeout="5000">
      Terjadi kesalahan saat membuat topik baru
      <template #action="{ attrs }">
        <v-btn
          color="warning"
          text
          v-bind="attrs"
          @click="snackbarFalse = false"
          >Close</v-btn
        >
      </template>
    </v-snackbar>
    <v-card>
      <v-card-title class="text-h5">
        <v-col cols="11" class="pa-0"> Ubah Data Diri </v-col>
        <v-col cols="auto" class="pa-0">
          <v-btn icon @click.native="$emit('input', false)">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-col>
      </v-card-title>
      <v-card-title class="pt-0">
        <v-divider />
      </v-card-title>

      <v-card-text>
        <v-form v-model="valid" @submit.prevent="editProfile">
          <div class="">
            <v-textarea
              v-model="username"
              :rules="usernameRules"
              rows="1"
              class="rounded-lg"
              placeholder="Username"
              counter="25"
              auto-grow
              outlined
              dense
            ></v-textarea>
          </div>
          <div class="py-2">
            <v-textarea
              v-model="bio"
              rows="6"
              class="rounded-lg"
              placeholder="Bio (Optional)"
              auto-grow
              outlined
              dense
              hide-details
            ></v-textarea>
          </div>
          <div class="py-2">
            <v-textarea
              v-model="email"
              :rules="emailRules"
              rows="1"
              class="rounded-lg"
              placeholder="Email"
              auto-grow
              outlined
              dense
              hide-details="auto"
            ></v-textarea>
          </div>
          <div class="py-2">
            <v-textarea
              v-model="gender"
              :rules="genderRules"
              rows="1"
              class="rounded-lg"
              placeholder="Jenis Kelamin"
              auto-grow
              outlined
              dense
              hide-details="auto"
            ></v-textarea>
          </div>
          <div class="py-2">
            <p class="text-h6">Tanggal Lahir</p>
            <v-dialog
              ref="dialog"
              v-model="modal"
              :return-value.sync="date"
              persistent
              width="400px"
            >
              <template #activator="{ on, attrs }">
                <v-text-field
                  v-model="date"
                  :rules="dateRules"
                  prepend-icon="mdi-calendar"
                  class="rounded-lg"
                  dense
                  readonly
                  outlined
                  hide-details="auto"
                  v-bind="attrs"
                  v-on="on"
                ></v-text-field>
              </template>
              <v-date-picker v-model="date" max="2002-02-15" scrollable>
                <v-spacer></v-spacer>
                <v-btn text color="primary" @click="modal = false">
                  Cancel
                </v-btn>
                <v-btn text color="primary" @click="$refs.dialog.save(date)">
                  OK
                </v-btn>
              </v-date-picker>
            </v-dialog>
          </div>
          <div class="py-2">
            <p class="text-h6">Image</p>
            <v-row align="center">
              <v-col cols="auto">
                <v-img
                  :src="imageUrl"
                  class="rounded-circle"
                  style="background: grey"
                  width="100"
                  height="100"
                ></v-img>
              </v-col>
              <v-col cols="auto">
                <div>
                  <v-btn
                    class="text-none rounded-lg"
                    text
                    outlined
                    depressed
                    :loading="isSelecting"
                    @click="onButtonClick"
                  >
                    {{ buttonText }}
                  </v-btn>
                  <input
                    ref="uploader"
                    class="d-none"
                    type="file"
                    accept="image/*"
                    @change="onFileChanged"
                  />
                </div>
              </v-col>
            </v-row>
          </div>
          <div>
            <v-btn
              type="submit"
              color="primary"
              class="rounded-lg text-capitalize"
              :disabled="!valid"
            >
              Ubah
            </v-btn>
          </div>
        </v-form>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  props: {
    value: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      username: '',
      date: '2022-07-16',
      bio: '',
      email: '',
      gender: '',
      defaultButtonText: 'Unggah Foto',
      defaultImage: '',
      valid: false,
      modal: false,
      snackbar: false,
      snackbarFalse: false,
      selectedFile: null,
      isSelecting: false,
      usernameRules: [
        (value) => !!value || 'Masukkan username baru anda',
        (value) =>
          (value && value.length <= 25) || 'Username maksimal 25 karakter',
      ],
      emailRules: [
        (value) => !!value || 'Masukkan email baru anda',
        (value) =>
          (value && value.length <= 25) || 'Nama topik maksimal 25 karakter',
      ],
      genderRules: [
        (value) => !!value || 'Masukkan jenis kelamin anda (male/female)',
        (value) =>
          (value && value.length <= 25) || 'Nama topik maksimal 25 karakter',
      ],
      dateRules: [
        (value) => !!value || 'Masukkan jtanggal lahir anda',
        (value) =>
          (value && value.length <= 25) || 'Nama topik maksimal 25 karakter',
      ],
    }
  },
  computed: {
    buttonText() {
      return this.selectedFile ? this.selectedFile.name : this.defaultButtonText
    },
    imageUrl() {
      return this.selectedFile
        ? URL.createObjectURL(this.selectedFile)
        : this.defaultButtonText
    },
    profile() {
      return this.$store.state.lists.profile
    },
  },
  methods: {
    onButtonClick() {
      this.isSelecting = true
      window.addEventListener(
        'focus',
        () => {
          this.isSelecting = false
        },
        { once: true }
      )

      this.$refs.uploader.click()
    },
    onFileChanged(e) {
      this.selectedFile = e.target.files[0]

      // do something
    },
    editProfile() {
      const formData = new FormData()
      formData.append('username', this.username)
      console.log(this.username)
      formData.append('bio', this.bio)
      console.log(this.bio)
      formData.append('email', this.email)
      console.log(this.email)
      formData.append('gender', this.gender)
      console.log(this.gender)
      formData.append('birth_date', this.date)
      console.log(this.date)
      formData.append('profile_image', this.selectedFile)
      console.log(this.selectedFile)
      for (const pair of formData.entries()) {
        console.log(pair[0] + ', ' + pair[1])
      }
        this.$axios
          .put('/profile', formData, {
            headers: {
              'Content-Type': 'application/json',
              Authorization: 'Bearer ' + this.$store.state.auth.accessToken,
            },
          })
          .then((response) => {
            console.log(response.data)
            if (response.status === 204) {
              this.snackbar = true
              this.username = ''
              this.bio = ''
              this.email = ''
              this.selectedFile = null
            }
          })
          .catch((error) => {
            if (error.status) {
              this.snackbarFalse = true
              this.username = ''
              this.bio = ''
              this.email = ''
              this.selectedFile = null
            }
          })
    },
  },
}
</script>
