<template>
  <v-container>
    <v-row justify="center">
      <v-col cols="12" class="my-2">
        <h2>Search</h2>
      </v-col>
      <v-col cols="12">
        <v-text-field
          v-model="search"
          append-icon="mdi-magnify"
          label="Search"
          hide-details
          solo
          class="rounded-lg"
        ></v-text-field>
      </v-col>
      <v-col cols="12"> </v-col>
    </v-row>
    <v-row justify="center">
      <v-col cols="12">
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
                  :search="search"
                  hide-default-header
                  :items-per-page="5"
                >
                  <template #[`item.title`]="{ item }">
                    <v-card class="rounded-lg px-2 py-2 mb-1 mt-1">
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
                            :to="`/topic/${item.topic.name}`"
                            style="text-decoration: none; color: black"
                          >
                            <TopicShortener :name="item.topic.name" />
                          </router-link>
                        </v-col>
                        <v-col>
                          <div>
                            <small class="text--disabled"
                              >diposting oleh
                              <router-link :to="`/user/${item.author.username}`"
                                ><NameShortener
                                  :username="item.author.username"
                              /></router-link>
                              {{ item.created_at | timepost }} yang lalu</small
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
                                      <v-list-item-title v-text="`Laporkan`" />
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
              <section v-if="item.tab == `Topic`">
                <v-data-table
                  :headers="topic"
                  :items="topics"
                  :search="search"
                  hide-default-header
                  class="elevation-1"
                >
                  <template #[`item.name`]="{ item }">
                    <TopicShortener :name="item.name" />
                  </template>
                  <template #[`item.details`]="{ item }">
                    <v-btn
                      class="text-capitalize mx-2"
                      @click="topicDetails(item)"
                    >
                      Details
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
                    <NameShortener :username="item.username" />
                  </template>
                  <template #[`item.details`]="{ item }">
                    <v-btn
                      class="text-capitalize mx-2"
                      @click="userDetails(item)"
                    >
                      Details
                    </v-btn>
                  </template>
                </v-data-table>
              </section>
            </v-tab-item>
          </v-tabs-items>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import TopicShortener from '~/components/utils/TopicShortener'
import NameShortener from '~/components/utils/NameShortener'

export default {
  name: 'SearchPage',
  components: {
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
  data() {
    return {
      tab: null,
      search: '',
      items: [{ tab: 'Thread' }, { tab: 'Topic' }, { tab: 'User' }],
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
    threads() {
      return this.$store.state.lists.threads
    },
    topics() {
      return this.$store.state.lists.topics
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
