<template lang="pug">
  v-container
    //- p {{ veranstaltungen }}
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
  async asyncData({ $content }) {
    const page = await $content('veranstaltungen').fetch()

    // const sub2 = await $content('veranstaltung').fetch()
    // console.log(sub2)

    const veranstaltungen = await $content('veranstaltung')
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
      .fetch()

    return { page, veranstaltungen }
  },
  head() {
    return {
      title: 'Veranstaltungen',
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: 'Liste aller Veranstaltungen des EC-Nordbundes.',
        },
        // Open Graph
        { hid: 'og:title', property: 'og:title', content: 'Veranstaltungen' },
        {
          hid: 'og:description',
          property: 'og:description',
          content: 'Liste aller Veranstaltungen des EC-Nordbundes.',
        },
        // Twitter Card
        {
          hid: 'twitter:title',
          name: 'twitter:title',
          content: 'Veranstaltungen',
        },
        {
          hid: 'twitter:description',
          name: 'twitter:description',
          content: 'Liste aller Veranstaltungen des EC-Nordbundes..',
        },
      ],
    }
  },
}
</script>
