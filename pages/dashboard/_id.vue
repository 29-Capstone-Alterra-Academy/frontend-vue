<template>
  <v-row justify="center" style="position: relative">
    <v-col cols="7">
      <v-row>
        <v-col
          v-for="thread in threads"
          :key="thread.id"
          cols="12"
          class="pt-3 py-1"
        >
          <section
            v-for="topic in topics.filter(
              (topic) => topic.id === thread.topic_id
            )"
            :key="topic.id"
          >
            <PostCardComment :thread="thread" :topic="topic"/>
          </section>
        </v-col>
      </v-row>
    </v-col>
    <v-col cols="4" style="width: 373.75px">
      <v-row style="position: fixed; width: inherit">
        <v-col cols="12" class="pt-3 py-1">
          <v-card class="rounded-lg" outlined>
            <v-list-item three-line>
              <v-list-item-content>
                <h4 class="text-capitalize mb-3">Hot Topic</h4>
                <v-row>
                  <v-col v-for="topic in topics" :key="topic.id" cols="12">
                    <v-row>
                      <v-col cols="1" class="pr-0" style="max-width: 2rem">
                        <div class="text-overline">{{ topic.id }}.</div>
                      </v-col>
                      <v-col cols="1" class="px-2" style="max-width: none">
                        <v-img
                          :src="topic.image"
                          class="image-rounded"
                          width="30"
                        ></v-img>
                      </v-col>
                      <v-col class="pl-0">
                        <div class="text-overline">
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
        <v-col cols="12" class="py-1">
          <v-card class="rounded-lg" outlined>
            <v-list-item three-line>
              <v-list-item-content>
                <h4 class="text-capitalize mb-3">Hot Contributors</h4>
                <v-row>
                  <v-col
                    v-for="contributor in contributors"
                    :key="contributor.id"
                    cols="12"
                  >
                    <v-row>
                      <v-col cols="1" class="pr-0" style="max-width: 2rem">
                        <div class="text-overline">{{ contributor.id }}.</div>
                      </v-col>
                      <v-col cols="1" class="px-2" style="max-width: none">
                        <v-img
                          :src="contributor.image"
                          class="image-rounded"
                          width="30"
                        ></v-img>
                      </v-col>
                      <v-col class="pl-0" align-self="center">
                        <div class="text-p">@{{ contributor.username }}</div>
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
        <v-col cols="12" class="py-1">
          <v-card class="rounded-lg" outlined>
            <v-list-item>
              <v-list-item-content>
                <v-row>
                  <v-col cols="12" class="py-3">
                    <v-btn
                      outlined
                      block
                      class="rounded-lg text-capitalize my-auto"
                      to="/create-post"
                    >
                      <div class="mr-auto">
                        <v-icon>mdi-plus</v-icon>
                        Create New Post
                      </div>
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
      contributors: [
        {
          id: 1,
          username: 'chupachups',
          image: 'https://randomuser.me/api/portraits/women/50.jpg',
        },
        {
          id: 2,
          username: 'marsonmark',
          image: 'https://randomuser.me/api/portraits/women/81.jpg',
        },
      ],
    }
  },
  computed: {
    threads() {
      if (this.$route.params.id) {
        return this.$store.state.threads.lists.filter((item) => {
          return item.id.toString().includes(this.$route.params.id)
        })
      }
      return this.$store.state.threads.lists
    },
    topics() {
      // if (this.searchPost) {
      //   return this.$store.state.topics.lists.filter((item) => {
      //     return item.name.toLowerCase().includes(this.searchPost.toLowerCase())
      //   })
      // }
      return this.$store.state.topics.lists
    },
  },
}
</script>

<style scoped>
.image-rounded.theme--dark {
  border-radius: 50%;
}
</style>
