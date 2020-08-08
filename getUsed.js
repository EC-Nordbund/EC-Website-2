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
  'vue-router',
  'vue-client-only',
  'vue2-leaflet-nuxt',
  '@vue/composition-api',
  'core-js',
  'property-information',

  'regenerator-runtime',
  'setimmediate',
  'timers-browserify',
  'process',
  'defu',
  'deepmerge',
  '@babel/runtime',
  'html-webpack-plugin',
  'xtend',
  'webpack',
]

const packs = []

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

  packs.push(...filItems)
})

const infos = packs.sort().filter((v, i, t) => v !== t[i - 1]).map(p=>{
  const pp = require(p + '/package.json')

  return {
    name: pp.name,
    version: pp.version,
    repository: pp.repository,
    license: pp.license,
    author: pp.author || pp.contributors
  }
}).map(p=>{
  if(typeof p.author === 'object' && p.author.name) {
    p.author = p.author.name
  } else if(Array.isArray(p.author)) {
    p.author = p.author.map(v=>v.name || v).join(' und ')
  }

  p.repository = p.repository?.url || p.repository

  if(typeof p.repository === 'string') {
    p.repository = p.repository.split('.git').join('').split('git+').join('').split('git@').join('').split('git://').join('').split('github.com:').join('')

    if(!p.repository.startsWith('http')) {
      if(p.repository.startsWith('github.com/')) {
        p.repository = 'https://' + p.repository
      } else {
        p.repository = 'https://github.com/' + p.repository
      }
    }
  }

  return p
})

require('fs').writeFileSync('./content/packages.json', JSON.stringify(infos))