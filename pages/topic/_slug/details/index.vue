<template>
  <v-container class="py-0" style="width: 93.67%">
    <v-snackbar v-model="snackbarDesc" :timeout="5000">
      Deskripsi topik berhasil diubah
      <template #action="{ attrs }">
        <v-btn color="primary" text v-bind="attrs" @click="snackbarDesc = false"
          >Close</v-btn
        >
      </template>
    </v-snackbar>
    <v-snackbar v-model="snackbarDescFalse" :timeout="5000">
      Terjadi kesalahan saat mengubah deskripsi topik
      <template #action="{ attrs }">
        <v-btn
          color="warning"
          text
          v-bind="attrs"
          @click="snackbarDescFalse = false"
          >Close</v-btn
        >
      </template>
    </v-snackbar>
    <v-snackbar v-model="snackbarRules" :timeout="5000">
      Rules topik berhasil diubah
      <template #action="{ attrs }">
        <v-btn color="primary" text v-bind="attrs" @click="snackbarRules = false"
          >Close</v-btn
        >
      </template>
    </v-snackbar>
    <v-snackbar v-model="snackbarRulesFalse" :timeout="5000">
      Terjadi kesalahan saat mengubah rules topik
      <template #action="{ attrs }">
        <v-btn
          color="warning"
          text
          v-bind="attrs"
          @click="snackbarRulesFalse = false"
          >Close</v-btn
        >
      </template>
    </v-snackbar>
    <v-snackbar v-model="snackbarStepdown" :timeout="5000">
      Anda berhasil mengundurkan diri dari moderator
      <template #action="{ attrs }">
        <v-btn
          color="primary"
          text
          v-bind="attrs"
          @click="snackbarStepdown = false"
          >Close</v-btn
        >
      </template>
    </v-snackbar>
    <v-snackbar v-model="snackbarStepdownFalse" :timeout="5000">
      Terjadi kesalahan saat mengundurkan diri
      <template #action="{ attrs }">
        <v-btn
          color="warning"
          text
          v-bind="attrs"
          @click="snackbarStepdownFalse = false"
          >Close</v-btn
        >
      </template>
    </v-snackbar>
    <v-snackbar v-model="snackbar" :timeout="5000">
      Laporan berhasil diteruskan
      <template #action="{ attrs }">
        <v-btn color="primary" text v-bind="attrs" @click="snackbar = false"
          >Close</v-btn
        >
      </template>
    </v-snackbar>
    <v-snackbar v-model="snackbarFalse" :timeout="5000">
      Terjadi kesalahan saat meneruskan laporan
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
    <v-snackbar v-model="snackbarIgnore" :timeout="5000">
      Laporan berhasil ditolak
      <template #action="{ attrs }">
        <v-btn
          color="primary"
          text
          v-bind="attrs"
          @click="snackbarIgnore = false"
          >Close</v-btn
        >
      </template>
    </v-snackbar>
    <v-snackbar v-model="snackbarIgnoreFalse" :timeout="5000">
      Terjadi kesalahan saat menolak laporan
      <template #action="{ attrs }">
        <v-btn
          color="warning"
          text
          v-bind="attrs"
          @click="snackbarIgnoreFalse = false"
          >Close</v-btn
        >
      </template>
    </v-snackbar>
    <v-card class="rounded-lg pa-4" outlined>
      <v-breadcrumbs :items="breadcrumbs" class="pa-0 pb-4"></v-breadcrumbs>
      <v-row align="center">
        <v-col cols="auto">
          <v-img
            :src="topic.profile_image"
            class="rounded-circle"
            width="100"
            height="100"
          ></v-img>
        </v-col>
        <v-col cols="auto">
          <v-row>
            <v-col class="pa-0">
              <TopicShortener :name="topic.name" />
            </v-col>
            <v-col cols="12" class="pa-0">
              <div
                class="subtitle-1 font-weight-light py-1"
                style="line-height: inherit"
              >
                Created on
                <DateShortener :date="topic.created_at" />
              </div>
            </v-col>
            <v-col cols="12" class="pa-0">
              <div class="py-1">
                <h4>
                  <FollowerShortener :follower="topic.contributor_count" />
                  Followers
                </h4>
              </div>
            </v-col>
            <v-col cols="12" class="pa-0">
              <div class="py-1">
                <h4>
                  <FollowerShortener :follower="topic.activity_count" /> Total
                  Posts
                </h4>
              </div>
            </v-col>
          </v-row>
        </v-col>
        <v-spacer />
        <v-col cols="auto">
          <v-btn color="error" class="text-capitalize" @click="stepdown"
            >Keluar Sebagai Moderator</v-btn
          >
        </v-col>
      </v-row>
      <v-row align="center">
        <v-col cols="auto"> Deskripsi </v-col>
        <v-col cols="auto">
          <v-btn
            v-if="!isEditDesc"
            class="text-capitalize"
            text
            outlined
            @click="editDesc"
          >
            Ubah
          </v-btn>
          <v-btn
            v-if="isEditDesc"
            class="text-capitalize"
            text
            outlined
            @click="editDesc"
          >
            Batal
          </v-btn>
          <v-btn
            v-if="isEditDesc"
            class="text-capitalize"
            text
            outlined
            @click="submitDesc"
          >
            Simpan
          </v-btn>
        </v-col>
      </v-row>
      <div v-if="!isEditDesc">
        {{ topic.description }}
      </div>
      <v-textarea
        v-else
        v-model="topic.description"
        rows="6"
        class="rounded-lg"
        placeholder="Ubah Deskripsi"
        counter
        auto-grow
        outlined
        dense
        hide-details
      ></v-textarea>
      <v-row align="center">
        <v-col cols="auto"> Rules </v-col>
        <v-col cols="auto">
          <v-btn
            v-if="!isEditRules"
            class="text-capitalize"
            text
            outlined
            @click="editRules"
          >
            Ubah
          </v-btn>
          <v-btn
            v-if="isEditRules"
            class="text-capitalize"
            text
            outlined
            @click="editRules"
          >
            Batal
          </v-btn>
          <v-btn
            v-if="isEditRules"
            class="text-capitalize"
            text
            outlined
            @click="submitRules"
          >
            Simpan
          </v-btn>
        </v-col>
      </v-row>
      <section v-if="!isEditRules">
        <template v-if="topic.rules != ''">
          <div v-for="(rule, index) in topic.rules.split('\r\n')" :key="index">
            <div
              class="subtitle-1 font-weight-light py-1"
              style="line-height: inherit"
            >
              {{ rule }}
            </div>
          </div>
        </template>
      </section>
      <v-textarea
        v-else
        v-model="topic.rules"
        rows="6"
        class="rounded-lg"
        placeholder="Ubah Rules"
        counter
        auto-grow
        outlined
        dense
        hide-details
      ></v-textarea>
      <v-row>
        <v-col>
          <v-card class="rounded-lg pa-4" outlined>
            <v-list-item three-line>
              <v-list-item-content>
                <h4 class="font-weight-medium mb-3">
                  Laporan Pengguna Terbaru
                </h4>
                <div class="pb-1">
                  <v-divider />
                </div>
                <v-row>
                  <v-col
                    v-for="thread in threads.slice(0, 2)"
                    :key="thread.id"
                    cols="12"
                  >
                    <v-card class="rounded-lg px-2 py-2 mb-1 mt-1" outlined>
                      <v-row>
                        <v-col cols="auto">
                          <v-img
                            :src="thread.topic.profile_image"
                            class="rounded-circle"
                            width="35"
                          ></v-img>
                        </v-col>
                        <v-col cols="auto">
                          <router-link
                            :to="`/topic/${thread.topic.id}`"
                            style="text-decoration: none; color: black"
                          >
                            <TopicShortener :name="thread.topic.name" />
                          </router-link>
                        </v-col>
                        <v-col>
                          <div>
                            <small class="text--disabled">
                              dilaporkan oleh
                              <router-link :to="`/user/${thread.reporter.id}`">
                                <NameShortener
                                  :username="thread.reporter.username"
                                />
                              </router-link>
                              pada
                              {{ thread.created_at | timepost }} yang lalu
                              dengan alasan {{ thread.reason.detail }}
                            </small>
                          </div>
                        </v-col>
                      </v-row>
                      <v-row>
                        <v-col class="py-0">
                          <p class="text-h6 my-0">
                            {{ thread.thread.title }}
                          </p>
                        </v-col>
                      </v-row>
                      <v-row>
                        <v-col cols="5">
                          <v-row align="center">
                            <v-col cols="auto" justify="center">
                              <p
                                class="ma-0"
                                style="width: 50%; display: inline"
                              >
                                <FollowerShortener :follower="50" /> Likes
                              </p>
                            </v-col>
                            <v-col cols="auto" justify="center">
                              <p
                                class="ma-0"
                                style="width: 50%; display: inline"
                              >
                                <FollowerShortener :follower="50" /> Comments
                              </p>
                            </v-col>
                            <v-col>
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
                                  <v-list-item
                                    @click="
                                      forwardThread(
                                        thread.reporter.id,
                                        thread.thread.id
                                      )
                                    "
                                  >
                                    <v-list-item-action>
                                      <v-icon>mdi-bullhorn-outline</v-icon>
                                    </v-list-item-action>
                                    <v-list-item-content>
                                      <v-list-item-title v-text="`Forward`" />
                                    </v-list-item-content>
                                  </v-list-item>
                                  <v-list-item
                                    @click="
                                      ignoreThread(
                                        thread.reporter.id,
                                        thread.thread.id
                                      )
                                    "
                                  >
                                    <v-list-item-action>
                                      <v-icon>mdi-bullhorn-outline</v-icon>
                                    </v-list-item-action>
                                    <v-list-item-content>
                                      <v-list-item-title v-text="`Ignore`" />
                                    </v-list-item-content>
                                  </v-list-item>
                                </v-list>
                              </v-menu>
                            </v-col>
                          </v-row>
                        </v-col>
                      </v-row>
                    </v-card>
                  </v-col>
                  <v-col cols="12">
                    <router-link
                      :to="`./details/laporan-pengguna`"
                      style="text-decoration: none; color: black"
                    >
                      <v-row align="center">
                        <v-col cols="auto" class="pr-0">
                          <v-icon> mdi-menu-down </v-icon>
                        </v-col>
                        <v-col cols="auto" class="pl-0">
                          <div class="text-overline">Laporan Pengguna</div>
                        </v-col>
                      </v-row>
                    </router-link>
                  </v-col>
                </v-row>
              </v-list-item-content>
            </v-list-item>
          </v-card>
        </v-col>
      </v-row>
    </v-card>
  </v-container>
