<template lang="pug">
  v-app
    header(class="sticky-header")
      v-toolbar(dense short flat color="rgba(0, 0, 0, 0.04)" height="40")
        v-container
          v-row(align="center")
            v-btn(icon medium class="ml-n5 mr-n1 hover-facebook" href="https://www.facebook.com/ECNordbund/" target="_blank" rel="noopener" aria-label="Facebook")
              v-icon mdi-facebook
            v-btn(icon medium class="mx-n1 hover-instagram" href="https://www.instagram.com/ec_nordbund/" target="_blank" rel="noopener" aria-label="Instagram")
              v-icon mdi-instagram
            v-btn(icon medium class="mx-n1 hover-youtube" href="https://www.youtube.com/channel/UC0kn9I7w4sCwl7IJ6ZOTF0w" target="_blank" rel="noopener" aria-label="YouTube")
              v-icon mdi-youtube
            v-spacer
            v-col(sm=7 md=8 xl=10 align-self="center" v-if="losungen && losungen.Losungstext" class="hidden-xs-only")
              ec-marquee(:length="marqueeContentLength" color="rgba(0,0,0,0.06)")
                div(class="text-body-2 text--secondary")
                  //- Losung
                  | Losung:&nbsp;
                  span(v-html="losung")
                  |  —&nbsp;
                  a(class="font-italic pr-6 caption hellGrau--text" :href="`https://www.bibelserver.com/LUT/${losungen.Losungsvers[0]}`" target="_blank" rel="noopener" v-html="losungen.Losungsvers[0]")

                  //- Lehrtext
                  | Lehrtext:&nbsp;
                  span(v-html="lehrtext")
                  |  —&nbsp;
                  a(class="font-italic pr-6 caption hellGrau--text" :href="`https://www.bibelserver.com/LUT/${losungen.Lehrtextvers[0]}`" target="_blank" rel="noopener" v-html="losungen.Lehrtextvers[0]")

                  //- Copyright
                  span(class="caption") (
                    a(class="no-underline hellGrau--text pr-2" href="https://www.herrnhuter.de/" target="_blank" rel="noopener")
                      | © Evangelische Brüder-Unität – Herrnhuter Brüdergemeine
                    |  —&nbsp;
                    a(class="no-underline hellGrau--text pl-2" href="https://www.losungen.de" target="_blank" rel="noopener")
                      | Weitere Informationen zu den Losungen findest du&nbsp;
                      span(class="text-decoration-underline") hier
                      | .
                    | )
            v-spacer
            v-btn(color="error" depressed rounded :x-small="$vuetify.breakpoint.smAndDown" :fab="$vuetify.breakpoint.smAndDown" :small="$vuetify.breakpoint.mdAndUp" class="overflow-hidden" aria-label="Krisenintervention")
              v-icon(small class="ml-n1 mr-n1") mdi-alarm-light
              span(v-if="$vuetify.breakpoint.mdAndUp" class="pl-2 subtitle-2 text-capitalize font-weight-medium") Krisenintervention
      v-app-bar(color="white")
        v-container
          v-row
            v-col(sm=12 class="d-flex align-center px-0")
              nuxt-link(class="d-flex align-center mr-auto no-underline"  to="/")
                ec-logo(size="42px" alt="EC")
                h1 Nordbund
              v-btn(text class="hidden-sm-and-down mr-2" to="/blog" color="primary")
                span(class="subtitle-1 text-capitalize font-weight-medium") Blog
              v-btn(text class="hidden-sm-and-down mr-2" to="/veranstaltungen" color="primary")
                span(class="subtitle-1 text-capitalize font-weight-medium") Veranstaltungen
              //- v-btn(text class="hidden-sm-and-down mr-2" to="/orte" color="primary")
              //-   span(class="subtitle-1 text-capitalize font-weight-medium") Vor Ort
              //- v-btn(text class="hidden-sm-and-down" to="/mitarbeiter/anmeldung" color="primary")
              //-   span(class="subtitle-1 text-capitalize font-weight-medium") Anmeldung
              v-app-bar-nav-icon(class="hidden-md-and-up" @click.stop="drawer = !drawer" aria-label="Menü")
    v-navigation-drawer(app right temporary v-model="drawer" dark color="primary darken-1")
      v-list(nav)
        v-list-item(link to="/blog")
          v-list-item-icon
            v-icon mdi-calendar
          v-list-item-content
            v-list-item-title Blog
        v-list-item(link to="/veranstaltungen")
          v-list-item-icon
            v-icon mdi-calendar
          v-list-item-content
            v-list-item-title Veranstaltungen
        //- v-list-item(link to="/orte")
        //-   v-list-item-icon
        //-     v-icon mdi-map-marker
        //-   v-list-item-content
        //-     v-list-item-title Vor Ort
        //- v-list-item(link to="/mitarbeiter/anmeldung")
        //-   v-list-item-icon
        //-     v-icon mdi-account-plus
        //-   v-list-item-content
        //-     v-list-item-title Anmeldung
    v-main(class="ec-bottom-rotated-2" style="margin-bottom: -68px;")
      nuxt
    footer(class="secondary darken-1 white--text ec-top-rotated-1")
      v-container
        v-row(justify="space-between")
          v-col(md="4" )
            h2 Spenden
            v-list(dark color="transparent px-0")
              v-list-item(class="px-0" @click="copy2clip('Sparkasse Südholstein')")
                v-list-item-content
                  v-list-item-title Sparkasse Südholstein
                  v-list-item-subtitle Bank
              v-list-item(class="px-0" @click="copy2clip('DE47 2305 1030 0510 8336 43')")
                v-list-item-content
                  v-list-item-title DE47 2305 1030 0510 8336 43
                  v-list-item-subtitle IBAN
              v-list-item(class="px-0" @click="copy2clip('NOLADE21SHO')")
                v-list-item-content
                  v-list-item-title NOLADE21SHO
                  v-list-item-subtitle BIC
          //- v-col(md="4" align-self="end") © by EC-Nordbund
          v-col(md="4")
            h2 Links
            ul
              li
                nuxt-link(to="/") Startseite
            ul
              li
                nuxt-link(to="/suche/") Suche
            ul
              li
                nuxt-link(to="/downloads/") Downloads
            ul
              li
                nuxt-link(to="/teilnahmebedingungen/") Teilnahmebedingungen
            ul
              li
                nuxt-link(to="/datenschutz") Datenschutz
            ul
              li
                nuxt-link(to="/impressum") Impressum
            ul(v-if="isDev")
              li
                nuxt-link(to="/admin") Admin
      v-container(fluid class="secondary darken-2")
        v-row
          v-col(class="text-center") © by EC-Nordbund
