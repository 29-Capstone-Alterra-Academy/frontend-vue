<template>
  <section>
    <v-btn
      v-if="isAdmin"
      class="text-capitalize"
      text
      outlined
      @click="$router.push(`/user/${user.id}`)"
      >Details
    </v-btn>
    <section v-else>
      <section
        v-if="
          usersui.filter((item) => {
            return item.user_id === user.id
          }).length > 0
        "
      >
        <section
          v-for="(userdata, id) in usersui.filter((item) => {
            return item.user_id === user.id
          })"
          :key="id"
        >
          <v-btn
            v-if="userdata.follow"
            class="text-capitalize"
            text
            outlined
            @click="unfollowing(user.id)"
          >
            Unfollow
          </v-btn>
          <v-btn
            v-else
            class="text-capitalize"
            text
            outlined
            @click="following(user.id)"
          >
            Follow
          </v-btn>
        </section>
      </section>
      <section v-else>
        <v-btn
          v-if="follow"
          class="text-capitalize"
          text
          outlined
          @click="unfollowing(user.id)"
        >
          Unfollow
        </v-btn>
        <v-btn
          v-else
          class="text-capitalize"
          text
          outlined
          @click="following(user.id)"
        >
          Follow
        </v-btn>
      </section>
    </section>
  </section>
</template>

<script>
import { mapGetters } from 'vuex'

import FOLLOWED_USERS from '~/apollo/mutations/followed-users'
import INSERT_FOLLOWED_USERS from '~/apollo/mutations/insert-followed-users'
import INSERT_UNFOLLOWED_USERS from '~/apollo/mutations/insert-unfollowed-users'
import UNFOLLOWED_USERS from '~/apollo/mutations/unfollowed-users'

export default {
  props: {
    user: {
      type: Object,
      required: true,
    },
    usersui: {
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
    following(param) {
      if (
        this.usersui.filter((item) => {
          return item.user_id === this.user.id
        }).length > 0
      ) {
        this.$axios
          .post(
            '/user/' + param + '/follow',
            {},
            {
              headers: {
                Authorization: 'Bearer ' + this.$store.state.auth.accessToken,
              },
            }
          )
          .then((response) => {
            if (response.status === 200) {
              this.$store.dispatch('lists/fetchUserById', this.user.id)
              this.follow = true
              try {
                this.$apollo.mutate({
                  mutation: FOLLOWED_USERS,
                  variables: {
                    user_name: this.$store.state.lists.profile.username,
                    id: this.user.id,
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
            '/user/' + param + '/follow',
            {},
            {
              headers: {
                Authorization: 'Bearer ' + this.$store.state.auth.accessToken,
              },
            }
          )
          .then((response) => {
            if (response.status === 200) {
              this.$store.dispatch('lists/fetchUserById', this.user.id)
              this.follow = true
              try {
                this.$apollo.mutate({
                  mutation: INSERT_FOLLOWED_USERS,
                  variables: {
                    user_name: this.$store.state.lists.profile.username,
                    id: this.user.id,
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
    unfollowing(param) {
      if (
        this.usersui.filter((item) => {
          return item.user_id === this.user.id
        }).length > 0
      ) {
        this.$axios
          .post(
            '/user/' + param + '/unfollow',
            {},
            {
              headers: {
                Authorization: 'Bearer ' + this.$store.state.auth.accessToken,
              },
            }
          )
          .then((response) => {
            if (response.status === 200) {
              this.$store.dispatch('lists/fetchUserById', this.user.id)
              this.follow = false
              try {
                this.$apollo.mutate({
                  mutation: UNFOLLOWED_USERS,
                  variables: {
                    user_name: this.$store.state.lists.profile.username,
                    id: this.user.id,
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
            '/user/' + param + '/unfollow',
            {},
            {
              headers: {
                Authorization: 'Bearer ' + this.$store.state.auth.accessToken,
              },
            }
          )
          .then((response) => {
            if (response.status === 200) {
              this.$store.dispatch('lists/fetchUserById', this.user.id)
              this.follow = false
              try {
                this.$apollo.mutate({
                  mutation: INSERT_UNFOLLOWED_USERS,
                  variables: {
                    user_name: this.$store.state.lists.profile.username,
                    id: this.user.id,
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
