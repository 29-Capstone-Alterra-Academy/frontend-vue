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
        <TopicShortener :name="topic.name" />
      </h3>
    </div>
    <div class="subtitle-1 font-weight-light py-1" style="line-height: inherit">
      {{ topic.description }}
    </div>
    <div class="py-1">
      <h4><FollowerShortener :follower="topic.contributor_count" /> Followers</h4>
    </div>
    <div class="py-1">
      <h4><FollowerShortener :follower="topic.activity_count" /> Total Posts</h4>
    </div>
    <div class="subtitle-1 font-weight-light py-1" style="line-height: inherit">
      Created
      <DateShortener :date="topic.created_at"/>
    </div>
  </div>
</template>

<script>
import TopicShortener from '~/components/utils/TopicShortener'
import DateShortener from '~/components/utils/DateShortener'
import FollowerShortener from '~/components/utils/FollowerShortener'

export default {
  components: {
    TopicShortener,
    DateShortener,
    FollowerShortener
  },
  props: {
    topic: {
      type: Object,
      required: true,
    },
  },
}
</script>
