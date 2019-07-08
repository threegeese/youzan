import Vue from 'vue'
import Axios from 'axios'
import url from 'js/api.js'

import 'css/common.css'
import './index.css'

new Vue({
  data: {
    lists: null
  },
  created () {
    Axios.post(url.hotlists)
      .then(res => {
        this.lists = res.data.lists
      })
  }
}).$mount('#app')
