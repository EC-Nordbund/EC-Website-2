<template lang="pug">
v-container.fill-height
  v-row(no-gutters, justify='center')
    v-col(cols='12')
      v-row
        v-col
          h1.text-center.py-4 {{ title }}
          v-progress-linear.hidden-sm-and-down(
            :value='loading ? 33 : 66',
            height='12',
            striped
          )
      v-row(class="px-4 px-sm-0")
        //- 1. Schritt
        v-col(cols='12', md='4')
          v-card(id="first-step" color='success' tile flat)
            .collapsable-square.collapsed-sm-and-down
              .collapsable-square__sizer
              .collapsable-square__content
                .d-flex.flex-column.justify-space-between.fill-height
                  div
                    v-card-title.pb-4.pt-2.pt-md-4
                      h5.text-h5.font-weight-black 1. Schritt

                    v-card-subtitle.pt-1.pb-2.pb-md-1 Anmeldedaten abgeschickt

                  .absolute-flex-centered
                    v-avatar(
                      :max-height='avatarMaxSize',
                      :max-width='avatarMaxSize',
                      :size='avatarSize',
                      color='rgba(255,255,255,0.16)'
                    )
                      v-icon(color='white', :size='iconSize') mdi-check

        //- 2. Schritt
        v-col(cols='12', sm="6" md='4')
          v-card(id="second-step" :loading='loading', tile, :color='statusColor' :flat="!loading" :outlined="loading" loader-height="6")
            .collapsable-square(:class="{'collapsed-xs-only': loading}")
              .collapsable-square__sizer
              .collapsable-square__content
                .d-flex.flex-column.justify-space-between.fill-height
                  div
                    v-card-title.py-4
                      h5.text-h5.font-weight-black 2. Schritt

                    v-card-subtitle.py-1
                      | {{ statusText }}

                  .absolute-flex-centered
                    v-avatar(
                      v-if='!loading',
                      :max-height='avatarMaxSize',
                      :max-width='avatarMaxSize',
                      :size='avatarSize',
                      color='rgba(255,255,255,0.16)'
                    )
                      span(v-if="isOnWarteliste") {{wList}}
                      v-icon(v-else color='white', size='96') {{ statusIcon }}

                  v-card-text(v-if="!loading&&(anmeldeID||isOnWarteliste)").text-body-1.font-weight-medium
                    .text-center(v-if="anmeldeID") Deine AnmeldeID:
                      pre {{anmeldeID}}
                    .text-center(v-elseif="isOnWarteliste") Dein Wartelistenplatz

        //- 3. Schritt
        v-col(cols='12', sm="6" md='4')
          v-card(id="third-step" tile, outlined disabled).fill-height
            v-responsive(aspect-ratio='4')
              v-card-title.pb-3.pt-4.justify-center
                h5.text-h5.font-weight-black 3. Schritt

              v-card-subtitle.text-center.pt-1
                | So geht es nun weiter...

            v-responsive(aspect-ratio='2')
              .d-flex.flex-column.justify-space-around.align-center.fill-height
                v-row(no-gutters align="center")
                  v-col(cols="3" align="center")
                    v-avatar(size="42" color="primary")
                      v-icon(size="24" color="white") mdi-email
                  v-col(cols="9").text-body-2 Du erhälst von uns eine schriftliche Teilnahmebestätigung per Post.

                  v-col(cols="3" align="center")
                    v-avatar(size="42" color="primary")
                      v-icon(size="24" color="white") mdi-handshake
                  v-col(cols="9").text-body-2 Du überweist ggf. die nötige Anzahlung
            v-responsive(aspect-ratio='4')
