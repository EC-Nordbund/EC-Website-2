<template lang="pug">
  v-container
    //- | WENN DU DAS LIEST IST WAS SCHIEFGEGANGEN...
</template>
<script>
export default {
 setup(_, ctx) {
    if(ctx.root.$route.query.token) {
      // Überprüfen des Tokens baut @mathe42 selber ein. Wenn fehlerhaft wird auf 404 weitergeleitet.
      if(true) { // Erstmal immer wahr
        // Verrify Token normal (MA anmeldung oder TN anmeldung oder MA anmeldung Ort)
      } else {
        // MA anmeldung Ort verify durch verantwortlichen
      }
    } else {
      // Zeige Token eingabefeld.
    }
 }
}
</script>
