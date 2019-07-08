import Vue from 'vue'
import Axios from 'axios'
import { InfiniteScroll } from 'mint-ui'

import url from 'js/api.js'
import Footer from 'components/Footer.vue'

import 'css/common.css'
import './index.css'

Vue.use(InfiniteScroll)

new Vue({

  data: {
    lists: null,
    pageNum: 0,
    pageSize: 6,
    loading: false,
    allLoaded: false
  },

  components: {
    Foot: Footer
  },

  created () {
    this.getMoreHotGoods()
  },

  methods: {
    getMoreHotGoods () {
      if (this.allLoaded) return 
      this.loading = true
      Axios.post(url.hotlists, {
        pageNum: this.pageNum,
        pageSize: this.pageSize
      }).then(res => {
        this.pageNum += 1
        this.loading = false
        let currentLists = res.data.lists
        if (currentLists.length < this.pageSize) {
          this.allLoaded = true
        }
        if (this.lists) {
          this.lists = this.lists.concat(currentLists)
        } else {
          this.lists = currentLists
        }
      })
    }
  }

}).$mount('#app')
