<template>
  <section>
    <section style="background-color: #ffffff">
      <v-container>
        <v-row class="px-4">
          <v-col cols="8" class="my-2">
            <h2>Banned</h2>
            <p>Lists to all of Banned Request</p>
          </v-col>
        </v-row>
      </v-container>
    </section>
    <v-container>
      <v-row justify="center">
        <v-col cols="12">
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
                                    <v-list-item @click="dialogAdmin = true">
                                      <v-list-item-action>
                                        <v-icon>mdi-bullhorn-outline</v-icon>
                                      </v-list-item-action>
                                      <v-list-item-content>
                                        <v-list-item-title v-text="`Blokir`" />
                                      </v-list-item-content>
                                    </v-list-item>
                                  </v-list>
                                </v-menu>
                                <BanCard v-model="dialogAdmin" :thread="item" />
                              </v-col>
                            </v-row>
                          </v-col>
                        </v-row>
                      </v-card>
                    </template>
                  </v-data-table>
                </section>
                <section v-if="item.tab == `Topic`">
                  <v-data-table
                    :headers="topic"
                    :items="topics"
                    :search="search"
                    hide-default-header
                    class="elevation-1"
                  >
                    <template #[`item.name`]="{ item }">
                      <TopicShortener :name="item.topic.name" />
                      <small>
                        dilaporkan oleh
                        <router-link :to="`/user/${item.reporter.id}`">
                          <NameShortener :username="item.reporter.username" />
                        </router-link>
                        {{ item.created_at | timepost }} yang lalu dengan alasan
                        {{ item.reason.detail }}
                      </small>
                    </template>
                    <template #[`item.details`]="{ item }">
                      <v-btn
                        class="text-capitalize rounded-lg"
                        text
                        outlined
                        @click="
                          $router.push(`/topic/${item.topic.id}/details-admin`)
                        "
                        >Details
                      </v-btn>
                    </template>
                  </v-data-table>
                </section>
                <section v-if="item.tab == `User`">
                  <v-data-table
                    :headers="user"
                    :items="users"
                    :search="search"
                    hide-default-header
                    class="elevation-1"
                  >
                    <template #[`item.username`]="{ item }">
                      <NameShortener :username="item.suspect.username" />
                      <small>
                        dilaporkan oleh
                        <router-link :to="`/user/${item.reporter.id}`">
                          <NameShortener :username="item.reporter.username" />
                        </router-link>
                        {{ item.created_at | timepost }} yang lalu dengan alasan
                        {{ item.reason.detail }}
                      </small>
                    </template>
                    <template #[`item.details`]="{ item }">
                      <v-btn
                        class="text-capitalize rounded-lg mx-2"
                        text
                        outlined
                        @click="$router.push(`/user/${item.suspect.id}`)"
                      >
                        Details
                      </v-btn>
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
                              :src="item.author.profile_image"
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
                                >diposting oleh
                                <router-link :to="`/user/${item.author.id}`"
                                  ><NameShortener
                                    :username="item.author.username"
                                /></router-link>
                                {{ item.created_at | timepost }} yang
                                lalu</small
                              >
                            </div>
                          </v-col>
                        </v-row>
                        <v-row>
                          <v-col class="py-0">
                            <p class="text-h6 my-0">
                              {{ item.title }}
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
                                    <v-list-item to="/">
                                      <v-list-item-action>
                                        <v-icon>mdi-bullhorn-outline</v-icon>
                                      </v-list-item-action>
                                      <v-list-item-content>
                                        <v-list-item-title
                                          v-text="`Laporkan`"
                                        />
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

import BanCard from '~/components/cards/BanCard'
import TopicShortener from '~/components/utils/TopicShortener'
import NameShortener from '~/components/utils/NameShortener'
import FollowerShortener from '~/components/utils/FollowerShortener'

export default {
  name: 'BannedList',
  components: {
    BanCard,
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
  middleware: ['authenticated', 'admin'],
  data() {
    return {
      tab: null,
      search: '',
      dialogAdmin: false,
      items: [
        { tab: 'Thread' },
        { tab: 'Topic' },
        { tab: 'User' },
        { tab: 'Comment' },
      ],
      topic: [
        {
          text: 'Username',
          align: 'start',
          sortable: false,
          value: 'name',
        },
        {
          text: 'Actions',
          align: 'right',
          sortable: false,
          value: 'details',
        },
      ],
      user: [
        {
          text: 'Username',
          align: 'start',
          sortable: false,
          value: 'username',
        },
        {
          text: 'Actions',
          align: 'right',
          sortable: false,
          value: 'details',
        },
      ],
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
    topics() {
      return this.$store.state.lists.reportedTopics
    },
    users() {
      return this.$store.state.lists.reportedUsers
    },
    replies() {
      return this.$store.state.lists.reportedReplies
    },
  },
  mounted() {
    this.$store.dispatch('lists/fetchReportedThreads')
    this.$store.dispatch('lists/fetchReportedTopics')
    this.$store.dispatch('lists/fetchReportedUsers')
    this.$store.dispatch('lists/fetchReportedReplies')
  },
  methods: {},
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
