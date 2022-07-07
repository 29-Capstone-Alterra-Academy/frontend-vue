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
        <v-col cols="11" class="pa-0"> Buat Topik Baru </v-col>
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
        <div class="">
          <v-textarea
            v-model="title"
            rows="1"
            class="rounded-lg"
            label="Nama Topik"
            placeholder="Nama Topik"
            counter
            auto-grow
            outlined
            dense
            hide-details
          ></v-textarea>
        </div>
        <div class="py-2">
          <v-textarea
            v-model="description"
            rows="6"
            class="rounded-lg"
            label="Deskripsi (Optional)"
            placeholder="Deskripsi (Optional)"
            counter
            auto-grow
            outlined
            dense
            hide-details
          ></v-textarea>
        </div>
        <div class="">
          <v-textarea
            v-model="rules"
            rows="1"
            class="rounded-lg"
            label="Tambah Rules (Opsional)"
            placeholder="Tambah Rules (Opsional)"
            counter
            auto-grow
            outlined
            dense
            hide-details
          ></v-textarea>
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
                  color="primary"
                  class="text-none rounded-lg"
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
      </v-card-text>

      <v-card-actions>
        <v-btn color="green darken-1" text @click="addTopic"> Buat Baru </v-btn>
      </v-card-actions>
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
      title: '',
      description: '',
      rules: '',
      defaultButtonText: 'Unggah Foto',
      defaultImage: '',
      snackbar: false,
      snackbarFalse: false,
      selectedFile: null,
      isSelecting: false,
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
    addTopic() {
      const formData = new FormData()
      formData.append('name', this.title)
      console.log(this.title)
      formData.append('description', this.description)
      console.log(this.description)
      formData.append('rules', this.rules)
      console.log(this.rules)
      formData.append('profile_image', this.selectedFile)
      console.log(this.selectedFile)
      for (const pair of formData.entries()) {
        console.log(pair[0] + ', ' + pair[1])
      }
      this.$axios
        .post(
          '/topic',
          formData,
          {
            headers: {
              'Content-Type': 'multipart/form-data',
              Authorization: 'Bearer ' + this.$store.state.auth.accessToken,
            },
          }
        )
        .then((response) => {
          if (response.status === 201) {
            this.snackbar = true
            this.title = ''
            this.description = ''
            this.rules = ''
            this.selectedFile = null
          }
        })
        .catch((error) => {
          if (error.status) {
            this.snackbarFalse = true
            this.title = ''
            this.description = ''
            this.rules = ''
            this.selectedFile = null
          }
        })
    },
  },
}
</script>
