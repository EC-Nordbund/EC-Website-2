<template>
  <v-container style="text-align: center;">
    <nuxt-content :document="page" />
  </v-container>
</template>

<script>
export default {
  async asyncData({ $content }) {
    const page = await $content('impressum').fetch()

    return { page }
  },
}
</script>
