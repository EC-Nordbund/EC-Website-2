<template lang="pug">
  v-container
    ec-location(:marker="[{...page, marker: [page.lat, page.long], noMore: true}]" style="width: 100%; height: 500px; z-index: 0;")
    nuxt-content(:document="page")
</template>
<script>
export default {
  async asyncData({ $content, params, redirect, route }) {
    try {
      const page = await $content('ort', params.id).fetch()

      return { page }
    } catch (e) {
      redirect('/404', { path: route.path })
    }
  },
}
</script>
