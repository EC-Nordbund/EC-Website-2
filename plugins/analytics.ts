// @ts-ignore
import { create } from 'ackee-tracker/src/scripts/main'
import { Plugin } from '@nuxt/types'

const plugin: Plugin = (context) => {
  const doNotTracking = (navigator.doNotTrack == "1")

  if(!doNotTracking) {
    const ackee = create(
      {
        server: 'next.analytics.ec-nordbund.de',
        domainId: '',
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
