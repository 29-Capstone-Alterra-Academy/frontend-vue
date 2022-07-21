<template>
  <v-container>
    <v-row justify="center" style="position: relative">
      <v-col cols="7">
        <v-row class="pb-1">
          <v-col cols="12" class="pt-3">
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
          <v-col cols="12" class="pa-0 py-1">
            <v-tabs-items
              v-model="tab"
              style="background-color: transparent !important"
            >
              <v-tab-item v-for="item in items" :key="item.tab">
                <section v-if="item.tab == `Terpopuler`">
                  <v-col
                    v-for="thread in threads"
                    :key="thread.id"
                    cols="12"
                    class="py-1"
                  >
                    <PostCard :thread="thread" />
                  </v-col>
                  <Observer @intersect="intersected" />
                </section>
                <section v-if="item.tab == `Terbaru`">
                  <v-col
                    v-for="(thread, index) in orderThreads.sort(
                      (a, b) =>
                        new Date(b.created_at).getTime() -
                        new Date(a.created_at).getTime()
                    )"
                    :key="index"
                    cols="12"
                    class="py-1"
                  >
                    <PostCard :thread="thread" />
                  </v-col>
                </section>
              </v-tab-item>
            </v-tabs-items>
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
          <v-col
            v-if="isAdmin && userReported.length > 0"
            cols="12"
            class="pt-3 py-1"
          >
            <v-card class="rounded-lg red-border" outlined>
              <v-list-item three-line>
                <v-list-item-content>
                  <v-row>
                    <v-col>
                      <h4 class="font-weight-medium">
                        Dilaporkan oleh @{{ userReported[0].reporter.username }}
                        dengan alasan
                        {{ userReported[0].reason.detail }}
                      </h4>
                    </v-col>
                  </v-row>
                </v-list-item-content>
              </v-list-item>
            </v-card>
          </v-col>
          <v-col cols="12" class="pt-3 py-1">
            <v-card class="rounded-lg" outlined>
              <v-list-item three-line>
                <v-list-item-content>
                  <div>
                    <v-row align="center">
                      <v-spacer />
                      <v-col cols="auto">
                        <v-menu offset-y>
                          <template #activator="{ on, attrs }">
                            <p
                              class="ma-0"
                              style="width: 50%; display: inline"
                              v-bind="attrs"
                              v-on="on"
                            >
                              ···
                            </p>
                          </template>
                          <v-list class="pa-0">
                            <v-list-item v-if="isAdmin" to="/">
                              <v-list-item-action>
                                <v-icon>mdi-bullhorn-outline</v-icon>
                              </v-list-item-action>
                              <v-list-item-content>
                                <v-list-item-title v-text="`Hapus`" />
                              </v-list-item-content>
                            </v-list-item>
                            <v-list-item v-else @click="reportUser = true">
                              <v-list-item-action>
                                <v-icon>mdi-bullhorn-outline</v-icon>
                              </v-list-item-action>
                              <v-list-item-content>
                                <v-list-item-title v-text="`Laporkan`" />
                              </v-list-item-content>
                            </v-list-item>
                          </v-list>
                        </v-menu>
                        <ReportUserCard v-model="reportUser" :user="user" />
                      </v-col>
                    </v-row>
                  </div>
                  <v-row>
                    <v-col cols="12" justify="center">
                      <v-col
                        align="center"
                        cols="auto"
                        class="px-2"
                        style="max-width: none"
                      >
                        <v-img
                          :src="user.profile_image"
                          class="rounded-circle"
                          width="75"
                        ></v-img>
                      </v-col>
                      <v-col align="center" cols="auto" class="pl-0">
                        <div class="text-overline">
                          <NameShortener :username="user.Username" />
                        </div>
                      </v-col>
                      <v-col v-if="!isAdmin" align="center" cols="auto">
                        <section v-if="usersui.length > 0">
                          <section
                            v-for="(userdata, index) in usersui"
                            :key="index"
                          >
                            <v-btn
                              v-if="userdata.follow"
                              class="text-capitalize"
                              text
                              outlined
                              @click="unfollowing(user.id)"
                            >
                              Unfollow
                            </v-btn>
                            <v-btn
                              v-else
                              class="text-capitalize"
                              text
                              outlined
                              @click="following(user.id)"
                            >
                              Follow
                            </v-btn>
                          </section>
                        </section>
                        <section v-else>
                          <v-btn
                            v-if="follow"
                            class="text-capitalize"
                            text
                            outlined
                            @click="unfollowing(user.id)"
                          >
                            Unfollow
                          </v-btn>
                          <v-btn
                            v-else
                            class="text-capitalize"
                            text
                            outlined
                            @click="following(user.id)"
                          >
                            Follow
                          </v-btn>
                        </section>
                      </v-col>
                      <div class="py-1">
                        <h4>
                          <FollowerShortener :follower="user.FollowersCount" />
                          Followers
                        </h4>
                      </div>
                      <div class="py-1">
                        <h4>
                          <FollowerShortener :follower="user.ThreadCount" />
                          Total Posts
                        </h4>
                      </div>
                      <div
                        class="subtitle-1 font-weight-light py-1"
                        style="line-height: inherit"
                      >
                        Joined
                        <DateShortener :date="user.created_at" />
                      </div>
                      <v-col v-if="isAdmin" align="center" cols="auto">
                        <v-btn
                          color="error"
                          :disabled="
                            !reportedUsers
                              .filter((item) => {
                                return item.suspect.id == user.ID
                              })
                              .shift()
                          "
                          class="text-capitalize rounded-lg"
                          @click="dialog = true"
                        >
                          Blokir
                        </v-btn>
                        <BanUserCard
                          v-model="dialog"
                          :user="
                            reportedUsers
                              .filter((item) => {
                                return item.suspect.id == user.ID
                              })
                              .shift()
                          "
                        />
                      </v-col>
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
                  <h4 class="text-capitalize mb-3">Moderator of</h4>
                  <div class="pb-5">
                    <v-divider />
                  </div>
                  <v-row>
                    <v-col v-for="topic in topics" :key="topic.id" cols="12">
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
                          <TopicTableComponent
                            :topic="topic"
                            :topicsui="topicsui"
                          />
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

