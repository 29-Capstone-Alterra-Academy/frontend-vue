<template>
  <div>
    <div class="py-1">
      <v-img
        :src="'https://staking-spade-production.up.railway.app' + topic.profile_image"
        class="rounded-circle"
        width="75"
        height="75"
      ></v-img>
    </div>
    <div class="py-1">
      <h3>
        <TopicShortener v-if="topic.name != null" :name="topic.name" />
      </h3>
    </div>
    <div class="subtitle-1 font-weight-light py-1" style="line-height: inherit">
      {{ topic.description }}
    </div>
    <div class="py-1">
      <h4><FollowerShortener v-if="topic.contributor_count != null" :follower="topic.contributor_count" /> Followers</h4>
    </div>
    <div class="py-1">
      <h4><FollowerShortener v-if="topic.activity_count != null" :follower="topic.activity_count" /> Total Posts</h4>
    </div>
    <div class="subtitle-1 font-weight-light py-1" style="line-height: inherit">
      Created
      <DateShortener v-if="topic.created_at != null" :date="topic.created_at"/>
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
