<template>
  <vue-instagram token="31624478.46e9509.e52d2a835efd4cfb9df329a81c4a2c35" username="darfat" :count="5" :tags="['hashtag1', 'hashtag2']" mediaType="image">
    <template slot="feeds" slot-scope="props">
      <li class="fancy-list"> {{ props.feed.link }} </li>
    </template>
    <template slot="error" slot-scope="props">
      <div class="fancy-alert"> {{ props.error.error_message }} </div>
    </template>
  </vue-instagram>
</template>

<script>
// instagram
import VueInstagram from 'vue-instagram'
export default {
  name: 'InstagramFeed',
  components: {
    VueInstagram
  }
}
</script>