<template>
  <v-container class="py-0" style="width: 93.67%">
    <v-card class="rounded-lg pa-4 my-5" outlined>
      <v-breadcrumbs
        :items="breadcrumbs"
        class="pa-0 pb-4 mb-4"
      ></v-breadcrumbs>
      <v-row align="center">
        <v-col cols="auto">
          <v-img
            :src="topic.profile_image"
            class="rounded-circle"
            width="100"
          ></v-img>
        </v-col>
        <v-col cols="auto">
          <v-row>
            <v-col class="pa-0">
              <h3>
                <TopicShortener :name="topic.name" class="font-weight-bold" />
              </h3>
            </v-col>
            <v-col cols="12" class="pa-0">
              <div
                class="subtitle-1 font-weight-light py-1"
                style="line-height: inherit"
              >
                Created on
                <DateShortener :date="topic.created_at" />
              </div>
            </v-col>
            <v-col cols="12" class="pa-0">
              <div class="py-1">
                <h4>
                  <FollowerShortener :follower="topic.contributor_count" />
                  Followers
                </h4>
              </div>
            </v-col>
            <v-col cols="12" class="pa-0">
              <div class="py-1">
                <h4>
                  <FollowerShortener :follower="topic.activity_count" /> Total
                  Posts
                </h4>
              </div>
            </v-col>
          </v-row>
        </v-col>
        <v-spacer />
        <v-col cols="auto">
          <v-btn
            color="error"
            class="text-capitalize"
            text
            outlined
            @click="dialog = true"
            >Blokir</v-btn
          >
          <DeleteTopicCard v-model="dialog" :topic="topic" />
        </v-col>
      </v-row>
      <v-row align="center">
        <v-col cols="auto">
          <h3 class="font-weight-bold">
            Moderators of
            <TopicShortener :name="topic.name" class="font-weight-bold" />
          </h3>
        </v-col>
        <v-col cols="7" style="max-width: 57.1111%">
          <v-text-field
            v-model="search"
            append-icon="mdi-magnify"
            label="Tap to search moderators"
            hide-details
            flat
            outlined
            dense
            solo
            class="rounded-lg"
            @keydown.enter.prevent="submit"
          ></v-text-field>
        </v-col>
        <v-col cols="2" align="end" style="max-width: 18.66666%">
          <v-btn
            class="rounded-lg text-capitalize"
            text
            outlined
            color="primary"
          >
            <v-icon>mdi-plus</v-icon>
            Add Moderators
          </v-btn>
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <v-data-table
            :headers="headers"
            :items="users"
            :search="search"
            flat
            class="elevation-1"
          >
            <template #[`item.username`]="{ item }">
              <div class="d-flex">
                <v-img
                  :src="item.profile_image"
                  max-width="25"
                  class="rounded-circle"
                ></v-img>
                <span class="px-2"
                  ><NameShortener :username="item.username"
                /></span>
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
          <template #[`item.delete`]="{ item }">
            <v-btn
              class="mx-2"
              text
              outlined
              @click="$router.push(`/topic/${item.id}/details-admin`)"
            >
              Delete
            </v-btn>
          </template>
        </v-col>
      </v-row>
    </v-card>
  </v-container>
</template>

<script>
import DeleteTopicCard from '~/components/cards/DeleteTopicCard'
import NameShortener from '~/components/utils/NameShortener'
import TopicShortener from '~/components/utils/TopicShortener'
import DateShortener from '~/components/utils/DateShortener'
import FollowerShortener from '~/components/utils/FollowerShortener'

export default {
  name: 'IndexPage',
  components: {
    DeleteTopicCard,
    NameShortener,
    TopicShortener,
    DateShortener,
    FollowerShortener,
  },
  middleware: ['authenticated', 'admin'],
  data() {
    return {
      tab: null,
      dialog: false,
      isEditDesc: false,
      isEditRules: false,
      items: [{ tab: 'Rekomendasi', icon: 'mdi-fire' }, { tab: 'Mengikuti' }],
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
        { text: 'Actions', align: 'center', value: 'delete' },
      ],
    }
  },
  computed: {
    rules: {
      get() {
        return this.topic.rules
      },
    },
    description: {
      get() {
        return this.topic.description
      },
    },
    threads() {
      if (this.searchPost) {
        const threads = this.$store.state.lists.threads.filter((item) => {
          return item.topic.name
            .toLowerCase()
            .includes(this.$route.params.slug.toLowerCase())
        })
        return threads.filter((item) => {
          return (
            item.title.toLowerCase().includes(this.searchPost.toLowerCase()) ||
            item.author.username
              .toLowerCase()
              .includes(this.searchPost.toLowerCase())
          )
        })
      }
      return this.$store.state.lists.threads.filter((item) => {
        return item.topic.name
          .toLowerCase()
          .includes(this.$route.params.slug.toLowerCase())
      })
    },
    topics() {
      return this.$store.state.lists.topics
    },
    topic() {
      return this.$store.state.lists.detailTopic
    },
    users() {
      return this.$store.state.lists.users
    },
    breadcrumbs() {
      return [
        {
          text: 'Home',
          disabled: false,
          href: '/',
        },
        {
          text: this.$store.state.lists.detailTopic.name,
          disabled: false,
          href: '/topic/' + this.$route.params.slug,
        },
        {
          text: 'Details',
          disabled: true,
          href: 'breadcrumbs_link_2',
        },
      ]
    },
  },
  created() {
    this.$store.dispatch('lists/fetchThreads')
    this.$store.dispatch('lists/fetchTopicById', this.$route.params.slug)
    this.$store.dispatch('lists/fetchUsers')
  },
  methods: {
    editDesc() {
      this.isEditDesc = !this.isEditDesc
    },
    editRules() {
      this.isEditRules = !this.isEditRules
    },
  },
}
</script>

<style scoped>
.hide-scrollbar {
  -ms-overflow-style: none;
  scrollbar-width: none;
}
.hide-scrollbar::-webkit-scrollbar {
  display: none;
}
.image-rounded.theme--dark {
  border-radius: 50%;
}
.v-tab {
  border: 1px solid #e0e0e0;
  border-radius: 15px;
}
.v-tab.v-tab--active {
  border: 1px solid black;
  border-radius: 15px;
}
</style>
