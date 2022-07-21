<template>
  <v-dialog
    :value="value"
    scrollable
    max-width="650px"
    @input="$emit('input', $event)"
  >
    <v-snackbar v-model="snackbar" :timeout="5000">
      Topik berhasil diblokir
      <template #action="{ attrs }">
        <v-btn color="primary" text v-bind="attrs" @click="snackbar = false"
          >Close</v-btn
        >
      </template>
    </v-snackbar>
    <v-snackbar v-model="snackbarFalse" :timeout="5000">
      Terjadi kesalahan saat memblokir topik
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
      Laporan berhasil dibatalkan
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
      Terjadi kesalahan saat membatalkan laporan
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
        <v-col cols="auto" class="pa-0"> Blokir topik ini? </v-col>
        <v-spacer />
        <v-col cols="auto" class="pa-0">
          <v-btn icon @click.native="$emit('input', false)">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-col>
      </v-card-title>
      <v-divider></v-divider>
      <v-card-text class=""> Yakin ingin memblokir topik ini? </v-card-text>
      <v-card-actions>
        <v-list-item>
          <v-list-item-content>
            <v-row justify="center">
              <v-col cols="auto">
                <v-btn
                  color="error"
                  class="text-capitalize rounded-lg"
                  @click="acceptReport"
                  >Ya</v-btn
                >
              </v-col>
              <v-spacer />
              <v-col cols="auto">
                <v-btn
                  color="error"
                  class="text-capitalize rounded-lg"
                  @click="rejectReport"
                  >Batal</v-btn
                >
              </v-col>
            </v-row>
          </v-list-item-content>
        </v-list-item>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
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
      dialogm1: '',
      selectedItem: 0,
      snackbar: false,
      snackbarReject: false,
      snackbarFalse: false,
      snackbarRejectFalse: false,
    }
  },
  computed: {
    reasons() {
      return this.$store.state.lists.reasons
    },
  },
  mounted() {
    this.$store.dispatch('lists/fetchReportReasons')
  },
  methods: {
    acceptReport() {
      this.$axios
        .put(
          `/report?scope=topic&topicId=${this.topic.topic.id}&reporterId=${this.topic.reporter.id}&action=approve`,
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
    rejectReport() {
      this.$axios
        .put(
          `/report?scope=topic&topicId=${this.topic.topic.id}&reporterId=${this.topic.reporter.id}&action=reject`,
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

<style scoped>
.v-list-item-group .v-list-item {
  border: 1px solid rgba(0, 0, 0, 0.1) !important;
  border-radius: 8px !important;
}
.v-list-item-group .v-list-item--active {
  border: 1px solid blue !important;
  border-radius: 8px !important;
}
</style>
