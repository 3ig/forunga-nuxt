export default {
    /*
    ** Headers of the page
    */
    head: {
        title: 'FORONGA',
        meta: [
            { charset: 'utf-8' },
            { name: 'viewport', content: 'width=device-width, initial-scale=1' },
            { hid: 'description', name: 'description', content: 'Nuxt.js + Vuetify.js project' }
        ],
        link: [
            { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
            { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css?family=Roboto:300,400,500,700|Material+Icons' }
        ]
    },
    modules: [
      '@nuxtjs/axios',
      ['@nuxtjs/google-analytics', {
        id: '43424544'
      }]
    ],
    vendor: ['lightgallery.js'],
    plugins: [
      { src: '~plugins/vue-lazyload', ssr: false },
      { src: '~plugins/vue-scrollto', ssr: false },
      { src: '~plugins/web-font-loader', ssr: false },
      { src: '~plugins/mixins' }
    ],
    loading: {
        color: '#7c2395'
    },
    css: [
        'normalize.css/normalize.css'
    ],
    /*
    ** Customize the progress bar color
    */
    loading: { color: '#3B8070' },
    /*
    ** Build configuration
    */
    build: {
        extractCSS: true,
        /*
        ** Run ESLint on save
        */
        extend (config, {isDev}) {
            if (isDev && process.client) {
                config.module.rules.push({
                    enforce: 'pre',
                    test: /\.(js|vue)$/,
                    loader: 'eslint-loader',
                    exclude: /(node_modules)/
                })
            }
        }
    },
    server: {
        port: 3000,
        host: '0.0.0.0', // accept connections from outside
    },
}
