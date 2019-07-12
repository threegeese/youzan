import Vue from 'vue'
import Axios from 'axios'

import url from 'js/api.js'
import Footer from 'components/Footer.vue'

import 'css/common.css'
import './category.css'

new Vue({

  data: {
    topData: null,
    topIndex: 0,
    subData: null,
    rankData: null
  },

  created () {
    this.getTopLists()
    this.getSubLists()
    this.getRank()
  },

  methods: {
    getTopLists () {
      Axios.get(url.toplists).then(res => {
        this.topData = res.data.lists
      })
    },
    getSubLists (index = 0, id = 0) {
      this.topIndex = index
      if (index !== 0) {
        Axios.post(url.sublists, {id}).then(res => {
          this.subData = res.data.data
        })
      }
    },
    getRank () {
      Axios.get(url.rank).then(res => {
        this.rankData = res.data.data
      })
    }
  },

  filters: {
    priceFilter (price) {
      return price.toFixed(2)
    }
  },

  components: {
    Foot: Footer
  }

}).$mount('#category')
