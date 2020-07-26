<template lang="pug">
  v-container
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
      :length="pageCount"
      :total-visible="7"
    )
</template>
<script>
const pagination = {
  getPostsOfPage($content, page) {
    return $content('blog')
      .only(['title', 'tags', 'description', 'featuredImage', 'slug'])
      .sortBy('published', 'desc')
      .skip(10 * (page - 1))
      .limit(10)
      .fetch()
  },

  async getNumberOfPages($content) {
    return Math.ceil((await $content('blog').only([]).fetch()).length / 10)
  },
}

export default {
  async asyncData({ $content, query }) {
    const page = parseInt(query.page || '1') || 1

    const [posts, pageCount] = await Promise.all([
      pagination.getPostsOfPage($content, page),
      pagination.getNumberOfPages($content),
    ])

    return { posts, page, pageCount }
  },
  data() {
    return {
      posts: [],
      page: 1,
      pageCount: 1,
    }
  },
  watch: {
    async page() {
      this.$router.replace({ path: '/blog', query: { page: this.page } })
      this.posts = await pagination.getPostsOfPage(this.$content, this.page)
    },
  },

  head() {
    return {
      title: `Blog (Seite ${this.page})`,
      meta: [
        {
          hid: 'description',
          name: 'description',
          content:
            'Blog des EC-Nordbundes mit allen wichtigen Informationen, Veranstaltungsberichten etc.',
        },
        // Open Graph
        {
          hid: 'og:title',
          property: 'og:title',
          content: `Blog (Seite ${this.page})`,
        },
        {
          hid: 'og:description',
          property: 'og:description',
          content:
            'Blog des EC-Nordbundes mit allen wichtigen Informationen, Veranstaltungsberichten etc.',
        },
        // Twitter Card
        {
          hid: 'twitter:title',
          name: 'twitter:title',
          content: `Blog (Seite ${this.page})`,
        },
        {
          hid: 'twitter:description',
          name: 'twitter:description',
          content:
            'Blog des EC-Nordbundes mit allen wichtigen Informationen, Veranstaltungsberichten etc.',
        },
      ],
    }
  },
}
</script>
