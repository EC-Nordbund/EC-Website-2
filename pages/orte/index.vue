<template>
  <v-container>
    <nuxt-content :document="page" />
  </v-container>
</template>

<script>

export default {
  async asyncData({ $content, params, redirect, route }) {
    const page = await $content('orte').fetch()

    return {page}
  },
}
</script>