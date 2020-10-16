<template lang="pug">
  v-container
    h1 Freizeiten & Events
    //- TODO: sortby by date (asc/desc), alphabetic (asc/desc) 
    //- TODO: filter by tags, age, date-range
    v-row
      v-col(v-for="item in veranstaltungen" cols="12" sm="6" md="12" :key="item.slug")
        v-card(outlined tile hover class="overflow-hidden" color="offWhite")
          v-row(no-gutters @click="$router.push(`/veranstaltungen/${item.slug}`)")
            v-col(cols="12" md="6" lg="4" class="hellGrau")
              //- image
              v-img(:src="item.featuredImage" height="300" class="white--text align-end" gradient="180deg, rgba(0,0,0,0.32) 0%, rgba(0,0,0,0.02) 16%, rgba(0,0,0,0.02) 64%, rgba(0,0,0,0.64) 92%")
                //- title
                div(class="ec-gradient")
                  v-card-title(class="pt-2 font-weight-bold") {{item.title}}
                  v-card-subtitle(class="pb-2 secondary--text") Vom {{item.begin.split('-').reverse().join('.')}} bis {{item.ende.split('-').reverse().join('.')}}
            v-col(cols="12" md="6" lg="8" class="d-flex flex-column justify-space-between" :style="detailsMaxHeight")
              v-card-text(class="full-heigth overflow-hidden pb-0")
                //- labels
                v-row(no-gutters)
                  //- categories
                  v-col(cols="12" lg="8" class="d-flex justify-md-end justify-lg-start mb-1 ml-n2")
                    //- TODO: colored tags
                    v-chip(color="secondary" text-color="primary" class="ml-2 font-weight-medium" outlined small v-for="tag in item.tags" :key="tag")
                      | {{ tag }}
                  //- warings
                  v-col(cols="12" lg="4" class="d-flex justify-md-end mb-1 ml-n2")
                      v-chip(color="warning" text-color="white" class="ml-2 font-weight-medium" small v-if="item.warteliste.männlich")
                        v-icon(small class="ml-n1 mr-1") mdi-alert-circle
                        | Für Männer nur noch Warteliste
                      v-chip(color="warning" text-color="white" class="ml-2 font-weight-medium" small v-if="item.warteliste.weiblich")
                        v-icon(small class="ml-n1 mr-1") mdi-alert-circle
                        | Für Frauen nur noch Warteliste
                      v-chip(color="warning" text-color="white" class="ml-2 font-weight-medium" small v-if="item.warteliste.allgemein")
                        v-icon(small class="ml-n1 mr-1") mdi-alert-circle
                        | Nur noch Warteliste
                //- description
                v-row
                  v-col(cols="12") {{item.description}}
              
              //- actions/buttons
              v-card-actions(class="pa-4")
                v-spacer
                v-btn(color="primary" class="ec-gradient" depressed tile large @click="$router.push(`/veranstaltungen/${item.slug}`)")
                  //- TODO: hexagon shape for button (maybe in a custom component) 
                  | Details
                  v-icon mdi-arrow-right
</template>
<script>
export default {
  computed: {
    detailsMaxHeight() {
      switch (this.$vuetify.breakpoint.name) {
        case "md":
        case "lg":
        case "xl":
          return "max-height: 300px;";
        default:
          return "";
      }
    },
  },
  async asyncData({ $content }) {
    const page = await $content('veranstaltungen').fetch()

    const veranstaltungen = await $content('veranstaltung')
      .only([
        'slug',
        'title',
        'begin',
        'ende',
        'veranstaltungsort',
        'description',
        'minAlter',
        'maxAlter',
        'featuredImage',
        'warteliste',
        'tags',
      ])
      .sortBy('begin')
      .fetch()

    return { page, veranstaltungen }
  },
  head() {
    return {
      title: 'Veranstaltungen',
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: 'Liste aller Veranstaltungen des EC-Nordbundes.',
        },
        // Open Graph
        { hid: 'og:title', property: 'og:title', content: 'Veranstaltungen' },
        {
          hid: 'og:description',
          property: 'og:description',
          content: 'Liste aller Veranstaltungen des EC-Nordbundes.',
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
          content: 'Liste aller Veranstaltungen des EC-Nordbundes..',
        },
      ],
    }
  },
}
</script>
