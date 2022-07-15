<template>
  <v-row>
    <v-col cols="auto">
      <v-img
        :src="reply.author.profile_image"
        class="rounded-circle"
        width="50px"
      />
    </v-col>
    <v-col cols="10">
      <v-row align="center">
        <v-col cols="auto" class="pr-1">
          <NameShortener :username="reply.author.username" />
        </v-col>
        <v-col cols="auto" class="pl-1">
          {{ reply.created_at | replyTimepost }}
        </v-col>
      </v-row>
      <v-row align="center">
        <v-col class="py-0">
          {{ reply.content }}
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="auto"> Komentar </v-col>
        <v-col cols="auto">
          <v-row justify="center">
            <v-col>
              <v-row v-if="commentsui.length > 0" align="center">
                <v-col
                  v-for="(replydata, index) in commentsui"
                  :key="index"
                  cols="auto"
                  class="pr-2 click-cursor"
                  @click="like(reply.id)"
                >
                  <v-icon v-if="replydata.liked">mdi-thumb-up</v-icon>
                  <v-icon v-else>mdi-thumb-up-outline</v-icon>
                </v-col>
                <v-col cols="auto" class="pl-2">
                  <p class="ma-0" style="width: 50%; display: inline">
                    <FollowerShortener
                      :follower="reply.liked_count - reply.unliked_count"
                    />
                  </p>
                </v-col>
              </v-row>
              <v-row v-else align="center">
                <v-col
                  cols="auto"
                  class="pr-2 click-cursor"
                  @click="like(reply.id)"
                >
                  <v-icon v-if="liked">mdi-thumb-up</v-icon>
                  <v-icon v-else>mdi-thumb-up-outline</v-icon>
                </v-col>
                <v-col cols="auto" class="pl-2">
                  <p class="ma-0" style="width: 50%; display: inline">
                    <FollowerShortener
                      :follower="reply.liked_count - reply.unliked_count"
                    />
                  </p>
                </v-col>
              </v-row>
            </v-col>
          </v-row>
        </v-col>
        <v-col
          v-if="commentsui.length > 0"
          class="click-cursor"
          @click="unlike(reply.id)"
        >
          <section v-for="(replydata, index) in commentsui" :key="index">
            <v-icon v-if="replydata.unliked">mdi-thumb-down</v-icon>
            <v-icon v-else>mdi-thumb-down-outline</v-icon>
          </section>
        </v-col>
        <v-col v-else cols="1" class="click-cursor" @click="unlike(reply.id)">
          <v-icon v-if="unliked">mdi-thumb-down</v-icon>
          <v-icon v-else>mdi-thumb-down-outline</v-icon>
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
  </v-row>
</template>

<script>
import FETCH_REPLIES from '~/apollo/queries/fetch-replies'
import LIKED_REPLIES from '~/apollo/mutations/liked-replies'
import INSERT_LIKED_REPLIES from '~/apollo/mutations/insert-liked-replies'
import INSERT_UNLIKED_REPLIES from '~/apollo/mutations/insert-unliked-replies'
import UNLIKED_REPLIES from '~/apollo/mutations/unliked-replies'
import REVERT_REPLIES from '~/apollo/mutations/revert-replies'
import SUBS_REPLIES from '~/apollo/subscriptions/subs-replies'

import NameShortener from '~/components/utils/NameShortener'
import FollowerShortener from '~/components/utils/FollowerShortener'

