export default {
  // Target: https://go.nuxtjs.dev/config-target
  target: 'static',

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'salikov-vue',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    '~/assets/scss/core.scss',
    '~/assets/scss/fonts.scss',
    '~/assets/scss/lk.scss',
    '~/assets/scss/response.scss'
  ],

  pageTransition: 'fade',

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    {
      src: '~/plugins/v-calendar.js',
      mode: 'client'
    },
    '~plugins/vue-js-modal.js',
    {
      src: '~plugins/vue2-editor.js',
      mode: 'client'
    },
    '~plugins/vuescroll.js',
    {
      src: '~plugins/vue-notification.js',
      mode: 'client'
    },
    '~/plugins/axios',
    {
      src: '~/plugins/route',
      mode: 'client'
    },
    {
      src: '~/plugins/mixin',
      mode: 'client'
    },
    {
      src: '~/plugins/maska',
      mode: 'client'
    },
    {
      src: '~/plugins/vue-picture-input',
      mode: 'client'
    },
    {
      src: '~/plugins/vue-kinescope-player.js',
      mode: 'client'
    },
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    "vue2-editor/nuxt",
    '@nuxtjs/axios'
  ],

  axios: {
    baseURL: 'http://localhost:8000', // Used as fallback if no runtime config is provided
    credentials: true,
    headers: {
      common: {
        'Access-Control-Allow-Origin': '*'
      }
    }
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    
  },

  router: {
    linkExactActiveClass: 'active',
  },

  //loading: '~/components/TransitionRoute.vue'
}
