<template lang="pug">
  v-btn(color="primary" class="ec-gradient" depressed tile large :style="`transform: rotate(${rotate}deg);`")
    v-icon(:style="`transform: rotate(-${rotate}deg);`")  {{icon}}
</template>
<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'

export default defineComponent({
  props: {
    icon: {
      type: String,
      default: '',
    },
    rotate: {
      type: Number,
      default: 0,
    },
  },
})
</script>
<style scoped>
.ec-gradient {
  clip-path: polygon(50% 100%, 5% 75%, 5% 25%, 50% 0%, 95% 25%, 95% 75%);
  height: 85px !important;
  width: 85px !important;
}
</style>
