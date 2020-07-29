<template lang="pug">
  div Startseite  
    h2 Unsere 4 Grundsätze
    table
      tbody(style="font-weight: 500;")
        tr
          td(style="color: var(--v-up-base); text-align: right;") &#xec02; 
          td entschieden für Cristus
        tr
          td(style="color: var(--v-in-base); text-align: right;") &#xec01; 
          td zugehörig zur Gemeinde
        tr 
          td(style="color: var(--v-with-base); text-align: right;") &#xec03; 
          td verbunden mit allen Christen
        tr 
          td(style="color: var(--v-out-base); text-align: right;") &#xec04;
          td gesandt in die Welt
    v-img(:src="require('~/assets/img/Grundsätze.png')" width="90%")
</template>
 