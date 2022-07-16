<template>
  <v-row align="center">
    <v-col>
      <router-link
        :to="`/topic/${topic.id}`"
        style="text-decoration: none; color: black"
      >
        <v-row>
          <v-col cols="2" class="pr-0" style="max-width: 3rem">
            <div class="text-overline">{{ index + 1 }}.</div>
          </v-col>
          <v-col cols="2" class="px-2" style="max-width: 45px">
            <v-img
              :src="topic.profile_image"
              class="rounded-circle"
              width="30"
              height="30"
            ></v-img>
          </v-col>
          <v-col cols="auto" class="pl-0" align-self="center">
            <TopicShortener :name="topic.name" />
          </v-col>
        </v-row>
      </router-link>
    </v-col>
    <v-col cols="2" class="pr-4" style="max-width: 10rem">
      <v-btn
        v-if="isAdmin"
        class="text-capitalize"
        @click="$router.push(`/topic/${topic.id}/details`)"
      >
        Details
      </v-btn>
      <v-btn v-else class="text-capitalize">Follow</v-btn>
    </v-col>
  </v-row>
</template>

<script>
import { mapGetters } from 'vuex'

import TopicShortener from '~/components/utils/TopicShortener'

export default {
  components: {
    TopicShortener,
  },
  props: {
    topic: {
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
