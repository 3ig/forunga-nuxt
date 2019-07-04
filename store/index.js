export const state = () => ({
    article: null,
    articles: [],
    authorArticles: [],
    authors: null,
    topicArticles: [],
    topics: null,
    page: null,
    pages: [],
    preview: null,
    meta: {
        description: '',
        name: ''
    },
    featuredColor: null,
    wordpressAPI: 'http://localhost:8000/wp-json'
})

export const mutations = {
    setArticle (state, data) {
        state.article = data
    },
    setArticles (state, data) {
        state.articles = state.articles.concat(data)
    },
    setFeaturedColor (state, data) {
        state.featuredColor = data
    },
    setMeta (state, data) {
        state.meta = data
    },
    setAuthorArticles (state, data) {
        state.authorArticles = state.authorArticles.concat(data)
    },
    clearAuthorArticles (state) {
        state.clearAuthorArticles = []
    },
    setAuthors (state, data) {
        state.authors = data
    },
    setTopicArticles (state, data) {
        state.topicArticles = state.topicArticles.concat(data)
    },
    clearTopicArticles (state) {
        state.topicArticles = []
    },
    setTopics (state, data) {
        state.topics = data
    },
    setPage (state, data) {
        state.page = data
    },
    setPages (state, data) {
        state.pages = data
    },
    setMenu (state, data) {
        state.menu = data
    },
    setPreview (state, data) {
        state.preview = data
    }
}

export const actions = {
    async nuxtServerInit ({ commit, state }) {
        try {
            let meta = await this.$axios.get(state.wordpressAPI)
            let pages = await this.$axios.get(`${state.wordpressAPI}/wp/v2/pages?_embed`)
            commit('setMeta', meta.data)
            commit('setPages', pages.data)
        } catch(error) {
            console.log(error)
        }
    }
}
