<template>
    <div class="topic">
        <div class="articles">
            <div class="page-title">
                <h1>{{ topic.name }}</h1>
                <p v-if="topic.description">{{ topic.description }}</p>
            </div>
            <ArticleList :articles="$store.state.topicArticles"/>
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
import find from 'lodash/find'
import ArticleList from '~/components/ArticleList'
import InfiniteLoading from 'vue-infinite-loading'
import Smile from '~/assets/svg/Smile.vue'
import Spinner1 from '~/components/Spinner1.vue'

export default {
    async asyncData ({ app, store, params }) {
        try {
            store.commit('clearTopicArticles')
            if (!store.state.topics) {
                let topics = await app.$axios.get(`${store.state.wordpressAPI}/wp/v2/categories?per_page=100`)
                store.commit('setTopics', topics.data)
            }

            if (!find(store.state.topicArticles, {'slug': encodeURIComponent(params.topic)})) {
                let topic = find(store.state.topics, {'slug': encodeURIComponent(params.topic)})
                let topicArticles = await app.$axios.get(`${store.state.wordpressAPI}/wp/v2/posts?orderby=date&per_page=10&categories=${topic.id}&_embed`)
                store.commit('setTopicArticles', topicArticles.data)
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
        topic () {
            return find(this.$store.state.topics, {
                'slug': this.$route.params.topic
            })
        }
    },
    head () {
        return {
            title: `${this.topic.name} | ${this.$store.state.meta.name}`,
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
                let response = await this.$axios.get(`${this.$store.state.wordpressAPI}/wp/v2/posts?orderby=date&per_page=10&categories=${this.topic.id}&_embed&page=${this.page}`)
                if (response.data.length) {
                    this.$store.commit('setTopicArticles', response.data)
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

.topic {
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
