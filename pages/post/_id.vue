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
          <SinglePostCard :thread="thread" />
        </v-col>
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
                <h4 class="font-weight-medium mb-3">Tentang Topik Ini</h4>
                <div class="pb-1">
                  <v-divider />
                </div>
                <v-row>
                  <v-col
                    v-for="(thread, index) in threads"
                    :key="index"
                    cols="12"
                  >
                    <CurrentTopic :topic="thread.topic" />
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
                  <v-col v-for="thread in threads" :key="thread.id" cols="12">
                    <section v-if="thread.topic.rules != null">
                      <section
                        v-for="(rule, index) in thread.topic.rules.split('\n')"
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
</template>

<script>
import SinglePostCard from '~/components/cards/SinglePostCard'
import CurrentTopic from '~/components/cards/CurrentTopic'
import NameShortener from '~/components/utils/NameShortener'

export default {
  name: 'IndexPage',
  components: {
    CurrentTopic,
    SinglePostCard,
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
    return {}
  },
  computed: {
    threads() {
      console.log(this.$store.state.lists.threads)
      if (this.$route.params.id) {
        return this.$store.state.lists.threads.filter((item) => {
          return item.id.toString().includes(this.$route.params.id)
        })
      }
      return this.$store.state.lists.threads
    },
    users() {
      return this.$store.state.lists.users
    },
  },
  created() {
    this.$store.dispatch('lists/fetchThreads')
    this.$store.dispatch('lists/fetchTopics')
    this.$store.dispatch('lists/fetchUsers')
  },
  mounted() {},
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
</style>
