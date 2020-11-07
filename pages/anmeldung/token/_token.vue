<template lang="pug">
v-container.fill-height
  v-row(no-gutters, justify='center')
    v-col(cols='12', sm='6', md='12')
      v-row
        v-col
          h1.text-center.py-4 {{ statusMessage }}
          v-progress-linear.hidden-sm-and-down(
            :value='loading ? 33 : 66',
            height='12',
            striped
          )
      v-row
        v-col(cols='12', md='4')
          v-card(color='success', tile)
            v-responsive(aspect-ratio='1')
              .d-flex.flex-column.justify-space-between.align-center.fill-height
                v-card-title.text-h5.font-weight-black.justify-center.white--text 1. Schritt
                .absolute-flex-centered
                  v-avatar(
                    :max-height='avatarMaxSize',
                    :max-width='avatarMaxSize',
                    size='128',
                    color='rgba(255,255,255,0.16)'
                  )
                    v-icon(color='white', size='92') mdi-check-bold
                v-card-subtitle.text-subtitle-1.font-weight-medium Anmeldedaten abgeschickt

        //- TODO: Warteliste
        v-col(cols='12', md='4')
          v-card(:loading='loading', tile, :color='step2Color')
            v-responsive(aspect-ratio='1')
              template(slot='progress')
                v-progress-linear
              .d-flex.flex-column.justify-space-between.align-center.fill-height
                v-card-title.text-h5.font-weight-black.justify-center(
                  :class='{ "white--text": !loading }'
                ) 2. Schritt
                .absolute-flex-centered
                  v-avatar(
                    v-if='!loading',
                    :max-height='avatarMaxSize',
                    :max-width='avatarMaxSize',
                    size='128',
                    color='rgba(255,255,255,0.16)'
                  )
                    //- TODO: Warteliste
                    v-icon(color='white', size='92') mdi-check-bold
                v-card-subtitle.text-subtitle-1.font-weight-medium {{ step2Text }}

        v-col(cols='12', md='4')
          v-responsive(aspect-ratio='1', style='padding: 0')
            v-row(style='height: calc(50% - 6px);margin:5px;')
              v-card(tile, disabled, style='width: 100%')
                //- v-responsive(aspect-ratio="2")
                v-card-title.text-h5.font-weight-black.justify-center 3. Schritt
                v-card-text
                  p Du erhälst von uns eine schrifliche Anmeldebestätigung per Post.
                //- v-responsive(aspect-ratio="2")
            v-row(style='height: calc(50% - 6px);margin:5px;')
              v-card(tile, disabled, style='width: 100%')
                //- v-responsive(aspect-ratio="2")
                v-card-title.text-h5.font-weight-black.justify-center 4. Schritt
                v-card-text
                  p Du Überweist ggf. die nötige Anzahlung.
                //- v-responsive(aspect-ratio="2")
          //- v-card(tile disabled)
            v-responsive(aspect-ratio="1")
              //- div(class="d-flex flex-column justify-space-between align-center fill-height")
              //-   v-card-title(class="text-h5 font-weight-black justify-center") 3. Schritt
              //-   v-card-subtitle(class="text-subtitle-1 font-weight-medium") Anmeldung erfolgreich!
              //-   v-card-text(class="")
              //-     p Jetzt fehlt nur noch die Anzahlung von ## EUR auf folgenes Konto:
</template>
<script lang="ts">
import {
  defineComponent,
  useContext,
  ref,
  useAsync,
  computed,
} from '@nuxtjs/composition-api'
import { post } from '~/helpers/fetch'
export default defineComponent({
  layout: 'minimal',
  setup(_, ctx) {
    const token = useContext().params.value.token
    const loading = ref(true)
    const anmeldeID = ref(null as null | string)
    const wList = ref(0)

    const statusMessage = computed(() => {
      if (loading.value) {
        return 'Du hast es gleich geschafft!'
      }

      if (wList.value > 0) {
        return 'Du bist auf der Warteliste...'
      }

      return 'Yeaah: Du bist angemeldet!'
    })

    const step2Color = computed(() => {
      if (loading.value) {
        return undefined
      }

      if (wList.value > 0) {
        return 'warning'
      } else if (wList.value === 0) {
        return 'success'
      }

      return 'error'
    })

    const avatarMaxSize = computed(() => {
      return ctx.root.$vuetify.breakpoint.xsOnly
        ? 'calc(100vw * .75)'
        : 'calc(100vw * .2)'
    })

    const step2Text = computed(() =>
      loading.value ? 'Anmeldung wird bestätigt...' : 'Anmeldung bestätigt'
    )

    const status = useAsync(async () => {
      console.log('exec')

      const res = await post<{
        status: 'OK' | 'ERROR'
        context: string
        anmeldeID?: string
        wList?: number
      }>('/api/confirm/' + token, {})

      //  setTimeout(() => {
      loading.value = false

      // TODO: doesn't work
      //  ctx.root.$vuetify.goTo("#2", {
      //    duration: 300,
      //    offset: 0,
      //    easing: 'easeInOutCubic',
      //  })
      //  }, 3000)

      if (res.status === 'OK') {
        //  loading.value = false

        if (res.wList && res.wList < 0) {
          ctx.root.$router.push(
            '/anmeldung/token?error=Fehler beim Senden an API. Bitte kontaktiere uns unter app@ec-nordbund.de.'
          )
          return
        }

        if (res.wList) {
          wList.value = res.wList
        }
        if (res.anmeldeID) {
          anmeldeID.value = res.anmeldeID
        }
      } else {
        //  ctx.root.$router.push('/anmeldung/token?error=' + res.context)
      }
    })

    return {
      token,
      loading,
      avatarMaxSize,
      step2Text,
      step2Color,
      statusMessage,
    }
  },
})
</script>
<style lang="scss" scoped>
.absolute-flex-centered {
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
}

.v-responsive ::v-deep .v-responsive__content {
  padding: 8px;
}
</style>
