<template lang="pug">
div
  div(
    style='padding: 32px 79px 100px 79px; background: var(--v-offWihte-base); clip-path: polygon(0 0, 0 100%, 100% calc(100% - 3.492vw), 100% 0);margin-bottom: -68px;'
  )
    .d-flex.flex-row.justify-space-between.align-end
      h2#aktuelles Aktuelles
      v-btn(text, depressed, tile, large, @click='$router.push(`/blog/`)')
        span.hidden-xs-only Mehr Beiträge
        v-icon.ml-1.mr-n1 mdi-arrow-right
    v-row
      v-col(
        cols='12',
        sm='6',
        md='4',
        v-for='item in pages.recentPosts',
        :key='item.slug'
      )
        v-card(
          tile,
          hover,
          outlined,
          @click='$router.push(`/blog/${item.slug}`)'
        )
          ec-image-item(
            :image='item.featuredImage',
            :title='item.title',
            :subTitle='`Vom ${item.published.split("T")[0].split("-").reverse().join(".")}`'
          )
    .d-flex.flex-row.justify-space-between.align-end
      h2(id='nächste-veranstaltungen') Nächste Veranstaltungen
      v-btn(
        text,
        depressed,
        tile,
        large,
        @click='$router.push(`/veranstaltungen/`)'
      )
        span.hidden-xs-only Mehr Veranstaltungen
        v-icon.ml-1.mr-n1 mdi-arrow-right
    v-row
      v-col(
        cols='12',
        sm='6',
        md='4',
        v-for='item in pages.upcomingEvents',
        :key='item.slug'
      )
        v-card(
          tile,
          hover,
          outlined,
          @click='$router.push(`/veranstaltungen/${item.slug}`)'
        )
          ec-image-item(
            :image='item.featuredImage',
            :title='item.title',
            :subTitle='`Vom ${item.begin.split("-").reverse().join(".")} bis ${item.ende.split("-").reverse().join(".")}`'
          )
    //- v-container
  div(
    style='padding: 100px 79px; background: var(--v-primary-base); clip-path: polygon(0 3.492vw, 0 calc(100% - 3.492vw), 100% 100%, 100% 0); margin-bottom: -68px;'
  )
    h2(id='über-uns') Über uns
    p 
      | Der EC-Nordbund ist einer von 18 Landesverbänden des Deutschen EC-Verbandes.
      | EC bedeutet: „Entschieden für Christus“ und markiert die grundsätzlich evangelische Ausrichtung aller Aktivitäten.
      | Im EC-Nordbund sind alle EC-Kinder- und Jugendarbeiten aus Schleswig-Holstein und Hamburg.
</template>
<script>
import { defineComponent, useContext, useAsync } from '@nuxtjs/composition-api'

export default defineComponent({
  setup() {
    const { $content } = useContext()

    const pages = useAsync(async () => {
      const upcomingEvents = await $content('veranstaltung')
        .only(['slug', 'title', 'begin', 'ende', 'featuredImage', 'tags'])
        .sortBy('begin') // TODO: compare to todays date
        .limit(3)
        .fetch()

      const recentPosts = await $content('blog')
        .only([
          'title',
          'tags',
          'description',
          'featuredImage',
          'slug',
          'published',
        ])
        .sortBy('published', 'desc')
        .limit(3)
        .fetch()

      return { upcomingEvents, recentPosts }
    })

    return { pages }
  },
  head: {
    title: 'Startseite',
    meta: [
      {
        hid: 'description',
        name: 'description',
        content: 'Wir sind der Nordbund!',
      },
      // Open Graph
      { hid: 'og:title', property: 'og:title', content: 'Veranstaltungen' },
      {
        hid: 'og:description',
        property: 'og:description',
        content: 'Wir sind der Nordbund!',
      },
      // Twitter Card
      {
        hid: 'twitter:title',
        name: 'twitter:title',
        content: 'Veranstaltungen',
      },
      {
        hid: 'twitter:description',
        name: 'twitter:description',
        content: 'Wir sind der Nordbund!',
      },
    ],
  },
})
</script>
