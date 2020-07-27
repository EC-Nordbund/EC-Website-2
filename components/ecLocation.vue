<template lang="pug">
   client-only
      l-map(:zoom="zoom" :center="marker[0].marker")
        //- :center="[ecKreis.gps.lat,ecKreis.gps.long]"
        l-tile-layer(:email="`app@ec-nordbund.de`" url="https://{s}.tile.openstreetmap.de/{z}/{x}/{y}.png" attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors')
        l-control-scale(position="topright" metric)
        l-marker(v-for="m in marker" :lat-lng="m.marker" :key="m.title")
          l-tooltip {{ m.title }}
          l-popup
            p
              b {{m.title}}
              br
              | {{m.strasse}}
              br
              | {{m.plz}} {{m.ort}}
              br(v-if="m.email")
              a(v-if="m.email" :href="`mailto:${m.email}`") {{m.email}}
              br(v-if="!m.noMore")
              a(v-if="!m.noMore" @click="$router.push(m.more)" style="cursor: pointer") mehr...
</template>
<script>
import { defineComponent } from 'nuxt-composition-api'

export default defineComponent({
  props: {
    marker: {
      type: Array,
      required: true,
    },
    zoom: {
      type: Number,
      default: 7,
    },
  },
})
</script>
