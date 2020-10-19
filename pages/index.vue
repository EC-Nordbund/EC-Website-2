<template lang="pug">
  div
    v-container
      div(class="d-flex flex-row justify-space-between")
        h2 Aktuelles
        v-btn(text depressed tile large @click="$router.push(`/blog/`)")
          | Mehr Beiträge
          v-icon(class="ml-1 mr-n1") mdi-arrow-right
      v-row
        v-col(cols="12" sm="6" md="4" v-for="item in recentPosts" :key="item.slug")
          v-card(tile hover outlined @click="$router.push(`/blog/${item.slug}`)")
            v-img(:src="item.featuredImage" height="300" class="white--text" gradient="180deg, rgba(0,0,0,0.32) 0%, rgba(0,0,0,0.02) 16%, rgba(0,0,0,0.02) 64%, rgba(0,0,0,0.64) 92%")
              div(class="d-flex flex-column-reverse justify-space-between" style="height:100%")
                div(class="ec-gradient")
                  v-card-title(class="pt-2 font-weight-bold") {{item.title}}
                  v-card-subtitle(class="pb-2 secondary--text") Vom {{item.published.split('T')[0].split('-').reverse().join('.')}}
    v-container
      div(class="d-flex flex-row justify-space-between")
        h2 Nächste Veranstaltungen
        v-btn(text depressed tile large @click="$router.push(`/veranstaltungen/`)")
          | Mehr Veranstaltungen
          v-icon(class="ml-1 mr-n1") mdi-arrow-right
      v-row
        v-col(cols="12" sm="6" md="4" v-for="item in upcomingEvents" :key="item.slug")
          v-card(tile hover outlined @click="$router.push(`/veranstaltungen/${item.slug}`)")
            v-img(:src="item.featuredImage" height="300" class="white--text" gradient="180deg, rgba(0,0,0,0.32) 0%, rgba(0,0,0,0.02) 16%, rgba(0,0,0,0.02) 64%, rgba(0,0,0,0.64) 92%")
              div(class="d-flex flex-column-reverse justify-space-between" style="height:100%")
                div(class="ec-gradient")
                  v-card-title(class="pt-2 font-weight-bold") {{item.title}}
                  v-card-subtitle(class="pb-2 secondary--text") Vom {{item.begin.split('-').reverse().join('.')}} bis {{item.ende.split('-').reverse().join('.')}}
</template>
<script>
export default {
  async asyncData({ $content }) {
    const upcomingEvents = await $content('veranstaltung')
      .only([
        'slug',
        'title',
        'begin',
        'ende',
        'featuredImage',
        'tags',
      ])
      .sortBy('begin') // TODO: compare to todays date
      .limit(3)
      .fetch()

    const recentPosts = await $content('blog')
      .only(['title', 'tags', 'description', 'featuredImage', 'slug', 'published'])
      .sortBy('published', 'desc')
      .limit(3)
      .fetch()

    return { upcomingEvents, recentPosts }
  },
  head() {
    return {
      title: 'Startseite',
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: 'Wir sind der Nordbund!',
        },
        // Open Graph
        { hid: 'og:title', property: 'og:title', content: 'Veranstaltungen' },
        {
          hid: 'og:description',
          property: 'og:description',
          content: 'Wir sind der Nordbund!',
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
          content: 'Wir sind der Nordbund!',
        },
      ],
    }
  },
}
</script>
 