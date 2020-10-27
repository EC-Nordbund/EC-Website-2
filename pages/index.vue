<template lang="pug">
div(class="section-wrapper")
  div(class="angle--bottom-right offWhite")
    v-container(class="mb-4")
      .d-flex.flex-row.justify-space-between.align-end
        h2#aktuelles Aktuelles
        v-btn(text, depressed, tile, large, @click='$router.push(`/blog/`)' aria-label="Mehr Blog Einträge")
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
          to="/veranstaltungen/"
          aria-label="Mehr Veranstaltungen"
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
  div(class="angle--both-left-right grey lighten-4")
    v-container
      h2(id='über-uns') Über uns
      //- p 
        | Der EC-Nordbund ist einer von 18 Landesverbänden des Deutschen EC-Verbandes.
        | EC bedeutet: „Entschieden für Christus“ und markiert die grundsätzlich evangelische Ausrichtung aller Aktivitäten.
        | Im EC-Nordbund sind alle EC-Kinder- und Jugendarbeiten aus Schleswig-Holstein und Hamburg.
      p
        | Die EC-Arbeit in Deutschland hat den Auftrag,
        | junge Menschen zu Jüngern zu machen
        | und sie zu prägenden Persönlichkeiten heranzubilden,
        | durch die wiederum Menschen ihrer Generation
        | zu Jüngern werden.
      p
        | Der EC-Nordbund ist einer der 18 Landesverbänden des Deutschen EC-Verbandes. Im EC-Nordbund sind alle EC-Kinder- und Jugendarbeiten aus Schleswig-Holstein und Hamburg vereint.
      p
        | EC bedeutet: „Entschieden für Christus“ und markiert die Aurichtung auf Jesus in allen unseren Aktivitäten.
      p
        | Der EC-Nordbund arbeitet eng mit dem Verband der Gemeinschaften in der Evangelischen Kirche in Schleswig-Holstein e.V. (kurz VG) zusammen. Wir betreiben gemeinsam das Erholungs- und Bildungszentrum Wittensee (kurz EBZ) und unser Ferienlager in Karlsminde (bei Eckernförde).
      p
        | Der EC-Nordbund basiert als Gemeinnütziger Verein auf Ehrenamt wir haben nur 2 Hauptamtliche Mitarbeiter. 
      v-row
        v-col 
          v-img(:src="require('~/assets/img/thomas_seeger.jpg')" :width="300" :height="300" style="border-radius: 50%; margin: 5px auto;")
          p(style="text-align: center;display: block;")
            b Thomas Seeger
            br
            | Jugendreferent
        v-col
          v-img(:src="require('~/assets/img/dortje_gaertner.jpg')" :width="300" :height="300" style="border-radius: 50%; margin: 5px auto;")
          p(style="text-align: center;display: block;")
            b Dortje Gaertner
            br
            | Kinder- und Jungschararbeit
</template>
<style lang="scss" scoped>
.section-wrapper > div:last-child {
  &.angle--bottom-left,
  &.angle--bottom-right,
  &.angle--both-right-right,
  &.angle--both-left-right,
  &.angle--both-right-left,
  &.angle--both-left-left {
    margin-bottom: -3.492vw;
  }
}
</style>
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
