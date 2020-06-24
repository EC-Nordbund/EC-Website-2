<template lang="pug">
  v-container
    nuxt-content(:document="page")
</template>
<script>
export default {
  async asyncData({ $content }) {
    const page = await $content('veranstaltungen').fetch()

    return { page }
  },
}
</script>
