<template>
  <ul class="ec-countdown">
    <li v-if="days > 0">
      <p class="digit">{{ twoDigits(days) }}</p>
      <p class="text">{{ days > 1 ? 'Tage' : 'Tag' }}</p>
    </li>
    <li v-if="(days > 0 || hours > 0)">
      <p class="digit">{{ twoDigits(hours) }}</p>
      <p class="text">{{ hours > 1 ? 'Stunden' : 'Stunde' }}</p>
    </li>
    <li v-if="(days > 0 || hours > 0 || minutes > 0)">
      <p class="digit">{{ twoDigits(minutes) }}</p>
      <p class="text">{{ minutes > 1 ? 'Minuten' : 'Minute' }}</p>
    </li>
    <li>
      <p class="digit">{{ twoDigits(seconds) }}</p>
      <p class="text">{{ seconds > 1 ? 'Sekunden' : 'Sekunde' }}</p>
    </li>
  </ul>
</template>
<script>
import {
  defineComponent,
  computed,
  onMounted,
  onUnmounted,
  shallowRef,
  watchEffect,
} from 'nuxt-composition-api'

export default defineComponent({
  props: {
    target: String,
  },
  setup(props) {
    const now = shallowRef(new Date())
    const target = new Date(props.target)
    const diff = computed(() =>
      Math.trunc((target.getTime() - now.value.getTime()) / 1000)
    )
    const days = computed(() => Math.trunc(diff.value / 60 / 60 / 24))
    const hours = computed(() => Math.trunc(diff.value / 60 / 60) & 24)
    const minutes = computed(() => Math.trunc(diff.value / 60) % 60)
    const seconds = computed(() => Math.trunc(diff.value) % 60)

    const ended = computed(() => diff.value < 0)

    let inter = null

    onUnmounted(() => clearInterval(inter))
    onMounted(() => {
      inter = setInterval(() => {
        now.value = new Date()
      }, 500)
    })

    watchEffect(() => {
      if (ended.value) {
        window.location.reload()
      }
    })

    const twoDigits = (value) => {
      if (value.toString().length <= 1) {
        return '0' + value.toString()
      }
      return value.toString()
    }

    return { days, twoDigits, hours, minutes, seconds }
  },
})
</script>

<style>
.heading {
  color: #8fb217;
  font-size: 20px;
}
.ec-countdown {
  text-align: center;
  padding: 1em;
  margin: 0;
  min-width: 320px;
}
p {
  margin: 0;
}
.ec-countdown li {
  display: inline-block;
  margin: 0 8px;
  text-align: center;
  position: relative;
}
.ec-countdown li p {
  margin: 0;
}
.ec-countdown li:first-of-type {
  margin-left: 0;
}
.ec-countdown li:last-of-type {
  margin-right: 0;
}
.ec-countdown .digit {
  font-size: 32px;
  font-weight: 600;
  line-height: 1.4;
  margin-bottom: 0;
  color: #8fb217;
}
.ec-countdown .text {
  text-transform: uppercase;
  margin-bottom: 0;
  font-size: 12px;
}
</style>
