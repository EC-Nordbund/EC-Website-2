import { readdirSync, statSync } from 'fs'
import { join } from 'path'

const __ROOT__ = '.nuxt/dist/client/'

const ASSETS = ['.nuxt/dist/client/empty']

function readDir(dir) {
  readdirSync(dir).forEach(f => {
    const ff = join(dir, f)

    if (statSync(ff).isFile()) {
      if (ff.endsWith('.js') && !ff.endsWith('.modern.js')) {
        return
      }

      ASSETS.push(ff)
    } else {
      readDir(ff)
    }
  })
}

readDir(__ROOT__)

console.log(JSON.stringify(ASSETS.map(v => '_nuxt/' + v.split(/\\|\//).join('/').slice(__ROOT__.length))))