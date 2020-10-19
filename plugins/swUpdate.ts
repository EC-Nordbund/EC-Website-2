let once = false

const __IS_DEV__ = false

if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/sw.js')
}

onUpdate((update) => {
  if (
    __IS_DEV__ ||
    window.confirm('Eine neue Version ist verfügbar willst du sie laden?')
  ) {
    update()
  }
})

async function onUpdate(cb: (cb: () => void) => void) {
  if (once) {
    console.warn(
      'You should only call onUpdate once. This is way more efficient.'
    )
  }
  once = true
  if (!navigator.serviceWorker) {
    return
  }

  if (!navigator.serviceWorker.controller) {
    return
  }

  navigator.serviceWorker.addEventListener('controllerchange', (ev) => {
    location.reload()
  })

  const updateFactory = (sw: ServiceWorker) => () =>
    sw.postMessage({ msg: 'update-sw' })

  const registration = (await navigator.serviceWorker.getRegistration())!

  if (registration.waiting) {
    cb(updateFactory(registration.waiting))
    return
  }

  if (registration.installing) {
    cb(updateFactory(registration.installing))
    return
  }

  registration.addEventListener('updatefound', (ev) => {
    const sw = registration.installing

    if (!sw) {
      return
    }

    sw.addEventListener('statechange', (ev) => {
      if (sw.state === 'installed') {
        cb(updateFactory(sw))
      }
    })
  })
}
