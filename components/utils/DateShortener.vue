<template>
  <span>
    {{
      months[new Date(String(date)).getMonth()] +
      ' ' +
      new Date(String(date)).getDate() +
      ', ' +
      new Date(String(date)).getFullYear()
    }}
  </span>
</template>

<script>
export default {
  props: {
    date: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      months: [
        'Jan',
        'Feb',
        'Mar',
        'Apr',
        'May',
        'Jun',
        'Jul',
        'Aug',
        'Sep',
        'Oct',
        'Nov',
        'Des',
      ],
    }
  },
}
</script>

<style scoped></style>
