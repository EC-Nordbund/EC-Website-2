<template>
  <v-container>
    <nuxt-content :document="page" />
  </v-container>
</template>

<script>
export default {
  async asyncData({ $content }) {
    const page = await $content('teilnahmebedingungen').fetch()

    return { page }
  },
  head() {
    return {
      title: 'Teilnahmebedingungen',
      meta: [
        {
          hid: 'description',
          name: 'description',
          content:
            'Unsere Teilnahmebedingungen. Welche Rechte hast du? Welche Rechte hat der EC?',
        },
        // Open Graph
        {
          hid: 'og:title',
          property: 'og:title',
          content: 'Teilnahmebedingungen',
        },
        {
          hid: 'og:description',
          property: 'og:description',
          content:
            'Unsere Teilnahmebedingungen. Welche Rechte hast du? Welche Rechte hat der EC?',
        },
        // Twitter Card
        {
          hid: 'twitter:title',
          name: 'twitter:title',
          content: 'Teilnahmebedingungen',
        },
        {
          hid: 'twitter:description',
          name: 'twitter:description',
          content:
            'Unsere Teilnahmebedingungen. Welche Rechte hast du? Welche Rechte hat der EC?',
        },
      ],
    }
  },
}
</script>
