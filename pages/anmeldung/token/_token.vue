<template lang="pug">
  v-container(v-if="loading")
    p Lade Daten...
  v-container(v-else)
    h1 Verifizierung erfolgreich!
    p Deine Anmeldung war erfolgreich!
    p(v-if="anmeldeID") Deine Anmelde-ID lautet {{ anmeldeID }}
    p(v-if="wList") Leider bist du auf der Warteliste gelandet. Wartelistenplatz {{ wList }}.
</template>
<script lang="ts">
import { defineComponent, useContext, ref, useAsync } from '@nuxtjs/composition-api'
import { post } from '~/helpers/fetch'
export default defineComponent({
 setup(_, ctx) {
   const token = useContext().params.value.token
   const loading = ref(true)
   const anmeldeID = ref(null as null | string)
   const wList = ref(0)

   const status = useAsync(async () => {
     const res = await post<{status: 'OK' | 'ERROR', context: string, anmeldeID?: string, wList?: number}>('/api/confirm/' + token, {})

     if(res.status === 'OK') {
       loading.value = false

        if(res.wList) {
          wList.value = res.wList
        }
        if(res.anmeldeID) {
          anmeldeID.value = res.anmeldeID
        }
     } else {
       ctx.root.$router.push('/anmeldung/token?error=' + res.context)
     }
   })

   return {
     token,
     loading
   }
 }
})
</script>
