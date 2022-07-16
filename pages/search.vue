<template>
  <section>
    <section style="background-color: #ffffff">
      <v-container>
        <v-row justify="center" class="px-4">
          <v-col cols="12" class="my-2">
            <h2>Search</h2>
          </v-col>
          <v-col cols="12" class="py-0">
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
          <v-col cols="12"> </v-col>
        </v-row>
      </v-container>
    </section>
    <v-container>
      <v-row justify="center">
        <v-col
          v-if="threads.length > 0 || topics.length > 0 || users.length > 0"
          cols="12"
        >
          <v-card class="shadow rounded px-5 py-2">
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
                      <PostCard :thread="item" />
                    </template>
                  </v-data-table>
                </section>
                <section v-if="item.tab == `Topic`">
                  <v-data-table
                    :headers="topic"
                    :items="topics"
                    hide-default-header
                    class="elevation-1"
                  >
                    <template #[`item.name`]="{ item }">
                      <TopicShortener :name="item.name" />
                    </template>
                    <template #[`item.details`]="{ item }">
                      <v-btn
                        v-if="isAdmin"
                        class="text-capitalize"
                        @click="$router.push(`/topic/${item.id}/details`)"
                      >
                        Details
                      </v-btn>
                      <v-btn v-else class="text-capitalize">Follow</v-btn>
                    </template>
                  </v-data-table>
                </section>
                <section v-if="item.tab == `User`">
                  <v-data-table
                    :headers="user"
                    :items="users"
                    hide-default-header
                    class="elevation-1"
                  >
                    <template #[`item.username`]="{ item }">
                      <NameShortener :username="item.username" />
                    </template>
                    <template #[`item.details`]="{ item }">
                      <v-btn
                        v-if="isAdmin"
                        class="text-capitalize"
                        @click="$router.push(`/user/${item.id}`)"
                      >
                        Details
                      </v-btn>
                      <v-btn v-else class="text-capitalize">Follow</v-btn>
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

import PostCard from '~/components/cards/PostCardTable'
import TopicShortener from '~/components/utils/TopicShortener'
import NameShortener from '~/components/utils/NameShortener'

export default {
  name: 'SearchPage',
  components: {
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
