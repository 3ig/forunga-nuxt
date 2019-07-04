<template>
    <article class="single-article">
        <ArticleFeaturedImage
        v-if="featuredImage"
        :expanded="expanded"
        :featured-image="featuredImage"
        />
        <transition name="slide-fade">
            <div class="narrow" :class="{ 'expanded': expanded, 'no-featured-image': !featuredImage }">
                <button class="expand-featured-image" title="Show full image" @click.prevent="expandFeaturedImage" :class="{ 'expanded': expanded }" v-if="featuredImage.source_url">
                    <svg fill="#000000" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg">
                        <path d="M16.59 8.59L12 13.17 7.41 8.59 6 10l6 6 6-6z"/>
                        <path d="M0 0h24v24H0z" fill="none"/>
                    </svg>
                </button>
                <div class="meta">
                    <h1 class="title" v-html="article.title.rendered"></h1>
                    <div class="details">
                        <span>{{ longTimestamp(article.date) }}</span>
                        <span class="separator">|</span>
                        <nuxt-link class="author fancy" :to="`/authors/${author.slug}`">{{ author.name }}</nuxt-link>
                    </div>
                </div>
                <div class="content" id="article-content" v-html="article.content.rendered"></div>
                <ArticleComments :article="article"/>
            </div>
        </transition>
        <div v-if="linkRGB != ''" v-html="linkRGB"></div>
    </article>
</template>

<script>
import * as Vibrant from 'node-vibrant'
import ArticleFeaturedImage from '~/components/ArticleFeaturedImage.vue'
import ArticleComments from '~/components/ArticleComments'

if (process.browser) {
    require('lightgallery.js')
    require('lg-zoom.js')
    require('lg-thumbnail.js')
}

export default {
    async asyncData ({ app, store, params }) {
        try {
            let article = await app.$axios.get(`${store.state.wordpressAPI}/wp/v2/posts?slug=${encodeURIComponent(params.article)}&_embed`)
            store.commit('setArticle', article.data[0])
        } catch(error) {
            console.log(error)
        }
    },

    beforeMount () {
        if (this.featuredImage.source_url) {
            let img = this.article._embedded['wp:featuredmedia'][0].media_details.sizes.thumbnail.source_url

            Vibrant.from(img).getPalette((err, palette) => {
                if (!err) {
                    this.$store.commit('setFeaturedColor', palette)
                }
            })
        }
    },
    mixins: {
        longTimestamp: Function
    },
    components: {
        ArticleFeaturedImage,
        ArticleComments
    },
    computed: {
        article () {
            return this.$store.state.article
        },
        author () {
            return this.$store.state.article._embedded.author[0]
        },
        featuredImage () {
            let featuredImage = this.$store.state.article._embedded['wp:featuredmedia']

            if (featuredImage) {
                return featuredImage[0].media_details.sizes.large || featuredImage[0].media_details.sizes.full || false
            } else {
                return { height: 0, width: 0 }
            }
        }
    },
    data () {
        return {
            disqusReady: false,
            expanded: false,
            linkRGB: ''
        }
    },
    head () {
        return {
            title: `${this.article.title.rendered} | ${this.$store.state.meta.name}`,
            meta: [
                { description: this.article.excerpt.rendered }
            ]
        }
    },
    methods: {
        expandFeaturedImage () {
            if (!this.expanded) {
                this.$router.push({ query: { image: null } })
            } else {
                this.$router.push({ query: null })
            }
            this.expanded = !this.expanded
        },
        loadFeaturedImageExpanded () {
            if (this.$route.query.image === null) {
                this.expanded = true
            }
        },
        gallery () {
            let galleries = document.querySelectorAll('.content > .wp-block-gallery')

            for (let i = 0; i < galleries.length; i++) {
                let items = galleries[i].querySelectorAll('img')
                items.forEach(item => {
                    item.parentNode.setAttribute('data-src', item.src)
                })

                lightGallery(galleries[i], {
                    download: false,
                    selector: 'figure'
                })
            }
        }
    },
    mounted () {
        this.gallery()
        this.loadFeaturedImageExpanded()
    },
    watch: {
        '$store.state.featuredColor' () {
            let DarkMuted = this.$store.state.featuredColor.DarkMuted
            let DarkVibrant = this.$store.state.featuredColor.DarkVibrant

            if (DarkMuted !== null && DarkVibrant !== null) {
                this.linkRGB = `
                <style>
                html,
                .featured-image .image-height {
                    background: rgb(${DarkMuted._rgb[0]},${DarkMuted._rgb[1]},${DarkMuted._rgb[2]}) !important
                }
                main a {
                    color: rgb(${DarkVibrant._rgb[0]},${DarkVibrant._rgb[1]},${DarkVibrant._rgb[2]}) !important
                }
                main a:hover {
                    color: rgb(${DarkMuted._rgb[0]},${DarkMuted._rgb[1]},${DarkMuted._rgb[2]}) !important
                }
                main a::after {
                    background: rgb(${DarkMuted._rgb[0]},${DarkMuted._rgb[1]},${DarkMuted._rgb[2]}) !important
                }
                .blog-title svg #logoFill path {
                    fill: rgb(${DarkMuted._rgb[0]},${DarkMuted._rgb[1]},${DarkMuted._rgb[2]}) !important
                }
                </style>
                `
            }
        }
    }
}
</script>

<style lang="scss" scoped>
@import '~assets/css/vars.scss';

article {
    background-color: #efefef;
    display: flex;
    flex-direction: column;
    position: relative;
    height: 100%;

    &.page-enter-active .narrow {
        transition: transform 1s cubic-bezier(.11,.89,.31,.99), opacity 0.75s ease-out;
    }

    &.page-enter .narrow, .page-leave-to .narrow {
        transform: translateY(16px);
    }

    .narrow {
        background-color: #efefef;
        margin: 0 auto;
        max-width: 1042px;
        min-height: calc(100vh - 80px - 96px - 200px);
        padding: 0 96px 96px 96px;
        position: relative;
        transition: min-height 1s, transform 1s;
        transform: translateY(0);
        width: 100%;

        &.expanded {
            min-height: 0;
        }

        @media (max-width: 900px) {
            margin-top: 0 !important;
            max-width: 100%;
            min-height: initial;
        }

        @media (max-width: 700px) {
            max-width: none;
            padding: 0 16px 16px 16px;
        }

        .expand-featured-image {
            background-color: transparent;
            border: 0;
            cursor: pointer;
            outline: 0;
            position: absolute;
            right: 32px;
            top: 32px;
            transition: 1s;
            z-index: 1;

            @media (max-width: 900px) {
                display: none;
            }

            &:hover {
                svg {
                    opacity: 1;
                }
            }

            &.expanded {
                transform: rotate(180deg);
            }

            svg {
                fill: $primary;
                height: 24px;
                opacity: 0.7;
                transition: 0.1s;
                width: 24px;
            }
        }

        &.no-featured-image {
            margin: 0 auto;
        }
    }

    .meta {
        .title {
            font-size: 40px;
            line-height: 1;
            margin-bottom: 16px;
            margin-top: 0;
            padding-top: 64px;

            @media (max-width: 700px) {
                padding-top: 48px;
            }

            @media (max-width: 500px) {
                padding-top: 32px;
            }
        }

        .details {
            font-size: 0.8rem;

            .separator {
                padding: 0 0.5rem;
            }
        }
    }
}
</style>
