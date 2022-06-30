<template>
  <v-row justify="center" style="position: relative">
    <v-col cols="7">
      <v-row>
        <v-col cols="12" class="pt-3 py-1">
          <v-card class="rounded-lg mx-auto py-2 px-4" outlined>
            <v-btn
              outlined
              block
              class="rounded-lg text-capitalize"
              to="/create-post"
            >
              <div class="mr-auto">
                <v-icon>mdi-plus</v-icon>
                Create New Post
              </div>
            </v-btn>
          </v-card>
        </v-col>
        <v-col cols="12" class="py-1">
          <v-card class="rounded-lg mx-auto py-3 px-3" outlined>
            <v-row>
              <v-tabs v-model="tab" class="ma-2 ml-4" hide-slider>
                <v-tab
                  v-for="item in items"
                  :key="item.tab"
                  class="rounded-lg text-capitalize px-1 mr-3"
                  style="min-width: 0px"
                >
                  <v-col cols="auto">
                    <v-row align="center" justify="center">
                      <v-col cols="auto">
                        <v-icon>{{ item.icon }}</v-icon>
                      </v-col>
                      <v-col cols="auto">
                        {{ item.tab }}
                      </v-col>
                    </v-row>
                  </v-col>
                </v-tab>
              </v-tabs>
            </v-row>
          </v-card>
        </v-col>
        <v-tabs-items v-model="tab">
          <v-tab-item v-for="item in items" :key="item.tab">
            <section v-if="item.tab == `Rekomendasi`">
              <v-col
                v-for="thread in threads"
                :key="thread.id"
                cols="12"
                class="py-1"
              >
                <PostCard :thread="thread" />
              </v-col>
            </section>
            <section v-if="item.tab == `Mengikuti`">
              <v-col
                v-for="thread in threads"
                :key="thread.id"
                cols="12"
                class="py-1"
              >
                <PostCard :thread="thread" />
              </v-col>
            </section>
          </v-tab-item>
        </v-tabs-items>
      </v-row>
    </v-col>
    <v-col cols="4" style="width: 373.75px">
      <v-row
        class="hide-scrollbar"
        style="position: fixed; width: inherit; height: 86%; overflow-y: scroll"
      >
        <v-col cols="12" class="pt-3 py-1">
          <v-card class="rounded-lg" outlined>
            <v-list-item three-line>
              <v-list-item-content>
                <h4 class="text-capitalize mb-3">Hot Topic</h4>
                <v-row>
                  <v-col
                    v-for="(topic, index) in topicsToBeShown"
                    :key="topic.id"
                    cols="12"
                  >
                    <v-row>
                      <v-col>
                        <router-link
                          :to="`/topic/${topic.name}`"
                          style="text-decoration: none; color: black"
                        >
                          <v-row>
                            <v-col
                              cols="1"
                              class="pr-0"
                              style="max-width: 2rem"
                            >
                              <div class="text-overline">{{ index + 1 }}.</div>
                            </v-col>
                            <v-col
                              cols="1"
                              class="px-2"
                              style="max-width: none"
                            >
                              <v-img
                                :src="topic.profile_image"
                                class="rounded-circle"
                                width="30"
                              ></v-img>
                            </v-col>
                            <v-col class="pl-0" align-self="center">
                              <TopicShortener :name="topic.name" />
                            </v-col>
                          </v-row>
                        </router-link>
                      </v-col>
                      <v-col cols="2" style="max-width: 10rem">
                        <v-btn class="text-capitalize">Follow</v-btn>
                      </v-col>
                    </v-row>
                  </v-col>
                </v-row>
                <v-row justify="center" align="center">
                  <v-col v-show="currentTopicPage != 1" cols="auto">
                    <span class="click-cursor" @click="prevTopicPage">
                      View Less
                    </span>
                  </v-col>
                  <v-col
                    v-show="currentTopicPage != totalTopicPages"
                    cols="auto"
                  >
                    <span class="click-cursor" @click="nextTopicPage">
                      View More
                    </span>
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
                    v-for="(contributor, index) in usersToBeShown"
                    :key="contributor.id"
                    cols="12"
                  >
                    <v-row>
                      <v-col>
                        <router-link
                          :to="`/user/${contributor.username}`"
                          style="text-decoration: none; color: black"
                        >
                          <v-row>
                            <v-col
                              cols="1"
                              class="pr-0"
                              style="max-width: 2rem"
                            >
                              <div class="text-overline">{{ index + 1 }}.</div>
                            </v-col>
                            <v-col
                              cols="1"
                              class="px-2"
                              style="max-width: none"
                            >
                              <v-img
                                :src="contributor.profile_image"
                                class="rounded-circle"
                                width="30"
                              ></v-img>
                            </v-col>
                            <v-col class="pl-0" align-self="center">
                              <NameShortener :username="contributor.username" />
                            </v-col>
                          </v-row>
                        </router-link>
                      </v-col>
                      <v-col cols="2" style="max-width: 10rem">
                        <v-btn class="text-capitalize">Follow</v-btn>
                      </v-col>
                    </v-row>
                  </v-col>
                </v-row>
                <v-row justify="center" align="center">
                  <v-col v-show="currentUserPage != 1" cols="auto">
                    <span class="click-cursor" @click="prevUserPage">
                      View Less
                    </span>
                  </v-col>
                  <v-col v-show="currentUserPage != totalUserPages" cols="auto">
                    <span class="click-cursor" @click="nextUserPage">
                      View More
                    </span>
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
import PostCard from '~/components/cards/PostCard'
import TopicShortener from '~/components/utils/TopicShortener'
import NameShortener from '~/components/utils/NameShortener'

