<template>
  <v-container>
    <nuxt-content :document="page" />
  </v-container>
</template>

<script>

export default {
  async asyncData({ $content, params, redirect, route }) {
    try {
      const page = await $content('ort/' + params.id).fetch()

      return {page}
    } catch(e) {
      redirect('/404', {path: route.path})
    }
  },
}
</script>