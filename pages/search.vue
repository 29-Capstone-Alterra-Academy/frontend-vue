<template>
  <section>
    <section style="background-color: #ffffff">
      <v-container>
        <v-row justify="center" class="px-4">
          <v-col cols="12" class="pb-0">
            <h2>Search</h2>
          </v-col>
          <v-spacer></v-spacer>
          <v-col cols="12" style="margin-bottom: 3.5px !important">
            <v-text-field
              v-model="search"
              append-icon="mdi-magnify"
              label="Search"
              hide-details
              flat
              outlined
              dense
              solo
              class="rounded-lg"
              @keydown.enter.prevent="submit"
            ></v-text-field>
          </v-col>
        </v-row>
      </v-container>
    </section>
    <v-container>
      <v-row justify="center">
        <v-col
          v-if="threads.length > 0 || topics.length > 0 || users.length > 0"
          cols="12"
        >
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
                    hide-default-header
                    :items-per-page="5"
                  >
                    <template #[`item.title`]="{ item }">
                      <PostCard :thread="item" class="my-1" />
                    </template>
                  </v-data-table>
                </section>
                <section v-if="item.tab == `Topic`">
                  <v-data-table
                    :headers="topic"
                    :items="topics"
                    hide-default-header
                    :items-per-page="5"
                    class="elevation-1"
                  >
                    <template #[`item.name`]="{ item }">
                      <div class="d-flex">
                        <v-img
                          :src="item.profile_image"
                          class="rounded-circle"
                          max-width="25"
                          max-height="25"
                        ></v-img>
                        <span class="px-2">
                          <router-link
                            :to="`/topic/${item.id}`"
                            style="text-decoration: none; color: black"
                          >
                            <TopicShortener
                              v-if="item.name != null"
                              :name="item.name"
                            />
                            <section v-else>{{ item.name }}</section>
                          </router-link>
                        </span>
                      </div>
                    </template>
                    <template #[`item.details`]="{ item }">
                      <TopicTableComponent :topic="item" :topicsui="topicsui" />
                    </template>
                  </v-data-table>
                </section>
                <section v-if="item.tab == `User`">
                  <v-data-table
                    :headers="user"
                    :items="users"
                    hide-default-header
                    class="elevation-1"
                    :items-per-page="5"
                  >
                    <template #[`item.username`]="{ item }">
                      <div class="d-flex">
                        <v-img
                          :src="item.profile_image"
                          class="rounded-circle"
                          max-width="25"
                          max-height="25"
                        ></v-img>
                        <span class="px-2">
                          <router-link
                            :to="`/user/${item.id}`"
                            style="text-decoration: none; color: black"
                          >
                            <NameShortener
                              v-if="item.username != null"
                              :username="item.username"
                            />
                            <section v-else>{{ item.username }}</section>
                          </router-link>
                        </span>
                      </div>
                    </template>
                    <template #[`item.details`]="{ item }">
                      <v-btn
                        v-if="isAdmin"
                        class="text-capitalize"
                        text
                        outlined
                        @click="$router.push(`/user/${item.id}`)"
                      >
                        Details
                      </v-btn>
                      <v-btn v-else class="text-capitalize" text outlined
                        >Follow</v-btn
                      >
                    </template>
                  </v-data-table>
                </section>
              </v-tab-item>
            </v-tabs-items>
          </v-card>
        </v-col>
        <!-- <v-col
          v-if="
            threads.length === 0 &&
            topics.length === 0 &&
            users.length === 0
          "
          align="center"
          cols="12"
        >
          <v-card class="shadow rounded-lg px-5 py-2" outlined>
            <v-card-title>
              <h3>Tidak ada data pencarian yang cocok</h3>
            </v-card-title>
          </v-card>
        </v-col> -->
      </v-row>
    </v-container>
  </section>
</template>

<script>
import { mapGetters } from 'vuex'

import FETCH_TOPICS from '~/apollo/queries/fetch-all-topics'
import SUBS_TOPICS from '~/apollo/subscriptions/subs-topics'

import TopicTableComponent from '~/components/molecules/TopicTableComponent'
import PostCard from '~/components/cards/PostCardTable'
import TopicShortener from '~/components/utils/TopicShortener'
import NameShortener from '~/components/utils/NameShortener'

export default {
  name: 'SearchPage',
  components: {
    TopicTableComponent,
    PostCard,
    TopicShortener,
    NameShortener,
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
  middleware: 'authenticated',
  data() {
    return {
      tab: null,
      search: '',
      items: [{ tab: 'Thread' }, { tab: 'Topic' }, { tab: 'User' }],
      threads: [],
      topics: [],
      users: [],
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
    }
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
  },
  computed: {
    ...mapGetters('lists', ['isAdmin']),
  },
  methods: {
    submit() {
      this.$axios
        .get(`/search?scope=thread&keyword=${this.search}&limit=100&offset=0`)
        .then((res) => {
          this.threads = [...res.data]
        })
        .catch((err) => {
          console.log(err)
        })
      this.$axios
        .get(`/search?scope=topic&keyword=${this.search}&limit=100&offset=0`)
        .then((res) => {
          this.topics = [...res.data]
        })
        .catch((err) => {
          console.log(err)
        })
      this.$axios
        .get(`/search?scope=user&keyword=${this.search}&limit=100&offset=0`)
        .then((res) => {
          this.users = [...res.data]
        })
        .catch((err) => {
          console.log(err)
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
