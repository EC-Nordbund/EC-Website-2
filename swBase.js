/**
 * @type { ServiceWorkerGlobalScope & WindowOrWorkerGlobalScope }
 */
const _self = self;

const staticCache = `static-${SW_DATA.VERSION}`;

function timeOut(time) {
  return new Promise((res, rej) => {
    setTimeout(res, time);
  })
}

_self.addEventListener("message", (ev) => {
  if (ev.data && ev.data.msg === "update-sw") {
    _self.skipWaiting();
  }
});

_self.addEventListener("install", (ev) => {
  ev.waitUntil(
    (async () => {
      const cache = await _self.caches.open(staticCache);
      await cache.addAll(SW_DATA.ASSETS);
      await cache.addAll(SW_DATA.PAGES)
    })()
  );
});

_self.addEventListener("activate", (ev) => {
  ev.waitUntil(
    (async () => {
      const keys = await caches.keys();

      await Promise.all(
        keys.map(async (key) => {
          if (key === staticCache) {
            return 0;
          }
          return caches.delete(key);
        })
      );
    })()
  );
});

_self.addEventListener("fetch", (ev) => {
  if (ev.request.url.includes('_content')) {
    console.log('CONTENT', ev.request.url)
    ev.respondWith(new Promise(async (res, rej) => {
      const network = fetch(ev.request)

      const cache = await _self.caches.open(staticCache);
      const cacheResponse = await cache.match(ev.request);

      if (cacheResponse) {
        res(cacheResponse)
        const net = await network
        await cache.put(ev.request, net)
      } else {
        res(network)
      }
    }))

    return
  }


  if (ev.request.mode === 'navigate') {
    ev.respondWith(new Promise((res, rej) => {
      // For Lie-Fi
      timeOut(2000).then(async () => {
        const cache = await _self.caches.open(staticCache);
        const response = await cache.match('empty');
        res(response)
      })

      fetch(ev.request).then(r => res(r)).catch(async () => {
        const cache = await _self.caches.open(staticCache);
        const response = await cache.match('empty');
        res(response)
      })
    }))

    return
  }



  if (ev.request.mode === 'cors') {
    console.log(ev.request.url, 'CORS')
    ev.respondWith(fetch(ev.request))
    return
  }

  if (ev.request.mode === 'no-cors') {
    console.log(ev.request.url, 'NO-CORS')
    ev.respondWith(fetch(ev.request))
    return
  }

  ev.respondWith(
    (async () => {
      const cache = await _self.caches.open(staticCache);
      const res = await cache.match(ev.request);
      return res;
    })()
  );
});
