import Vue from 'vue'
import Axios from 'axios'
import qs from 'qs'

import url from 'js/api.js'
import 'css/common.css'
import './search.css'

let { keyword, id } = qs.parse(location.search.substr(1))

new Vue({
  data: {
    searchLists: null
  },
  mounted () {
    this.getSearchLists()
  },
  methods: {
    getSearchLists () {
      Axios.post(url.searchlists, { keyword, id }).then(res => {
        this.searchLists = res.data.lists
      })
    }
  }
}).$mount('.container')
