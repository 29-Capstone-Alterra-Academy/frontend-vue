<template>
  <v-card class="rounded-lg mx-auto" outlined>
    <v-list-item three-line>
      <v-list-item-content>
        <v-row align="center">
          <v-col cols="1" style="max-width: none">
            <v-img
              :src="thread.author.profile_image"
              class="rounded-circle"
              width="35"
            ></v-img>
          </v-col>
          <v-col cols="auto">
            <router-link
              :to="`/topic/${thread.topic.name}`"
              style="text-decoration: none; color: black"
            >
              <TopicShortener :name="thread.topic.name"/>
            </router-link>
          </v-col>
          <v-col>
            <div>
              <small class="text--disabled"
                >diposting oleh
                <router-link :to="`/user/${thread.author.username}`"
                  ><NameShortener :username="thread.author.username"/></router-link
                >
                {{ timepost }} yang lalu</small
              >
            </div>
          </v-col>
        </v-row>
        <section class="click-cursor" @click="toDetails(thread.id)">
          <v-list-item-title class="text-h6 my-2">
            {{ thread.title }}
          </v-list-item-title>
          <v-list-item-content>
            {{ thread.content }}
          </v-list-item-content>
          <v-flex class="text-center">
            <v-carousel
              v-if="thread.images.length > 0"
              :continuous="false"
              hide-delimiters
              height="auto"
              style="max-height: 460px"
            >
              <v-carousel-item
                v-for="(item, index) in thread.images"
                :key="index"
              >
                <v-img
                  :src="item"
                  class="mx-auto"
                  max-width="75%"
                  max-height="100%"
                ></v-img>
              </v-carousel-item>
            </v-carousel>
          </v-flex>
        </section>
      </v-list-item-content>
    </v-list-item>
    <v-card-actions class="pa-0">
      <v-list-item>
        <v-list-item-content>
          <v-col cols="5" class="pa-0">
            <v-row align="center">
              <v-col cols="auto" justify="center">
                <p class="ma-0" style="width: 50%; display: inline"><FollowerShortener :follower="50"/> Likes</p>
              </v-col>
              <v-col cols="auto" justify="center">
                <p class="ma-0" style="width: 50%; display: inline"><FollowerShortener :follower="50"/> Comments</p>
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
        </v-list-item-content>
      </v-list-item>
    </v-card-actions>
  </v-card>
</template>

<script>
import TopicShortener from '~/components/utils/TopicShortener'
import NameShortener from '~/components/utils/NameShortener'
import FollowerShortener from '~/components/utils/FollowerShortener'

export default {
  components: {
    TopicShortener,
    NameShortener,
    FollowerShortener
  },
  props: {
    thread: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      comment: null,
      addedImages: [],
      images: [],
    }
  },
  computed: {
    timepost() {
      const seconds = Math.floor(
        (new Date() - new Date(String(this.thread.created_at))) / 1000
      )
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
  methods: {
    toDetails(id) {
      this.$router.push(`/post/${id}`)
    },
    removeImage(index) {
      this.images.splice(index, 1)
    },
    inputChanged() {
      if (this.images.length < 5) {
        this.images = [...this.images, ...this.addedImages]
      }
    },
  },
}
</script>

<style scoped>
.click-cursor {
  cursor: pointer;
}
</style>
