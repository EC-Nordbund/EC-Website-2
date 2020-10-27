// @ts-ignore
import { create } from 'ackee-tracker/src/scripts/main'
import { defineNuxtPlugin } from '@nuxtjs/composition-api'

export default defineNuxtPlugin((context) => {
  if (navigator.doNotTrack != '1') {
    const ackee = create(
      {
        server: 'https://analytics.ec-nordbund.de',
        domainId: 'bab181a1-5923-45dd-a03f-4b21338a9d23',
      },
      {
        ignoreLocalhost: true,
        detailed: true,
      }
    )

    // @ts-expect-error
    context.app.router.afterEach(() => ackee.record())
  }
})
