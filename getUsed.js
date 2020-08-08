const files = ['./.nuxt/stats/client.json', './.nuxt/stats/modern.json']

const addPackages = ['nuxt-composition-api', '@nuxt/content']

const okPackages = [
  'vuetify',
  'vue-meta',
  'vue2-leaflet',
  'leaflet',
  'vue',
  '@nuxt/components',
  'nuxt-composition-api',
  '@nuxt/content',
  'regenerator-runtime',
  'setimmediate',
  'timers-browserify',
  'process',
  'vue-router',
  'vue-client-only',
  'vue2-leaflet-nuxt',
  '@vue/composition-api',
  'defu',
  'deepmerge',
  'core-js',
  '@babel/runtime',
  'html-webpack-plugin',
  'xtend',
  'webpack',
  // 'prismjs',
  'property-information',
]

files.forEach((f) => {
  const items = require('fs')
    .readFileSync(f, 'utf-8')
    .split(/\\/)
    .filter((v) => v !== '')
    .join('/')
    .split(/\//)
    .filter((v) => v !== '')
    .join('/')
    .split(/node_modules\//)
    .filter((v, i) => i !== 0)
    .sort()
    .map((v) => v.split('\n')[0])
    .map((v) => v.split('/'))
    .map((v) => (v[0][0] === '@' ? v[0] + '/' + v[1] : v[0]))
    .map((v) => v.split('?')[0])

  items.push(...addPackages)

  const filItems = items.filter((v, i, t) => v !== items[i - 1]).sort()

  console.log(
    filItems
      .filter((v) => !v.split('-').some((k) => k === 'loader'))
      .filter((v) => !okPackages.includes(v))
  )

  console.log(
    filItems
      .map((v) => ({
        package: v,
        license: require(`${v}/package.json`).license,
      }))
      .filter((v) => v.license !== 'MIT'),
    filItems.length
  )
})
