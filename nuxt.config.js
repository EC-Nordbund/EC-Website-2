import de from 'vuetify/es5/locale/de'
import icons from 'vuetify/es5/services/icons/presets/mdi-svg'
import { getIconInjector } from 'vuetify-icon-injector'

const URL =
  process.env.NODE_ENV === 'development'
    ? 'http://localhost:3000/'
    : 'https://www.ec-nordbund.de/'

const vuetifyTheme = {
  primary: '#8dc44f',
  grey: '#58676f',
  'gradient-left': '#a3cf4b',
  'gradient-right': '#5da635',
  up: '#32b3ca',
  out: '#f39200',
  with: '#95609f',
  in: '#afcb37',
  blue: '#5286c2',
  red: '#f06643',
  purple: '#9b84ba',
  brown: '#b9965a',
  // Fix colors
  accent: '#5286c2',
  secondary: '#58676f',
  info: '#9b84ba',
  warning: '#b9965a',
  error: '#f06643',
  success: '#b9965a',
}

export default {
  /*
   ** Nuxt rendering mode
   ** See https://nuxtjs.org/api/configuration-mode
   */
  mode: 'universal',
  /*
   ** Nuxt target
   ** See https://nuxtjs.org/api/configuration-target
   */
  target: 'server',
  modern: true,
  /*
   ** Headers of the page
   ** See https://nuxtjs.org/api/configuration-head
   */
  head: {
    titleTemplate: (chunk) => {
      if (chunk) {
        return `${chunk} | EC-Nordbund`
      }

      return 'EC-Nordbund'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      // Open Graph
      { hid: 'og:site_name', property: 'og:site_name', content: 'EC-Nordbund' },
      { hid: 'og:type', property: 'og:type', content: 'website' },
      {
        hid: 'og:url',
        property: 'og:url',
        content: URL,
      },
      {
        hid: 'og:image',
        property: 'og:image',
        content: `${URL}card.png`,
      },
      // Twitter Card
      {
        hid: 'twitter:card',
        name: 'twitter:card',
        content: 'summary_large_image',
      },
      {
        hid: 'twitter:site',
        name: 'twitter:url',
        content: URL,
      },
      { hid: 'twitter:title', name: 'twitter:title', content: 'EC-Nordbund' },
      {
        hid: 'twitter:image',
        name: 'twitter:image',
        content: `${URL}card.png`,
      },
      {
        hid: 'twitter:image:alt',
        name: 'twitter:image:alt',
        content: 'Seite des EC-Nordbundes',
      },
    ],
    link: [{ rel: 'icon', href: '/favicon_512.png', hid: 'favicon' }],
  },
  /*
   ** Global CSS
   */
  css: ['~/assets/styles/global.scss'],
  /*
   ** Plugins to load before mounting the App
   ** https://nuxtjs.org/guide/plugins
   */
  plugins: [],
  /*
   ** Auto import components
   ** See https://nuxtjs.org/api/configuration-components
   */
  components: true,
  /*
   ** Nuxt.js dev-modules
   */
  buildModules: [
    'nuxt-composition-api',
    '@nuxt/typescript-build',
    // Doc: https://github.com/nuxt-community/stylelint-module
    '@nuxtjs/stylelint-module',
    '@nuxtjs/vuetify',
  ],
  /*
   ** Nuxt.js modules
   */
  modules: [
    '@nuxtjs/pwa',
    // Doc: https://github.com/nuxt/content
    '@nuxt/content',
    'leaflet-nuxt-async/nuxt',
  ],
  /*
   ** Content module configuration
   ** See https://content.nuxtjs.org/configuration
   */
  content: {},
  /*
   ** vuetify module configuration
   ** https://github.com/nuxt-community/vuetify-module
   */
  vuetify: {
    customVariables: ['~/assets/styles/variables-vuetify.scss'],
    theme: {
      disable: false,
      options: {
        customProperties: true,
        minifyTheme: (css) =>
          process.env.NODE_ENV === 'production'
            ? css.replace(/[\r\n|\r|\n]/g, '')
            : css,
        variations: false,
      },
      default: false,
      dark: false,
      themes: {
        dark: vuetifyTheme,
        light: vuetifyTheme,
      },
    },
    icons: {
      values: icons,
      iconfont: 'mdiSvg',
    },
    lang: {
      current: 'de',
      locales: { de },
    },
    preset: undefined,
    defaultAssets: false,
  },
  /*
   ** Customize the progress-bar color
   */
  loading: { color: '#95C11F' },
  /*
   ** Build configuration
   ** See https://nuxtjs.org/api/configuration-build/
   */
  build: {
    transpile: ['leaflet'],
    loaders: {
      vue: {
        compilerOptions: {
          modules: [
            getIconInjector({
              'ec-logo':
                'M 15.851562 8.382812 C 15.851562 8.382812 16.917969 8.382812 16.917969 7.320312 L 16.917969 7.171875 C 16.917969 7.171875 16.917969 6.105469 15.851562 6.105469 L 7.742188 6.105469 C 7.742188 6.105469 6.675781 6.105469 6.675781 7.171875 L 6.675781 9.9375 C 6.675781 9.9375 6.675781 11.003906 6 11.003906 C 6 11.003906 5.324219 11.003906 5.324219 12.070312 L 5.324219 12.085938 C 5.324219 12.085938 5.324219 13.152344 6 13.152344 C 6 13.152344 6.675781 13.152344 6.675781 14.21875 L 6.675781 16.8125 C 6.675781 16.8125 6.675781 17.878906 7.742188 17.878906 L 15.851562 17.878906 C 15.851562 17.878906 16.917969 17.878906 16.917969 16.8125 L 16.917969 16.777344 C 16.917969 16.777344 16.917969 15.714844 15.851562 15.714844 L 10.101562 15.714844 C 10.101562 15.714844 9.035156 15.714844 9.035156 14.648438 L 9.035156 14.21875 C 9.035156 14.21875 9.035156 13.152344 10.101562 13.152344 L 13.511719 13.152344 C 13.511719 13.152344 14.574219 13.152344 14.574219 12.085938 L 14.574219 12.070312 C 14.574219 12.070312 14.574219 11.003906 13.511719 11.003906 L 10.101562 11.003906 C 10.101562 11.003906 9.035156 11.003906 9.035156 9.9375 L 9.035156 9.449219 C 9.035156 9.449219 9.035156 8.382812 10.101562 8.382812 Z M 15.851562 8.382812 M 21.578125 5.101562 C 19.367188 1.90625 15.726562 0 11.839844 0 C 8.679688 0 5.703125 1.230469 3.46875 3.46875 C 1.230469 5.703125 0 8.679688 0 11.839844 C 0 18.371094 5.3125 23.683594 11.839844 23.683594 C 15.609375 23.683594 19.1875 21.863281 21.414062 18.8125 C 21.832031 18.238281 21.707031 17.433594 21.132812 17.015625 C 20.558594 16.597656 19.753906 16.722656 19.335938 17.296875 C 17.59375 19.683594 14.792969 21.109375 11.839844 21.109375 C 6.730469 21.109375 2.570312 16.953125 2.570312 11.839844 C 2.570312 6.730469 6.730469 2.570312 11.839844 2.570312 C 14.882812 2.570312 17.730469 4.066406 19.464844 6.566406 C 19.871094 7.152344 20.671875 7.296875 21.253906 6.890625 C 21.839844 6.488281 21.984375 5.6875 21.578125 5.101562 Z M 21.578125 5.101562',
            }),
          ],
        },
      },
    },
    extend(config, ctx) {
      if (ctx.isDev) {
        config.devtool = ctx.isClient ? 'source-map' : 'inline-source-map'
      }

      if (ctx.isClient) {
        // Optimierungen auf Chunk level
        config.optimization = {
          splitChunks: {
            // Minimize init load.
            maxAsyncRequests: 30,
            maxInitialRequests: 30,

            cacheGroups: {
              // Handle aller anderen Module.
              default: {
                minChunks: 2,
                priority: -20,
                reuseExistingChunk: true,
              },
              // Chunk der alle Notwendigen Module und Polyfiles enthält
              main: {
                test: /([\\/]node_modules[\\/](vue-style-loader|webpack|process|copy-to-clipboard|deepmerge|defu|setimmediate|timers-browserify|toggle-selection|extract-css-chunks-webpack-plugin|html-webpack-plugin|vuetify-loader|vue-loader|file-loader|css-loader|ts-loader|url-loader|sass-loader|raw-loader|postcss-loader|pug-plain-loader|babel-loader|core-js|@babel|unfetch|regenerator-runtime|@nuxtjs|vuex|vue-router|vue-meta|vue|axios|@vue[\\/]composition-api|vuetify[\\/]lib[\\/](services|util|locale|presets|mixins|directives){1}){1}[\\/]|[\\/].nuxt[\\/]|[\\/]node_modules[\\/]vuetify[\\/]lib[\\/](install.js|framework.js){1}|[\\/](layouts|plugins){1}[\\/]|[\\/]package.json){1}/,
                minChunks: 1,
                chunks: 'all',
                priority: 200,
                minSize: 0,
                maxSize: 999999999,
                reuseExistingChunk: true,
                name: true,
              },
            },
          },
          concatenateModules: false,
        }

        config.stats = 'verbose'
      }
    },
    // Es sollte getestet werden ob true oder false hier besser ist. (default: false)
    extractCSS: true,
  },
  serverMiddleware: {
    '/api': '~/api'
  }
}
