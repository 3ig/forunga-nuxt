<template>
    <div class="blog" :class="{'nav-open': navOpen}" id="blog">
        <a href="#navigation" class="nav-trigger" @click="navOpen = !navOpen">
            Menu <span></span>
        </a>

        <nav class="nav-container" id="navigation">
            <ul class="nav">
                <li @click="navOpen = false"><nuxt-link to="/" exact>Блог</nuxt-link></li>
                <li @click="navOpen = false"><nuxt-link to="/topics">Теми</nuxt-link></li>
                <li @click="navOpen = false"><nuxt-link to="/authors">Автори</nuxt-link></li>
                <li v-for="(page, index) in pages" :key="page.id" @click="navOpen = false">
                    <nuxt-link :to="'/pages/'+page.slug">{{page.title.rendered}}</nuxt-link>
                </li>
            </ul>
        </nav>

        <Spinner1/>
        <div class="interface">
            <TheHeader/>
            <main role="main">
                <nuxt/>
            </main>
            <TheFooter/>
        </div>

    </div>
</template>

<script>
import TheHeader from '../components/TheHeader'
import TheFooter from '../components/TheFooter'
import Spinner1 from '~/components/Spinner1'

export default {

    computed: {
        pages () {
            return this.$store.state.pages
        }
    },

    data() {
        return {
            navOpen: false
        }
    },


    components: {
        TheHeader,
        TheFooter,
        Spinner1
    }
}
</script>

<style lang="scss">
@import '~assets/css/vars.scss';

.blog * {
    -moz-osx-font-smoothing: grayscale;
    -webkit-font-smoothing: antialiased;
    background-repeat: no-repeat;
    box-sizing: border-box;
    position: relative;
    transition-timing-function: cubic-bezier(.11,.89,.31,.99);
}

html {
    background-color: #f5f5f5;
    box-sizing: border-box;
    color: $primary;
    font-family: 'Roboto Slab', serif;
    font-kerning: normal;
    font-size: 19px;
    font-weight: 400;
    overflow-y: scroll;
    transition: background-color 0.8s;
    transition-timing-function: cubic-bezier(.11,.89,.31,.99);

    @media (max-width: 500px) {
        font-size: 18px;
    }
}

*, *:before, *:after {
    box-sizing: inherit;
}

body {
    font-size: 0.85rem;
    font-weight: 300;
    line-height: 1.765em;
}

#blog {
    > .interface {
        display: flex;
        flex-direction: column;
        opacity: 0;
        overflow: hidden;
        padding-top: 80px;

        @media (max-width: 700px) {
            padding-top: 60px;
        }
    }

    > .spinner {
        display: block;
        left: calc(50% - 20px);
        position: absolute;
        top: calc(50vh - 20px - 64px);
        z-index: 10;
    }
}

html.wf-active #blog,
html.wf-inactive #blog {
    > .interface  {
        transition: 0.5s;
        opacity: 1;
    }

    > .spinner {
        display: none;
    }
}

main {
    background-color: #efefef;
    margin: 0 auto;
    max-width: $containerWidth;
    min-height: calc(100vh - 80px - 200px);
    width: 100%;

    @media (max-width: 700px) {
        min-height: calc(100vh - 60px - 200px);
    }
}

.page-enter-active {
    transition: opacity .2s;
}

.page-enter, .page-leave-active {
    opacity: 0;
}

.page-title {
    border-bottom: 1px dotted lighten($primary, 20%);
    margin-top: 32px;
    margin-bottom: 32px;

    h1 {
        font-family: 'Roboto', sans-serif;
        font-size: 3rem;
        font-weight: 100;
        line-height: 1;
        margin-bottom: 12px;
        margin-top: 0;
        padding-bottom: 0;

        @media (max-width: 500px) {
            font-size: 2rem;
        }
    }
}

h1, h2, h3, h4, h5 {
    color: #333;
    font-weight: 400;
}

a {
    color: $primary;
    font-weight: 400;
    position: relative;
    text-decoration: none;
    transition: 0.1s;
}

.fancy {
    cursor: pointer;

    &:hover {
        color: $accent;
    }

    &::after {
        background: rgba($accent, 0.5);
        content: '';
        height: 1px;
        left: 0;
        opacity: 0;
        position: absolute;
        top: 100%;
        transform: translateY(-4px);
        transition: height 0.1s, opacity 0.1s, transform 0.1s;
        width: 100%;
    }

    &:hover,
    &:focus {
        &::after {
            height: 2px;
            opacity: 1;
            transform: translateY(0px);
        }
    }
}

pre {
    white-space: pre-wrap;
}

