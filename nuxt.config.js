
export default {
  /*
   ** Nuxt rendering mode
   ** See https://nuxtjs.org/api/configuration-mode
   */
  ssr: false,
  /*
   ** Nuxt target
   ** See https://nuxtjs.org/api/configuration-target
   */
  target: 'server',
  server: {
    port: 3002, // default: 3000
    host: '0.0.0.0', // default: localhost
  },
  /*
   ** Headers of the page
   ** See https://nuxtjs.org/api/configuration-head
   */
  router: {
    linkActiveClass: 'active-link',
    linkExactActiveClass: 'exact-active-link',
  },
  loading: false,
  head: {
    title: 'Тест',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: 'description',
        name: 'description',
        content: process.env.npm_package_description || '',
      },
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
    script: [
      {
        src: 'https://cdnjs.cloudflare.com/ajax/libs/mathjax/2.7.2/MathJax.js?config=TeX-AMS_HTML',
      },
      {
        src: 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.2/css/fontawesome.min.css',
      },
      {
        src: 'https://cdn.jsdelivr.net/npm/katex@0.11.1/dist/katex.min.js',
        defer: true,
      },
      {
        src: 'https://cdn.jsdelivr.net/npm/katex@0.11.1/dist/contrib/auto-render.min.js',
        defer: true,
        callback: () => {
          renderMathInElement(document.body)
        },
      },
      {
        rel: 'stylesheet',
        href: 'https://cdn.jsdelivr.net/npm/katex@0.11.1/dist/katex.min.css',
      },
    ],
  },
  /*
   ** Global CSS
   */
  css: [
    '@/assets/font/stylesheet.css',
    '@/assets/my_style/main.scss',
  ],
  /*
   ** Plugins to load before mounting the App
   ** https://nuxtjs.org/guide/plugins
   */
  plugins: [
    { src: '~/plugins/vue-inputmask', ssr: false },
    { src: '~/plugins/v-calendar', ssr: false },
    { src: '~/plugins/vue-math.js', ssr: false },
    { src: '~/plugins/vue-katex.js', ssr: false },
    { src: '~/plugins/latex.js', ssr: false },
  ],
  /*
   ** Auto import components
   ** See https://nuxtjs.org/api/configuration-components
   */
  components: true,
  /*
   ** Nuxt.js dev-modules
   */
  buildModules: [],
  /*
   ** Nuxt.js modules
   */
  modules: [
    'vue-toastification/nuxt',
    // Doc: https://bootstrap-vue.js.org
    'bootstrap-vue/nuxt',
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/axios',
    ['nuxt-sass-resources-loader'],
    '@nuxtjs/dayjs',
  ],
  /*
   ** Axios module configuration
   ** See https://axios.nuxtjs.org/options
   */
  axios: {
    baseURL: process.env.BASE_URL || 'https://tmci-test.xn--h28h.uz/api/v1/',
  },

  dayjs: {
    locales: ['ru'],
    defaultLocale: 'ru',
    plugins: [
      'utc', // import 'dayjs/plugin/utc'
    ], // Your Day.js plugin
  },

  /*
   ** Build configuration
   ** See https://nuxtjs.org/api/configuration-build/
   */
  build: {
    extractCSS: true,
    cssSourceMap: false,
  },
}
