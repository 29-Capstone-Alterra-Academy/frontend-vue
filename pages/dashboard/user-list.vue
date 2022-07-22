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
              <template #[`item.followers`]="{ item }">
                <FollowerShortener :follower="item.followers_count" />
              </template>
              <template #[`item.details`]="{ item }">
                <v-btn
                  class="text-capitalize rounded-lg mx-2"
                  text
                  outlined
                  @click="$router.push(`/user/${item.id}`)"
                >
                  Details
                </v-btn>
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
import FollowerShortener from '~/components/utils/FollowerShortener'

export default {
  name: 'UserList',
  components: {
    NameShortener,
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
        { text: 'Followers', align: 'center', value: 'followers' },
        { text: 'Actions', align: 'center', value: 'details' },
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