export default {
  filters: {
    replyTimepost(date) {
      const seconds = Math.floor((new Date() - new Date(String(date))) / 1000)
      let interval = Math.floor(seconds / 31536000)

      if (interval > 1) {
        return interval + 't'
      }
      interval = Math.floor(seconds / 2592000)
      if (interval > 1) {
        return interval + 'b'
      }
      interval = Math.floor(seconds / 86400)
      if (interval > 1) {
        return interval + 'h'
      }
      interval = Math.floor(seconds / 3600)
      if (interval > 1) {
        return interval + 'j'
      }
      interval = Math.floor(seconds / 60)
      if (interval > 1) {
        return interval + 'm'
      }
      return Math.floor(seconds) + 'd'
    },
  },
  components: {
    NameShortener,
    FollowerShortener,
  },
  apollo: {
    commentsui: {
      prefetch: true,
      query: FETCH_REPLIES,
      variables() {
        return {
          user_name: this.$store.state.lists.profile.username,
          id: this.reply.id,
        }
      },
      subscribeToMore: {
        document: SUBS_REPLIES,
        updateQuery: ({ subscriptionData }) => {
          return {
            commentsui: subscriptionData.data,
          }
        },
      },
    },
  },
  props: {
    reply: {
      type: Object,
      required: true,
    },
  },
  methods: {
    async like(param) {
      const response = await this.$apollo.queries.commentsui.refetch()
      if (response.data.commentsui.length > 0) {
        if (this.commentsui[0].liked === true) {
          this.$axios
            .delete('/reply/' + param + '/like', {
              headers: {
                Authorization: 'Bearer ' + this.$store.state.auth.accessToken,
              },
            })
            .then((response) => {
              if (response.status === 200) {
                this.$store.dispatch(
                  'lists/fetchRepliesByThreadId',
                  this.$route.params.post
                )
                this.liked = true
                this.unliked = false
                try {
                  this.$apollo.mutate({
                    mutation: REVERT_REPLIES,
                    variables: {
                      user_name: this.$store.state.lists.profile.username,
                      id: this.reply.id,
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
          return
        }
        this.$axios
          .post(
            '/reply/' + param + '/like',
            {},
            {
              headers: {
                Authorization: 'Bearer ' + this.$store.state.auth.accessToken,
              },
            }
          )
          .then((response) => {
            if (response.status === 200) {
              this.$store.dispatch(
                'lists/fetchRepliesByThreadId',
                this.$route.params.post
              )
              this.liked = true
              this.unliked = false
              try {
                this.$apollo.mutate({
                  mutation: LIKED_REPLIES,
                  variables: {
                    user_name: this.$store.state.lists.profile.username,
                    id: this.reply.id,
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
            '/reply/' + param + '/like',
            {},
            {
              headers: {
                Authorization: 'Bearer ' + this.$store.state.auth.accessToken,
              },
            }
          )
          .then((response) => {
            if (response.status === 200) {
              this.$store.dispatch(
                'lists/fetchRepliesByThreadId',
                this.$route.params.post
              )
              this.liked = true
              this.unliked = false
              try {
                this.$apollo.mutate({
                  mutation: INSERT_LIKED_REPLIES,
                  variables: {
                    user_name: this.$store.state.lists.profile.username,
                    id: this.reply.id,
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
      }
    },
    async unlike(param) {
      const response = await this.$apollo.queries.commentsui.refetch()
      if (response.data.commentsui.length > 0) {
        if (this.commentsui[0].unliked === true) {
          this.$axios
            .delete('/reply/' + param + '/unlike', {
              headers: {
                Authorization: 'Bearer ' + this.$store.state.auth.accessToken,
              },
            })
            .then((response) => {
              console.log(response)
              if (response.status === 200) {
                this.$store.dispatch(
                  'lists/fetchRepliesByThreadId',
                  this.$route.params.post
                )
                this.liked = true
                this.unliked = false
                try {
                  this.$apollo.mutate({
                    mutation: REVERT_REPLIES,
                    variables: {
                      user_name: this.$store.state.lists.profile.username,
                      id: this.reply.id,
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
          return
        }
        this.$axios
          .post(
            '/reply/' + param + '/unlike',
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
                'lists/fetchRepliesByThreadId',
                this.$route.params.post
              )
              this.unliked = true
              this.liked = false
              try {
                this.$apollo.mutate({
                  mutation: UNLIKED_REPLIES,
                  variables: {
                    user_name: this.$store.state.lists.profile.username,
                    id: this.reply.id,
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
            '/reply/' + param + '/unlike',
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
                'lists/fetchRepliesByThreadId',
                this.$route.params.post
              )
              this.unliked = true
              this.liked = false
              try {
                this.$apollo.mutate({
                  mutation: INSERT_UNLIKED_REPLIES,
                  variables: {
                    user_name: this.$store.state.lists.profile.username,
                    id: this.reply.id,
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
      }
    },
  }
}
</script>
