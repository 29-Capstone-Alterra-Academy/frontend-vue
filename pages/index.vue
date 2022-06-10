<template>
  <v-row justify="center" style="position: relative;">
    <v-col cols="7">
      <v-row>
        <v-col cols="12" class="pt-3 py-1">
          <v-btn outlined block class="rounded-lg text-capitalize" to="/create-post">
            <div class="mr-auto">
              <v-icon>mdi-plus</v-icon>
              Create New Post
            </div>
          </v-btn>
        </v-col>
        <v-col cols="12" class="py-1">
          <v-card class="rounded-lg mx-auto py-3 px-3" outlined>
            <v-row>
              <v-col cols="auto">
                <v-btn outlined class="text-capitalize rounded-lg" color="info">
                  <v-icon>mdi-fire</v-icon>Rekomendasi
                </v-btn>
              </v-col>
              <v-col cols="auto">
                <v-btn outlined class="text-capitalize rounded-lg">Mengikuti</v-btn>
              </v-col>
            </v-row>
          </v-card>
        </v-col>
        <v-col v-for="thread in threads" :key="thread.id" cols="12" class="py-1">
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
                      <small class="text--disabled">Posted by @{{thread.user.username}} {{thread.user.timepost}} ago</small>
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
                        <p class="ma-0" style="width: 50%; display: inline">{{ thread.likes }}</p>
                      </v-col>
                      <v-col justify="center">
                        <v-icon>mdi-message-processing</v-icon>
                        <p class="ma-0" style="width: 50%; display: inline">{{ Object.keys(thread.comments).length }}</p>
                      </v-col>
                      <v-col>
                        ...
                      </v-col>
                    </v-row>
                  </v-col>
                </v-list-item-content>
              </v-list-item>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </v-col>
    <v-col cols="4" style="width: 373.75px">
      <v-row style="position: fixed; width: inherit">
        <v-col cols="12" class="pt-3 py-1">
          <v-card class="rounded-lg" outlined>
            <v-list-item three-line>
              <v-list-item-content>
                <h4 class="text-capitalize mb-3">Hot Topic</h4>
                <v-row>
                  <v-col v-for="topic in topics" :key="topic.id" cols="12">
                    <v-row>
                      <v-col cols="1" class="pr-0" style="max-width: 2rem">
                        <div class="text-overline">{{ topic.id }}.</div>
                      </v-col>
                      <v-col cols="1" class="px-2" style="max-width: none">
                        <v-img
                          :src="topic.image"
                          class="image-rounded"
                          width="30"
                        ></v-img>
                      </v-col>
                      <v-col class="pl-0">
                        <div class="text-overline">
                          {{ topic.name }}
                        </div>
                      </v-col>
                      <v-col cols="2" style="max-width: 10rem">
                        <v-btn class="text-capitalize">Follow</v-btn>
                      </v-col>
                    </v-row>
                  </v-col>
                </v-row>
              </v-list-item-content>
            </v-list-item>
          </v-card>
        </v-col>
        <v-col cols="12" class="py-1">
          <v-card class="rounded-lg" outlined>
            <v-list-item three-line>
              <v-list-item-content>
                <h4 class="text-capitalize mb-3">Hot Contributors</h4>
                <v-row>
                  <v-col v-for="contributor in contributors" :key="contributor.id" cols="12">
                    <v-row>
                      <v-col cols="1" class="pr-0" style="max-width: 2rem">
                        <div class="text-overline">{{ contributor.id }}.</div>
                      </v-col>
                      <v-col cols="1" class="px-2" style="max-width: none">
                        <v-img
                          :src="contributor.image"
                          class="image-rounded"
                          width="30"
                        ></v-img>
                      </v-col>
                      <v-col class="pl-0" align-self="center">
                        <div class="text-p">
                          @{{ contributor.username }}
                        </div>
                      </v-col>
                      <v-col cols="2" style="max-width: 10rem">
                        <v-btn class="text-capitalize">Follow</v-btn>
                      </v-col>
                    </v-row>
                  </v-col>
                </v-row>
              </v-list-item-content>
            </v-list-item>
          </v-card>
        </v-col>
        <v-col cols="12" class="py-1">
          <v-card class="rounded-lg" outlined>
            <v-list-item>
              <v-list-item-content>
                <v-row>
                  <v-col cols="12" class="py-3">
                    <v-btn outlined block class="rounded-lg text-capitalize my-auto" to="/create-post">
                      <div class="mr-auto">
                        <v-icon>mdi-plus</v-icon>
                        Create New Post
                      </div>
                    </v-btn>
                  </v-col>
                </v-row>
              </v-list-item-content>
            </v-list-item>
          </v-card>
        </v-col>
      </v-row>
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
            timepost: '8 hours'
          },
          body: 'This is dummy post`s body',
          image: 'https://cataas.com/cat',
          likes: 212,
          comments: [
            {
              id: 1,
              username: 'JohnLeider',
              body: 'This is dummy post`s comment',
            },
            {
              id: 2,
              username: 'JohnLeider',
              body: 'This is dummy post`s comment',
            },
            {
              id: 3,
              username: 'JohnLeider',
              body: 'This is dummy post`s comment',
            },
            {
              id: 4,
              username: 'JohnLeider',
              body: 'This is dummy post`s comment',
            },
            {
              id: 5,
              username: 'JohnLeider',
              body: 'This is dummy post`s comment',
            },
            {
              id: 6,
              username: 'JohnLeider',
              body: 'This is dummy post`s comment',
            },
          ],
        },
        {
          id: 2,
          slug: 'This is dummy post`s slug',
          user: {
            username: 'DianaPetersen',
            avatar: 'https://randomuser.me/api/portraits/women/85.jpg',
            timepost: '10 hours'
          },
          body: 'This is dummy post`s body',
          image: null,
          likes: 212,
          comments: [
            {
              id: 1,
              username: 'JohnLeider',
              body: 'This is dummy post`s comment',
            },
          ],
        },
        {
          id: 3,
          slug: 'This is dummy post`s slug',
          user: {
            username: 'JohnLeider',
            avatar: 'https://randomuser.me/api/portraits/women/84.jpg',
            timepost: '18 hours'
          },
          body: 'This is dummy post`s body',
          image: 'https://cataas.com/cat',
          likes: 212,
          comments: [],
        },
        {
          id: 4,
          slug: 'This is dummy post`s slug',
          user: {
            username: 'JohnLeider',
            avatar: 'https://randomuser.me/api/portraits/women/84.jpg',
            timepost: '1 months'
          },
          body: 'This is dummy post`s body',
          image: null,
          likes: 212,
          comments: [
            {
              id: 1,
              username: 'JohnLeider',
              body: 'This is dummy post`s comment',
            },
          ],
        },
        {
          id: 5,
          slug: 'This is dummy post`s slug',
          user: {
            username: 'JohnLeider',
            avatar: 'https://randomuser.me/api/portraits/women/84.jpg',
            timepost: '1 hours'
          },
          body: 'This is dummy post`s body',
          image: 'https://cataas.com/cat',
          likes: 212,
          comments: [
            {
              id: 1,
              username: 'JohnLeider',
              body: 'This is dummy post`s comment',
            },
          ],
        },
        {
          id: 6,
          slug: 'This is dummy post`s slug',
          user: {
            username: 'JohnLeider',
            avatar: 'https://randomuser.me/api/portraits/women/84.jpg',
            timepost: '5 hours'
          },
          body: 'This is dummy post`s body',
          image: null,
          likes: 212,
          comments: [
            {
              id: 1,
              username: 'JohnLeider',
              body: 'This is dummy post`s comment',
            },
          ],
        },
        {
          id: 7,
          slug: 'This is dummy post`s slug',
          user: {
            username: 'JohnLeider',
            avatar: 'https://randomuser.me/api/portraits/women/84.jpg',
            timepost: '8 hours'
          },
          body: 'This is dummy post`s body',
          image: 'https://cataas.com/cat',
          likes: 212,
          comments: [
            {
              id: 1,
              username: 'JohnLeider',
              body: 'This is dummy post`s comment',
            },
            {
              id: 2,
              username: 'JohnLeider',
              body: 'This is dummy post`s comment',
            },
            {
              id: 3,
              username: 'JohnLeider',
              body: 'This is dummy post`s comment',
            },
          ],
        },
        {
          id: 8,
          slug: 'This is dummy post`s slug',
          user: {
            username: 'JohnLeider',
            avatar: 'https://randomuser.me/api/portraits/women/84.jpg',
            timepost: '6 hours'
          },
          body: 'This is dummy post`s body',
          image: null,
          likes: 212,
          comments: [
            {
              id: 1,
              username: 'JohnLeider',
              body: 'This is dummy post`s comment',
            },
          ],
        },
      ],
      topics: [
        {
          id: 1,
          name: 'Technology',
          image: 'https://randomuser.me/api/portraits/women/84.jpg',
        },
        {
          id: 2,
          name: 'Kucing',
          image: 'https://randomuser.me/api/portraits/women/85.jpg',
        },
      ],
      contributors: [
        {
          id: 1,
          username: 'chupachups',
          image: 'https://randomuser.me/api/portraits/women/50.jpg',
        },
        {
          id: 2,
          username: 'marsonmark',
          image: 'https://randomuser.me/api/portraits/women/81.jpg',
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
