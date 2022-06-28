<template>
  <section>
    <v-list-item v-for="(item, i) in items" :key="i" link text :to="item.to">
      <v-list-item-content>
        <v-list-item-title class="subtitile-1 text-capitalize" v-text="item.title" />
      </v-list-item-content>
    </v-list-item>
    <v-list-item v-if="isLoggedIn" link text to="/stations">
      <v-list-item-content>
        <v-list-item-title class="subtitile-1" v-text="'Stations'" />
      </v-list-item-content>
    </v-list-item>
  </section>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: 'AuthLayout',
  props: {
    items: {
      type: Array,
      required: true,
    },
  },
  computed: {
    ...mapGetters('auth', ["isLoggedIn"]),
    userState() {
      if (this.$store.getters.auth.isLoggedIn) {
        return this.$store.state.auth.username
      } else {
        return null
      }
    },
  },
}
</script>