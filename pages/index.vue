<template>
  <v-container>
    <v-row justify="center" style="position: relative">
      <v-col cols="7">
        <v-row>
          <v-col v-if="!isAdmin" cols="12" class="pt-3 py-1">
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
          <v-col v-if="!isAdmin" cols="12" class="py-1">
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
          <v-col v-if="threads.length > 0" cols="12" class="pa-0 pb-1">
            <section v-if="isAdmin" class="py-1 pt-2">
              <v-col v-for="thread in threads" :key="thread.id" class="py-1">
                <PostCard :thread="thread" />
              </v-col>
              <Observer @intersect="intersected" />
            </section>
            <section v-else>
              <v-tabs-items
                v-model="tab"
                style="background-color: transparent !important"
              >
                <v-tab-item v-for="item in items" :key="item.tab">
                  <section v-if="item.tab == `Rekomendasi`">
                    <v-col
                      v-for="thread in threads"
                      :key="thread.id"
                      class="py-1"
                    >
                      <PostCard :thread="thread" />
                    </v-col>
                    <Observer @intersect="intersected" />
                  </section>
                  <section v-if="item.tab == `Mengikuti`">
                    <v-col
                      v-for="thread in threads"
                      :key="thread.id"
                      class="py-1"
                    >
                      <PostCard :thread="thread" />
                    </v-col>
                    <Observer @intersect="intersected" />
                  </section>
                </v-tab-item>
              </v-tabs-items>
            </section>
          </v-col>
          <v-col v-else cols="12" class="pa-0 pb-1">
            <section class="py-1 pt-2">
              <v-col class="py-0">
                <v-card class="rounded-lg mx-auto" outlined>
                  <v-list-item three-line>
                    <v-list-item-content>
                      <v-list-item-title class="text-h6 my-2">
                        Ups ada yang salah nih
                      </v-list-item-title>
                    </v-list-item-content>
                  </v-list-item>
                </v-card>
              </v-col>
              <Observer @intersect="intersected" />
            </section>
          </v-col>
        </v-row>
      </v-col>
      <v-col cols="4" style="width: 373.75px">
        <v-row
          class="hide-scrollbar pb-1"
          style="
            position: fixed;
            width: inherit;
            height: 91%;
            overflow-y: scroll;
          "
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
                      <TopicComponent :topic="topic" :topicsui="topicsui" :index="index" />
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
                      <UserComponent :user="contributor" :index="index" />
                    </v-col>
                  </v-row>
                  <v-row justify="center" align="center">
                    <v-col v-show="currentUserPage != 1" cols="auto">
                      <span class="click-cursor" @click="prevUserPage">
                        View Less
                      </span>
                    </v-col>
                    <v-col
                      v-show="currentUserPage != totalUserPages"
                      cols="auto"
                    >
                      <span class="click-cursor" @click="nextUserPage">
                        View More
                      </span>
                    </v-col>
                  </v-row>
                </v-list-item-content>
              </v-list-item>
            </v-card>
          </v-col>
          <v-col cols="12" class="py-1 pb-1">
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
  </v-container>
</template>

<script>
import { mapGetters } from 'vuex'

import FETCH_TOPICS from '~/apollo/queries/fetch-all-topics'
import SUBS_TOPICS from '~/apollo/subscriptions/subs-topics'

import Observer from '~/components/ObserverScroll'
import PostCard from '~/components/cards/PostCard'
import TopicComponent from '~/components/molecules/TopicComponent'
import UserComponent from '~/components/molecules/UserComponent'

export default {
  name: 'IndexPage',
  components: {
    Observer,
    PostCard,
    TopicComponent,
    UserComponent,
  },
  middleware: 'authenticated',
  props: {
    searchPost: {
      type: String,
      default: null,
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
      offset: 0,
      threads: [],
      newThreads: [],
    }
  },
  apollo: {
    topicsui: {
      prefetch: true,
      query: FETCH_TOPICS,
      variables() {
        return {
          user_name: this.$store.state.lists.profile.username
        }
      },
      subscribeToMore: {
        document: SUBS_TOPICS,
        updateQuery: ({ subscriptionData }) => {
          return {
            topicsui: subscriptionData.data,
          }
        },
      },
    },
  },
  computed: {
    ...mapGetters('lists', ['isAdmin']),
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
    profile() {
      return this.$store.state.lists.profile
    },
  },
  mounted() {
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
    intersected() {
      if (this.newThreads.length === 5 || this.newThreads.length === 0) {
        this.$axios
          .get(`/thread?topicId=1&limit=5&offset=${this.offset}`)
          .then((res) => {
            this.offset += 5
            this.newThreads = res.data
            this.threads = [...this.threads, ...this.newThreads]
          })
          .catch((err) => {
            console.log(err)
          })
      }
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
