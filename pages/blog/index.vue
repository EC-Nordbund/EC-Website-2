<template lang="pug">
  v-container
    //- p {{ veranstaltungen }}
    v-list(three-line)
      v-list-item(v-for="item in veranstaltungen" @click="$router.push(`/blog/${item.slug}`)" :key="item.slug")
        v-list-item-avatar
          v-img(:src="item.featuredImage")
        v-list-item-content
          v-list-item-title 
            span(style="margin-right: 20px;") {{item.title}} ({{item.begin.split('-').reverse().join('.')}}-{{item.ende.split('-').reverse().join('.')}})
            v-chip(color="secondary" v-for="tag in item.tags" :key="tag") {{ tag }}
          v-list-item-subtitle {{item.description}}
</template>
<script>
export default {
  async asyncData({ $content }) {

    // const sub2 = await $content('veranstaltung').fetch()
    // console.log(sub2)

    const posts = await $content('blog').fetch()

    return { posts }
  },
}
</script>
