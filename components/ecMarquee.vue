<template lang="pug" functional>
  div(class="marquee text-no-wrap" :style="{'background-color':props.color}")
    span(:style="{animationDuration: `${ props.length * 0.15 || 15 }s`}")
      slot
</template>
<script>
export default {
  props: {
    color: {
      type: String,
      default: 'none'
    },
    length: {
      type: Number,
      required: true
    }
  }
}
</script>
<style scoped lang="scss">
.marquee {
  margin: 0 auto;
  overflow: hidden;
  border-radius: 12px;
  padding: 2px 6px;
  > span {
    display: inline-block;
    padding-left: 100%;
    animation: marquee linear infinite;
    color: var(--v-secondary-lighten1);
  }
  &:hover > span {
    animation-play-state: paused;
  }
}
@keyframes marquee {
  0% {
    transform: translate(0, 0);
  }
  100% {
    transform: translate(-100%, 0);
  }
}
</style>