.lazy {
    background-color: #cecece;
    position: relative;

    img {
        backface-visibility: hidden;
        height: 100%;
        opacity: 0;
        transition: opacity 0.5s;
        width: 100%;
    }

    [lazy=loading] {
        opacity: 0;
    }

    [lazy=loaded] {
        opacity: 1;
    }

    [lazy=loading] + .spinner {
        opacity: 1;;
    }

    .spinner {
        left: 50%;
        margin: -20px;
        opacity: 0;
        position: absolute;
        top: 50%;
    }
}

.infinite-loading-container {
    min-height: calc(64px * 2 + 40px) !important;
    padding: 64px;
}

.infinite-status-prompt {
    padding: 0 !important;
    position: relative;

    span {
        display: block;
    }

    svg {
        display: block;
        fill: rgba($primary, .45);
        width: 40px;
        height: 40px;
        position: relative;
        margin: auto;
    }

    div {
        bottom: -26px;
        color: rgba($primary, .65);
        font-size: 14px;
        left: 0;
        position: absolute;
        text-align: center;
        width: 100%;
    }
}

.spinner {
    position: relative;
    margin: auto;
}
</style>

<style lang="scss">
@import '../node_modules/lightgallery.js/dist/css/lightgallery.css';
@import '~assets/css/vars.scss';

.lg-backdrop {
    background-color: #111;
}

#lg-counter {
    font-family: 'Roboto', sans-serif;
}

.lg-toolbar,
.lg-actions .lg-next,
.lg-actions .lg-prev,
.lg-outer .lg-thumb-outer,
.lg-outer .lg-toggle-thumb {
    background-color: #1a1a1a;
}

#lg-actual-size:after {
    content: "\E311";
}

#lg-zoom-in,
#lg-zoom-out {
    display: none;
}

.lg-outer .lg-thumb-item {
    border-radius: 2px;
}

.lg-outer .lg-thumb-item {
    border-color: #aaa;
}

.lg-outer .lg-thumb-item.active,
.lg-outer .lg-thumb-item:hover {
    border-color: #fff;
}
</style>

<style lang="scss">
@import '~assets/css/vars.scss';

.single-article {
    .content {
        border-top: 1px dotted lighten($primary, 20%);
        padding-top: 32px;
        margin-top: 32px;

        .alignnone,
        .size-full,
        .wp-caption {
            background-color: #fff;
            padding: 16px;
            display: block;
            margin-bottom: 32px;

            img {
                display: block;
                padding: 0;
                margin-bottom: 16px;
            }

            &.alignnone {
                max-width: 100%;
            }

            &.aligncenter {
                margin-left: auto;
                margin-right: auto;
            }

            &.alignleft {
                float: left;
                margin-right: 32px;
                width: initial;
            }

            &.alignright {
                float: right;
                margin-left: 32px;
                width: initial;
            }
        }

        .wp-caption {
            p {
                margin-bottom: 0;

                & + p {
                    margin-top: 16px;
                }
            }
        }

        p {
            margin-bottom: 32px;
            margin-top: 0;
        }

        a {
            color: $accent;
            position: relative;

            &:hover {
                color: $accent;
            }

            &::after {
                background: rgba($accent, 0.5);
                content: '';
                height: 1px;
                left: 0;
                opacity: 0;
                position: absolute;
                top: 100%;
                transform: translateY(-4px);
                transition: height 0.1s, opacity 0.1s, transform 0.1s;
                width: 100%;
            }

            &:hover,
            &:focus {
                &::after {
                    height: 4px;
                    opacity: 1;
                    transform: translateY(0px);
                }
            }
        }

        img {
            height: auto;
            max-width: 100%;
        }

        > *:first-child {
            margin-top: 0;
        }
    }
}

//! Galleries
.wp-block-gallery {
    list-style-type: none;
    padding-left: 0;

    .blocks-gallery-image:last-child,
    .blocks-gallery-item:last-child {
        margin-bottom: 16px;
    }

    figcaption a {
        color: #fff;
    }
}
.blocks-gallery-item {
    display: inline-block;
    text-align: center;
    vertical-align: top;
    width: 100%;
    figure {
        margin: 10px 15px;
        position: relative;
        overflow: hidden;
        cursor: pointer;
    }
    img {
        img {
            opacity:1;
        }
    }
    &:hover {
        img {
            opacity:0.8;
        }
    }
}

.wp-block-gallery.columns-2 .blocks-gallery-item {
    max-width: calc((100% - 16px * 1) / 2);
}

.wp-block-gallery.columns-2 .blocks-gallery-item:nth-of-type(2n+2) {
    margin-left: 0;
}

.wp-block-gallery.columns-3 .blocks-gallery-item {
    max-width: calc((100% - 16px * 2) / 3);
}

.wp-block-gallery.columns-3 .blocks-gallery-item:nth-of-type(3n+3) {
    margin-left: 0;
}