</template>
<script lang="ts">
import { mdiCheckAll } from '@mdi/js'
import {
  defineComponent,
  useContext,
  ref,
  ssrRef,
  useAsync,
  computed,
  onMounted,
  onBeforeMount,
} from '@nuxtjs/composition-api'
import { post } from '~/helpers/fetch'
export default defineComponent({
  layout: 'minimal',
  setup(_, ctx) {
    const token = useContext().params.value.token
    const loaded = ssrRef(true)
    const loading = ref(true)
    const anmeldeID = ssrRef(null as null | string)
    const wList = ssrRef(0)

    const isMobile = computed(() => ctx.root.$vuetify.breakpoint.smAndDown)
    const isSuccessful = computed(() => wList.value === 0)
    const isOnWarteliste = computed(() => wList.value > 0)

    const title = computed(() => {
      if (loading.value) {
        return 'Du hast es gleich geschafft!'
      }

      if (isOnWarteliste.value) {
        return 'Du bist auf der Warteliste...'
      }

      return 'Du bist angemeldet!'
    })

    const statusText = computed(() =>
      loading.value ? 'Anmeldung wird bestätigt...' : 'Anmeldung bestätigt'
    )

    const statusColor = computed(() => {
      if (loading.value) {
        return undefined
      }

      if (isOnWarteliste.value) {
        return 'warning'
      }

      if (isSuccessful.value) {
        return 'success'
      }

      return 'error'
    })

    const statusIcon = computed(() =>
      isOnWarteliste.value ? 'mdi-clipboard-list' : mdiCheckAll
    )

    const avatarSize = computed(() => (isMobile.value ? 160 : 128))

    const avatarMaxSize = computed(() =>
      ctx.root.$vuetify.breakpoint.xsOnly
        ? 'calc(100vw * .75)'
        : 'calc(100vw * .2)'
    )

    const iconSize = computed(() => (isMobile.value ? 48 : 96))

    onMounted(() =>
      ctx.root.$nextTick(() => {
        setTimeout(() => {
          loading.value = false
        }, 3000)
      })
    )

    const status = useAsync(async () => {
      const res = await post<{
        status: 'OK' | 'ERROR'
        context: string
        anmeldeID?: string
        wList?: number
      }>('/api/confirm/' + token, {})

      if (res.status === 'OK') {
        loaded.value = false;

        if (res.wList && res.wList < 0) {
          ctx.root.$router.push(
            '/anmeldung/token?error=Fehler beim Senden an API. Bitte kontaktiere uns unter app@ec-nordbund.de.'
          )
          return
        }

        if (res.wList) {
          wList.value =  res.wList
        }
        if (res.anmeldeID) {
          anmeldeID.value = res.anmeldeID
        }
      } else {
        // ctx.root.$router.push('/anmeldung/token?error=' + res.context)
      }
    })

    console.log(`isOnWarteliste ${isOnWarteliste}`)

    return {
      token,
      loading,
      title,
      avatarSize,
      avatarMaxSize,
      iconSize,
      statusText,
      statusColor,
      statusIcon,
      mdiCheckAll,
      isOnWarteliste,
      anmeldeID,
      wList
    }
  },
})
</script>
<style lang="scss" scoped>
@import '~vuetify/src/styles/settings/_variables';

.collapsable-square {
  display: flex;
  position: relative;
  overflow: hidden;
  max-width: 100%;

  & > .collapsable-square__sizer {
    flex: 1 0 0px;
    transition: padding-bottom 0.2s cubic-bezier(0.25, 0.8, 0.5, 1);
    padding-bottom: 100%;

    ~ .collapsable-square__content {
      flex: 1 0 0px;
      max-width: 100%;
      margin-left: -100%;
    }
  }

  & > .collapsable-square__content {
    .v-card__title {
      justify-content: center;
    }

    .absolute-flex-centered {
      display: flex;
      justify-content: center;
      align-items: center;
      position: absolute;
      top: 48px;
      bottom: 0;
      left: 0;
      right: 0;
    }

    .v-card__subtitle {
      text-align: center;
    }
  }

  &.collapsed-xs-only,
  &.collapsed-sm-and-down,
  &.collapsed {
    > .collapsable-square__sizer {
      padding-bottom: 0;
    }

    & > .collapsable-square__content {
      .v-card__title {
        justify-content: start;
      }

      .absolute-flex-centered {
        justify-content: end;
        top: 0;
        right: -72px;

        .v-avatar {
          justify-content: start;

          .v-icon {
            margin-left: 24px;
          }
        }
      }

      .v-card__subtitle {
        text-align: left;
      }
    }
  }

  &.collapsed-xs-only {
    @media #{map-get($display-breakpoints, 'sm-and-up')} {
      > .collapsable-square__sizer {
        padding-bottom: 100%;
      }

      > .collapsable-square__content {
        .v-card__title {
          justify-content: center;
        }

        .absolute-flex-centered {
          justify-content: center;
          right: 0;

          .v-avatar {
            justify-content: center;

            .v-icon {
              margin-left: 0;
            }
          }
        }

        .v-card__subtitle {
          text-align: center;
        }
      }
    }
  }

  &.collapsed-sm-and-down {
    @media #{map-get($display-breakpoints, 'md-and-up')} {
      > .collapsable-square__sizer {
        padding-bottom: 100%;
      }

      > .collapsable-square__content {
        .v-card__title {
          justify-content: center;
        }

        .absolute-flex-centered {
          justify-content: center;
          right: 0;

          .v-avatar {
            justify-content: center;

            .v-icon {
              margin-left: 0;
            }
          }
        }

        .v-card__subtitle {
          text-align: center;
        }
      }
    }
  }
}
</style>
