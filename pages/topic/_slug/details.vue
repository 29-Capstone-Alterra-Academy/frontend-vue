<template>
  <v-container class="py-0" style="width: 93.67%">
    <v-card class="rounded-lg pa-4" outlined>
      <v-breadcrumbs :items="breadcrumbs" class="pa-0 pb-4"></v-breadcrumbs>
      <v-row v-for="topic in topics" :key="topic.id" align="center">
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
              <TopicShortener :name="topic.name" />
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
                  <FollowerShortener :follower="topic.followers" />
                  Followers
                </h4>
              </div>
            </v-col>
            <v-col cols="12" class="pa-0">
              <div class="py-1">
                <h4>
                  <FollowerShortener :follower="topic.followers" /> Total Posts
                </h4>
              </div>
            </v-col>
          </v-row>
        </v-col>
        <v-spacer />
        <v-col cols="auto">
          <v-btn color="error" class="text-capitalize"
            >Keluar Sebagai Moderator</v-btn
          >
        </v-col>
      </v-row>
      <v-row align="center">
        <v-col cols="auto"> Deskripsi </v-col>
        <v-col cols="auto"><v-btn class="text-capitalize">Ubah</v-btn></v-col>
      </v-row>
      <section v-for="(topic, id) in topics" :key="id">
        <div>
          {{ topic.description }}
        </div>
        <v-row align="center">
          <v-col cols="auto"> Rules </v-col>
          <v-col cols="auto"><v-btn class="text-capitalize">Ubah</v-btn></v-col>
        </v-row>
        <div v-for="(rule, index) in topic.rules.split('\n')" :key="index">
          <div
            class="subtitle-1 font-weight-light py-1"
            style="line-height: inherit"
          >
            {{ rule }}
          </div>
        </div>
      </section>
      <v-row>
        <v-col>
          <v-card class="rounded-lg pa-4" outlined>
            <v-list-item three-line>
              <v-list-item-content>
                <h4 class="font-weight-medium mb-3">
                  Laporan Pengguna Terbaru
                </h4>
                <div class="pb-1">
                  <v-divider />
                </div>
                <v-row>
                  <v-col
                    v-for="thread in threads.slice(0, 2)"
                    :key="thread.id"
                    cols="12"
                  >
                    <div
                      class="subtitle-1 font-weight-light py-1"
                      style="line-height: inherit"
                    >
                      {{ thread.title }}
                    </div>
                  </v-col>
                </v-row>
              </v-list-item-content>
            </v-list-item>
          </v-card>
        </v-col>
      </v-row>
    </v-card>
  </v-container>
</template>

<script>
import TopicShortener from '~/components/utils/TopicShortener'
import DateShortener from '~/components/utils/DateShortener'
import FollowerShortener from '~/components/utils/FollowerShortener'

export default {
  name: 'IndexPage',
  components: {
    TopicShortener,
    DateShortener,
    FollowerShortener,
  },
  middleware: 'authenticated',
  props: {
    searchPost: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      tab: null,
      items: [{ tab: 'Rekomendasi', icon: 'mdi-fire' }, { tab: 'Mengikuti' }],
      breadcrumbs: [
        {
          text: 'Home',
          disabled: false,
          href: '/',
        },
        {
          text: this.$route.params.slug,
          disabled: false,
          href: '/topic/' + this.$route.params.slug,
        },
        {
          text: 'Details',
          disabled: true,
          href: 'breadcrumbs_link_2',
        },
      ],
    }
  },
  computed: {
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
      return this.$store.state.lists.topics.filter((item) => {
        return item.name
          .toLowerCase()
          .includes(this.$route.params.slug.toLowerCase())
      })
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
