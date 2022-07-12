<template>
  <v-row>
    <v-col>
      <router-link
        :to="`/user/${user.username}`"
        style="text-decoration: none; color: black"
      >
        <v-row>
          <v-col cols="1" class="pr-0" style="max-width: 2rem">
            <div class="text-overline">{{ index + 1 }}.</div>
          </v-col>
          <v-col cols="1" class="px-2" style="max-width: none">
            <v-img
              :src="user.profile_image"
              class="rounded-circle"
              width="30"
              height="30"
            ></v-img>
          </v-col>
          <v-col class="pl-0" align-self="center">
            <NameShortener :username="user.username" />
          </v-col>
        </v-row>
      </router-link>
    </v-col>
    <v-col cols="2" style="max-width: 10rem">
      <v-btn
        v-if="isAdmin"
        class="text-capitalize"
        @click="$router.push(`/user/${user.id}`)"
        >Details</v-btn
      >
      <v-btn v-else class="text-capitalize">Follow</v-btn>
    </v-col>
  </v-row>
</template>

<script>
import { mapGetters } from 'vuex'

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
  },
  computed: {
    ...mapGetters('lists', ['isAdmin']),
  },
  methods: {},
}
</script>

<style scoped>
.click-cursor {
  cursor: pointer;
}
</style>
