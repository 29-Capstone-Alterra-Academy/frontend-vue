<template>
  <v-row justify="center" style="position: relative;">
    <v-col cols="7">
      <v-row>
        <v-col v-for="thread in threads" :key="thread.id" cols="12">
          <v-card class="mx-auto" outlined>
            <v-list-item three-line>
              <v-list-item-content>
                <v-row>
                  <v-col cols="1" style="max-width: none">
                    <v-img
                      :src="thread.user.avatar"
                      class="image-rounded"
                      width="30"
                    ></v-img>
                  </v-col>
                  <v-col>
                    <div class="text-overline mb-4">
                      {{ thread.user.username }}
                    </div>
                  </v-col>
                </v-row>
                <v-list-item-title class="text-h5 mb-1">
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
            <v-card-actions>
              <v-list-item>
                <v-list-item-content>
                  <div>
                    <v-icon>mdi-thumb-up</v-icon>
                    {{ thread.likes }}
                    <v-icon>mdi-message-processing</v-icon>
                    {{ Object.keys(thread.comments).length }}
                  </div>
                </v-list-item-content>
              </v-list-item>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </v-col>
    <v-col style="position: relative;">
      <v-card class="mx-auto" outlined style="position: fixed;">
        <v-list-item three-line>
          <v-list-item-content>
            <v-row>
              <v-col v-for="topic in topics" :key="topic.id" cols="12">
                <v-row>
                  <v-col cols="1">
                    <div class="text-overline mb-4" max-width="none">
                      {{ topic.id }}.
                    </div>
                  </v-col>
                  <v-col cols="1" style="max-width: none">
                    <v-img
                      :src="topic.image"
                      class="image-rounded"
                      width="30"
                    ></v-img>
                  </v-col>
                  <v-col>
                    <div class="text-overline mb-4">
                      {{ topic.name }}
                    </div>
                  </v-col>
                  <v-col cols="3">
                    <v-btn>
                      Follow
                    </v-btn>
                  </v-col>
                </v-row>
              </v-col>
            </v-row>
          </v-list-item-content>
        </v-list-item>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
export default {
  name: 'IndexPage',
  data() {
    return {
      threads: [
        {
          id: 1,
          slug: 'This is dummy post`s slug',
          user: {
            username: 'JohnLeider',
            avatar: 'https://randomuser.me/api/portraits/women/84.jpg',
          },
          body: 'This is dummy post`s body',
          image: 'https://cataas.com/cat',
          likes: 212,
          comments: {
            id: 1,
            username: 'JohnLeider',
            body: 'This is dummy post`s comment',
          },
        },
        {
          id: 2,
          slug: 'This is dummy post`s slug',
          user: {
            username: 'JohnLeider',
            avatar: 'https://randomuser.me/api/portraits/women/84.jpg',
          },
          body: 'This is dummy post`s body',
          image: null,
          likes: 212,
          comments: {
            id: 1,
            username: 'JohnLeider',
            body: 'This is dummy post`s comment',
          },
        },
      ],
      topics: [
        {
          id: 1,
          name: 'Genshin Impact',
          image: 'https://randomuser.me/api/portraits/women/84.jpg',
        },
        {
          id: 2,
          name: 'Cing Kucing',
          image: 'https://randomuser.me/api/portraits/women/84.jpg',
        },
      ],
    }
  },
}
</script>

<style scoped>
.image-rounded.theme--dark {
  border-radius: 50%;
}
</style>
