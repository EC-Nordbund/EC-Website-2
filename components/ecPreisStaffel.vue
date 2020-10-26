<template lang="pug">
  v-timeline(:dense="dense")
    v-timeline-item(v-for="preis in preise" :key="JSON.stringify(preis)" small :fill-dot="fillDot" :color="dotColor") 
      //- | {{preis.label}}
      span(slot="opposite") {{subtitle(preis)}}
      v-card(tile)
        v-card-title(class="ec-gradient white--text pb-2 pt-3") {{preis.label}}
        v-card-text(class="py-3")
          p(class="text-center text-h4 font-weight-light mb-0") {{preis.preis}} EUR
          p(class="hidden-sm-and-up text-right") {{subtitle(preis)}}
</template>
<script lang="ts">
import { defineComponent, computed } from '@nuxtjs/composition-api'
// TODO: highlight current price
// TODO: display alerts when the next category is in a few days
export default defineComponent({
  setup(props, ctx) {
    const dense = computed(
      // @ts-expect-error
      () => ctx.root.$vuetify.breakpoint[props.denseBreakpoint] || false
    )

    const subtitle = (preis: { begin: string; ende: string }) => {
      if (preis.begin) {
        return `ab dem ${preis.begin.split('-').reverse().join('.')}`
      } else if (preis.ende) {
        return `bis zum ${preis.ende.split('-').reverse().join('.')}`
      }
      return ''
    }

    return {
      dense,
      subtitle,
    }
  },
  props: {
    preise: {
      type: Array,
      default: [],
    },
    // choose from: `xsOny`, `smAndDown`, `smAndUp`, `mdAndDown`, ... , `xlOnly`
    denseBreakpoint: {
      type: String,
      required: true,
    },
    fillDot: {
      type: Boolean,
      default: false,
    },
    dotColor: {
      type: String,
      required: false,
    },
  },
})
</script>
