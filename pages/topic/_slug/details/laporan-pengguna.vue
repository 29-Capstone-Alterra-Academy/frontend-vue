<template>
  <section>
    <section style="background-color: #ffffff">
      <v-container>
        <v-row class="px-4">
          <v-col cols="8" class="my-2">
            <h2>Laporan Pengguna</h2>
            <p>Lists to all of Laporan Pengguna</p>
          </v-col>
        </v-row>
      </v-container>
    </section>
    <v-container>
      <v-row justify="center">
        <v-col cols="12">
          <v-snackbar v-model="snackbar" :timeout="5000">
            Laporan berhasil diteruskan
            <template #action="{ attrs }">
              <v-btn
                color="primary"
                text
                v-bind="attrs"
                @click="snackbar = false"
                >Close</v-btn
              >
            </template>
          </v-snackbar>
          <v-snackbar v-model="snackbarFalse" :timeout="5000">
            Terjadi kesalahan saat meneruskan laporan
            <template #action="{ attrs }">
              <v-btn
                color="warning"
                text
                v-bind="attrs"
                @click="snackbarFalse = false"
                >Close</v-btn
              >
            </template>
          </v-snackbar>
          <v-snackbar v-model="snackbarIgnore" :timeout="5000">
            Laporan berhasil ditolak
            <template #action="{ attrs }">
              <v-btn
                color="primary"
                text
                v-bind="attrs"
                @click="snackbarIgnore = false"
                >Close</v-btn
              >
            </template>
          </v-snackbar>
          <v-snackbar v-model="snackbarIgnoreFalse" :timeout="5000">
            Terjadi kesalahan saat menolak laporan
            <template #action="{ attrs }">
              <v-btn
                color="warning"
                text
                v-bind="attrs"
                @click="snackbarIgnoreFalse = false"
                >Close</v-btn
              >
            </template>
          </v-snackbar>
          <v-snackbar v-model="snackbarReply" :timeout="5000">
            Laporan berhasil diteruskan
            <template #action="{ attrs }">
              <v-btn
                color="primary"
                text
                v-bind="attrs"
                @click="snackbarReply = false"
                >Close</v-btn
              >
            </template>
          </v-snackbar>
          <v-snackbar v-model="snackbarReplyFalse" :timeout="5000">
            Terjadi kesalahan saat meneruskan laporan
            <template #action="{ attrs }">
              <v-btn
                color="warning"
                text
                v-bind="attrs"
                @click="snackbarReplyFalse = false"
                >Close</v-btn
              >
            </template>
          </v-snackbar>
          <v-snackbar v-model="snackbarIgnoreReply" :timeout="5000">
            Laporan berhasil ditolak
            <template #action="{ attrs }">
              <v-btn
                color="primary"
                text
                v-bind="attrs"
                @click="snackbarIgnoreReply = false"
                >Close</v-btn
              >
            </template>
          </v-snackbar>
          <v-snackbar v-model="snackbarIgnoreReplyFalse" :timeout="5000">
            Terjadi kesalahan saat menolak laporan
            <template #action="{ attrs }">
              <v-btn
                color="warning"
                text
                v-bind="attrs"
                @click="snackbarIgnoreReplyFalse = false"
                >Close</v-btn
              >
            </template>
          </v-snackbar>
          <v-card class="shadow rounded-lg px-5 py-2" outlined>
            <v-tabs v-model="tab" color="grey">
              <v-tab v-for="item in items" :key="item.tab">
                {{ item.tab }}
              </v-tab>
            </v-tabs>
            <v-tabs-items v-model="tab">
              <v-tab-item v-for="item in items" :key="item.tab">
                <section v-if="item.tab == `Thread`">
                  <v-data-table
                    :headers="thread"
                    :items="threads"
                    :search="search"
                    hide-default-header
                    :items-per-page="5"
                  >
                    <template #[`item.title`]="{ item }">
                      <v-card class="rounded-lg px-2 py-2 mb-1 mt-1" outlined>
                        <v-row>
                          <v-col cols="auto">
                            <v-img
                              :src="item.topic.profile_image"
                              class="rounded-circle"
                              width="35"
                            ></v-img>
                          </v-col>
                          <v-col cols="auto">
                            <router-link
                              :to="`/topic/${item.topic.id}`"
                              style="text-decoration: none; color: black"
                            >
                              <TopicShortener :name="item.topic.name" />
                            </router-link>
                          </v-col>
                          <v-col>
                            <div>
                              <small class="text--disabled">
                                dilaporkan oleh
                                <router-link :to="`/user/${item.reporter.id}`">
                                  <NameShortener
                                    :username="item.reporter.username"
                                  />
                                </router-link>
                                {{ item.created_at | timepost }} yang lalu
                                dengan alasan {{ item.reason.detail }}
                              </small>
                            </div>
                          </v-col>
                        </v-row>
                        <v-row>
                          <v-col class="py-0">
                            <p class="text-h6 my-0">
                              {{ item.thread.title }}
                            </p>
                          </v-col>
                        </v-row>
                        <v-row>
                          <v-col cols="5">
                            <v-row align="center">
                              <v-col cols="auto" justify="center">
                                <p
                                  class="ma-0"
                                  style="width: 50%; display: inline"
                                >
                                  <FollowerShortener :follower="50" /> Likes
                                </p>
                              </v-col>
                              <v-col cols="auto" justify="center">
                                <p
                                  class="ma-0"
                                  style="width: 50%; display: inline"
                                >
                                  <FollowerShortener :follower="50" /> Comments
                                </p>
                              </v-col>
                              <v-col>
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
                                    <v-list-item
                                      @click="
                                        forwardThread(
                                          item.reporter.id,
                                          item.thread.id
                                        )
                                      "
                                    >
                                      <v-list-item-action>
                                        <v-icon>mdi-bullhorn-outline</v-icon>
                                      </v-list-item-action>
                                      <v-list-item-content>
                                        <v-list-item-title v-text="`Forward`" />
                                      </v-list-item-content>
                                    </v-list-item>
                                    <v-list-item
                                      @click="
                                        ignoreThread(
                                          item.reporter.id,
                                          item.thread.id
                                        )
                                      "
                                    >
                                      <v-list-item-action>
                                        <v-icon>mdi-bullhorn-outline</v-icon>
                                      </v-list-item-action>
                                      <v-list-item-content>
                                        <v-list-item-title v-text="`Ignore`" />
                                      </v-list-item-content>
                                    </v-list-item>
                                  </v-list>
                                </v-menu>
                              </v-col>
                            </v-row>
                          </v-col>
                        </v-row>
                      </v-card>
                    </template>
                  </v-data-table>
                </section>
                <section v-if="item.tab == `Comment`">
                  <v-data-table
                    :headers="reply"
                    :items="replies"
                    :search="search"
                    hide-default-header
                    :items-per-page="5"
                  >
                    <template #[`item.title`]="{ item }">
                      <v-card class="rounded-lg px-2 py-2 mb-1 mt-1" outlined>
                        <v-row>
                          <v-col cols="auto">
                            <v-img
                              :src="item.topic.profile_image"
                              class="rounded-circle"
                              width="35"
                            ></v-img>
                          </v-col>
                          <v-col cols="auto">
                            <router-link
                              :to="`/topic/${item.topic.id}`"
                              style="text-decoration: none; color: black"
                            >
                              <TopicShortener :name="item.topic.name" />
                            </router-link>
                          </v-col>
                          <v-col>
                            <div>
                              <small class="text--disabled"
                                >dilaporkan oleh
                                <router-link :to="`/user/${item.reporter.id}`"
                                  ><NameShortener
                                    :username="item.reporter.username"
                                /></router-link>
                                {{ item.created_at | timepost }} yang lalu
                                dengan alasan {{ item.reason.detail }}</small
                              >
                            </div>
                          </v-col>
                        </v-row>
                        <v-row>
                          <v-col class="py-0">
                            <p class="text-h6 my-0">
                              {{ item.reply.content }}
                            </p>
                          </v-col>
                        </v-row>
                        <v-row>
                          <v-col cols="5">
                            <v-row align="center">
                              <v-col cols="auto" justify="center">
                                <p
                                  class="ma-0"
                                  style="width: 50%; display: inline"
                                >
                                  <FollowerShortener :follower="50" /> Likes
                                </p>
                              </v-col>
                              <v-col cols="auto" justify="center">
                                <p
                                  class="ma-0"
                                  style="width: 50%; display: inline"
                                >
                                  <FollowerShortener :follower="50" /> Comments
                                </p>
                              </v-col>
                              <v-col>
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
                                    <v-list-item
                                      @click="
                                        forwardReply(
                                          item.reporter.id,
                                          item.reply.id
                                        )
                                      "
                                    >
                                      <v-list-item-action>
                                        <v-icon>mdi-bullhorn-outline</v-icon>
                                      </v-list-item-action>
                                      <v-list-item-content>
                                        <v-list-item-title v-text="`Forward`" />
                                      </v-list-item-content>
                                    </v-list-item>
                                    <v-list-item
                                      @click="
                                        ignoreReply(
                                          item.reporter.id,
                                          item.reply.id
                                        )
                                      "
                                    >
                                      <v-list-item-action>
                                        <v-icon>mdi-bullhorn-outline</v-icon>
                                      </v-list-item-action>
                                      <v-list-item-content>
                                        <v-list-item-title v-text="`Ignore`" />
                                      </v-list-item-content>
                                    </v-list-item>
                                  </v-list>
                                </v-menu>
                              </v-col>
                            </v-row>
                          </v-col>
                        </v-row>
                      </v-card>
                    </template>
                  </v-data-table>
                </section>
              </v-tab-item>
            </v-tabs-items>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </section>
