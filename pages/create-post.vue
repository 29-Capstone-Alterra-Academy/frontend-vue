<template>
  <v-container>
    <v-row justify="center" style="position: relative">
      <v-snackbar v-model="snackbar" :timeout="5000">
        Thread anda berhasil diposting
        <template #action="{ attrs }">
          <v-btn color="primary" text v-bind="attrs" @click="snackbar = false"
            >Close</v-btn
          >
        </template>
      </v-snackbar>
      <v-snackbar v-model="snackbarFalse" :timeout="5000">
        Terjadi kesalahan saat memposting thread
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
      <v-col cols="7">
        <h3 class="headline mb-3">Create Post</h3>
        <v-row>
          <v-col cols="auto" class="pb-1">
            <v-card class="rounded-lg" flat>
              <v-form v-model="valid">
                <v-select
                  v-model="selectedTopic"
                  :items="topics"
                  item-text="name"
                  item-value="id"
                  label="Choose Topic"
                  class="rounded-lg"
                  menu-props="{ top: true, offsetY: true }"
                  dense
                  outlined
                  :rules="topicRules"
                  hide-details="auto"
                  style="width: 321px"
                >
                  <div slot="prepend-item" class="px-3 py-1">
                    <v-text-field
                      v-model="search"
                      clearable
                      outlined
                      dense
                      flat
                      hide-details
                      class="rounded-lg"
                      prepend-inner-icon="mdi-magnify"
                      label="Search"
                      @keydown.enter.prevent="submit"
                    ></v-text-field>
                    <v-list-item-title
                      class="text--disabled body-2 pt-2"
                      v-text="`Following`"
                    />
                  </div>
                  <div slot="append-item" class="px-3 py-1">
                    <v-card
                      class="rounded-lg"
                      outlined
                      dense
                      @click="dialog = true"
                    >
                      <v-list-item>
                        <v-list-item-content>
                          <v-row align="center">
                            <v-col cols="auto">
                              <v-icon>mdi-plus</v-icon>
                            </v-col>
                            <v-col cols="auto"> Tambah Topic </v-col>
                          </v-row>
                        </v-list-item-content>
                      </v-list-item>
                    </v-card>
                    <Observer v-if="search === ''" @intersect="intersected" />
                  </div>
                  <template slot="selection" slot-scope="data">
                    <v-row v-row align="center" class="pa-1">
                      <v-col cols="auto" class="pa-1">
                        <v-img
                          :src="data.item.profile_image"
                          class="rounded-circle"
                          width="30"
                          height="30"
                        ></v-img>
                      </v-col>
                      <v-col cols="auto" class="pa-1">
                        <TopicShortener :name="data.item.name" />
                      </v-col>
                    </v-row>
                  </template>
                  <template slot="item" slot-scope="data">
                    <v-row align="center" class="pa-1">
                      <v-col cols="auto" class="pa-1">
                        <v-img
                          :src="data.item.profile_image"
                          class="rounded-circle"
                          width="30"
                          height="30"
                        ></v-img>
                      </v-col>
                      <v-col cols="auto" class="pa-1">
                        <TopicShortener :name="data.item.name" />
                      </v-col>
                    </v-row>
                  </template>
                </v-select>
              </v-form>
            </v-card>
            <AddTopic v-model="dialog" />
          </v-col>
          <v-col cols="12" class="py-1 my-1">
            <v-card class="rounded-lg mx-auto py-3 px-3" outlined>
              <v-row>
                <v-col cols="12">
                  <v-form v-model="valid" @submit.prevent="addPost">
                    <div class="">
                      <v-textarea
                        v-model="title"
                        :rules="titleRules"
                        rows="1"
                        class="rounded-lg"
                        label="Title"
                        placeholder="Input Your Title"
                        hide-details="auto"
                        auto-grow
                        outlined
                        dense
                      ></v-textarea>
                    </div>
                    <div class="py-2">
                      <v-textarea
                        v-model="content"
                        rows="6"
                        class="rounded-lg"
                        label="Text"
                        placeholder="Text (Optional)"
                        counter
                        auto-grow
                        outlined
                        dense
                        hide-details
                      ></v-textarea>
                    </div>
                    <div class="py-2">
                      <p class="text-h6">Image</p>
                      <v-card
                        outlined
                        dense
                        class="rounded-lg"
                        :class="{ 'grey lighten-2': dragover }"
                        @drop.prevent="onDrop($event)"
                        @dragover.prevent="dragover = true"
                        @dragenter.prevent="dragover = true"
                        @dragleave.prevent="dragover = false"
                      >
                        <v-card-text>
                          <v-row
                            class="d-flex flex-column"
                            dense
                            align="center"
                            justify="center"
                          >
                            <v-icon
                              :class="[dragover ? 'mt-2, mb-6' : 'mt-5']"
                              size="60"
                            >
                              mdi-cloud-upload
                            </v-icon>
                            <v-row align="center">
                              <v-col cols="7">
                                <p class="ma-0">Drop your image here, or</p>
                              </v-col>
                              <v-col cols="5">
                                <div>
                                  <v-btn
                                    class="text-none rounded-lg"
                                    text
                                    outlined
                                    depressed
                                    :loading="isSelecting"
                                    @click="onButtonClick"
                                  >
                                    Upload File
                                  </v-btn>
                                  <input
                                    ref="uploader"
                                    class="d-none"
                                    type="file"
                                    accept="image/*"
                                    @change="inputChanged"
                                  />
                                </div>
                              </v-col>
                            </v-row>
                          </v-row>
                          <v-virtual-scroll
                            v-if="images.length > 0"
                            :items="images"
                            height="150"
                            item-height="50"
                          >
                            <template #default="{ item }">
                              <v-list-item :key="item.name">
                                <v-list-item-content>
                                  <v-list-item-title outlined>
                                    {{ item.name }}
                                    <span class="ml-3 text--secondary">
                                      {{ item.size }} bytes</span
                                    >
                                  </v-list-item-title>
                                </v-list-item-content>

                                <v-list-item-action>
                                  <v-btn
                                    icon
                                    @click.stop="removeFile(item.name)"
                                  >
                                    <v-icon> mdi-close-circle </v-icon>
                                  </v-btn>
                                </v-list-item-action>
                              </v-list-item>

                              <v-divider></v-divider>
                            </template>
                          </v-virtual-scroll>
                        </v-card-text>
                      </v-card>
                    </div>
                    <div class="py-2">
                      <v-btn
                        type="submit"
                        color="primary"
                        class="rounded-lg"
                        :disabled="!valid"
                        >Post</v-btn
                      >
                    </div>
                  </v-form>
                </v-col>
              </v-row>
            </v-card>
          </v-col>
        </v-row>
      </v-col>
      <v-col cols="4" style="width: 373.75px">
        <v-row style="position: fixed; width: inherit">
          <v-col cols="12">
            <v-card class="rounded-lg" outlined>
              <v-list-item three-line>
                <v-list-item-content>
                  <h4 class="font-weight-medium mb-3">Basic Rules</h4>
                  <div class="pb-1">
                    <v-divider />
                  </div>
                  <v-row>
                    <v-col cols="12">
                      <section
                        v-for="(rule, index) in basicRules.split('\n')"
                        :key="index"
                      >
                        <div
                          class="subtitle-1 font-weight-light py-1"
                          style="line-height: inherit"
                        >
                          {{ rule }}
                        </div>
                      </section>
                    </v-col>
                  </v-row>
                </v-list-item-content>
              </v-list-item>
            </v-card>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import INSERT_THREADS from '~/apollo/mutations/insert-thread'

