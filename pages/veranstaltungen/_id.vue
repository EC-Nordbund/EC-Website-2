<template lang="pug">
  v-container
    nuxt-content(:document="page")
    ec-location(:zoom="12" :marker="[{...page, marker: [page.lat, page.long], noMore: true}]" style="width: 100%; height: 500px; z-index: 0;")
    template(v-if="page.anmeldung")
      h2 Anmeldung
      ec-anmeldung(
        v-bind="page.anmeldung"
        :veranstaltungsBegin="page.begin"
        :minAlter="page.minAlter"
        :maxAlter="page.maxAlter"
        :veranstaltungsID="page.veranstaltungsID"
      )
</template>

<script>
export default {
  async asyncData({ $content, params, redirect, route }) {
    try {
      const page = await $content('veranstaltung', params.id).fetch()

      return { page }
    } catch (e) {
      redirect('/404', { path: route.path })
    }
  },
   head() {
    return {
      title: this.page.title,
      meta: [
        { hid: 'description', name: 'description', content: this.page.description },
        // Open Graph
        { hid: 'og:title', property: 'og:title', content: this.page.title + ` (${this.page.begin.split('-').reverse().join('.')} - ${this.page.ende.split('-').reverse().join('.')})` },
        { hid: 'og:description', property: 'og:description', content: this.page.description },
        // Twitter Card
        { hid: 'twitter:title', name: 'twitter:title', content: this.page.title + ` (${this.page.begin.split('-').reverse().join('.')} - ${this.page.ende.split('-').reverse().join('.')})` },
        { hid: 'twitter:description', name: 'twitter:description', content: this.page.description },
        {
          hid: 'twitter:image',
          name: 'twitter:image',
          content: this.page.featuredImage,
        },
        {
          hid: 'og:image',
          property: 'og:image',
          content: this.page.featuredImage,
      },
      ]
    }
  }
}
</script>
