<template lang="pug">
  v-container
    h1 Suche
    v-text-field(v-model="suche")
    h2 Ergebnisse

    h3 Blog
      v-list(three-line)
        v-list-item(v-for="item in posts" @click="$router.push(`/blog/${item.slug}`)" :key="item.slug")
          v-list-item-avatar
            v-img(:src="item.featuredImage")
          v-list-item-content
            v-list-item-title 
              span(style="margin-right: 20px;") {{item.title}}
              v-chip(color="secondary" v-for="tag in item.tags" :key="tag") {{ tag }}
            v-list-item-subtitle {{item.description}}
    h3 Veranstaltungen
      v-list(three-line)
        v-list-item(v-for="item in veranstaltungen" @click="$router.push(`/veranstaltungen/${item.slug}`)" :key="item.slug")
          v-list-item-avatar
            v-img(:src="item.featuredImage")
          v-list-item-content
            v-list-item-title 
              span(style="margin-right: 20px;") {{item.title}} ({{item.begin.split('-').reverse().join('.')}}-{{item.ende.split('-').reverse().join('.')}})
              v-chip(color="primary" v-if="item.warteliste.männlich") Warteliste Männlich
              v-chip(color="primary" v-if="item.warteliste.weiblich") Warteliste Weiblich
              v-chip(color="primary" v-if="item.warteliste.allgemein") Warteliste
              v-chip(color="secondary" v-for="tag in item.tags" :key="tag") {{ tag }}
            v-list-item-subtitle {{item.description}}
</template>
<script>
export default {
  data() {
    return {
      suche: '',
      posts: [],
      veranstaltungen: [],
    }
  },
  watch: {
    async suche() {
      const [v, p] = await Promise.all([
        this.$content('veranstaltung')
          .only([
            'slug',
            'title',
            'begin',
            'ende',
            'description',
            'featuredImage',
            'warteliste',
            'tags',
          ])
          .sortBy('begin')
          .search(this.suche)
          // .limit(3)
          .fetch(),
        this.$content('blog')
          .only(['title', 'tags', 'description', 'featuredImage', 'slug'])
          .sortBy('published', 'desc')
          .search(this.suche)
          // .limit(5)
          .fetch(),
      ])

      this.posts = p
      this.veranstaltungen = v
    },
  },
}
</script>
