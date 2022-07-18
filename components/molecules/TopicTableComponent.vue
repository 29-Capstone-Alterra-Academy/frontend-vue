<template>
  <section>
    <v-btn
      v-if="isAdmin"
      class="text-capitalize"
      @click="$router.push(`/topic/${topic.id}/details-admin`)"
      >Details
    </v-btn>
    <v-btn
      v-if="!isAdmin && profile.username === 'moderator'"
      class="text-capitalize"
      @click="$router.push(`/topic/${topic.id}/details`)"
      >Details
    </v-btn>
    <section v-if="!isAdmin">
      <section
        v-if="
          topicsui.filter((item) => {
            return item.topic_id === topic.id
          }).length > 0
        "
      >
        <section
          v-for="(topicdata, id) in topicsui.filter((item) => {
            return item.topic_id === topic.id
          })"
          :key="id"
        >
          <v-btn
            v-if="topicdata.subscribe"
            class="text-capitalize"
            @click="unfollow(topic.id)"
          >
            Unfollow
          </v-btn>
          <v-btn v-else class="text-capitalize" @click="follow(topic.id)">
            Follow
          </v-btn>
        </section>
      </section>
      <section v-else>
        <v-btn
          v-if="subscribe"
          class="text-capitalize"
          @click="unfollow(topic.id)"
        >
          Unfollow
        </v-btn>
        <v-btn v-else class="text-capitalize" @click="follow(topic.id)">
          Follow
        </v-btn>
      </section>
    </section>
  </section>
</template>

<script>
import { mapGetters } from 'vuex'

import SUBSCRIBE_TOPICS from '~/apollo/mutations/subscribed-topics'
import INSERT_SUBSCRIBE_TOPICS from '~/apollo/mutations/insert-subscribed-topics'
import INSERT_UNSUBSCRIBE_TOPICS from '~/apollo/mutations/insert-unsubscribed-topics'
import UNSUBSCRIBE_TOPICS from '~/apollo/mutations/unsubscribed-topic'

export default {
  props: {
    topic: {
      type: Object,
      required: true,
    },
    topicsui: {
      type: Array,
      required: true,
    },
  },
  computed: {
    ...mapGetters('lists', ['isAdmin']),
    profile() {
      return this.$store.state.lists.profile
    },
  },
  methods: {
    follow(param) {
      if (
        this.topicsui.filter((item) => {
          return item.topic_id === this.topic.id
        }).length > 0
      ) {
        this.$axios
          .post(
            '/topic/' + param + '/subscribe',
            {},
            {
              headers: {
                Authorization: 'Bearer ' + this.$store.state.auth.accessToken,
              },
            }
          )
          .then((response) => {
            if (response.status === 200) {
              this.$store.dispatch('lists/fetchTopicById', this.topic.id)
              this.subscribe = true
              try {
                this.$apollo.mutate({
                  mutation: SUBSCRIBE_TOPICS,
                  variables: {
                    user_name: this.$store.state.lists.profile.username,
                    id: this.topic.id,
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
            '/topic/' + param + '/subscribe',
            {},
            {
              headers: {
                Authorization: 'Bearer ' + this.$store.state.auth.accessToken,
              },
            }
          )
          .then((response) => {
            if (response.status === 200) {
              this.$store.dispatch('lists/fetchTopicById', this.topic.id)
              this.subscribe = true
              try {
                this.$apollo.mutate({
                  mutation: INSERT_SUBSCRIBE_TOPICS,
                  variables: {
                    user_name: this.$store.state.lists.profile.username,
                    id: this.topic.id,
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
    unfollow(param) {
      if (
        this.topicsui.filter((item) => {
          return item.topic_id === this.topic.id
        }).length > 0
      ) {
        this.$axios
          .post(
            '/topic/' + param + '/unsubscribe',
            {},
            {
              headers: {
                Authorization: 'Bearer ' + this.$store.state.auth.accessToken,
              },
            }
          )
          .then((response) => {
            if (response.status === 200) {
              this.$store.dispatch('lists/fetchTopicById', this.topic.id)
              this.subscribe = false
              try {
                this.$apollo.mutate({
                  mutation: UNSUBSCRIBE_TOPICS,
                  variables: {
                    user_name: this.$store.state.lists.profile.username,
                    id: this.topic.id,
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
            '/topic/' + param + '/unsubscribe',
            {},
            {
              headers: {
                Authorization: 'Bearer ' + this.$store.state.auth.accessToken,
              },
            }
          )
          .then((response) => {
            if (response.status === 200) {
              this.$store.dispatch('lists/fetchTopicById', this.topic.id)
              this.subscribe = false
              try {
                this.$apollo.mutate({
                  mutation: INSERT_UNSUBSCRIBE_TOPICS,
                  variables: {
                    user_name: this.$store.state.lists.profile.username,
                    id: this.topic.id,
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
  },
}
</script>

<style scoped>
.click-cursor {
  cursor: pointer;
}
</style>
