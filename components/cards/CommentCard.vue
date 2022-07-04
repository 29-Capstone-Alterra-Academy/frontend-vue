<template>
  <v-row>
    <v-col cols="auto">
      <v-img
        :src="reply.author.profile_image"
        class="rounded-circle"
        width="50px"
      />
    </v-col>
    <v-col cols="auto">
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
          <v-row justify="center" align="center">
            <v-col cols="auto" class="pa-0 py-2 pr-1">
              <v-icon>mdi-thumb-up-outline</v-icon>
            </v-col>
            <v-col cols="auto" class="pa-0 py-2 pl-1">
              <p class="ma-0" style="width: 50%; display: inline">
                <FollowerShortener :follower="reply.like - reply.dislike" />
              </p>
            </v-col>
          </v-row>
        </v-col>
        <v-col cols="auto" class="py-2" justify="center">
          <v-icon>mdi-thumb-down-outline</v-icon>
        </v-col>
        <v-col class="py-2">
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
  props: {
    reply: {
      type: Object,
      required: true,
    },
  },
}
</script>
