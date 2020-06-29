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
}
</script>
