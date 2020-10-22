// @ts-ignore
import { create } from 'ackee-tracker/src/scripts/main'
import { defineNuxtPlugin } from '@nuxtjs/composition-api'

export default defineNuxtPlugin((context) => {
  if (navigator.doNotTrack != '1') {
    const ackee = create(
      {
        server: 'https://next.analytics.ec-nordbund.de',
        domainId: '12ac1013-cf6c-4515-89b4-64ea9514b3e0',
      },
      {
        ignoreLocalhost: false,
        detailed: true,
      }
    )

    // @ts-expect-error
    context.app.router.afterEach(() => ackee.record())
  }
})
