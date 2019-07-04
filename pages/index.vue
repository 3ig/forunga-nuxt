<template>
    <div class="home">
        <div class="articles">
            <TheHero
                v-if="heroArticle"
                :hero-article="heroArticle"
            />
            <ArticleList :articles="$store.state.articles"/>
            <InfiniteLoading
                @infinite="moreArticles"
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
import ArticleList from '~/components/ArticleList'
import TheHero from '~/components/TheHero'
import InfiniteLoading from 'vue-infinite-loading'
import Smile from '~/assets/svg/Smile.vue'
import Spinner1 from '~/components/Spinner1.vue'

export default {
    async asyncData ({ app, store, params }) {
        try {
            if (!store.state.articles.length) {
                let articles = await app.$axios.get(`${store.state.wordpressAPI}/wp/v2/posts?orderby=date&per_page=10&_embed`)


                let menu = await app.$axios.get(`${store.state.wordpressAPI}/menus/v1/menus`)
                store.commit('setMenu', menu.data)

                store.commit('setArticles', articles.data)
            }
        } catch(error) {
            console.log(error)
        }
    },
    components: {
        ArticleList,
        TheHero,
        InfiniteLoading,
        Smile,
        Spinner1
    },
    computed: {
        heroArticle () {
            return this.$store.state.articles[0]
        }
    },
    data() {
        return {
            page:1
        }
    },
    head () {
        return {
            title: `Начало | ${this.$store.state.meta.name}`,
            meta: [
                { description: this.$store.state.meta.description }
            ]
        }
    },
    methods: {
        async moreArticles ($state) {
            try {
                this.page++
                let response = await this.$axios.get(`${this.$store.state.wordpressAPI}/wp/v2/posts?orderby=date&per_page=10&page=${this.page}&_embed`)
                if (response.data.length) {
                    this.$store.commit('setArticles', response.data)
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
.home {
    display: flex;

    .hero {
        margin: 0 -32px;
    }

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

            @media (max-width: 700px) {
                margin: 16px 0;
            }
        }
    }
}
</style>

<style lang="scss">
.home {
    .article-list {
        article {
            &:first-child {
                display: none;
            }

            &:nth-child(2) {
                border-top: 0;
                padding-top: 0;
            }
        }
    }
}
.wp-block-video {
    margin:0;
    video {
        width:100%;
    }
}
</style>
