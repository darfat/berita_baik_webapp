<template>
    <div class="container">
        <top-slider></top-slider>
        <headline-slider></headline-slider>

        <h3>This is FrontPage </h3>
    </div>
</template>

<script>
import { TopSlider, HeadlineSlider } from '@/views/home/components'

export default {
  name: 'frontpage',
  components: {
    TopSlider,
    HeadlineSlider
  },
  computed: {
  }
}
</script>
