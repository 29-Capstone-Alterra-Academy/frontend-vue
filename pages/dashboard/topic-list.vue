<template>
  <v-container>
    <v-row justify="center">
      <v-col cols="12" class="my-2">
        <h2>Topic Lists</h2>
        <p>Lists to all of the topic that users made</p>
      </v-col>
    </v-row>
    <v-row justify="center">
      <v-col cols="12">
        <v-card>
          <v-card-title>
            Topic List
            <v-spacer></v-spacer>
            <v-text-field
              v-model="search"
              append-icon="mdi-magnify"
              label="Search"
              single-line
              hide-details
            ></v-text-field>
          </v-card-title>
          <v-data-table :headers="headers" :search="search" :items="topics">
            <template #[`item.followers`]="{ item }">
              <span>{{ item.followers | abbr }}</span>
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
            <template #[`item.details`]="{ item }">
              <v-btn class="mx-2" @click="detailsItem(item)"> Details </v-btn>
            </template>
          </v-data-table>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: 'TopicList',
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
          text: 'Topic Name',
          align: 'start',
          sortable: false,
          value: 'name',
        },
        { text: 'Date Created', value: 'created_at', align: 'center' },
        { text: 'Total Post', value: 'total_post', align: 'center' },
        { text: 'Followers', value: 'followers', align: 'center' },
        { text: 'Actions', value: 'details', align: 'center', sortable: false },
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
    topics() {
      // if (this.searchPost) {
      //   return this.$store.state.topics.lists.filter((item) => {
      //     return item.name.toLowerCase().includes(this.searchPost.toLowerCase())
      //   })
      // }
      return this.$store.state.lists.topics
    },
  },
  created() {
    this.$store.dispatch('lists/fetchTopics')
  },
}
</script>

<style scoped></style>
