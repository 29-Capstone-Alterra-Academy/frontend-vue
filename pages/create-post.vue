<template>
  <v-row justify="center" style="position: relative">
    <v-col cols="7">
      <h3 class="headline mb-3">Create Post</h3>
      <v-row>
        <v-col cols="auto" class="pb-1">
          <v-autocomplete
            v-model="selectedTopic"
            :items="topics"
            item-text="name"
            item-value="name"
            placeholder="Create Topic"
            class="rounded-lg"
            outlined
            dense
            hide-details
          >
            <template #selection="data">
              <v-chip
                v-bind="data.attrs"
                :input-value="data.selected"
                @click="data.select"
              >
                <v-avatar left>
                  <v-img :src="data.item.profile_image"></v-img>
                </v-avatar>
                {{ data.item.name }}
              </v-chip>
            </template>
            <template #item="data">
              <template v-if="data.item.length === 0">
                <v-list-item-content v-text="data.item"></v-list-item-content>
              </template>
              <template v-else>
                <v-list-item-avatar>
                  <img :src="data.item.profile_image" />
                </v-list-item-avatar>
                <v-list-item-content>
                  <v-list-item-title
                    v-html="data.item.name"
                  ></v-list-item-title>
                </v-list-item-content>
              </template>
            </template>
          </v-autocomplete>
        </v-col>
        <v-col cols="12" class="py-1 my-1">
          <v-card class="rounded-lg mx-auto py-3 px-3" outlined>
            <v-form>
              <v-row>
                <v-col cols="12">
                  <div class="">
                    <v-textarea
                      :value="title"
                      rows="1"
                      class="rounded-lg"
                      label="Title"
                      placeholder="Input Your Title"
                      counter
                      auto-grow
                      outlined
                      dense
                      hide-details
                    ></v-textarea>
                  </div>
                  <div class="py-2">
                    <v-textarea
                      :value="content"
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
                    <p class="text-h6">Image or Video</p>
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
                          <p>
                            Drop your file(s) here, or click to select them.
                          </p>
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
                                <v-btn icon @click.stop="removeFile(item.name)">
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
                    <v-btn elevation="2" color="teal" outlined @click="addPost"
                      >Post</v-btn
                    >
                  </div>
                </v-col>
              </v-row>
            </v-form>
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
</template>

<script>
export default {
  name: 'CreatePost',
  middleware: 'authenticated',
  data() {
    return {
      selectedTopic: [],
      title: '',
      content: '',
      dragover: false,
      images: [],
      multiple: true,
      author: {
        id: 7,
        profile_image: 'https://randomuser.me/api/portraits/women/84.jpg',
        username: 'UniqueUser7',
      },
      basicRules:
        '1. Selalu ingat postingan Anda akan dibaca banyak orang\n2. Berperilaku seperti yang Anda lakukan di kehidupan nyata\n3. Cari sumber konten asli\n4. Cari duplikat sebelum memposting\n5. Baca aturan Topik\n',
    }
  },
  computed: {
    topics() {
      return this.$store.state.lists.topics
    },
  },
  created() {
    this.$store.dispatch('lists/fetchTopics')
  },
  methods: {
    removeFile(fileName) {
      // Find the index of the
      const index = this.images.findIndex(
        file => file.name === fileName
      );
      // If file is in uploaded files remove it
      if (index > -1) this.images.splice(index, 1);
    },
    onDrop(e) {
      this.dragover = false;
      // If user has uploaded multiple files but the component is not multiple throw error
      if (!this.multiple && e.dataTransfer.files.length > 1) {
        this.$store.dispatch("addNotification", {
          message: "Only one file can be uploaded at a time..",
          colour: "error"
        });
      }
      // Add each file to the array of uploaded files
      else
        for (const image of e.dataTransfer.files) {
          this.images.push(image)
        }
    },
    addPost() {}
  },
}
</script>

<style scoped></style>
