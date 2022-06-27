<template>
  <v-row justify="center" style="position: relative">
    <v-col cols="7">
      <v-row>
        <v-col cols="12" class="pt-3 py-1">
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
        <v-tabs-items v-model="tab">
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
            </section>
            <section v-if="item.tab == `Terbaru`">
              <v-col
                v-for="(thread, index) in orderThreads.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())"
                :key="index"
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
      <v-row style="position: fixed; width: inherit">
        <v-col cols="12" class="pt-3 py-1">
          <v-card class="rounded-lg" outlined>
            <v-list-item three-line>
              <v-list-item-content>
                <h4 class="text-capitalize mb-3"></h4>
                <v-row>
                  <v-col
                    v-for="user in users"
                    :key="user.id"
                    cols="12"
                    justify="center"
                    align="center"
                  >
                    <v-col cols="auto" class="px-2" style="max-width: none">
                      <v-img
                        :src="user.profile_image"
                        class="rounded-circle"
                        width="75"
                      ></v-img>
                    </v-col>
                    <v-col cols="auto" class="pl-0">
                      <div class="text-overline">
                        {{ user.username }}
                      </div>
                    </v-col>
                    <v-col cols="2" style="max-width: 10rem">
                      <v-btn class="text-capitalize">Follow</v-btn>
                    </v-col>
                    <div class="py-1">
                      <h4>{{ user.followers | abbr }} Followers</h4>
                    </div>
                    <div class="py-1">
                      <h4>{{ user.followers | abbr }} Total Posts</h4>
                    </div>
                    <div
                      class="subtitle-1 font-weight-light py-1"
                      style="line-height: inherit"
                    >
                      Joined
                      {{
                        months[new Date(String(user.created_at)).getMonth()] +
                        ' ' +
                        new Date(String(user.created_at)).getDate() +
                        ', ' +
                        new Date(String(user.created_at)).getFullYear()
                      }}
                    </div>
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
                      <v-col cols="auto" class="px-3" style="max-width: none">
                        <v-img
                          :src="topic.profile_image"
                          class="rounded-circle"
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
import PostCard from "~/components/cards/PostCard"

export default {
  name: 'IndexPage',
  components: {
    PostCard
  },
  filters: {
    abbr(num) {
      if (String(num).length < 7) {
        return Math.floor(num / 1000) + 'k'
      } else {
        return Math.floor(num / 1000000) + 'm'
      }
    },
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
      items: [{ tab: 'Terpopuler', icon: 'mdi-fire' }, { tab: 'Terbaru' }],
      months: [
        'Jan',
        'Feb',
        'Mar',
        'Apr',
        'May',
        'Jun',
        'Jul',
        'Aug',
        'Sep',
        'Oct',
        'Nov',
        'Des',
      ],
    }
  },
  computed: {
    threads() {
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
      // if (this.searchPost) {
      //   return this.$store.state.topics.lists.filter((item) => {
      //     return item.name.toLowerCase().includes(this.searchPost.toLowerCase())
      //   })
      // }
      return this.$store.state.lists.topics
    },
    users() {
      return this.$store.state.lists.users.filter((item) => {
        return item.username
          .toLowerCase()
          .includes(this.$route.params.slug.toLowerCase())
      })
    },
  },
  created() {
    this.$store.dispatch('lists/fetchThreads')
    this.$store.dispatch('lists/fetchTopics')
    this.$store.dispatch('lists/fetchUsers')
  },
}
</script>

<style scoped>
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
