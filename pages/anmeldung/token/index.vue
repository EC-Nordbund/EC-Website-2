<template lang="pug">
  v-container
    //- v-card
    //-   v-card-title
    h1 Verifizierung
      //- v-card-text
    v-alert(type="error" v-if="error")
      p {{error}}
        br
        | Bitte probiere es erneut!
    p Bitte gebe den Verifizierungscode ein. Du kannst aber auch einfach den Link aus der E-Mail verwenden.
    v-text-field(label="Verifizierungscode" v-model="token")
    //- v-card-actions
    //- v-spacer
    v-btn(@click="verify") Verifizieren
</template>
<script lang="ts">
import { defineComponent, useContext, ref, computed } from '@nuxtjs/composition-api'
export default defineComponent({
 setup(_, vueCtx) {
    const token = ref('')
    const ctx = useContext()
    const error = computed(() => ctx.query.value.error)
   
   return {
     token,
     error,
     verify: () => vueCtx.root.$router.push(`/anmeldung/token/${token.value}`)
   }
 }
})
</script>
