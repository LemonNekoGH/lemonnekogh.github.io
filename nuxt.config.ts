export default {
  // Target: https://go.nuxtjs.dev/config-target
  target: 'static',

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    titleTemplate: '%s - 柠喵的布洛阁',
    title: '柠喵的布洛阁',
    htmlAttrs: {
      lang: 'zh'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '柠喵的博客，用于记录各种各样的东西' }
    ],
    link: [
      { rel: 'icon', type: 'image/png', href: '/images/favicon.png' }
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    '~/assets/css/main.less'
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    { src: '@/plugins/element-ui', ssr: false }
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    '@nuxt/typescript-build',
    '@nuxtjs/vuetify'
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    '@nuxt/content',
    '@nuxtjs/axios',
    '@nuxtjs/robots'
  ],
  vuetify: {
    theme: {
      themes: {
        light: {
          primary: '#ff8a65',
          accent1: '#FFC9B8'
        }
      }
    },
    breakpoint: {
      mobileBreakpoint: 'xs'
    }
  },
  robots: {
    UserAgent: '*'
  },
  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    extractCSS: true
  },
  generate: {
    async routes (): Promise<string[]> {
      const { $content } = require('@nuxt/content')
      const files = await $content('articles', { deep: true })
        .sortBy('createTime', 'desc')
        .only(['path'])
        .fetch()
      const routes: string[] = []
      if (Array.isArray(files)) {
        files.forEach(it => routes.push(it.path))
      } else {
        routes.push(files.path)
      }
      return routes
    }
  },
  loading: {
    color: 'white',
    height: '2px'
  }
}
