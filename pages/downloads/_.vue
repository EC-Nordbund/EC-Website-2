<template lang="pug">
  v-container
    v-breadcrumbs(:items="['Downloads',...fileRoute].map(v=>({text: v}))" divider="/")
    h1 {{data.title}}
    p {{data.description}}

    v-list(:key="$route.fullpath" flat)
      v-list-item(v-if="fileRoute.length > 0" :href="`/downloads/${fileRoute.slice(0, -1).join('/')}`")
        v-list-item-avatar
          v-icon mdi-arrow-left
        v-list-item-content
          v-list-item-title Zurück
      v-list-item(v-for="el in data.files" :key="$route.fullpath + el.filename" :href="`/downloads/${el.filename}`" two-line)
        v-list-item-avatar
          v-icon {{ {'pdf': 'mdi-file-pdf-outline', docx: 'mdi-file-word', jpg: 'mdi-file-image', png: 'mdi-file-image'}[el.filename.split('.')[1].toLowerCase()] || 'mdi-file' }}
        v-list-item-content
          v-list-item-title {{el.title}}
          v-list-item-subtitle {{el.description}}
      v-list-item(v-for="key in Object.keys(data.folders)" :key="$route.fullpath + key" :to="key + '/'" two-line)
        v-list-item-avatar
          v-icon mdi-folder
        v-list-item-content
          v-list-item-title {{data.folders[key].title}}
          v-list-item-subtitle {{data.folders[key].description}}
</template> 
<script>
import { defineComponent, useContext, useAsync, computed } from "nuxt-composition-api";



export default defineComponent({
  setup() {
    const { route, $content } = useContext()
    
    const fileRoute = route.value.params.pathMatch.split('/').filter(v=>v!== '')

    const fileData = useAsync(async () => await $content('downloads').fetch())

    const data = computed(() => {
      if(fileData.value === null) {
        return {files: [], folders: []}
      } else if(route.value.params.pathMatch.length < 2) {
        return fileData.value
      } else {
        let pointer = fileData.value

        for (let i = 0; i < fileRoute.length; i++) {
          pointer = pointer?.folders?.[fileRoute[i]]

          if(!pointer) {
            return {files: [], folders: []}
          }
        }

        return pointer
      }
    })


    return { fileRoute, data }
  }
})
</script>
