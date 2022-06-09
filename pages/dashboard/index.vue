<template>
  <v-row justify="center" style="position: relative">
    <v-col cols="7">
      <v-row>
        <v-col cols="12">
          <v-card class="rounded-lg mx-auto" outlined>
            <v-row class="pt-4 pb-0 mr-1 pl-2">
              <v-col cols="11">
                <v-text-field
                  label="New Post"
                  placeholder="Create New Post"
                  outlined
                  dense
                ></v-text-field>
              </v-col>
              <v-col cols="1">
                <div class="text-center mt-1">
                  <v-icon>mdi-image-plus</v-icon>
                </div>
              </v-col>
            </v-row>
          </v-card>
        </v-col>
        <v-col cols="12">
          <v-card class="rounded-lg mx-auto py-3 px-3" outlined>
            <v-row>
              <v-col cols="auto">
                <v-btn outlined class="text-capitalize">
                  <v-icon>mdi-fire</v-icon>Rekomendasi
                </v-btn>
              </v-col>
              <v-col cols="auto">
                <v-btn outlined class="text-capitalize">Mengikuti</v-btn>
              </v-col>
            </v-row>
          </v-card>
        </v-col>
        <v-col v-for="thread in threads" :key="thread.id" cols="12">
          <PostCard :thread="thread" />
        </v-col>
      </v-row>
    </v-col>
    <v-col cols="4" style="width: 373.75px">
      <v-row style="position: fixed; width: inherit">
        <v-col cols="12">
          <v-card class="rounded-lg" outlined>
            <v-list-item three-line>
              <v-list-item-content>
                <h4 class="text-overline">Hot Topic</h4>
                <v-row>
                  <v-col v-for="topic in topics" :key="topic.id" cols="12">
                    <v-row>
                      <v-col cols="1" class="pr-0" style="max-width: 2rem">
                        <div class="text-overline mb-4">{{ topic.id }}.</div>
                      </v-col>
                      <v-col cols="1" class="px-2" style="max-width: none">
                        <v-img
                          :src="topic.image"
                          class="image-rounded"
                          width="30"
                        ></v-img>
                      </v-col>
                      <v-col class="pl-0">
                        <div class="text-overline mb-4">
                          {{ topic.name }}
                        </div>
                      </v-col>
                      <v-col cols="2" style="max-width: 10rem">
                        <v-btn class="text-capitalize">Follow</v-btn>
                      </v-col>
                    </v-row>
                  </v-col>
                </v-row>
              </v-list-item-content>
            </v-list-item>
          </v-card>
        </v-col>
        <v-col cols="12">
          <v-card class="rounded-lg" outlined>
            <v-list-item three-line>
              <v-list-item-content>
                <v-row>
                  <v-col cols="12">
                    <v-btn
                      outlined
                      block
                      small
                      class="rounded-lg text-capitalize text-left p-2"
                    >
                      <v-icon>mdi-plus</v-icon>
                      Create New Post
                    </v-btn>
                  </v-col>
                  <v-col cols="12">
                    <v-btn
                      outlined
                      block
                      small
                      class="rounded-lg text-capitalize text-left p-2"
                    >
                      <v-icon>mdi-plus</v-icon>
                      Create New Topic
                    </v-btn>
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
  name: 'IndexPage',
  props: {
    searchPost: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      topics: [
        {
          id: 1,
          name: 'Technology',
          image: 'https://randomuser.me/api/portraits/women/84.jpg',
        },
        {
          id: 2,
          name: 'Kucing',
          image: 'https://randomuser.me/api/portraits/women/84.jpg',
        },
      ],
    }
  },
  computed: {
    threads() {
      if (this.searchPost) {
        return this.$store.state.threads.lists.filter((item) => {
          return item.slug.toLowerCase().includes(this.searchPost.toLowerCase())
        })
      }
      return this.$store.state.threads.lists
    },
  },
}
</script>

<style scoped>
.image-rounded.theme--dark {
  border-radius: 50%;
}
</style>
