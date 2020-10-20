<template lang="pug">
  v-timeline(:dark="dark" :dense="dense")
    v-timeline-item(v-for="preis in preise" :key="preis" small :fill-dot="fillDot" :color="dotColor") 
      //- | {{preis.label}}
      span(slot="opposite") {{subtitle(preis)}}
      v-card(tile)
        v-card-title(class="ec-gradient white--text pb-2 pt-3") {{preis.label}}
        v-card-text(class="py-3")
          p(class="text-center text-h4 font-weight-light mb-0") {{preis.preis}} EUR
          p(class="hidden-sm-and-up text-right") {{subtitle(preis)}}
</template>
<script lang="js">
// TODO: highlight current price
// TODO: display alerts when the next category is in a few days
export default {
  computed: {
    dense() {
      return this.$vuetify.breakpoint[this.denseBreakpoint] || false
    } 
  },
  methods: {
    subtitle(preis) {
      if(preis.begin) {
        return `ab dem ${preis.begin.split('-').reverse().join('.')}`;
      } else if(preis.ende) {
          return `bis zum ${preis.ende.split('-').reverse().join('.')}`;
      }
      return "";
    }
  },
  props: {
    value: {
      type: String,
      required: true,
    },
    preise: {
      type: Array,
      default: [],
    },
    // choose from: `xsOny`, `smAndDown`, `smAndUp`, `mdAndDown`, ... , `xlOnly`
    denseBreakpoint: {
      type: String,
      default: ""
    },
    dark: {
      type: Boolean,
      default: false
    },
    fillDot: {
      type: Boolean,
      default: false
    },
    dotColor: {
      type: undefined | String,
      default: undefined
    }
  },
}
</script>
