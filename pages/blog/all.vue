<template lang="pug">
  v-container
    nuxt-content(v-for="page in posts" :document="page")
</template>
<script>
import imggallery from "~/components/global/imggallery.vue";

export default {
  // components: {
  //   imgGallery: imggallery,
  // },
  async asyncData({ $content }) {
    const posts = await $content('blog')
      .sortBy('published', 'desc')
      .fetch()


    return { posts }
  },
  data() {
    return {
      posts: [],
    }
  },

}
</script>