import Observer from '~/components/ObserverScroll'
import AddTopic from '~/components/cards/AddTopic'
import TopicShortener from '~/components/utils/TopicShortener'

export default {
  name: 'CreatePost',
  components: {
    Observer,
    AddTopic,
    TopicShortener,
  },
  middleware: 'authenticated',
  data() {
    return {
      selectedTopic: [],
      title: '',
      content: '',
      search: '',
      valid: false,
      snackbar: false,
      snackbarFalse: false,
      dragover: false,
      dialog: false,
      isSelecting: false,
      images: [],
      addedImages: [],
      multiple: true,
      topics: [],
      newTopics: [],
      offset: 0,
      topicRules: [(v) => !!v || 'Silahkan pilih topik'],
      titleRules: [(v) => !!v || 'Silahkan masukkan judul thread anda'],
      basicRules:
        '1. Selalu ingat postingan Anda akan dibaca banyak orang\n2. Berperilaku seperti yang Anda lakukan di kehidupan nyata\n3. Cari sumber konten asli\n4. Cari duplikat sebelum memposting\n5. Baca aturan Topik\n',
    }
  },
  watch: {
    dialog() {
      this.intersected()
    },
  },
  created() {
    this.$store.dispatch('lists/fetchTopics')
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
    inputChanged(e) {
      if (this.images.length < 5) {
        this.images = [...this.images, ...e.target.files]
      }
    },
    removeFile(fileName) {
      // Find the index of the
      const index = this.images.findIndex((file) => file.name === fileName)
      // If file is in uploaded files remove it
      if (index > -1) this.images.splice(index, 1)
    },
    onDrop(e) {
      this.dragover = false
      // If user has uploaded multiple files but the component is not multiple throw error
      if (!this.multiple && e.dataTransfer.files.length > 1) {
        this.$store.dispatch('addNotification', {
          message: 'Only one file can be uploaded at a time..',
          colour: 'error',
        })
      }
      // Add each file to the array of uploaded files
      else
        for (const image of e.dataTransfer.files) {
          if (this.images.length < 5) this.images.push(image)
        }
    },
    addPost() {
      const formData = new FormData()
      console.log(this.selectedTopic)
      formData.append('title', this.title)
      console.log(this.title)
      formData.append('content', this.content)
      console.log(this.content)
      for (let i = 0; i < this.images.length; i++) {
        formData.append('image_' + [i + 1], this.images[i])
      }
      for (const pair of formData.entries()) {
        console.log(pair[0] + ', ' + pair[1])
      }
      this.$axios
        .post('/topic/' + this.selectedTopic + '/thread', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: 'Bearer ' + this.$store.state.auth.accessToken,
          },
        })
        .then((response) => {
          if (response.status === 201) {
            console.log(response)
            this.snackbar = true
            this.selectedTopic = []
            this.title = ''
            this.content = ''
            this.search = ''
            this.images = []
            try {
              this.$apollo.mutate({
                mutation: INSERT_THREADS,
                variables: {
                  user_name: this.$store.state.lists.profile.username,
                  id: response.data.id,
                },
              })
            } catch (error) {
              console.log(error)
            }
          }
        })
        .catch((error) => {
          if (error.status) {
            this.snackbarFalse = true
            this.selectedTopic = []
            this.title = ''
            this.content = ''
            this.search = ''
            this.images = []
          }
        })
    },
    intersected() {
      if (this.newTopics.length === 5 || this.newTopics.length === 0) {
        this.$axios
          .get(`/topic?limit=5&offset=${this.offset}`)
          .then((res) => {
            if (res.data.length !== 0) {
              this.offset += 5
              this.newTopics = res.data
              this.topics = [...this.topics, ...this.newTopics]
            }
          })
          .catch((err) => {
            console.log(err)
          })
      }
    },
    submit() {
      this.$axios
        .get(`/search?scope=topic&keyword=${this.search}&limit=100&offset=0`)
        .then((res) => {
          this.topics = [...res.data]
        })
        .catch((err) => {
          console.log(err)
        })
    },
  },
}
</script>

<style scoped></style>
