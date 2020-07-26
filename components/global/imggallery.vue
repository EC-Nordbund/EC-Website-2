<template lang="pug">
  div(:style="{display: 'grid', gridTemplateColumns: `repeat(${Math.min(5, count)}, 1fr)`, gridGap: '5px'}")
    slot
    p {{count}}
</template>
<script>
export default {
  props: {
    count: Number
  },
  name: 'img-gallery'
}
</script>