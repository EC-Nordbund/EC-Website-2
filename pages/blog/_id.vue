<template lang="pug">
  v-container
    nuxt-content(:document="page")
</template>
<script>
export default {
  async asyncData({ $content, params, redirect, route }) {
    try {
      const page = await $content('blog', params.id).fetch()

      return { page }
    } catch (e) {
      redirect('/404', { path: route.path })
    }
  },
}
</script>
