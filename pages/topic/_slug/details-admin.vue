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
            :disabled="
              !reportedTopics
                .filter((item) => {
                  return item.topic.id == topic.id
                })
                .shift()
            "
            class="text-capitalize rounded-lg"
            @click="dialog = true"
            >Blokir</v-btn
          >
          <BanTopicCard
            v-model="dialog"
            :topic="
              reportedTopics
                .filter((item) => {
                  return item.topic.id == topic.id
                })
                .shift()
            "
          />
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
          ></v-text-field>
        </v-col>
        <v-spacer />
        <v-col cols="2" align="end" style="max-width: 18.66666%">
          <v-btn
            class="rounded-lg text-capitalize"
            color="primary"
            @click="dialogMod = true"
          >
            <v-icon>mdi-plus</v-icon>
            Add Moderators
          </v-btn>
        </v-col>
        <AddModerators v-model="dialogMod" />
      </v-row>
      <v-row>
        <v-col v-if="moderators">
          <v-data-table
            v-if="moderators"
            :headers="headers"
            :items="moderators"
            :search="search"
            flat
            class="elevation-1"
          >
            <template #[`item.username`]="{ item }">
              <div class="d-flex">
                <v-img
                  :src="item.user.profile_image"
                  max-width="25"
                  max-height="25"
                  class="rounded-circle"
                ></v-img>
                <span class="px-2"
                  ><NameShortener :username="item.user.username"
                /></span>
              </div>
            </template>
            <template #[`item.created_at`]="{ item }">
              <DateShortener :date="item.created_at" />
            </template>
            <template #[`item.status`]="{}">
              <v-chip color="green" outlined> Moderator </v-chip>
            </template>
            <template #[`item.delete`]="{}">
              <v-btn class="rounded-lg" color="error" @click="reject()">
                <v-icon class=""> mdi-delete </v-icon>
              </v-btn>
            </template>
          </v-data-table>
        </v-col>
      </v-row>
    </v-card>
  </v-container>
</template>

<script>
import AddModerators from '~/components/cards/AddModerators'
import BanTopicCard from '~/components/cards/BanTopicCard'
import NameShortener from '~/components/utils/NameShortener'
import TopicShortener from '~/components/utils/TopicShortener'
import DateShortener from '~/components/utils/DateShortener'
import FollowerShortener from '~/components/utils/FollowerShortener'

export default {
  name: 'IndexPage',
  components: {
    AddModerators,
    BanTopicCard,
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
      dialogMod: false,
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
    topics() {
      return this.$store.state.lists.topics
    },
    topic() {
      return this.$store.state.lists.detailTopic
    },
    reportedTopics() {
      return this.$store.state.lists.reportedTopics
    },
    moderators() {
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
    this.$store.dispatch('lists/fetchReportedTopics')
    this.$store.dispatch('lists/fetchTopicById', this.$route.params.slug)
    this.$store.dispatch(
      'lists/fetchModeratorsByTopic',
      this.$route.params.slug
    )
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
