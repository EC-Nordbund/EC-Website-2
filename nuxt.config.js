import de from 'vuetify/es5/locale/de'
import icons from 'vuetify/es5/services/icons/presets/mdi-svg'
import { getIconInjector } from 'vuetify-icon-injector'

const URL =
  process.env.NODE_ENV === 'development'
    ? 'http://localhost:3000/'
    : 'https://www.ec-nordbund.de/'

const vuetifyTheme = {
  primary: '#92c355',
  dunkelGrau: '#282925',
  neonOrange: '#fac189',
  offWihte: '#f8f5f4',
  lila: '#583a70',
  'born-verlag': '#903557',
  seelsorge: '#1f5533',
  pfadfinder: '#bc946d',
  koralle: '#ea4c60',
  sport: '#70b6d4',
  studiEC: '#5d5d5c',
  ebz: '#445d9d',
  musik: '#ffd633',
  freiwilligendienste: '#9184be',
  'Sozial-Missionarische-Arbeit': '#ffd633',

  up: '#4eb3d8',
  out: '#fac189',
  with: '#9c8aa8',
  in: '#92c355',

  // Standard colors TODO: set this colors
  accent: '#fac189',
  secondary: '#282925',
  info: '#583a70',
  warning: '#fac189',
  error: '#fac189',
  success: '#92c355',
}

