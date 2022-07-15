<template>
  <v-container>
    <v-row justify="center" style="position: relative">
      <v-col cols="7">
        <v-row>
          <v-col cols="12" class="pt-3 py-1 pb-2">
            <SinglePostCard :thread="thread" />
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
                  <v-row align="center">
                    <v-col>
                      <h4 class="font-weight-medium">Tentang Topik Ini</h4>
                    </v-col>
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
                          <v-list-item v-else @click="reportTopic = true">
                            <v-list-item-action>
                              <v-icon>mdi-bullhorn-outline</v-icon>
                            </v-list-item-action>
                            <v-list-item-content>
                              <v-list-item-title v-text="`Laporkan`" />
                            </v-list-item-content>
                          </v-list-item>
                        </v-list>
                      </v-menu>
                      <ReportTopicCard v-model="reportTopic" :topic="topic"/>
                    </v-col>
                  </v-row>
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
                    <v-col v-if="!isAdmin" cols="12" class="py-0">
                      <v-btn class="text-capitalize">Follow</v-btn>
                    </v-col>
                  </v-row>
                </v-list-item-content>
              </v-list-item>
            </v-card>
          </v-col>
          <v-col v-if="isAdmin" cols="12" class="py-1">
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
                          v-for="(rule, index) in topic.rules.split('\n')"
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
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapGetters } from 'vuex'

import ReportTopicCard from '~/components/cards/ReportTopicCard'
import SinglePostCard from '~/components/cards/SinglePostCard'
import CurrentTopic from '~/components/cards/CurrentTopic'
import NameShortener from '~/components/utils/NameShortener'

export default {
  name: 'IndexPage',
  components: {
    ReportTopicCard,
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
    return {
      reportTopic: false,
    }
  },
  computed: {
    ...mapGetters('lists', ['isAdmin']),
    thread() {
      return this.$store.state.lists.detailThread
    },
    users() {
      return this.$store.state.lists.users
    },
    topic() {
      return this.$store.state.lists.detailTopic
    },
  },
  mounted() {
    this.$store.dispatch('lists/fetchTopicById', this.$route.params.topic)
    this.$store.dispatch('lists/fetchThreadById', this.$route.params.post)
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
</style>