export default {
  name: 'IndexPage',
  components: {
    PostCard,
    TopicShortener,
    NameShortener,
  },
  middleware: 'authenticated',
  props: {
    searchPost: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      tab: null,
      items: [
        { tab: 'Rekomendasi', icon: 'mdi-fire' },
        { tab: 'Mengikuti', icon: 'mdi-account' },
      ],
      currentTopicPage: 1,
      currentUserPage: 1,
    }
  },
  computed: {
    threads() {
      if (this.searchPost) {
        return this.$store.state.lists.threads.filter((item) => {
          return (
            item.title.toLowerCase().includes(this.searchPost.toLowerCase()) ||
            item.author.username
              .toLowerCase()
              .includes(this.searchPost.toLowerCase())
          )
        })
      }
      return this.$store.state.lists.threads
    },
    topics() {
      return this.$store.state.lists.topics
    },
    topicsToBeShown() {
      return this.topics.slice(0, this.currentTopicPage * 5)
    },
    totalTopicPages() {
      return Math.ceil(this.topics.length / 5)
    },
    users() {
      return this.$store.state.lists.users
    },
    usersToBeShown() {
      return this.users.slice(0, this.currentUserPage * 5)
    },
    totalUserPages() {
      return Math.ceil(this.users.length / 5)
    },
  },
  created() {
    this.$store.dispatch('lists/fetchThreads')
    this.$store.dispatch('lists/fetchTopics')
    this.$store.dispatch('lists/fetchUsers')
  },
  methods: {
    nextTopicPage() {
      if (this.currentTopicPage < this.totalTopicPages) this.currentTopicPage++
    },
    prevTopicPage() {
      this.currentTopicPage = this.currentTopicPage - 1 || 1
    },
    nextUserPage() {
      if (this.currentUserPage < this.totalUserPages) this.currentUserPage++
    },
    prevUserPage() {
      this.currentUserPage = this.currentUserPage - 1 || 1
    },
  },
}
</script>

<style scoped>
.hide-scrollbar {
  -ms-overflow-style: none;
  scrollbar-width: none;
}
.hide-scrollbar::-webkit-scrollbar {
  display: none;
}
.click-cursor {
  cursor: pointer;
}
.image-rounded.theme--dark {
  border-radius: 50%;
}
.v-tab {
  border: 1px solid #e0e0e0;
  border-radius: 15px;
}
.v-tab.v-tab--active {
  border: 1px solid black;
  border-radius: 15px;
}
</style>
