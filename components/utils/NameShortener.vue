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

      if (string.length <= 11) {
        return string
      }

      return string.substr(0, 11) + '...'
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
