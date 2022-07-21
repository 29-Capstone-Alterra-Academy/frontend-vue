<template>
  <v-card class="rounded-lg mx-auto" outlined>
    <v-list-item>
      <v-list-item-content>
        <v-row align="center">
          <v-col v-if="!istopic" cols="1" style="max-width: none">
            <v-img
              :src="thread.topic.profile_image"
              class="rounded-circle"
              width="35"
              height="35"
            ></v-img>
          </v-col>
          <v-col v-if="!istopic" cols="auto">
            <router-link
              :to="`/topic/${thread.topic.id}`"
              style="text-decoration: none; color: black"
            >
              <TopicShortener
                v-if="thread.topic.name != null"
                :name="thread.topic.name"
              />
              <section v-else>{{ thread.topic.name }}</section>
            </router-link>
          </v-col>
          <v-col>
            <div>
              <small class="text--disabled"
                >diposting oleh
                <router-link
                  v-if="thread.author.username != null && thread.author.id != 0"
                  :to="`/user/${thread.author.id}`"
                  ><NameShortener :username="thread.author.username"
                /></router-link>
                <strong v-else class="ma-0" style="display: inline"
                  >User telah diblokir</strong
                >
                {{ timepost }} yang lalu</small
              >
            </div>
          </v-col>
        </v-row>
        <div
          style="width: inherit"
          class="click-cursor"
          @click="toDetails(thread.id, thread.topic.id)"
        >
          <p class="text-h6 my-2 text-justify">
            {{ thread.title }}
          </p>
          <div v-if="thread.content != null">
            <div
              v-for="(content, index) in thread.content.split('\r\n')"
              :key="index"
            >
              <p
                class="subtitle-1 font-weight-light py-1 text-justify"
                style="line-height: inherit"
              >
                {{ content }}
              </p>
            </div>
          </div>
          <v-flex class="text-center">
            <v-carousel
              v-if="thread.image_1 != ''"
              :continuous="false"
              hide-delimiters
              height="auto"
              style="max-height: 460px"
            >
              <v-carousel-item v-for="(item, index) in postImages" :key="index">
                <v-img
                  :src="item"
                  class="mx-auto"
                  max-width="460"
                  height="460"
                ></v-img>
              </v-carousel-item>
            </v-carousel>
          </v-flex>
        </div>
      </v-list-item-content>
    </v-list-item>
    <v-card-actions class="pa-0">
      <v-list-item>
        <v-list-item-content>
          <v-col cols="5" class="pa-0">
            <v-row align="center">
              <v-col cols="auto" justify="center">
                <p class="ma-0" style="width: 50%; display: inline">
                  <FollowerShortener
                    :follower="thread.liked_count - thread.unliked_count"
                  />
                  Likes
                </p>
              </v-col>
              <v-col cols="auto" justify="center">
                <p class="ma-0" style="width: 50%; display: inline">
                  <FollowerShortener :follower="thread.reply_count" /> Comments
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
                    <v-list-item
                      v-if="isAdmin"
                      to="/"
                      @click="dialogAdmin = true"
                    >
                      <v-list-item-action>
                        <v-icon>mdi-bullhorn-outline</v-icon>
                      </v-list-item-action>
                      <v-list-item-content>
                        <v-list-item-title v-text="`Hapus`" />
                      </v-list-item-content>
                    </v-list-item>
                    <v-list-item
                      v-if="
                        !isAdmin && thread.author.username !== profile.username
                      "
                      @click="dialog = true"
                    >
                      <v-list-item-action>
                        <v-icon>mdi-bullhorn-outline</v-icon>
                      </v-list-item-action>
                      <v-list-item-content>
                        <v-list-item-title v-text="`Laporkan`" />
                      </v-list-item-content>
                    </v-list-item>
                    <v-list-item
                      v-if="thread.author.username === profile.username"
                      @click="dialogEdit = true"
                    >
                      <v-list-item-action>
                        <v-icon>mdi-bullhorn-outline</v-icon>
                      </v-list-item-action>
                      <v-list-item-content>
                        <v-list-item-title v-text="`Edit`" />
                      </v-list-item-content>
                    </v-list-item>
                  </v-list>
                </v-menu>
                <DeleteCard v-model="dialogAdmin" :thread="thread" />
                <ReportCard v-model="dialog" :thread="thread" />
              </v-col>
            </v-row>
          </v-col>
        </v-list-item-content>
      </v-list-item>
    </v-card-actions>
  </v-card>
</template>

<script>
import { mapGetters } from 'vuex'

import ReportCard from '~/components/cards/ReportCard'
import DeleteCard from '~/components/cards/DeleteCard'
import TopicShortener from '~/components/utils/TopicShortener'
import NameShortener from '~/components/utils/NameShortener'
import FollowerShortener from '~/components/utils/FollowerShortener'

export default {
  components: {
    ReportCard,
    DeleteCard,
    TopicShortener,
    NameShortener,
    FollowerShortener,
  },
  props: {
    thread: {
      type: Object,
      required: true,
    },
    istopic: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      comment: null,
      addedImages: [],
      images: [],
      dialogm1: '',
      dialog: false,
      dialogAdmin: false,
    }
  },
  computed: {
    ...mapGetters('lists', ['isAdmin']),
    profile() {
      return this.$store.state.lists.profile
    },
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
    postImages() {
      const images = []
      if (this.thread.image_5 !== '') {
        images.push(this.thread.image_1)
        images.push(this.thread.image_2)
        images.push(this.thread.image_3)
        images.push(this.thread.image_4)
        images.push(this.thread.image_5)
      }
      if (this.thread.image_4 !== '' && this.thread.image_5 === '') {
        images.push(this.thread.image_1)
        images.push(this.thread.image_2)
        images.push(this.thread.image_3)
        images.push(this.thread.image_4)
      }
      if (this.thread.image_3 !== '' && this.thread.image_4 === '') {
        images.push(this.thread.image_1)
        images.push(this.thread.image_2)
        images.push(this.thread.image_3)
      }
      if (this.thread.image_2 !== '' && this.thread.image_3 === '') {
        images.push(this.thread.image_1)
        images.push(this.thread.image_2)
      }
      if (this.thread.image_1 !== '' && this.thread.image_2 === '') {
        images.push(this.thread.image_1)
      }
      console.log(images.length)
      return images
    },
  },
  methods: {
    toDetails(post, topic) {
      this.$router.push(`/${post}/${topic}`)
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
