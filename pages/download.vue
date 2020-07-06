<template lang="pug">
  v-container
    v-list
      template(v-for="el in files")
        v-list-item(v-if="!el.files" :href="`/downloads/${el.filename}`" three-line)
          v-list-item-title {{el.title}}
          v-list-item-subtitle {{el.description}}
        v-list-item(v-else :to="{path: $route.path, query: {path: ($route.query.path||'') + '/' + el.foldername}}")
          v-list-item-title {{el.foldername}}
</template>
<script>
import { defineComponent } from "nuxt-composition-api";

async function getCurrentFiles($content, route) {
  let files = await $content('downloads').fetch()

    files=files.files;

    (route.query.path||'').split('/').filter((p,i) => !(p===''&&i===0)).forEach(part => {
      files = files.filter(v=>v.foldername == part)[0].files
    })


  return files
}

export default defineComponent({
  async asyncData({ $content, route }) {
    return {files: getCurrentFiles($content, route)}
  },
  beforeRouteUpdate(to, from, next) {
    this.files = getCurrentFiles(this.$content, to)
    next()
  }
})
</script>
