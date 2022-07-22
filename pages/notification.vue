<template>
  <section>
    <section style="background-color: #ffffff">
      <v-container>
        <v-row justify="center" class="px-4">
          <v-col class="my-2">
            <h2>Notification</h2>
            <p>Lists to all of your notification</p>
          </v-col>
        </v-row>
      </v-container>
    </section>
    <v-container>
      <v-row justify="center">
        <v-col cols="12">
          <v-card class="shadow rounded-lg" outlined>
            <v-data-table
              :headers="headers"
              :items="notification"
              hide-default-header
              :items-per-page="5"
              class="elevation-1"
            >
              <template #[`item.id`]="{ item }">
                <v-list-item>
                  <v-list-item-content>
                    <v-row align="center">
                      <v-col cols="auto" style="max-width: none">
                        <v-img
                          :src="item.image"
                          class="rounded-circle"
                          width="35"
                          height="35"
                        ></v-img>
                      </v-col>
                      <v-row align="center">
                        <v-col>
                          <div class="font-weight-bold d-flex pt-5">
                            <span class="mr-5">{{ item.username }}</span>
                            <span>{{ item.time + ' hari yang lalu' }}</span>
                          </div>
                          <div class="d-flex my-3">
                            <span class="mr-3"> Membalas komentar kamu : </span>
                            <span class="font-weight-bold">
                              {{ item.reply }}
                            </span>
                          </div>
                          <div class="d-flex my-3">
                            <v-divider vertical bold></v-divider>
                            <span class="text--disabled mx-3">
                              {{ item.comment }}
                            </span>
                          </div>
                        </v-col>
                      </v-row>
                    </v-row>
                  </v-list-item-content>
                </v-list-item>
              </template>
            </v-data-table>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </section>
</template>

<script>
export default {
  name: 'NotificationList',
  middleware: 'authenticated',
  data() {
    return {
      search: '',
      headers: [
        {
          text: 'Notification',
          align: 'start',
          sortable: false,
          value: 'id',
        },
      ],
      notification: [
        {
          username: '@timqe1',
          time: 2,
          reply: 'coba tebak dari mana',
          comment: 'Dari mana aja itu?? Pengen juga',
          image: 'https://dummyimage.com/500x500/6e6e6e/fff.jpg',
        },
      ],
    }
  },
}
</script>

<style scoped></style>
