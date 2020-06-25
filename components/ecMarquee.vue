<template lang="pug" functional>
  div(class="marquee text-no-wrap")
    span(:style="{animationDuration: `${ props.length * 0.15 || 15 }s`}" class="body-2")
      slot
</template>
<style scoped lang="scss">
.marquee {
  margin: 0 auto;
  overflow: hidden;
  background-color: rgba(0, 0, 0, 0.05);
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
