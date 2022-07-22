<template>
  <v-dialog :value="value" max-width="700" @input="$emit('input', $event)">
    <v-snackbar v-model="snackbar" :timeout="5000">
      Permintaan moderator berhasil diterima
      <template #action="{ attrs }">
        <v-btn color="primary" text v-bind="attrs" @click="snackbar = false"
          >Close</v-btn
        >
      </template>
    </v-snackbar>
    <v-snackbar v-model="snackbarFalse" :timeout="5000">
      Terjadi kesalahan saat menerima permintaan moderator
      <template #action="{ attrs }">
        <v-btn
          color="warning"
          text
          v-bind="attrs"
          @click="snackbarFalse = false"
          >Close</v-btn
        >
      </template>
    </v-snackbar>
    <v-snackbar v-model="snackbarReject" :timeout="5000">
      Permintaan moderator berhasil ditolak
      <template #action="{ attrs }">
        <v-btn
          color="primary"
          text
          v-bind="attrs"
          @click="snackbarReject = false"
          >Close</v-btn
        >
      </template>
    </v-snackbar>
    <v-snackbar v-model="snackbarRejectFalse" :timeout="5000">
      Terjadi kesalahan saat menolak permintaan moderator
      <template #action="{ attrs }">
        <v-btn
          color="warning"
          text
          v-bind="attrs"
          @click="snackbarRejectFalse = false"
          >Close</v-btn
        >
      </template>
    </v-snackbar>
    <v-card>
      <v-card-title class="text-h5">
        <v-col cols="11" class="pa-0"> Tambahkan Moderator </v-col>
        <v-col cols="auto" class="pa-0">
          <v-btn icon @click.native="$emit('input', false)">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-col>
      </v-card-title>
      <v-card-title class="pt-0">
        <v-divider />
      </v-card-title>

      <v-card-text>
        <v-data-table
          :headers="user"
          :items="
            users.filter((item) => {
              return item.topic.id === topic.id
            })
          "
          :search="search"
          flat
          class="elevation-1"
        >
          <template #[`item.username`]="{ item }">
            <div class="d-flex">
              <v-img
                :src="item.user.profile_image"
                max-width="25"
                class="rounded-circle"
              ></v-img>
              <span class="px-2"
                ><NameShortener :username="item.user.username"
              /></span>
            </div>
          </template>
          <template #[`item.topic`]="{ item }">
            <TopicShortener :name="item.topic.name" />
          </template>
          <template #[`item.actions`]="{ item }">
            <v-btn class="mx-1" text outlined @click="acc(item.id)">
              Acc
            </v-btn>
            <v-btn class="mx-1" text outlined @click="rej(item.id)">
              Rej
            </v-btn>
          </template>
        </v-data-table>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>
import NameShortener from '~/components/utils/NameShortener'
import TopicShortener from '~/components/utils/TopicShortener'

export default {
  components: {
    NameShortener,
    TopicShortener,
  },
  props: {
    value: {
      type: Boolean,
      default: false,
    },
    topic: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      snackbar: false,
      snackbarReject: false,
      snackbarFalse: false,
      snackbarRejectFalse: false,
      user: [
        {
          text: 'User',
          align: 'center',
          sortable: true,
          value: 'username',
        },
        {
          text: 'Topic',
          align: 'center',
          sortable: true,
          value: 'topic',
        },
        {
          text: 'Actions',
          align: 'center',
          sortable: false,
          value: 'actions',
        },
      ],
    }
  },
  computed: {
    users() {
      console.log(this.$store.state.lists.users)
      return this.$store.state.lists.users
    },
  },
  mounted() {
    this.$store.dispatch('lists/fetchModeratorsRequests')
  },
  methods: {
    acc(param) {
      this.$axios
        .put(
          `/modrequest?promotionId=${param}&action=approve`,
          {},
          {
            headers: {
              Authorization: 'Bearer ' + this.$store.state.auth.accessToken,
            },
          }
        )
        .then((response) => {
          if (response.status === 200) {
            this.snackbar = true
          }
        })
        .catch((error) => {
          if (error.status) {
            this.snackbarFalse = true
          }
        })
    },
    rej(param) {
      this.$axios
        .put(
          `/modrequest?promotionId=${param}&action=reject`,
          {},
          {
            headers: {
              Authorization: 'Bearer ' + this.$store.state.auth.accessToken,
            },
          }
        )
        .then((response) => {
          if (response.status === 200) {
            this.snackbarReject = true
          }
        })
        .catch((error) => {
          if (error.status) {
            this.snackbarRejectFalse = true
          }
        })
    },
  },
}
</script>
