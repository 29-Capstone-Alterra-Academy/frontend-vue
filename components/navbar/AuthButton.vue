<template>
  <section>
    <v-btn v-for="(item, i) in items" :key="i" link text :to="item.to">
        <p class="font-weight-medium ma-2 text-capitalize" style="color: black">{{ item.title }}</p>
    </v-btn>
    <v-btn v-if="isLoggedIn" link text to="/stations">
        <p class="font-weight-medium ma-2" style="color: black">STATIONS</p>
    </v-btn>
  </section>
</template>

<script>
export default {
  name: 'AuthLayout',
  props: {
    items: {
      type: Array,
      required: true,
    },
  },
  computed: {
    isLoggedIn() {
      return this.$store.getters.isLoggedIn
    },
    userState() {
      if (this.$store.getters.isLoggedIn) {
        return this.$store.state.auth.username
      } else {
        return null
      }
    },
  },
}
</script>