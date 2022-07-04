<template>
  <span>
    {{ follower | abbr }}
  </span>
</template>

<script>
export default {
  filters: {
    abbr(num) {
      if (String(num).length < 4) {
        return num;
      } else if (String(num).length < 7) {
        return (num / 1000).toFixed(2) + 'k'
      } else {
        return (num / 1000000).toFixed(2) + 'm'
      }
    },
  },
  props: {
    follower: {
      type: Number,
      required: true,
    },
  },
}
</script>

<style scoped></style>
