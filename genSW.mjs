import { readdirSync, readFileSync, statSync, writeFileSync, existsSync } from 'fs'
import { createHash } from 'crypto'
import { join } from 'path'

const __ROOT__ = '.nuxt/dist/client/'

const ASSETS = []

function readDir(dir) {
  readdirSync(dir).forEach((f) => {
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

if (existsSync(__ROOT__)) {
  readDir(__ROOT__)
  const sha = createHash('md5')
  const baseSW = readFileSync('./swBase.js', 'utf-8')

  sha.update(JSON.stringify(ASSETS) + baseSW)

  const SW_DATA = {
    VERSION: sha.digest('base64'),
    ASSETS: ASSETS.map(
      (v) => '_nuxt/' + v.split(/\\|\//).join('/').slice(__ROOT__.length)
    ),
    PAGES: ['empty'],
  }

  const SW = `
const SW_DATA = ${JSON.stringify(SW_DATA)}
${baseSW}
`

  writeFileSync('./static/sw.js', SW)
} else {
  writeFileSync('./static/sw.js', '// NO-OP Dev SW')
}
