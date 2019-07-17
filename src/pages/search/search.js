import Vue from 'vue'
import Axios from 'axios'
import qs from 'qs'
import Velocity from 'velocity-animate'

import url from 'js/api.js'
import mixin from 'js/mixin.js'
import 'css/common.css'
import './search.css'

let { keyword, id } = qs.parse(location.search.substr(1))

new Vue({
  data: {
    searchLists: null,
    keyword,
    showGoToTop: false
  },
  mounted () {
    this.getSearchLists()
  },
  methods: {
    getSearchLists () {
      Axios.post(url.searchlists, { keyword, id }).then(res => {
        this.searchLists = res.data.lists
      })
    },
    pageScroll () {
      if (document.documentElement.scrollTop > 200) {
        this.showGoToTop = true
      } else {
        this.showGoToTop = false
      }
    },
    goToTop () {
      Velocity(document.body, 'scroll', {duration: 500})
    }
  },
  mixins: [mixin]
}).$mount('.container')
