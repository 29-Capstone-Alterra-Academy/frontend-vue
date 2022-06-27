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
                close
                @click="data.select"
                @click:close="remove(data.item.name)"
              >
                <v-avatar left>
                  <v-img :src="data.item.profile_image"></v-img>
                </v-avatar>
                {{ data.item.name }}
              </v-chip>
            </template>
            <template #item="data">
              <template v-if="typeof data.item !== 'object'">
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
                    <v-text-field
                      v-model="title"
                      class="rounded-lg"
                      label="Title"
                      placeholder="Input Your Title"
                      outlined
                      dense
                      hide-details
                    ></v-text-field>
                  </div>
                  <div class="py-2">
                    <v-textarea
                      v-model="content"
                      class="rounded-lg"
                      name="input-desc"
                      label="Text"
                      placeholder="Text (Optional)"
                      outlined
                      dense
                      hide-details
                    ></v-textarea>
                  </div>
                  <div class="py-2">
                    <p class="text-h6">Image or Video</p>
                    <v-file-input
                      v-model="images"
                      counter
                      multiple
                      truncate-length="5"
                      class="pt-0"
                    >
                      <template #selection="{ text, index, }">
                        <v-chip
                          small
                          text-color="white"
                          color="#295671"
                          close
                          @click:close="removeImage(index)"
                        >
                          {{ text }}
                        </v-chip>
                      </template>
                    </v-file-input>
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
                <h4 class="text-capitalize pb-2">Basic Rules</h4>

                <!-- <v-divider></v-divider> -->

                <div class="subtitle text--disabled py-1">
                  The Topic where the true asshole-ish nature of all cats is
                  displayed for the world to see.
                </div>
                <div class="subtitle text--disabled py-1">
                  The Topic where the true asshole-ish nature of all cats is
                  displayed for the world to see.
                </div>
                <div class="subtitle text--disabled py-1">
                  The Topic where the true asshole-ish nature of all cats is
                  displayed for the world to see.
                </div>
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
      images: [],
      author: {
        id: 7,
        profile_image: 'https://randomuser.me/api/portraits/women/84.jpg',
        username: 'UniqueUser7',
      },
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
    remove(item) {
      const index = this.selectedTopic.indexOf(item)
      if (index >= 0) {
        this.selectedTopic.splice(index, 1)
      }
    },
    removeImage (index) {
      this.images.splice(index, 1)
    },
    addPost() {},
  },
}
</script>

<style scoped></style>
