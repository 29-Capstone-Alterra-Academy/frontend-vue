<template>
  <v-row>
    <v-col cols="12">
      <v-row justify="center">
        <v-col cols="11">
          <v-card class="rounded-lg pa-4" outlined>
            <v-row align="center">
              <v-col cols="auto">
                <v-img
                  :src="topic.profile_image"
                  class="rounded-circle"
                  width="100"
                  height="100"
                ></v-img>
              </v-col>
              <v-col cols="auto">
                <TopicShortener :name="topic.name" />
              </v-col>
              <v-col cols="auto" style="max-width: 10rem">
                <v-btn class="text-capitalize">Follow</v-btn>
              </v-col>
              <v-spacer />
              <v-col cols="auto" style="max-width: 10rem">
                <v-btn
                  class="text-capitalize"
                  @click="$router.push(`/topic/${$route.params.slug}/details`)"
                  >Details</v-btn
                >
              </v-col>
            </v-row>
          </v-card>
        </v-col>
      </v-row>
    </v-col>
    <v-col cols="12">
      <v-row justify="center">
        <v-col cols="7" style="width: 707.5px">
          <v-row
            class="hide-scrollbar"
            style="
              position: fixed;
              width: inherit;
              height: 63%;
              overflow-y: scroll;
            "
          >
            <v-col cols="12" class="pt-3 py-1">
              <v-btn
                outlined
                block
                class="rounded-lg text-capitalize"
                :to="`${$route.params.slug}/create-post`"
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
            <v-col cols="12" class="pa-0 py-1">
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
            </v-col>
          </v-row>
        </v-col>
        <v-col cols="4" style="width: 395.75px">
          <v-row
            class="hide-scrollbar"
            style="
              position: fixed;
              width: inherit;
              height: 63%;
              overflow-y: scroll;
            "
          >
            <v-col cols="12" class="pt-3 py-1">
              <v-card class="rounded-lg" outlined>
                <v-list-item three-line>
                  <v-list-item-content>
                    <h4 class="font-weight-medium mb-3">Tentang Topik Ini</h4>
                    <div class="pb-1">
                      <v-divider />
                    </div>
                    <v-row>
                      <v-col cols="12">
                        <CurrentTopic :topic="topic" />
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
                    <h4 class="font-weight-medium mb-3">Moderators</h4>
                    <div class="pb-5">
                      <v-divider />
                    </div>
                    <v-row>
                      <v-col
                        v-for="contributor in users"
                        :key="contributor.id"
                        cols="12"
                        class="py-0"
                      >
                        <div class="pb-1 text-p">
                          <NameShortener :username="contributor.username" />
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
                    <h4 class="font-weight-medium mb-3">Rules</h4>
                    <div class="pb-1">
                      <v-divider />
                    </div>
                    <v-row>
                      <v-col cols="12">
                        <section v-if="topic.rules != null">
                          <section
                            v-for="(rule, index) in topic.rules.split('/n')"
                            :key="index"
                          >
                            <div
                              class="subtitle-1 font-weight-light py-1"
                              style="line-height: inherit"
                            >
                              {{ rule }}
                            </div>
                          </section>
                        </section>
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
    </v-col>
  </v-row>
</template>

<script>
import CurrentTopic from '~/components/cards/CurrentTopic'
import PostCard from '~/components/cards/PostCard'
import TopicShortener from '~/components/utils/TopicShortener'
import NameShortener from '~/components/utils/NameShortener'

export default {
  name: 'IndexPage',
  components: {
    CurrentTopic,
    PostCard,
    TopicShortener,
    NameShortener,
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
      items: [{ tab: 'Rekomendasi', icon: 'mdi-fire' }, { tab: 'Mengikuti' }],
    }
  },
  computed: {
    threads() {
      console.log(this.$store.state.lists.threads)
      return this.$store.state.lists.threads
    },
    topic() {
      console.log('topic', this.$store.state.lists.detailTopic)
      return this.$store.state.lists.detailTopic
    },
    users() {
      return this.$store.state.lists.users
    },
  },
  created() {
    this.$store.dispatch('lists/fetchThreadsByTopic', +this.$route.params.slug)
    this.$store.dispatch('lists/fetchTopicById', this.$route.params.slug)
    this.$store.dispatch('lists/fetchUsers')
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
