const __DEV__ = false


if (!__DEV__) {

  /**
   * @type {ServiceWorkerGlobalScope & WindowOrWorkerGlobalScope}
   */
  const _self = self

  const __CONFIG__ = {
    CACHE_NAME: 'CACHE_V2',
    OFFLINE_URL: '/empty.html',
  }

  _self.addEventListener('install', ev => {
    ev.waitUntil((async () => {
      const cache = await caches.open(__CONFIG__.CACHE_NAME)
      await cache.add(__CONFIG__.OFFLINE_URL)
    })())
  })
  _self.addEventListener('activate', ev => {
    ev.waitUntil(
      (async () => {
        const keys = await caches.keys();

        await Promise.all(
          keys.map(async (key) => {
            if (key === __CONFIG__.CACHE_NAME) {
              return true;
            }
            return caches.delete(key);
          })
        );
      })()
    );
  })
  _self.addEventListener('fetch', ev => {
    if (!ev.request.url.includes('.')) {
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


    if (ev.request.url.includes('_nuxt')) {
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

      return
    }
  })
  _self.addEventListener("message", (ev) => {
    if (ev.data && ev.data.msg === "update-sw") {
      _self.skipWaiting();
    }
  });
} else {
  throw 'SERVICE WORKER DARF IN PRODUCTION NICHT AUF DEV SEIN!'
}
