<template lang="pug">
  v-app
    header(class="sticky-header")
      v-toolbar(dense short flat color="rgba(0, 0, 0, 0.05)" height="40")
        v-container
          v-row(align="center")
            v-btn(icon medium class="ml-n5 mr-n1 hover-facebook" href="https://www.facebook.com/ECNordbund/" target="_blank" rel="noopener" aria-label="Facebook")
              v-icon mdi-facebook
            v-btn(icon medium class="mx-n1 hover-instagram" href="https://www.instagram.com/ec_nordbund/" target="_blank" rel="noopener" aria-label="Instagram")
              v-icon mdi-instagram
            v-btn(icon medium class="mx-n1 hover-youtube" href="https://www.youtube.com/channel/UC0kn9I7w4sCwl7IJ6ZOTF0w" target="_blank" rel="noopener" aria-label="YouTube")
              v-icon mdi-youtube
            v-spacer
            v-col(sm=6 md=8 xl=10 align-self="center" v-if="losungen.Losungstext" class="hidden-xs-only")
              ec-marquee(:length="losungen.Losungstext[0].length + losungen.Losungsvers[0].length + losungen.Lehrtext[0].length + losungen.Lehrtextvers[0].length + 140")
                span(v-html="losungen.Losungstext[0]")
                |  —
                a(class="font-italic caption pr-6 no-underline" :href="`https://www.bibelserver.com/search/LUT/${losungen.Losungsvers[0]}`" target="_blank" rel="noopener" v-html="losungen.Losungsvers[0]")
                | +++
                span(class="pl-6" v-html="losungen.Lehrtext[0]")
                |  —
                a(class="font-italic caption pr-6 no-underline" :href="`https://www.bibelserver.com/search/LUT/${losungen.Lehrtextvers[0]}`" target="_blank" rel="noopener" v-html="losungen.Lehrtextvers[0]")
                | +++
                a(class="no-underline" href="https://www.herrnhuter.de/" target="_blank" rel="noopener" class="pl-6 pr-2") © Evangelische Brüder-Unität – Herrnhuter Brüdergemeine
                |  —
                a(class="no-underline" href="https://www.losungen.de" target="_blank" rel="noopener" class="pl-2") Weitere Informationen zu den Losungen findest du hier.
            v-spacer
            v-btn(depressed small rounded color="error")
              v-icon(small class="mr-1") mdi-alarm-light
              span(class="subtitle-2 text-capitalize font-weight-medium") Krisenintervention
      v-app-bar(color="rgba(255, 255, 255, 0.9)")
        v-container
          v-row
            v-col(sm=12 class="d-flex align-center px-0")
              nuxt-link(class="d-flex align-center mr-auto no-underline"  to="/")
                ec-logo(size="42px" alt="EC")
                h1(class="font-weight-regular ec-font-heavy") Nordbund
              v-btn(text class="hidden-sm-and-down mr-2" to="/veranstaltungen" color="primary")
                span(class="subtitle-1 text-capitalize font-weight-medium") Veranstaltungen
              v-btn(text class="hidden-sm-and-down mr-2" to="/orte" color="primary")
                span(class="subtitle-1 text-capitalize font-weight-medium") Orte
              v-btn(text class="hidden-sm-and-down" to="/mitarbeiter/anmeldung" color="primary")
                span(class="subtitle-1 text-capitalize font-weight-medium") Anmeldung
              v-app-bar-nav-icon(class="hidden-md-and-up" @click.stop="drawer = !drawer" aria-label="Menü")
    v-navigation-drawer(app right temporary v-model="drawer" dark color="primary darken-1")
      v-list(nav)
        v-list-item(link to="/veranstaltungen")
          v-list-item-icon
            v-icon mdi-calendar
          v-list-item-content
            v-list-item-title Veranstaltungen
        v-list-item(link to="/orte")
          v-list-item-icon
            v-icon mdi-map-marker
          v-list-item-content
            v-list-item-title Orte
        v-list-item(link to="/mitarbeiter/anmeldung")
          v-list-item-icon
            v-icon mdi-account-plus
          v-list-item-content
            v-list-item-title Anmeldung
    v-main
      nuxt
    footer(class="secondary darken-1 white--text")
      v-container
        v-row(justify="space-between")
          v-col(md="4" )
            h2(class="ec-font-heavy") Spenden
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
            h2(class="ec-font-heavy") Links
            ul
              li
                nuxt-link(to="/") Startseite
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
import { defineComponent, ref, onMounted, useContext } from 'nuxt-composition-api'

export default defineComponent({
  setup() {
    const drawer = ref(false)

    const {isDev, $content} = useContext()

    const losungen = ref({})
    
    onMounted(async () => {
      losungen.value = (await $content('api','losungen').fetch()).body.FreeXml.Losungen.filter(v=>v.Datum[0].startsWith(`${new Date().getFullYear()}-${new Date().getMonth()+1<10?'0'+(new Date().getMonth()+1):new Date().getMonth()+1}-${new Date().getDate()<10?'0'+new Date().getDate():new Date().getDate()}`))[0]
    })

    return {
      losungen,
      drawer,
      copy2clip: () => {},
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
  color: #1877f2 !important;
  fill: #1877f2;
}
.hover-instagram:hover {
  color: #c32aa3 !important;
  fill: #c32aa3;
}
.hover-youtube:hover {
  color: #f00 !important;
  fill: #f00;
}
</style>
