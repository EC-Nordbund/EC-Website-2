<template lang="pug">
  v-container
    //- p {{ posts }}
    v-list(three-line)
      v-list-item(v-for="item in posts" @click="$router.push(`/blog/${item.slug}`)" :key="item.slug")
        v-list-item-avatar
          v-img(:src="item.featuredImage")
        v-list-item-content
          v-list-item-title 
            span(style="margin-right: 20px;") {{item.title}}
            v-chip(color="secondary" v-for="tag in item.tags" :key="tag") {{ tag }}
          v-list-item-subtitle {{item.description}}
    v-pagination(
      v-model="page"
      :length="pagesCount"
      :total-visible="7"
    )
</template>
<script>
export default {
  async asyncData({ $content, query }) {
    const page = parseInt(query.page || '1')

    const skip = page * 10 - 10

    const posts = await $content('blog').without(['body']).sortBy('published', 'desc').limit(10).skip(skip).fetch()

    const pagesCount = Math.ceil((await $content('blog').without(['body', 'title', 'description','featuredImage']).fetch()).length / 10)

    return { posts, page, pagesCount }
  },
  data() {
    return {
      posts: [],
      page: 0,
      pagesCount: 1
    }
  },
  methods: {
    async goToPage() {
      this.$router.replace({path: '/blog', query: { page: this.page }})
      this.posts  = await this.$content('blog').without(['body']).sortBy('published', 'desc').limit(10).skip(this.page*10-10).fetch()
    },
  },
  watch: {
    page: {
      handler: 'goToPage'
    }
  }
}
</script>
