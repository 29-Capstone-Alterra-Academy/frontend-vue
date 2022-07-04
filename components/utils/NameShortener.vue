<template>
  <span>
    @{{ username | maxlength }}
  </span>
</template>

<script>
export default {
  filters: {
    maxlength(string) {
      if (!string) return ''
      string = string.toString()

      if (string.length <= 12) {
        return string
      }

      return string.substr(0, 12) + '...'
    },
  },
  props: {
    username: {
      type: String,
      required: true,
    },
  },
}
</script>

<style scoped></style>
