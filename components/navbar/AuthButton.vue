<template>
  <section>
    <v-btn v-for="(item, i) in items" :key="i" link text :to="item.to">
      <p class="font-weight-medium ma-2 text-capitalize" style="color: black">
        {{ item.title }}
      </p>
    </v-btn>
    <v-btn v-if="isMale" link text to="/dashboard/topic-list">
      <p class="font-weight-medium ma-2 text-capitalize" style="color: black">
        Topics
      </p>
    </v-btn>
    <v-btn v-if="isMale" link text to="/dashboard/user-list">
      <p class="font-weight-medium ma-2 text-capitalize" style="color: black">
        Users
      </p>
    </v-btn>
    <v-btn v-if="isMale" link text to="/banned">
      <p class="font-weight-medium ma-2 text-capitalize" style="color: black">
        Banned
      </p>
    </v-btn>
  </section>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'AuthLayout',
  props: {
    items: {
      type: Array,
      required: true,
    },
  },
  computed: {
    ...mapGetters('auth', ['isMale']),
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