</template>

<script>
import { mapGetters } from 'vuex'

import TopicShortener from '~/components/utils/TopicShortener'
import NameShortener from '~/components/utils/NameShortener'
import FollowerShortener from '~/components/utils/FollowerShortener'

export default {
  name: 'ReportList',
  components: {
    TopicShortener,
    NameShortener,
    FollowerShortener,
  },
  filters: {
    timepost(date) {
      const seconds = Math.floor((new Date() - new Date(String(date))) / 1000)
      let interval = Math.floor(seconds / 31536000)

      if (interval > 1) {
        return interval + ' tahun'
      }
      interval = Math.floor(seconds / 2592000)
      if (interval > 1) {
        return interval + ' bulan'
      }
      interval = Math.floor(seconds / 86400)
      if (interval > 1) {
        return interval + ' hari'
      }
      interval = Math.floor(seconds / 3600)
      if (interval > 1) {
        return interval + ' jam'
      }
      interval = Math.floor(seconds / 60)
      if (interval > 1) {
        return interval + ' menit'
      }
      return Math.floor(seconds) + ' detik'
    },
  },
  middleware: ['authenticated', 'moderator'],
  data() {
    return {
      tab: null,
      search: '',
      snackbar: false,
      snackbarReply: false,
      snackbarIgnore: false,
      snackbarIgnoreReply: false,
      snackbarFalse: false,
      snackbarReplyFalse: false,
      snackbarIgnoreFalse: false,
      snackbarIgnoreReplyFalse: false,
      items: [{ tab: 'Thread' }, { tab: 'Comment' }],
      thread: [
        {
          text: 'ID',
          align: 'start',
          sortable: false,
          value: 'title',
        },
      ],
      reply: [
        {
          text: 'ID',
          align: 'start',
          sortable: false,
          value: 'title',
        },
      ],
    }
  },
  computed: {
    ...mapGetters('lists', ['isAdmin']),
    threads() {
      return this.$store.state.lists.reportedThreads
    },
    replies() {
      return this.$store.state.lists.reportedReplies
    },
  },
  mounted() {
    this.$store.dispatch(
      'lists/fetchReportedThreadsByModerator',
      this.$route.params.slug
    )
    this.$store.dispatch(
      'lists/fetchReportedRepliesByModerator',
      this.$route.params.slug
    )
  },
  methods: {
    forwardThread(reporterId, threadId) {
      this.$axios
        .put(
          `/topic/${this.$route.params.slug}/report?scope=thread&threadId=${threadId}&reporterId=${reporterId}&action=forward`,
          {},
          {
            headers: {
              Authorization: 'Bearer ' + this.$store.state.auth.accessToken,
            },
          }
        )
        .then((response) => {
          if (response.status === 200) {
            this.snackbar = true
          }
        })
        .catch((error) => {
          if (error.status) {
            this.snackbarFalse = true
          }
        })
    },
    ignoreThread(reporterId, threadId) {
      this.$axios
        .put(
          `/topic/${this.$route.params.slug}/report?scope=thread&threadId=${threadId}&reporterId=${reporterId}&action=ignore`,
          {},
          {
            headers: {
              Authorization: 'Bearer ' + this.$store.state.auth.accessToken,
            },
          }
        )
        .then((response) => {
          if (response.status === 200) {
            this.snackbarIgnore = true
          }
        })
        .catch((error) => {
          if (error.status) {
            this.snackbarIgnoreFalse = true
          }
        })
    },
    forwardReply(reporterId, replyId) {
      this.$axios
        .put(
          `/topic/${this.$route.params.slug}/report?scope=reply&replyId=${replyId}&reporterId=${reporterId}&action=forward`,
          {},
          {
            headers: {
              Authorization: 'Bearer ' + this.$store.state.auth.accessToken,
            },
          }
        )
        .then((response) => {
          if (response.status === 200) {
            this.snackbarReply = true
          }
        })
        .catch((error) => {
          if (error.status) {
            this.snackbarReplyFalse = true
          }
        })
    },
    ignoreReply(reporterId, replyId) {
      this.$axios
        .put(
          `/topic/${this.$route.params.slug}/report?scope=reply&replyId=${replyId}&reporterId=${reporterId}&action=ignore`,
          {},
          {
            headers: {
              Authorization: 'Bearer ' + this.$store.state.auth.accessToken,
            },
          }
        )
        .then((response) => {
          if (response.status === 200) {
            this.snackbarIgnoreReply = true
          }
        })
        .catch((error) => {
          if (error.status) {
            this.snackbarIgnoreReplyFalse = true
          }
        })
    },
  },
}
</script>

<style scoped>
.v-tab {
  text-transform: capitalize;
}
.v-tab.v-tab--active {
  color: black;
  font-weight: bold;
}
</style>
