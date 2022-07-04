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
              <TopicShortener :name="thread.topic.name" />
            </router-link>
          </v-col>
          <v-col>
            <div>
              <small class="text--disabled"
                >diposting oleh
                <router-link :to="`/user/${thread.author.username}`"
                  ><NameShortener :username="thread.author.username"
                /></router-link>
                {{ timepost }} yang lalu</small
              >
            </div>
          </v-col>
          <v-col cols="auto">
            <v-row>
              <v-col cols="6">
                <v-icon> mdi-bell-outline </v-icon>
              </v-col>
              <v-col cols="6">
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
        </v-row>
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
      </v-list-item-content>
    </v-list-item>
    <v-card-actions class="pa-0">
      <v-list-item>
        <v-list-item-content>
          <v-col cols="4" class="pa-0">
            <v-row justify="center">
              <v-col>
                <v-row align="center">
                  <v-col cols="auto" class="pr-2">
                    <v-icon>mdi-thumb-up-outline</v-icon>
                  </v-col>
                  <v-col cols="auto" class="pl-2">
                    <p class="ma-0" style="width: 50%; display: inline">
                      <FollowerShortener :follower="50" />
                    </p>
                  </v-col>
                </v-row>
              </v-col>
              <v-col>
                <v-icon>mdi-thumb-down-outline</v-icon>
              </v-col>
            </v-row>
            <v-row>
              <v-col>
                <p><FollowerShortener :follower="3" /> komentar</p>
              </v-col>
            </v-row>
          </v-col>
          <div>
            <v-row>
              <v-col>
                <v-textarea
                  :value="comment"
                  rows="1"
                  class="rounded-lg"
                  label="Tinggalkan Komentar.."
                  placeholder="Tinggalkan Komentar.."
                  counter
                  auto-grow
                  outlined
                  dense
                  hide-details
                ></v-textarea>
              </v-col>
            </v-row>
          </div>
          <v-row>
            <v-spacer v-if="images.length === 0" />
            <v-col cols="auto">
              <v-file-input
                v-model="addedImages"
                counter
                multiple
                hide-input
                prepend-icon="mdi-image-plus"
                truncate-length="5"
                class="pt-0"
                @change="inputChanged"
              >
                <template #selection="{ text, index }">
                  <v-chip
                    small
                    text-color="white"
                    color="#295671"
                    close
                    @click:close="removeImage(index)"
                  >
                    {{ text }}
                  </v-chip>
                </template>
              </v-file-input>
            </v-col>
            <v-col v-if="images.length">
              <v-row>
                <v-col
                  v-for="image in images"
                  :key="image.id"
                  cols="auto"
                  class="px-0"
                >
                  <v-chip
                    small
                    text-color="white"
                    color="#295671"
                    close
                    @click:close="removeImage(index)"
                  >
                    {{ image.name }}
                  </v-chip>
                </v-col>
              </v-row>
            </v-col>
            <v-col cols="auto" style="max-width: 10rem">
              <v-btn class="text-capitalize">Comment</v-btn>
            </v-col>
          </v-row>
          <div>
            <v-col v-for="reply in replies" :key="reply.id">
              <CommentCard :reply="reply" />
            </v-col>
          </div>
        </v-list-item-content>
      </v-list-item>
    </v-card-actions>
  </v-card>
</template>

<script>
import CommentCard from '~/components/cards/CommentCard'
import TopicShortener from '~/components/utils/TopicShortener'
import NameShortener from '~/components/utils/NameShortener'
import FollowerShortener from '~/components/utils/FollowerShortener'

export default {
  components: {
    CommentCard,
    TopicShortener,
    NameShortener,
    FollowerShortener,
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
    replies() {
      return this.$store.state.lists.replies
    },
  },
  created() {
    this.$store.dispatch('lists/fetchReplies')
  },
  methods: {
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