</template>
<script>
import {
  defineComponent,
  ref,
  onMounted,
  useContext,
  computed,
  useAsync,
} from '@nuxtjs/composition-api'

import copy from '~/helpers/copy'

export default defineComponent({
  setup() {
    const drawer = ref(false)

    const { isDev, $content } = useContext()

    // could be optimized
    const losungen = useAsync(async () => {
      return (
        await $content('api', 'losungen').fetch()
      ).body.FreeXml.Losungen.filter((v) =>
        v.Datum[0].startsWith(
          `${new Date().getFullYear()}-${
            new Date().getMonth() + 1 < 10
              ? '0' + (new Date().getMonth() + 1)
              : new Date().getMonth() + 1
          }-${
            new Date().getDate() < 10
              ? '0' + new Date().getDate()
              : new Date().getDate()
          }`
        )
      )[0]
    })

    const losung = computed(
      () =>
        losungen.value &&
        losungen.value.Losungstext[0]
          .split('/')
          .join('<b><i>')
          .split(':<b><i>')
          .join(':</i></b>')
    )
    const lehrtext = computed(
      () =>
        losungen.value &&
        losungen.value.Lehrtext[0]
          .split('/')
          .join('<i>')
          .split(':<i>')
          .join(':</i>')
    )
    const marqueeContentLength = computed(
      () =>
        losungen.value &&
        losungen.value.Losungstext[0].length +
          losungen.value.Losungsvers[0].length +
          losungen.value.Lehrtext[0].length +
          losungen.value.Lehrtextvers[0].length +
          140
    )

    return {
      losungen,
      losung,
      lehrtext,
      marqueeContentLength,
      drawer,
      copy2clip: copy,
      isDev,
    }
  },
})
</script>

<style scoped>
.sticky-header {
  position: sticky;
  top: -40px;
  z-index: 5;
}
.no-underline {
  text-decoration: none;
}
.hover-facebook:hover {
  color: var(--v-facebook-base) !important;
  fill: var(--v-facebook-base);
}
.hover-instagram:hover {
  color: var(--v-instagram-base) !important;
  fill: var(--v-instagram-base);
}
.hover-youtube:hover {
  color: var(--v-youtube-base) !important;
  fill: var(--v-youtube-base);
}
</style>
