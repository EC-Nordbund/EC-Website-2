<template lang="pug">
  //- div
    //- v-row
    //-   v-col(:key="img" v-for="img in images")
    //-     v-img(:src="img" height="300" width="500")  
    //- cycle
  v-carousel(
    cycle
    height="600"
    :show-arrows="false" 
    hide-delimiters
  )
    v-carousel-item(
      v-for="(img, i) in images"
      :key="i"
    )
      //- v-responsive(height="600")
      picture(style="height: 600px; transform: translate(-50%, 0); margin-top: -50%;")
        source(:srcset="img + '.webp'" type="image/webp")
        source(:srcset="img + '.jpg'" type="image/jpg")
        img(:src="img + '.jpg'" :alt="img" style="transform: translate(0, calc(-50% + 300px));width: 100%;")
</template>
<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'

export default defineComponent({
  props: {
    images: {
      type: Array,
      required: true,
    },
  },
})
</script>
