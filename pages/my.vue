<template>
  <v-container>
    <v-row justify="center" style="position: relative">
      <v-col cols="7">
        <v-row>
          <v-col v-if="!isAdmin" cols="12" class="py-3">
            <v-card class="rounded-lg mx-auto py-2 px-4" outlined>
              <v-btn
                outlined
                block
                class="rounded-lg text-capitalize"
                :to="`/create-post`"
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
                      <v-spacer />
                      <v-icon>{{ item.icon }}</v-icon
                      >{{ item.tab }}
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
                  <section v-if="item.tab == `Terpopuler`">
                    <v-col
                      v-for="thread in threads"
                      :key="thread.id"
                      class="py-1"
                    >
                      <PostCard :thread="thread" />
                    </v-col>
                    <Observer @intersect="intersected" />
                  </section>
                  <section v-if="item.tab == `Terbaru`">
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
                        Anda belum membuat postingan apapun!
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
                  <v-row>
                    <v-col cols="12" justify="center">
                      <v-col align="center" cols="auto" class="px-2">
                        <v-img
                          :src="profile.profile_image"
                          class="rounded-circle"
                          width="75"
                          height="75"
                        ></v-img>
                      </v-col>
                      <v-col align="center" cols="auto" class="pl-0">
                        <div class="text-overline">
                          <NameShortener :username="profile.username" />
                        </div>
                      </v-col>
                      <v-col align="center" cols="12">
                        <v-btn
                          class="text-capitalize"
                          outlined
                          @click="dialog = true"
                          >Edit Profile</v-btn
                        >
                      </v-col>
                      <div class="py-1">
                        <h4>
                          <FollowerShortener
                            :follower="currentUser.FollowersCount"
                          />
                          Followers
                        </h4>
                      </div>
                      <div class="py-1">
                        <h4>
                          <FollowerShortener
                            :follower="currentUser.ThreadCount"
                          />
                          Total Posts
                        </h4>
                      </div>
                      <div
                        class="subtitle-1 font-weight-light py-1"
                        style="line-height: inherit"
                      >
                        Joined
                        <DateShortener :date="profile.created_at" />
                      </div>
                      <v-col v-if="!isAdmin" cols="12" class="pa-0 py-3">
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
                      <EditProfile v-model="dialog" />
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
                  <h4 class="text-capitalize mb-3">Atur Topik</h4>
                  <div class="pb-5">
                    <v-divider />
                  </div>
                  <v-row>
                    <v-col v-for="topic in topics.filter(item => moderating.includes(item.id))" :key="topic.id" cols="12">
                      <v-row>
                        <v-col>
                          <router-link
                            :to="`/topic/${topic.id}`"
                            style="text-decoration: none; color: black"
                          >
                            <v-row>
                              <v-col
                                cols="2"
                                class="px-2"
                                style="max-width: 45px"
                              >
                                <v-img
                                  :src="topic.profile_image"
                                  class="rounded-circle"
                                  width="30"
                                  height="30"
                                ></v-img>
                              </v-col>
                              <v-col
                                cols="auto"
                                class="px-0"
                                align-self="center"
                              >
                                <TopicShortener :name="topic.name" />
                              </v-col>
                            </v-row>
                          </router-link>
                        </v-col>
                        <v-col cols="2" class="pr-4" style="max-width: 10rem">
                          <v-btn
                            class="text-capitalize"
                            @click="$router.push(`/topic/${topic.id}/details`)"
                          >
                            Details
                          </v-btn>
                        </v-col>
                      </v-row>
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

import Observer from '~/components/ObserverScroll'
import PostCard from '~/components/cards/PostCard'
import EditProfile from '~/components/cards/EditProfile'
import NameShortener from '~/components/utils/NameShortener'
import TopicShortener from '~/components/utils/TopicShortener'
import DateShortener from '~/components/utils/DateShortener'
import FollowerShortener from '~/components/utils/FollowerShortener'

export default {
  name: 'IndexPage',
  components: {
    Observer,
    PostCard,
    EditProfile,
    NameShortener,
    TopicShortener,
    DateShortener,
    FollowerShortener,
  },
  middleware: 'authenticated',
  data() {
    return {
      tab: null,
      items: [{ tab: 'Terpopuler', icon: 'mdi-fire' }, { tab: 'Terbaru' }],
      offset: 0,
      dialog: false,
      threads: [],
      newThreads: [],
    }
  },
  computed: {
    ...mapGetters('lists', ['isAdmin']),
    orderThreads() {
      if (this.searchPost) {
        const threads = this.$store.state.lists.threads.filter((item) => {
          return item.author.username
            .toLowerCase()
            .includes(this.searchPost.toLowerCase())
        })
        return threads.filter((item) => {
          return (
            item.title.toLowerCase().includes(this.searchPost.toLowerCase()) ||
            item.author.username
              .toLowerCase()
              .includes(this.searchPost.toLowerCase())
          )
        })
      }
      return this.$store.state.lists.threads.filter((item) => {
        return item.author.username
          .toLowerCase()
          .includes(this.$store.state.lists.profile.username.toLowerCase())
      })
    },
    profile() {
      return this.$store.state.lists.profile
    },
    moderating() {
      return this.$store.state.lists.isModerating
    },
    topics() {
      return this.$store.state.lists.topics
    },
    currentUser() {
      return this.$store.state.lists.detailUser
    },
  },
  watch: {
    profile() {
      this.user()
      this.intersected()
    },
  },
  mounted() {
    this.$store.dispatch('lists/fetchTopics')
    this.$store.dispatch('lists/loggedUser')
    this.$store.dispatch('lists/isModerating')
  },
  methods: {
    intersected() {
      if (this.newThreads.length === 5 || this.newThreads.length === 0) {
        this.$axios
          .get(
            `/thread?userId=${this.$store.state.lists.profile.id}&limit=5&offset=${this.offset}`
          )
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
    user() {
      this.$store.dispatch(
        'lists/fetchUserById',
        this.$store.state.lists.profile.id
      )
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
