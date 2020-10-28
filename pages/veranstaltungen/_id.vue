<template lang="pug">
  div
    //- cover
    v-img(:src="page.featuredImage.split('.')[0] + (supportWebp() ? '.webp' : '.jpg')" height="420" class="white--text" gradient="180deg, rgba(0,0,0,0.32) 0%, rgba(0,0,0,0.02) 32%, rgba(0,0,0,0.02) 48%, rgba(0,0,0,0.72) 96%")
      v-container(class="d-flex flex-column justify-space-between" style="height:100%")
        v-row(no-gutters align="start" class="flex-grow-0" justify="space-between")
          //- go back to overview
          v-col(cols="2" sm="1")
            nuxt-link(to="/veranstaltungen")
              ec-hexa-button(icon="mdi-arrow-left" :size="64" aria-label="Zurück zur Übersicht.")

          v-spacer

          //- display indicators
          v-col(cols="auto" class="d-flex flex-column")
            v-row(class="text-right")
              v-col
                v-chip(color="warning" text-color="white" class="ml-auto mb-1 elevation-8 font-weight-medium" small v-if="page.warteliste.männlich")
                  v-icon(small class="ml-n1 mr-1") mdi-alert-circle
                  | Für Männer nur noch Warteliste

                v-chip(color="warning" text-color="white" class="ml-auto mb-1 elevation-8 font-weight-medium" small v-if="page.warteliste.weiblich")
                  v-icon(small class="ml-n1 mr-1") mdi-alert-circle
                  | Für Frauen nur noch Warteliste

                v-chip(color="warning" text-color="white" class="ml-auto mb-1 elevation-8 font-weight-medium" small v-if="page.warteliste.allgemein")
                  v-icon(small class="ml-n1 mr-1") mdi-alert-circle
                  | Nur noch Warteliste
            //- JuLeiCa Fortbildung
            v-row(v-if="page.juleica")
              v-col
                v-img(width="260" height="200" :src="require('~/assets/img/juLeiCa.png')")
          
        v-row(no-gutters align="end" class="flex-grow-0 mb-n1")
          //- title
          v-col(cols="12" md="6" class="order-last order-md-0")
            h1(class="d-block d-md-inline-block ec-gradient py-1 px-5 my-2 elevation-16") {{page.title}}

          //- categories
          v-col(cols="12" md="6" class="d-flex justify-start justify-sm-end flex-wrap-reverse")
            v-chip(color="offWhite" text-color="secondary" class="mr-2 mb-1 font-weight-medium" small v-for="tag in page.tags" :key="tag")
              | {{ tag }}

    v-container
      nuxt-content(:document="page")
    
    ec-image-container(v-if="page.images" :class="'angle--both-left-' + (page.preise || !(page.lat == 0 && page.long == 0) ? 'left' : 'right') + ' clip-angle'" :images="page.images")

    div(v-if="page.preise" class="grey lighten-4 angle--both-right-left")
      v-container(py-0)
        v-row(no-gutters justify="center")
          v-col(cols="12" md="9")
            h2(class="mb-2 text-center") Preisstaffelung
            ec-preis-staffel(:preise="page.preise" fill-dot dot-color="white" denseBreakpoint="xsOnly")

    div(v-if="!(page.lat == 0 && page.long == 0)" class="angle--top-right clip-angle")
      ec-location(v-if="!(page.lat == 0 && page.long == 0)" :zoom="12" :marker="[{...page, marker: [page.lat, page.long], noMore: true}]" style="width: 100%; min-height: 300px; max-height: 100%; z-index: 0;")


    v-container(v-if="page.anmeldung")
      h2(class="mb-2 text-center") Anmeldung
      ec-anmeldung(
        v-bind="page.anmeldung"
        :veranstaltungsBegin="page.begin"
        :minAlter="page.minAlter"
        :maxAlter="page.maxAlter"
        :veranstaltungsID="page.veranstaltungsID"
      )
        v-alert(slot="disabled" type="info" color="hellGrau" dense text outlined) Die Anmeldung zu dieser Veranstaltung ist deaktiviert.
        v-row(slot="countdown" justify="center")
          v-col(cols="12" sm="8" md="6" xl="4")
            v-card(class="ec-gradient")
              v-card-title(class="text-body-1 text-md-h6 text-lg-h6 text-xl-h6 text--secondary justify-center pb-2") Die Anmeldung wird freigeschaltet in:
              v-card-text
                ec-countdown(:target="page.anmeldung.startAt")
                  template(v-slot:digits="slotProp")
                    span(slot="digits" class="text-h4 font-weight-bold white--text") {{slotProp.digits}}
                  template(v-slot:units="slotProp")
                    span(slot="units" class="text-caption text-uppercase") {{slotProp.unit}}
</template>
<script>
import { supportWebp } from "../../helpers/webp";

export default {
  async asyncData({ $content, params, redirect, route }) {
    try {
      const page = await $content('veranstaltung', params.id).fetch()

      return { page }
    } catch (e) {
      redirect('/404', { path: route.path })
    }
  },
  setup() {
    return {
      supportWebp
    }
  },
  head() {
    return {
      title: this.page.title,
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: this.page.description,
        },
        // Open Graph
        {
          hid: 'og:title',
          property: 'og:title',
          content:
            this.page.title +
            ` (${this.page.begin
              .split('-')
              .reverse()
              .join('.')} - ${this.page.ende.split('-').reverse().join('.')})`,
        },
        {
          hid: 'og:description',
          property: 'og:description',
          content: this.page.description,
        },
        // Twitter Card
        {
          hid: 'twitter:title',
          name: 'twitter:title',
          content:
            this.page.title +
            ` (${this.page.begin
              .split('-')
              .reverse()
              .join('.')} - ${this.page.ende.split('-').reverse().join('.')})`,
        },
        {
          hid: 'twitter:description',
          name: 'twitter:description',
          content: this.page.description,
        },
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
      ],
    }
  },
}
</script>
