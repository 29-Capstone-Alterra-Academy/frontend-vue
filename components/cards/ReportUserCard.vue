<template>
  <v-dialog
    :value="value"
    scrollable
    max-width="650px"
    @input="$emit('input', $event)"
  >
    <v-snackbar v-model="snackbar" :timeout="5000">
      User berhasil dilaporkan
      <template #action="{ attrs }">
        <v-btn color="primary" text v-bind="attrs" @click="snackbar = false"
          >Close</v-btn
        >
      </template>
    </v-snackbar>
    <v-snackbar v-model="snackbarFalse" :timeout="5000">
      Terjadi kesalahan saat melaporkan user
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
    <v-card>
      <v-card-title class="text-h5">
        <v-col cols="auto" class="pa-0"> Ada apa dengan user ini? </v-col>
        <v-spacer />
        <v-col cols="auto" class="pa-0">
          <v-btn icon @click.native="$emit('input', false)">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-col>
      </v-card-title>
      <v-card-text class="pa-0">
        <v-list dense>
          <v-list-item-group
            v-model="selectedItem"
            color="primary"
            style="
              max-height: 200px;
              display: flex;
              flex-flow: column wrap;
              align-items: center;
              gap: 15px;
              row-gap: 15px;
            "
          >
            <v-list-item v-for="item in reasons" :key="item.id">
              <v-list-item-content>
                <v-list-item-title v-text="item.detail"></v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list-item-group>
        </v-list>
      </v-card-text>
      <v-card-actions>
        <v-list-item>
          <v-list-item-content>
            <v-row justify="center">
              <v-col cols="auto">
                <v-btn
                  color="error"
                  class="text-capitalize rounded-lg"
                  @click="reportUser"
                  >Laporkan</v-btn
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
    user: {
      type: Object,
      required: true,
    }
  },
  data() {
    return {
      dialogm1: '',
      selectedItem: 0,
      snackbar: false,
      snackbarFalse: false,
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
    reportUser() {
      this.$axios
        .post(
          `/user/${this.$route.params.slug}/report?reasonId=${
            this.reasons[this.selectedItem].id
          }`,
          {},
          {
            headers: {
              Authorization: 'Bearer ' + this.$store.state.auth.accessToken,
            },
          }
        )
        .then((response) => {
          if (response.status === 201) {
            this.snackbar = true
            this.images = []
          }
        })
        .catch((error) => {
          if (error.status) {
            console.log(error)
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