import FETCH_TOPICS from '~/apollo/queries/fetch-all-topics'
import SUBS_TOPICS from '~/apollo/subscriptions/subs-topics'
import FETCH_USERS from '~/apollo/queries/fetch-users'
import SUBS_USERS from '~/apollo/subscriptions/subs-users'
import FOLLOWED_USERS from '~/apollo/mutations/followed-users'
import INSERT_FOLLOWED_USERS from '~/apollo/mutations/insert-followed-users'
import INSERT_UNFOLLOWED_USERS from '~/apollo/mutations/insert-unfollowed-users'
import UNFOLLOWED_USERS from '~/apollo/mutations/unfollowed-users'

import TopicTableComponent from '~/components/molecules/TopicTableComponent'
import BanUserCard from '~/components/cards/BanUserCard'
import ReportUserCard from '~/components/cards/ReportUserCard'
import Observer from '~/components/ObserverScroll'
import PostCard from '~/components/cards/PostCard'
import TopicShortener from '~/components/utils/TopicShortener'
import NameShortener from '~/components/utils/NameShortener'
import DateShortener from '~/components/utils/DateShortener'
import FollowerShortener from '~/components/utils/FollowerShortener'

export default {
  name: 'IndexPage',
  components: {
    TopicTableComponent,
    ReportUserCard,
    BanUserCard,
    Observer,
    PostCard,
    TopicShortener,
    NameShortener,
    DateShortener,
    FollowerShortener,
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
      reportUser: false,
      dialog: false,
      items: [{ tab: 'Terpopuler', icon: 'mdi-fire' }, { tab: 'Terbaru' }],
      offset: 0,
      threads: [],
      newThreads: [],
      userReported: [],
    }
  },
  computed: {
    ...mapGetters('lists', ['isAdmin']),
    orderThreads() {
      if (this.searchPost) {
        const threads = this.$store.state.lists.threads.filter((item) => {
          return item.author.username
            .toLowerCase()
            .includes(this.$route.params.slug.toLowerCase())
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
          .includes(this.$route.params.slug.toLowerCase())
      })
    },
    topics() {
      return this.$store.state.lists.topics
    },
    reportedUsers() {
      return this.$store.state.lists.reportedUsers
    },
    user() {
      return this.$store.state.lists.detailUser
    },
  },
  apollo: {
    topicsui: {
      prefetch: true,
      query: FETCH_TOPICS,
      variables() {
        return {
          user_name: this.$store.state.lists.profile.username,
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
    usersui: {
      prefetch: true,
      query: FETCH_USERS,
      variables() {
        return {
          user_name: this.$store.state.lists.profile.username,
          id: this.$route.params.slug,
        }
      },
      subscribeToMore: {
        document: SUBS_USERS,
        updateQuery: ({ subscriptionData }) => {
          return {
            usersui: subscriptionData.data,
          }
        },
      },
    },
  },
  watch: {
    user() {
      this.reportedUser()
    },
  },
  created() {
    this.$store.dispatch('lists/fetchFollowedTopics', this.$route.params.slug)
    this.$store.dispatch('lists/fetchUserById', this.$route.params.slug)
    this.$store.dispatch('lists/fetchReportedUsers')
  },
  methods: {
    reportedUser() {
      this.$axios
        .get('/report?scope=user&limit=100&offset=0', {
          headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + this.$store.state.auth.accessToken,
          },
        })
        .then((res) => {
          let data = res.data
          data = data.filter((item) => {
            return item.suspect.id === this.user.ID
          })
          this.userReported = data
        })
        .catch((err) => {
          console.log(err)
        })
    },
    intersected() {
      if (this.newThreads.length === 5 || this.newThreads.length === 0) {
        this.$axios
          .get(
            `/thread?userId=${this.$route.params.slug}&limit=5&offset=${this.offset}`
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
    async following(param) {
      const response = await this.$apollo.queries.usersui.refetch()
      if (response.data.usersui.length > 0) {
        this.$axios
          .post(
            '/user/' + param + '/follow',
            {},
            {
              headers: {
                Authorization: 'Bearer ' + this.$store.state.auth.accessToken,
              },
            }
          )
          .then((response) => {
            if (response.status === 200) {
              this.$store.dispatch(
                'lists/fetchUserById',
                this.$route.params.slug
              )
              this.follow = true
              try {
                this.$apollo.mutate({
                  mutation: FOLLOWED_USERS,
                  variables: {
                    user_name: this.$store.state.lists.profile.username,
                    id: this.$route.params.slug,
                  },
                })
              } catch (error) {
                console.log(error)
              }
            }
          })
          .catch((error) => {
            console.log(error)
          })
      } else {
        this.$axios
          .post(
            '/user/' + param + '/follow',
            {},
            {
              headers: {
                Authorization: 'Bearer ' + this.$store.state.auth.accessToken,
              },
            }
          )
          .then((response) => {
            if (response.status === 200) {
              this.$store.dispatch(
                'lists/fetchUserById',
                this.$route.params.slug
              )
              this.follow = true
              try {
                this.$apollo.mutate({
                  mutation: INSERT_FOLLOWED_USERS,
                  variables: {
                    user_name: this.$store.state.lists.profile.username,
                    id: this.$route.params.slug,
                  },
                })
              } catch (error) {
                console.log(error)
              }
            }
          })
          .catch((error) => {
            console.log(error)
          })
      }
    },
    async unfollowing(param) {
      const response = await this.$apollo.queries.usersui.refetch()
      if (response.data.usersui.length > 0) {
        this.$axios
          .post(
            '/user/' + param + '/unfollow',
            {},
            {
              headers: {
                Authorization: 'Bearer ' + this.$store.state.auth.accessToken,
              },
            }
          )
          .then((response) => {
            if (response.status === 200) {
              this.$store.dispatch(
                'lists/fetchUserById',
                this.$route.params.slug
              )
              this.follow = false
              try {
                this.$apollo.mutate({
                  mutation: UNFOLLOWED_USERS,
                  variables: {
                    user_name: this.$store.state.lists.profile.username,
                    id: this.$route.params.slug,
                  },
                })
              } catch (error) {
                console.log(error)
              }
            }
          })
          .catch((error) => {
            console.log(error)
          })
      } else {
        this.$axios
          .post(
            '/user/' + param + '/unfollow',
            {},
            {
              headers: {
                Authorization: 'Bearer ' + this.$store.state.auth.accessToken,
              },
            }
          )
          .then((response) => {
            if (response.status === 200) {
              this.$store.dispatch(
                'lists/fetchUserById',
                this.$route.params.slug
              )
              this.follow = false
              try {
                this.$apollo.mutate({
                  mutation: INSERT_UNFOLLOWED_USERS,
                  variables: {
                    user_name: this.$store.state.lists.profile.username,
                    id: this.$route.params.slug,
                  },
                })
              } catch (error) {
                console.log(error)
              }
            }
          })
          .catch((error) => {
            console.log(error)
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
.red-border {
  border: 2px solid rgb(237, 0, 0, 0.4);
  border-radius: 15px;
}
</style>
