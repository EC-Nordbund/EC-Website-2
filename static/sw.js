const __DEV__ = false


if (!__DEV__) {

  /**
   * @type {ServiceWorkerGlobalScope & WindowOrWorkerGlobalScope}
   */
  const _self = self

  const __CONFIG__ = {
    CACHE_NAME: 'CACHE_V1',
    OFFLINE_URL: '/empty',
  }

  _self.addEventListener('install', () => _self.skipWaiting())
  _self.addEventListener('activate', () => { })
  _self.addEventListener('fetch', ev => {
    if (ev.request.isReloadNavigation) {
      ev.respondWith((async () => {
        try {
          return await fetch(ev.request)
        } catch (ex) {
          const cache = await caches.open(__CONFIG__.CACHE_NAME)
          const cacheRes = await cache.match(__CONFIG__.OFFLINE_URL)

          if (!cacheRes) {
            return new Response('Du bist Offline und ein Fehler ist aufgetreten wurde.')
          }

          return cacheRes
        }
      })())

      return
    }


    if (ev.request.url.startsWith('/_nuxt') || ev.request.url.startsWith('_nuxt')) {
      ev.respondWith((async () => {
        const cache = await caches.open(__CONFIG__.CACHE_NAME)
        const cacheRes = await cache.match(ev.request)

        if (cacheRes) {
          return cacheRes
        }

        const network = await fetch(ev.request)
        if (network.status === 200 || network.status === 304) {
          const clonedRes = network.clone()

          ev.waitUntil(cache.put(ev.request, clonedRes))
        }

        return network
      })())
    }
  })
}