<template>
  <v-row align="center">
    <v-col>
      <router-link
        :to="`/user/${user.id}`"
        style="text-decoration: none; color: black"
      >
        <v-row>
          <v-col cols="1" class="pr-0" style="max-width: 3rem">
            <div class="text-overline">{{ index + 1 }}.</div>
          </v-col>
          <v-col cols="2" class="px-2" style="max-width: 45px">
            <v-img
              :src="user.profile_image"
              class="rounded-circle"
              width="30"
              height="30"
            ></v-img>
          </v-col>
          <v-col cols="auto" class="px-0" align-self="center">
            <NameShortener :username="user.username" />
          </v-col>
        </v-row>
      </router-link>
    </v-col>
    <v-col cols="2" class="" style="max-width: 10rem">
      <v-btn
        v-if="isAdmin"
        class="text-capitalize rounded-lg"
        text
        outlined
        small
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
              class="text-capitalize rounded-lg"
              text
              outlined
              small
              @click="unfollowing(user.id)"
            >
              Unfollow
            </v-btn>
            <v-btn
              v-else
              class="text-capitalize rounded-lg"
              text
              outlined
              small
              @click="following(user.id)"
            >
              Follow
            </v-btn>
          </section>
        </section>
        <section v-else>
          <v-btn
            v-if="follow"
            class="text-capitalize rounded-lg"
            text
            outlined
            small
            @click="unfollowing(user.id)"
          >
            Unfollow
          </v-btn>
          <v-btn
            v-else
            class="text-capitalize rounded-lg"
            text
            outlined
            small
            @click="following(user.id)"
          >
            Follow
          </v-btn>
        </section>
      </section>
    </v-col>
  </v-row>
</template>

<script>
import { mapGetters } from 'vuex'

import FOLLOWED_USERS from '~/apollo/mutations/followed-users'
import INSERT_FOLLOWED_USERS from '~/apollo/mutations/insert-followed-users'
import INSERT_UNFOLLOWED_USERS from '~/apollo/mutations/insert-unfollowed-users'
import UNFOLLOWED_USERS from '~/apollo/mutations/unfollowed-users'

import NameShortener from '~/components/utils/NameShortener'

export default {
  components: {
    NameShortener,
  },
  props: {
    user: {
      type: Object,
      required: true,
    },
    index: {
      type: Number,
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
