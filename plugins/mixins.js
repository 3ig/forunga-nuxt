import Vue from 'vue'
import moment from 'moment'
import bg_moment from 'moment/locale/bg'
moment.locale('bg')

Vue.mixin({
    methods: {
        /**
        * Returns formatted date depending on how old it is.
        * If older than 6 days, return formatted like '2 days ago',
        * otherwise return formatted like 'Aug 2'.
        * @param {String} date
        * @return {String} formatted date
        */
        shortTimestamp (date) {
            let article = moment(date)
            let today = moment(new Date())

            if (today.diff(article) > 518400000) {
                return article.format('Do MMMM, YYYY')
            } else {
                return article.fromNow()
            }
        },
        /**
        * Returns date formatted like 'May 9, 2017'
        * @param {String} date
        * @return {String} formatted date
        */
        longTimestamp (date) {
            return moment(date).format('Do MMMM, YYYY')
        },

        homeScrollTop () {
            if (window.location.pathname === '/') {
                this.$scrollTo(document, 500)
            } else {
                this.$router.push('/')
            }
        }
    }
})