.wp-block-gallery.columns-4 .blocks-gallery-item {
    max-width: calc((100% - 16px * 3) / 4);
}

.wp-block-gallery.columns-4 .blocks-gallery-item:nth-of-type(4n+4) {
    margin-left: 0;
}

.wp-block-gallery.columns-5 .blocks-gallery-item {
    max-width: calc((100% - 16px * 4) / 5);
}

.wp-block-gallery.columns-5 .blocks-gallery-item:nth-of-type(5n+5) {
    margin-left: 0;
}

.wp-block-gallery.columns-6 .blocks-gallery-item {
    max-width: calc((100% - 16px * 5) / 6);
}

.wp-block-gallery.columns-6 .blocks-gallery-item:nth-of-type(6n+6) {
    margin-left: 0;
}

.wp-block-gallery.columns-7 .blocks-gallery-item {
    max-width: calc((100% - 16px * 6) / 7);
}

.wp-block-gallery.columns-7 .blocks-gallery-item:nth-of-type(7n+7) {
    margin-left: 0;
}

.wp-block-gallery.columns-8 .blocks-gallery-item {
    max-width: calc((100% - 16px * 7) / 8);
}

.wp-block-gallery.columns-8 .blocks-gallery-item:nth-of-type(8n+8) {
    margin-left: 0;
}

.wp-block-gallery.columns-9 .blocks-gallery-item {
    max-width: calc((100% - 16px * 8) / 9);
}

.wp-block-gallery.columns-9 .blocks-gallery-item:nth-of-type(9n+9) {
    margin-left: 0;
}

.blocks-gallery-item:last-of-type {
    padding-left: 0;
}
figcaption {
    font-size:12px !important;
}
.wp-block-cover {
    video {
        width:100%;
    }
}

.nav-trigger {
    display: none;
    @media (max-width: 700px) {
        display: block;
    }
    position: fixed;
    z-index: 12;
    top: 9px;
    left: 20px;
    height: 44px;
    width: 44px;
    overflow: hidden;
    color: transparent;
    white-space: nowrap;
    text-indent: 100%;
    span {
        position: absolute;
        height: 4px;
        width: 36px;
        background: #000000;
        opacity: 0.5;
        &::before, &::after {
            position: absolute;
            height: 4px;
            width: 36px;
            background: #000000;
        }
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        transition: background .3s;
        &::before, &::after {
            content: '';
            top: 0;
            left: 0;
            transition: background .3s, transform .3s;
        }
        &::before {
            transform: translateY(-12px);
        }
        &::after {
            transform: translateY(12px);
        }
    }
    &:hover span {
        opacity: 1;
        &::before, &::after {
            opacity: 1;
        }
    }
}

.nav-open .nav-trigger span {
    background: transparent;
    &::before, &::after {
        background: #1F2B3D;
    }
    &::before {
        transform: rotate(-45deg);
    }
    &::after {
        transform: rotate(45deg);
    }
}

.overlay {
    position: fixed;
    z-index: 2;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: #1C1D21;
    opacity: 0;
    visibility: hidden;
    transition: opacity .5s, visibility .5s;
}

.nav-open .overlay {
    opacity: .6;
    visibility: visible;
}

.nav-container {
    position: fixed;
    z-index: 11;
    top: 0;
    right: 0;
    height: 100%;
    width: 100%;
    justify-content: center;
    align-items: center;
    display:flex;
    background: #F3F3F3;
    overflow: auto;
    transform: translateZ(0);
    transform: translateX(100%);
    transition: transform 0.5s cubic-bezier(0.07, 0.23, 0.34, 1);
}

.nav-open .nav-container {
    transform: translateX(0);
}

.nav-container h2 {
    font-size: 15px;
    font-weight: bold;
    text-transform: uppercase;
    color: #AAAAAA;
    margin: 1.5em 0;
}

.nav {
    list-style: none;
    padding: 0;
    text-align: center;
    a {
        display: block;
        padding: .4em 0;
        font-size: 32px;
        font-weight: bold;
        font-family: serif;
        text-decoration: none;
        color: #1F2B3D;
        transform: translateZ(0);
    }
}

.nav-open .nav {
    a {
        animation: slide-in .4s .2s backwards;
    }
    li {
        &:nth-of-type(2) a {
            animation-delay: .3s;
        }
        &:nth-of-type(3) a {
            animation-delay: .4s;
        }
        &:nth-of-type(4) a {
            animation-delay: .5s;
        }
        &:nth-of-type(5) a {
            animation-delay: .6s;
        }
    }
}

@keyframes slide-in {
    0% {
        opacity: 0;
        transform: translateX(80px);
    }

    100% {
        opacity: 1;
        transform: translateX(0);
    }
}

.wp-block-embed__wrapper iframe {
    width:100%
}

</style>