export default {
  mode: 'universal',
  target: 'server',
  modern: true,
  
  components: true,

  loading: { color: '#8dc44f' },

  features: {
    deprecations: false,
    fetch: false,
    store: false,
    middleware: false,
    validate: false
  },
  fetch: {
    client: false,
    server: false
  },

  content: {
    markdown: {
      prism: {
        theme: false
      }
    }
  },

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
  
  css: ['~/assets/styles/global.scss'],
  /*
   ** Plugins to load before mounting the App
   ** https://nuxtjs.org/guide/plugins
   */
  plugins: [
    { src: '~/plugins/analytics.ts', mode: 'client' }, 
  ],
  /*
   ** Auto import components
   ** See https://nuxtjs.org/api/configuration-components
   */
  components: true,
  /*
   ** Nuxt.js dev-modules
   */
  buildModules: [
    '@nuxtjs/composition-api',
    '@nuxt/typescript-build',
    '@nuxtjs/stylelint-module',
    '@nuxtjs/vuetify',
  ],
  
  modules: [
    '@nuxtjs/pwa',
    '@nuxt/content',
    'vue2-leaflet-nuxt'
  ],
  
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
  
  build: {
    transpile: ['leaflet', 'Vue2Leaflet'],
    loaders: {
      vue: {
        compilerOptions: {
          modules: [
            getIconInjector({
              'ec-logo':
                'M 15.851562 8.382812 C 15.851562 8.382812 16.917969 8.382812 16.917969 7.320312 L 16.917969 7.171875 C 16.917969 7.171875 16.917969 6.105469 15.851562 6.105469 L 7.742188 6.105469 C 7.742188 6.105469 6.675781 6.105469 6.675781 7.171875 L 6.675781 9.9375 C 6.675781 9.9375 6.675781 11.003906 6 11.003906 C 6 11.003906 5.324219 11.003906 5.324219 12.070312 L 5.324219 12.085938 C 5.324219 12.085938 5.324219 13.152344 6 13.152344 C 6 13.152344 6.675781 13.152344 6.675781 14.21875 L 6.675781 16.8125 C 6.675781 16.8125 6.675781 17.878906 7.742188 17.878906 L 15.851562 17.878906 C 15.851562 17.878906 16.917969 17.878906 16.917969 16.8125 L 16.917969 16.777344 C 16.917969 16.777344 16.917969 15.714844 15.851562 15.714844 L 10.101562 15.714844 C 10.101562 15.714844 9.035156 15.714844 9.035156 14.648438 L 9.035156 14.21875 C 9.035156 14.21875 9.035156 13.152344 10.101562 13.152344 L 13.511719 13.152344 C 13.511719 13.152344 14.574219 13.152344 14.574219 12.085938 L 14.574219 12.070312 C 14.574219 12.070312 14.574219 11.003906 13.511719 11.003906 L 10.101562 11.003906 C 10.101562 11.003906 9.035156 11.003906 9.035156 9.9375 L 9.035156 9.449219 C 9.035156 9.449219 9.035156 8.382812 10.101562 8.382812 Z M 15.851562 8.382812 M 21.578125 5.101562 C 19.367188 1.90625 15.726562 0 11.839844 0 C 8.679688 0 5.703125 1.230469 3.46875 3.46875 C 1.230469 5.703125 0 8.679688 0 11.839844 C 0 18.371094 5.3125 23.683594 11.839844 23.683594 C 15.609375 23.683594 19.1875 21.863281 21.414062 18.8125 C 21.832031 18.238281 21.707031 17.433594 21.132812 17.015625 C 20.558594 16.597656 19.753906 16.722656 19.335938 17.296875 C 17.59375 19.683594 14.792969 21.109375 11.839844 21.109375 C 6.730469 21.109375 2.570312 16.953125 2.570312 11.839844 C 2.570312 6.730469 6.730469 2.570312 11.839844 2.570312 C 14.882812 2.570312 17.730469 4.066406 19.464844 6.566406 C 19.871094 7.152344 20.671875 7.296875 21.253906 6.890625 C 21.839844 6.488281 21.984375 5.6875 21.578125 5.101562 Z M 21.578125 5.101562',
              // 'ec-in':
              //   'M1623.8 5.97266l-421.355 563.802v-563.802h-80.2568v702.248h83.2676l421.354 -564.813v564.813h79.252v-702.248h-82.2607zM829.238 5.97266v702.248h80.2578v-702.248h-80.2578zM324.421 99.1631l-49.2051 56.4941l47.3027 41.2119 c-182.652 32.0566 -325.154 197.064 -325.154 385.235c0 6.9375 0.360352 18.1875 0.806641 25.1113l0.367188 3.94336l36.4854 -5.04102h38.0938l-0.101562 -2.7373c-0.399414 -5.89453 -0.724609 -15.4727 -0.724609 -21.3809 c0 -152.951 116.511 -286.953 265.358 -311.725l-50.5342 58.0293l56.4951 49.2051l129.578 -148.768z',
              // 'ec-up':
              //   'M 9.355469 5.023438 L 11.101562 5.023438 C 12.324219 5.023438 13.035156 4.460938 13.035156 3.363281 C 13.035156 2.296875 12.324219 1.75 11.101562 1.75 L 9.355469 1.75 Z M 11.132812 0.976562 C 12.8125 0.976562 13.78125 1.84375 13.78125 3.34375 C 13.78125 4.902344 12.8125 5.796875 11.132812 5.796875 L 9.355469 5.796875 L 9.355469 8.023438 L 8.578125 8.023438 L 8.578125 0.976562 Z M 6.675781 5.125 C 6.675781 6.957031 5.605469 8.0625 3.828125 8.0625 C 2.042969 8.0625 0.964844 6.957031 0.964844 5.125 L 0.964844 0.976562 L 1.742188 0.976562 L 1.742188 5.125 C 1.742188 6.492188 2.539062 7.289062 3.828125 7.289062 C 5.121094 7.289062 5.898438 6.492188 5.898438 5.125 L 5.898438 0.976562 L 6.675781 0.976562 Z M 16.558594 5.882812 C 16.429688 5.882812 16.21875 5.871094 16.089844 5.851562 L 16.058594 5.847656 L 16.128906 5.507812 L 16.1875 5.136719 L 16.191406 5.136719 C 16.292969 5.148438 16.457031 5.160156 16.5625 5.160156 C 17.941406 5.160156 19.101562 4.167969 19.414062 2.832031 L 18.921875 3.339844 L 18.429688 2.828125 L 19.730469 1.484375 L 21.027344 2.828125 L 20.535156 3.339844 L 20.113281 2.90625 C 19.761719 4.605469 18.300781 5.882812 16.5625 5.882812 Z M 16.558594 5.882812',
              // 'ec-with':
              //   'M 14.636719 4.796875 L 14.636719 2.949219 L 12.148438 2.949219 L 12.148438 4.796875 L 11.679688 4.796875 L 11.679688 0.597656 L 12.148438 0.597656 L 12.148438 2.496094 L 14.636719 2.496094 L 14.636719 0.597656 L 15.105469 0.597656 L 15.105469 4.796875 Z M 9.648438 1.0625 L 9.648438 4.796875 L 9.175781 4.796875 L 9.175781 1.0625 L 7.832031 1.0625 L 7.832031 0.597656 L 10.996094 0.597656 L 10.996094 1.0625 Z M 6.671875 4.796875 L 6.671875 0.597656 L 7.144531 0.597656 L 7.144531 4.796875 Z M 4.195312 4.796875 L 3.082031 1.257812 L 1.957031 4.796875 L 1.472656 4.796875 L 0.09375 0.597656 L 0.601562 0.597656 L 1.730469 4.238281 L 2.851562 0.605469 L 3.320312 0.597656 L 4.453125 4.238281 L 5.570312 0.597656 L 6.0625 0.597656 L 4.675781 4.796875 Z M 19.164062 4.945312 C 19.164062 4.945312 19.160156 4.945312 19.160156 4.945312 C 18.679688 4.945312 18.007812 4.671875 17.65625 4.335938 C 17.316406 4.007812 17.03125 3.390625 16.972656 2.882812 L 16.683594 3.175781 L 16.386719 2.871094 L 17.171875 2.066406 L 17.960938 2.871094 L 17.664062 3.175781 L 17.398438 2.90625 C 17.496094 3.808594 18.253906 4.515625 19.167969 4.515625 C 20.152344 4.515625 20.949219 3.699219 20.949219 2.699219 C 20.949219 2.300781 20.734375 1.746094 20.46875 1.457031 C 20.179688 1.140625 19.597656 0.882812 19.175781 0.882812 C 19.171875 0.882812 19.167969 0.882812 19.167969 0.882812 L 19.167969 0.453125 C 19.695312 0.453125 20.414062 0.769531 20.777344 1.160156 C 21.105469 1.519531 21.375 2.207031 21.375 2.699219 C 21.375 3.863281 20.449219 4.867188 19.308594 4.941406 C 19.261719 4.945312 19.214844 4.945312 19.164062 4.945312 Z M 17.152344 2.699219 L 17.191406 2.699219 L 17.171875 2.679688 Z M 17.152344 2.699219 ',
              // 'ec-out':
              //   'M 15 1.414062 L 15 6.375 L 14.371094 6.375 L 14.371094 1.414062 L 12.582031 1.414062 L 12.582031 0.800781 L 16.792969 0.800781 L 16.792969 1.414062 Z M 11.789062 4.082031 C 11.789062 5.53125 10.925781 6.410156 9.492188 6.410156 C 8.050781 6.410156 7.179688 5.53125 7.179688 4.082031 L 7.179688 0.800781 L 7.804688 0.800781 L 7.804688 4.082031 C 7.804688 5.164062 8.449219 5.796875 9.492188 5.796875 C 10.535156 5.796875 11.164062 5.164062 11.164062 4.082031 L 11.164062 0.800781 L 11.789062 0.800781 Z M 1.046875 3.589844 C 1.066406 4.804688 2.058594 5.796875 3.257812 5.796875 C 3.265625 5.796875 3.28125 5.796875 3.289062 5.796875 C 3.296875 5.796875 3.308594 5.796875 3.316406 5.796875 C 4.515625 5.796875 5.5 4.804688 5.515625 3.589844 C 5.5 2.375 4.519531 1.390625 3.324219 1.390625 C 3.3125 1.390625 3.296875 1.390625 3.289062 1.390625 C 2.066406 1.390625 1.046875 2.363281 1.046875 3.589844 Z M 6.160156 3.589844 C 6.160156 5.15625 4.886719 6.410156 3.289062 6.410156 C 1.679688 6.410156 0.410156 5.078125 0.410156 3.507812 C 0.410156 1.929688 1.679688 0.785156 3.289062 0.785156 C 4.886719 0.785156 6.160156 2.019531 6.160156 3.589844 Z M 21.195312 3.75 L 20.78125 3.328125 L 21.207031 2.894531 C 19.949219 3.007812 18.960938 4.082031 18.960938 5.386719 L 18.960938 5.390625 L 18.375 5.394531 C 18.378906 3.785156 19.585938 2.464844 21.125 2.308594 L 20.78125 1.957031 L 21.195312 1.535156 L 22.285156 2.644531 Z M 21.195312 3.75',
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
              // main: {
              //   test: /([\\/]node_modules[\\/](vue-style-loader|webpack|process|copy-to-clipboard|deepmerge|defu|setimmediate|timers-browserify|toggle-selection|extract-css-chunks-webpack-plugin|html-webpack-plugin|vuetify-loader|vue-loader|file-loader|css-loader|ts-loader|url-loader|sass-loader|raw-loader|postcss-loader|pug-plain-loader|babel-loader|core-js|@babel|unfetch|regenerator-runtime|@nuxtjs|vuex|vue-router|vue-meta|vue|axios|@vue[\\/]composition-api|vuetify[\\/]lib[\\/](services|util|locale|presets|mixins|directives){1}){1}[\\/]|[\\/].nuxt[\\/]|[\\/]node_modules[\\/]vuetify[\\/]lib[\\/](install.js|framework.js){1}|[\\/](layouts|plugins){1}[\\/]|[\\/]package.json){1}/,
              //   minChunks: 1,
              //   chunks: 'all',
              //   priority: 200,
              //   minSize: 0,
              //   maxSize: 999999999,
              //   reuseExistingChunk: true,
              //   name: true,
              // },
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
}
