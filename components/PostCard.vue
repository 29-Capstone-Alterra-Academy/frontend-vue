<template>
  <v-card class="rounded-lg mx-auto" outlined>
    <v-list-item three-line>
      <v-list-item-content>
        <v-row>
          <v-col cols="1" style="max-width: none">
            <v-img
              :src="thread.user.avatar"
              class="image-rounded"
              width="35"
            ></v-img>
          </v-col>
          <v-col align-self="center" cols="auto">
            <div>
              {{ thread.user.username }}
            </div>
          </v-col>
          <v-col align-self="center">
            <div>
              <small class="text--disabled"
                >Posted by @{{ thread.user.username }}
                {{ thread.user.timepost }} ago</small
              >
            </div>
          </v-col>
        </v-row>
        <v-list-item-title class="text-h6 my-2">
          {{ thread.slug }}
        </v-list-item-title>
        <v-flex class="text-center">
          <v-img
            :src="thread.image"
            class="mx-auto"
            max-width="75%"
            max-height="75%"
          ></v-img>
        </v-flex>
      </v-list-item-content>
    </v-list-item>
    <v-card-actions class="pa-0">
      <v-list-item>
        <v-list-item-content>
          <v-col cols="5" class="pa-0">
            <v-row>
              <v-col justify="center">
                <v-icon>mdi-heart</v-icon>
                <p class="ma-0" style="width: 50%; display: inline">
                  {{ thread.likes }}
                </p>
              </v-col>
              <v-col justify="center">
                <v-icon>mdi-message-processing</v-icon>
                <p class="ma-0" style="width: 50%; display: inline">
                  {{ Object.keys(thread.comments).length }}
                </p>
              </v-col>
              <v-col> ... </v-col>
            </v-row>
          </v-col>
        </v-list-item-content>
      </v-list-item>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
    props: {
        thread: {
            type: Object,
            required: true
        }
    },
}
</script>
