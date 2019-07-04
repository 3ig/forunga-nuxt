<template>
    <div class="author">
        <div class="articles">
            <div class="page-title" style="display:flex">
                <div style="margin-right:32px;">
                    <img :src="author.avatar_urls[96]" />
                </div>
                <div>
                    <h1>{{ author.name }}</h1>
                    <p v-if="author.description">{{ author.description }}</p>
                </div>
            </div>
            <ArticleList :articles="$store.state.authorArticles"/>
            <InfiniteLoading
                :on-infinite="moreArticles"
            >
                <span slot="spinner">
                    <Spinner1/>
                </span>
                <span slot="no-results">
                    <Smile/>
                    <div>No more articles!</div>
                </span>
                <span slot="no-more">
                    <Smile/>
                    <div>No more articles!</div>
                </span>
            </InfiniteLoading>
    </div>
</div>
</template>

<script>
import find from 'lodash/find'
import ArticleList from '~/components/ArticleList'
import InfiniteLoading from 'vue-infinite-loading/src/components/InfiniteLoading.vue'
import Smile from '~/assets/svg/Smile.vue'
import Spinner1 from '~/components/Spinner1.vue'

export default {
    async asyncData ({ app, store, params }) {
        try {
            store.commit('clearAuthorArticles')
            if (!store.state.authors) {
                let authors = await app.$axios.get(`${store.state.wordpressAPI}/wp/v2/users?per_page=100`)
                store.commit('setAuthors', authors.data)
            }

            if (!find(store.state.authorArticles, {'slug': params.author})) {
                let author = find(store.state.authors, {'slug': params.author})
                let authorArticles = await app.$axios.get(`${store.state.wordpressAPI}/wp/v2/posts?orderby=date&per_page=10&author=${author.id}&_embed`)
                store.commit('setAuthorArticles', authorArticles.data)
            }
        } catch (error) {
            console.log(error)
        }
    },
    components: {
        ArticleList,
        InfiniteLoading,
        Smile,
        Spinner1
    },
    computed: {
        author () {
            return find(this.$store.state.authors, {
                'slug': this.$route.params.author
            })
        }
    },
    head () {
        return {
            title: `${this.author.name} | ${this.$store.state.meta.name}`,
            meta: [
                { description: this.$store.state.meta.description }
            ]
        }
    },
    data() {
        return {
            page:1
        }
    },
    methods: {
        async moreArticles ($state) {
            try {
                this.page++
                let response = await this.$axios.get(`${this.$store.state.wordpressAPI}/wp/v2/posts?orderby=date&per_page=10&author=${this.author.id}&_embed&page=${this.page}`)
                if (response.data.length) {
                    this.$store.commit('setAuthorArticles', response.data)
                    $state.loaded();
                } else {
                    $state.complete();
                }
            } catch(error) {
                $state.complete();
                console.log(error)
            }

        }
    }
}
</script>

<style lang="scss" scoped>
@import '~assets/css/vars.scss';

.author {
    display: flex;

    .articles {
        background-color: #efefef;
        padding: 0 32px;
        width: 100%;

        @media (max-width: 1000px) {
            max-width: none;
        }

        @media (max-width: 700px) {
            padding: 0 16px;
        }

        .article-list {
            margin: 32px 0;
        }
    }
}
</style>
