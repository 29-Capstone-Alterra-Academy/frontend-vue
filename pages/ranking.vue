<template>
  <v-container>
    <v-row justify="center">
      <v-col cols="8" class="my-2">
        <h2>Ranking</h2>
        <p>Lists to all of the topics and users</p>
      </v-col>
      <v-spacer></v-spacer>
      <v-col cols="4">
        <v-text-field
          v-model="search"
          append-icon="mdi-magnify"
          label="Search"
          single-line
          hide-details
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
              <section v-if="item.tab == `Topic`">
                <v-data-table
                  :headers="topic"
                  :items="topics"
                  :search="search"
                  hide-default-header
                >
                  <!-- <template #[`item.id`]="{ item }">
                    <td colspan="1">
                        <tr>
                            <p>{{ item.id }}</p>
                        </tr>
                    </td>
                  </template> -->
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
  name: 'BannedList',
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
      items: [{ tab: 'Topic' }, { tab: 'User' }],
      topic: [
        {
          text: 'ID',
          align: 'start',
          sortable: false,
          value: 'id',
        },
        {
          text: 'Username',
          align: 'left',
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
          text: 'ID',
          align: 'start',
          sortable: false,
          value: 'id',
        },
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
    }
  },
  computed: {
    topics() {
      return this.$store.state.lists.topics
    },
    users() {
      return this.$store.state.lists.users
    },
  },
  created() {
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
