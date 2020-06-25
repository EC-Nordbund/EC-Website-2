<template lang="pug">
  v-dialog(v-model="menu" :close-on-content-click="false" max-width="290" open-on-focus)
    template(v-slot:activator="{ on }")
      v-text-field(
        :value="germanDate"
        readonly
        v-bind="$attrs"
        v-on="on"
      )
    v-date-picker(
      ref="picker"
      :value="value"
      v-bind="$attrs"
      @change="changeDate"
    )
</template>
<script lang="ts">
import {
  defineComponent,
  ref,
  computed,
  watch,
  toRefs,
  Ref
} from 'nuxt-composition-api'

function handleGebDat(gebDat: Ref<boolean>, menu: Ref<boolean>) {
  let firstTime = true
  let watcher: (() => void) | null
  const picker = ref<any>()

  function watchHandler() {
    if (watcher) {
      watcher()
      watcher = null
    }

    if (gebDat.value) {
      watcher = watch(menu, () => {
        if (menu.value && firstTime) {
          setTimeout(() => {
            picker.value.activePicker = 'YEAR'
          })
          firstTime = false
        }
      })
    }
  }

  watch(gebDat, watchHandler)
  watchHandler()

  return { picker }
}

export default defineComponent({
  props: {
    value: {
      type: String,
      required: true
    },
    gebDat: {
      type: Boolean,
      default: false
    }
  },
  setup(props, { emit }) {
    const menu = ref(false)

    const picker = handleGebDat(toRefs(props).gebDat, menu)

    const changeDate = (date: string) => {
      emit('input', date)
    }

    const germanDate = computed(() => {
      return props.value
        .split('-')
        .reverse()
        .join('.')
    })

    return {
      menu,
      germanDate,
      changeDate,
      picker
    }
  }
})
</script>