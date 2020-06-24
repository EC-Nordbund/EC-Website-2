<template>
  <v-container style="text-align: center">
    <nuxt-content :document="page" />
  </v-container>
</template>

<script>

export default {
  async asyncData({ $content, params, redirect, route }) {
    const page = await $content('impressum').fetch()

    return {page}
  },
}
</script>