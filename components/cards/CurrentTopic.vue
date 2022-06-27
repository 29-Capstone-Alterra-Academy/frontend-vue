<template>
  <div>
    <div class="py-1">
      <v-img
        :src="topic.profile_image"
        class="rounded-circle"
        width="75"
      ></v-img>
    </div>
    <div class="py-1">
      <h3>
        {{ topic.name }}
      </h3>
    </div>
    <div class="subtitle-1 font-weight-light py-1" style="line-height: inherit">
      {{ topic.description }}
    </div>
    <div class="py-1">
      <h4>{{ topic.followers | abbr }} Followers</h4>
    </div>
    <div class="py-1">
      <h4>{{ topic.followers | abbr }} Total Posts</h4>
    </div>
    <div class="subtitle-1 font-weight-light py-1" style="line-height: inherit">
      Created
      {{
        months[new Date(String(topic.created_at)).getMonth()] + ' ' +
        new Date(String(topic.created_at)).getDate() +
        ', ' +
        new Date(String(topic.created_at)).getFullYear()
      }}
    </div>
  </div>
</template>

<script>
export default {
  filters: {
    abbr(num) {
      if (String(num).length < 7) {
        return Math.floor(num / 1000) + 'k'
      } else {
        return Math.floor(num / 1000000) + 'm'
      }
    },
  },
  props: {
    topic: {
      type: Object,
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
