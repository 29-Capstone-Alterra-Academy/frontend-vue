<template>
  <v-dialog
    :value="value"
    scrollable
    max-width="800px"
    @input="$emit('input', $event)"
  >
    <v-snackbar v-model="snackbar" :timeout="5000">
      Topik baru berhasil dibuat
      <template #action="{ attrs }">
        <v-btn color="primary" text v-bind="attrs" @click="snackbar = false"
          >Close</v-btn
        >
      </template>
    </v-snackbar>
    <v-snackbar v-model="snackbarFalse" :timeout="5000">
      Terjadi kesalahan saat membuat topik baru
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
        <v-col cols="auto" class="pa-0"> Buat Topik Baru </v-col>
        <v-spacer />
        <v-col cols="auto" class="pa-0">
          <v-btn icon @click.native="$emit('input', false)">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-col>
      </v-card-title>
      <v-divider></v-divider>
      <v-card-text class="pa-0">
        <v-list dense outlined class="rounded-lg">
          <v-list-item-group v-model="selectedItem" color="primary" style="column-count: 3;">
            <v-list-item v-for="item in reasons" :key="item.id" >
              <v-list-item-content>
                <v-list-item-title v-text="item.detail"></v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list-item-group>
        </v-list>
      </v-card-text>
      <v-divider></v-divider>
      <v-card-actions>
        <v-btn color="blue darken-1" text @click.native="$emit('input', false)">
          Close
        </v-btn>
        <v-btn color="blue darken-1" text @click.native="$emit('input', false)">
          Save
        </v-btn>
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
  methods: {},
}
</script>
