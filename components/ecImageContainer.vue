<template lang="pug">
  v-carousel(
    continuous
    cycle
    :height="height"
    :show-arrows="false" 
    hide-delimiters
  )
    v-carousel-item(
      v-for="(img, i) in images"
      :key="i"
      class="secondary"
    )
      picture
        source(:srcset="img + '.webp'" type="image/webp")
        source(:srcset="img + '.jpg'" type="image/jpg")
        img(:src="img + '.jpg'" :alt="img" class="responsive-image")
</template>
<style lang="scss" scoped>
.responsive-image {
  object-fit: cover;
  min-width: 100%;
  min-height: 100%;
  max-height: 600px;
}
</style>
<script lang="ts">
import { defineComponent, computed } from '@nuxtjs/composition-api'

export default defineComponent({
  props: {
    images: {
      type: Array,
      required: true,
    },
  },
  setup(_, ctx) {
    const height = computed(()=> {
      if (ctx.root.$vuetify.breakpoint.xsOnly) {
        return 300;
      }

      if (ctx.root.$vuetify.breakpoint.mdAndDown) {
        return 400;
      }

      return 500;
    })

    return { height }
  }
})
</script>
