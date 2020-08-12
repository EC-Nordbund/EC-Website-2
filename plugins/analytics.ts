// @ts-ignore
import { create } from 'ackee-tracker/src/scripts/main'
import { Plugin } from '@nuxt/types'

const plugin: Plugin = (context) => {
  const doNotTracking = (navigator.doNotTrack == "1")

  if(!doNotTracking) {
    const ackee = create(
      {
        server: 'next.analytics.ec-nordbund.de',
        domainId: '12ac1013-cf6c-4515-89b4-64ea9514b3e0',
      },
      {
        ignoreLocalhost: false,
        detailed: true,
      }
    )
    
    // @ts-ignore
    context.app.router.afterEach(() => ackee.record())
  }
}

export default plugin
