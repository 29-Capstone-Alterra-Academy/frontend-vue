<template>
  <v-container>
    <v-row justify="center">
      <v-col cols="12" class="my-2">
        <h2>User List</h2>
        <p>Lists to all of registered Users</p>
      </v-col>
    </v-row>
    <v-row justify="center">
      <v-col cols="12">
        <v-card>
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
                <span class="px-2">{{ item.username }}</span>
              </div>
            </template>
            <template #[`item.created_at`]="{ item }">
              <span>{{
                months[new Date(String(item.created_at)).getMonth()] +
                ' ' +
                new Date(String(item.created_at)).getDate() +
                ', ' +
                new Date(String(item.created_at)).getFullYear()
              }}</span>
            </template>
            <template #[`item.followers`]="{ item }">
              <span>{{ item.followers | abbr }}</span>
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
</template>

<script>
export default {
  name: 'UserList',
  filters: {
    abbr(num) {
      if (String(num).length < 7) {
        return Math.floor(num / 1000) + 'k'
      } else {
        return Math.floor(num / 1000000) + 'm'
      }
    },
  },
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
      months: [
        'Jan',
        'Feb',
        'Mar',
        'Apr',
        'May',
        'Jun',
        'Jul',
        'Aug',
        'Sep',
        'Oct',
        'Nov',
        'Des',
      ],
    }
  },
  computed: {
    users() {
      // return this.$store.state.lists.users.filter((item) => {
      //   return item.username
      //     .toLowerCase()
      //     .includes(this.$route.params.slug.toLowerCase())
      // })
      return this.$store.state.lists.users
    },
  },
  created() {
    this.$store.dispatch('lists/fetchUsers')
  },
}
</script>
