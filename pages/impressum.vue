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
  head() {
    return {
      title: 'Impressum',
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: 'Unser Impressum: Wer ist für diese Seite verantwortlich?',
        },
        // Open Graph
        { hid: 'og:title', property: 'og:title', content: 'Impressum' },
        {
          hid: 'og:description',
          property: 'og:description',
          content: 'Unser Impressum: Wer ist für diese Seite verantwortlich?',
        },
        // Twitter Card
        { hid: 'twitter:title', name: 'twitter:title', content: 'Impressum' },
        {
          hid: 'twitter:description',
          name: 'twitter:description',
          content: 'Unsee Impressum: Wer ist für diese Seite verantwortlich?',
        },
      ],
    }
  },
}
</script>