</template>

<script>
import TopicShortener from '~/components/utils/TopicShortener'
import NameShortener from '~/components/utils/NameShortener'
import DateShortener from '~/components/utils/DateShortener'
import FollowerShortener from '~/components/utils/FollowerShortener'

export default {
  name: 'IndexPage',
  components: {
    NameShortener,
    TopicShortener,
    DateShortener,
    FollowerShortener,
  },
  filters: {
    timepost(date) {
      const seconds = Math.floor((new Date() - new Date(String(date))) / 1000)
      let interval = Math.floor(seconds / 31536000)

      if (interval > 1) {
        return interval + ' tahun'
      }
      interval = Math.floor(seconds / 2592000)
      if (interval > 1) {
        return interval + ' bulan'
      }
      interval = Math.floor(seconds / 86400)
      if (interval > 1) {
        return interval + ' hari'
      }
      interval = Math.floor(seconds / 3600)
      if (interval > 1) {
        return interval + ' jam'
      }
      interval = Math.floor(seconds / 60)
      if (interval > 1) {
        return interval + ' menit'
      }
      return Math.floor(seconds) + ' detik'
    },
  },
  middleware: ['authenticated', 'moderator'],
  data() {
    return {
      tab: null,
      isEditDesc: false,
      isEditRules: false,
      snackbar: false,
      snackbarFalse: false,
      snackbarIgnore: false,
      snackbarIgnoreFalse: false,
      snackbarStepdown: false,
      snackbarStepdownFalse: false,
      snackbarDesc: false,
      snackbarDescFalse: false,
      snackbarRules: false,
      snackbarRulesFalse: false,
      items: [{ tab: 'Rekomendasi', icon: 'mdi-fire' }, { tab: 'Mengikuti' }],
    }
  },
  computed: {
    threads() {
      return this.$store.state.lists.reportedThreads
    },
    topics() {
      return this.$store.state.lists.topics
    },
    topic() {
      return this.$store.state.lists.detailTopic
    },
    users() {
      return this.$store.state.lists.users
    },
    breadcrumbs() {
      return [
        {
          text: 'Home',
          disabled: false,
          href: '/',
        },
        {
          text: this.$store.state.lists.detailTopic.name,
          disabled: false,
          href: '/topic/' + this.$route.params.slug,
        },
        {
          text: 'Details',
          disabled: true,
          href: 'breadcrumbs_link_2',
        },
      ]
    },
  },
  mounted() {
    this.$store.dispatch(
      'lists/fetchReportedThreadsByModerator',
      this.$route.params.slug
    )
    this.$store.dispatch('lists/fetchTopicById', this.$route.params.slug)
    this.$store.dispatch('lists/fetchUsers')
  },
  methods: {
    stepdown() {
      this.$axios
        .put(
          `/topic/${this.$route.params.slug}/stepdown`,
          {},
          {
            headers: {
              'Content-Type': 'application/json',
              Authorization: 'Bearer ' + this.$store.state.auth.accessToken,
            },
          }
        )
        .then((response) => {
          if (response.status === 200) {
            this.snackbarStepdown = true
          }
        })
        .catch((error) => {
          if (error.status) {
            this.snackbarStepdownFalse = true
          }
        })
    },
    editDesc() {
      this.isEditDesc = !this.isEditDesc
    },
    editRules() {
      this.isEditRules = !this.isEditRules
    },
    submitDesc() {
      const formData = new FormData()
      formData.append('description', this.topic.description)
      formData.append('rules', this.topic.rules)
      this.$axios
        .put(`/topic/${this.$route.params.slug}`, formData, {
          headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + this.$store.state.auth.accessToken,
          },
        })
        .then((response) => {
          if (response.status === 201) {
            this.snackbarDesc = true
            this.editDesc()
          }
        })
        .catch((error) => {
          if (error.status) {
            this.snackbarDescFalse = true
          }
        })
    },
    submitRules() {
      const formData = new FormData()
      formData.append('description', this.topic.description)
      formData.append('rules', this.topic.rules)
      this.$axios
        .put(`/topic/${this.$route.params.slug}`, formData, {
          headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + this.$store.state.auth.accessToken,
          },
        })
        .then((response) => {
          if (response.status === 201) {
            this.snackbarRules = true
            this.editRules()
          }
        })
        .catch((error) => {
          if (error.status) {
            this.snackbarRulesFalse = true
          }
        })
    },
    forwardThread(reporterId, threadId) {
      this.$axios
        .put(
          `/topic/${this.$route.params.slug}/report?scope=thread&threadId=${threadId}&reporterId=${reporterId}&action=forward`,
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
    ignoreThread(reporterId, threadId) {
      this.$axios
        .put(
          `/topic/${this.$route.params.slug}/report?scope=thread&threadId=${threadId}&reporterId=${reporterId}&action=ignore`,
          {},
          {
            headers: {
              Authorization: 'Bearer ' + this.$store.state.auth.accessToken,
            },
          }
        )
        .then((response) => {
          if (response.status === 200) {
            this.snackbarIgnore = true
          }
        })
        .catch((error) => {
          if (error.status) {
            this.snackbarIgnoreFalse = true
          }
        })
    },
  },
}
</script>

<style scoped>
.hide-scrollbar {
  -ms-overflow-style: none;
  scrollbar-width: none;
}
.hide-scrollbar::-webkit-scrollbar {
  display: none;
}
.image-rounded.theme--dark {
  border-radius: 50%;
}
.v-tab {
  border: 1px solid #e0e0e0;
  border-radius: 15px;
}
.v-tab.v-tab--active {
  border: 1px solid black;
  border-radius: 15px;
}
</style>
