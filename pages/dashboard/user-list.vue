<template>
  <section>
    <section style="background-color: #ffffff">
      <v-container>
        <v-row justify="center" class="px-4">
          <v-col cols="12" class="my-2">
            <h2>User List</h2>
            <p>Lists to all of registered Users</p>
          </v-col>
        </v-row>
      </v-container>
    </section>
    <v-container>
      <v-row justify="center">
        <v-col cols="12">
          <v-card class="rounded-lg" outlined>
            <v-card-title>
              User List
              <v-spacer></v-spacer>
              <v-text-field
                v-model="search"
                append-icon="mdi-magnify"
                label="Search"
                single-line
                hide-details
              ></v-text-field>
            </v-card-title>
            <v-data-table
              :headers="headers"
              :items="users"
              :search="search"
              class="elevation-1"
            >
              <template #[`item.username`]="{ item }">
                <div class="d-flex">
                  <v-img
                    :src="item.profile_image"
                    max-width="25"
                    class="rounded-circle"
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
              <template #[`item.created_at`]="{ item }">
                <DateShortener :date="item.created_at" />
              </template>
              <template #[`item.followers`]="{ item }">
                <FollowerShortener :follower="item.followers" />
              </template>
              <template #[`item.status`]="{ item }">
                <v-chip color="green" outlined>
                  {{ item.status }}
                </v-chip>
              </template>
            </v-data-table>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </section>
</template>

<script>
import NameShortener from '~/components/utils/NameShortener'
import DateShortener from '~/components/utils/DateShortener'
import FollowerShortener from '~/components/utils/FollowerShortener'

export default {
  name: 'UserList',
  components: {
    NameShortener,
    DateShortener,
    FollowerShortener,
  },
  middleware: ['authenticated', 'admin'],
  data() {
    return {
      search: '',
      headers: [
        {
          text: 'User',
          align: 'start',
          sortable: false,
          value: 'username',
        },
        { text: 'Status', align: 'center', value: 'status' },
        { text: 'Post Created', align: 'center', value: 'created_at' },
        { text: 'Followers', align: 'center', value: 'followers' },
        { text: 'Likes Received', align: 'center', value: 'likes' },
      ],
    }
  },
  computed: {
    users() {
      return this.$store.state.lists.users
    },
  },
  created() {
    this.$store.dispatch('lists/fetchUsers')
  },
}
</script>
