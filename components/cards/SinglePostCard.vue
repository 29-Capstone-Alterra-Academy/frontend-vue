<template>
  <v-card class="rounded-lg mx-auto" outlined>
    <v-list-item three-line>
      <v-list-item-content>
        <v-row align="center">
          <v-col cols="1" style="max-width: none">
            <v-img
              :src="thread.topic.profile_image"
              class="rounded-circle"
              width="35"
              height="35"
            ></v-img>
          </v-col>
          <v-col cols="auto">
            <router-link
              :to="`/topic/${thread.topic.id}`"
              style="text-decoration: none; color: black"
            >
              <TopicShortener
                v-if="thread.topic.name != null"
                :name="thread.topic.name"
              />
            </router-link>
          </v-col>
          <v-col>
            <div>
              <small class="text--disabled"
                >diposting oleh
                <router-link :to="`/user/${thread.author.username}`"
                  ><NameShortener
                    v-if="thread.author.username != null"
                    :username="thread.author.username"
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
                <v-row v-if="threadsui.length > 0" align="center">
                  <v-col
                    v-for="(threaddata, index) in threadsui"
                    :key="index"
                    cols="auto"
                    class="pr-2 click-cursor"
                    @click="like(thread.id)"
                  >
                    <v-icon v-if="threaddata.liked">mdi-thumb-up</v-icon>
                    <v-icon v-else>mdi-thumb-up-outline</v-icon>
                  </v-col>
                  <v-col cols="auto" class="pl-2">
                    <p class="ma-0" style="width: 50%; display: inline">
                      <FollowerShortener
                        :follower="thread.liked_count - thread.unliked_count"
                      />
                    </p>
                  </v-col>
                </v-row>
                <v-row v-else align="center">
                  <v-col
                    cols="auto"
                    class="pr-2 click-cursor"
                    @click="like(thread.id)"
                  >
                    <v-icon v-if="liked">mdi-thumb-up</v-icon>
                    <v-icon v-else>mdi-thumb-up-outline</v-icon>
                  </v-col>
                  <v-col cols="auto" class="pl-2">
                    <p class="ma-0" style="width: 50%; display: inline">
                      <FollowerShortener
                        :follower="thread.liked_count - thread.unliked_count"
                      />
                    </p>
                  </v-col>
                </v-row>
              </v-col>
              <v-col
                v-if="threadsui.length > 0"
                class="click-cursor"
                @click="unlike(thread.id)"
              >
                <section v-for="(threaddata, index) in threadsui" :key="index">
                  <v-icon v-if="threaddata.unliked">mdi-thumb-down</v-icon>
                  <v-icon v-else>mdi-thumb-down-outline</v-icon>
                </section>
              </v-col>
              <v-col v-else class="click-cursor" @click="unlike(thread.id)">
                <v-icon v-if="unliked">mdi-thumb-down</v-icon>
                <v-icon v-else>mdi-thumb-down-outline</v-icon>
              </v-col>
            </v-row>
            <v-row>
              <v-col>
                <p>
                  <FollowerShortener :follower="thread.reply_count" /> komentar
                </p>
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
import FETCH_LIKED_DISLIKED from '~/apollo/queries/fetch-liked-disliked'
import LIKED from '~/apollo/mutations/liked'
import INSERT_LIKED from '~/apollo/mutations/insert-liked'
import INSERT_UNLIKED from '~/apollo/mutations/insert-unliked'
import UNLIKED from '~/apollo/mutations/unliked'
// import REVERT_THREADS from '~/apollo/mutations/revert-threads'
import SUBS_THREADS from '~/apollo/subscriptions/subs-threads'

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
      liked: false,
      unliked: false,
    }
  },
  apollo: {
    threadsui: {
      prefetch: true,
      query: FETCH_LIKED_DISLIKED,
      variables() {
        return {
          user_name: this.$store.state.lists.profile.username,
          id: this.$route.params.post,
        }
      },
      subscribeToMore: {
        document: SUBS_THREADS,
        updateQuery: ({ subscriptionData }) => {
          return {
            threadsui: subscriptionData.data,
          }
        },
      },
    },
  },
  computed: {
    timepost() {
      const seconds = Math.floor(
        (new Date() - new Date(String(this.thread.updated_at))) / 1000
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
    postImages() {
      const images = []
      if (this.thread.image_5 != null) {
        images.push(this.thread.image_1)
        images.push(this.thread.image_2)
        images.push(this.thread.image_3)
        images.push(this.thread.image_4)
        images.push(this.thread.image_5)
      }
      if (this.thread.image_4 != null && this.thread.image_5 == null) {
        images.push(this.thread.image_1)
        images.push(this.thread.image_2)
        images.push(this.thread.image_3)
        images.push(this.thread.image_4)
      }
      if (this.thread.image_3 != null && this.thread.image_4 == null) {
        images.push(this.thread.image_1)
        images.push(this.thread.image_2)
        images.push(this.thread.image_3)
      }
      if (this.thread.image_2 != null && this.thread.image_3 == null) {
        images.push(this.thread.image_1)
        images.push(this.thread.image_2)
      }
      if (this.thread.image_1 != null && this.thread.image_2 == null) {
        images.push(this.thread.image_1)
        images.push(this.thread.image_2)
      }
      return images
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
    like(param) {
      console.log(this.threadsui)
      if (this.threadsui.length > 0) {
        console.log(this.threadsui)
        this.$axios
          .post(
            '/thread/' + param + '/like',
            {},
            {
              headers: {
                Authorization: 'Bearer ' + this.$store.state.auth.accessToken,
              },
            }
          )
          .then((response) => {
            console.log(response)
            if (response.status === 200) {
              this.$store.dispatch(
                'lists/fetchThreadById',
                this.$route.params.post
              )
              this.liked = true
              this.unliked = false
              try {
                this.$apollo.mutate({
                  mutation: LIKED,
                  variables: {
                    user_name: this.$store.state.lists.profile.username,
                    id: this.$route.params.post,
                  },
                })
              } catch (error) {
                console.log(error)
              }
            }
          })
          .catch((error) => {
            console.log(error)
          })
      } else {
        this.$axios
          .post(
            '/thread/' + param + '/like',
            {},
            {
              headers: {
                Authorization: 'Bearer ' + this.$store.state.auth.accessToken,
              },
            }
          )
          .then((response) => {
            console.log(response)
            if (response.status === 200) {
              this.$store.dispatch(
                'lists/fetchThreadById',
                this.$route.params.post
              )
              this.liked = true
              this.unliked = false
              try {
                this.$apollo.mutate({
                  mutation: INSERT_LIKED,
                  variables: {
                    user_name: this.$store.state.lists.profile.username,
                    id: this.$route.params.post,
                  },
                })
              } catch (error) {
                console.log(error)
              }
              setTimeout(this.$apollo.queries.threadsui.refetch(), 6000)
            }
          })
          .catch((error) => {
            console.log(error)
          })
      }
    },
    unlike(param) {
      console.log(this.threadsui)
      if (this.threadsui.length > 0) {
        console.log(this.threadsui)
        this.$axios
          .post(
            '/thread/' + param + '/unlike',
            {},
            {
              headers: {
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + this.$store.state.auth.accessToken,
              },
            }
          )
          .then((response) => {
            console.log(response)
            if (response.status === 200) {
              this.$store.dispatch(
                'lists/fetchThreadById',
                this.$route.params.post
              )
              this.unliked = true
              this.liked = false
              try {
                this.$apollo.mutate({
                  mutation: UNLIKED,
                  variables: {
                    user_name: this.$store.state.lists.profile.username,
                    id: this.$route.params.post,
                  },
                })
              } catch (error) {
                console.log(error)
              }
            }
          })
          .catch((error) => {
            console.log(error)
          })
      } else {
        this.$axios
          .post(
            '/thread/' + param + '/unlike',
            {},
            {
              headers: {
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + this.$store.state.auth.accessToken,
              },
            }
          )
          .then((response) => {
            console.log(response)
            if (response.status === 200) {
              this.$store.dispatch(
                'lists/fetchThreadById',
                this.$route.params.post
              )
              this.unliked = true
              this.liked = false
              try {
                this.$apollo.mutate({
                  mutation: INSERT_UNLIKED,
                  variables: {
                    user_name: this.$store.state.lists.profile.username,
                    id: this.$route.params.post,
                  },
                })
              } catch (error) {
                console.log(error)
              }
              setTimeout(this.$apollo.queries.threadsui.refetch(), 6000)
            }
          })
          .catch((error) => {
            console.log(error)
          })
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
