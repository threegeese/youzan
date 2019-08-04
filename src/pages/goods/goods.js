import Vue from 'vue'
import Axios from 'axios'
import qs from 'qs'

import Swiper from 'components/Swiper.vue'

import url from 'js/api.js'
import mixin from 'js/mixin.js'

import './goods_common.css'
import './goods_custom.css'
import './goods.css'
import './goods_theme.css'
import './goods_mars.css'
import './goods_sku.css'
import './goods_transition.css'

let id = qs.parse(location.search.substr(1))

let detailTab = ['商品详情', '本店成交']

new Vue({
  data: {
    id,
    goodsDetail: null,
    detailTab,
    tabIndex: 0,
    dealLists: null,
    bannerLists: [],
    showSku: false,
    skuType: 1,
    skuNumber: 1,
    cartLists: null,
    inCart: false,
    showAddMsg: false
  },
  components: {
    Swiper
  },
  created () {
    this.getGoodsInfo()
  },
  watch: {
    showSku (value, oldValue) {
      document.body.style.overflow = value ? 'hidden' : 'auto'
      document.querySelector('html').style.overflow = value ? 'hidden' : 'auto'
      document.body.style.height = value ? '100%' : 'auto'
      document.querySelector('html').style.height = value ? '100%' : 'auto'
    }
  },
  methods: {
    getGoodsInfo () {
      Axios.post(url.goodsInfo, { id }).then(res => {
        this.goodsDetail = res.data.data
        this.goodsDetail.imgs.forEach(item => {
          this.bannerLists.push({
            clickUrl: '',
            img: item
          })
        })
      })
    },
    changeTab (index) {
      this.tabIndex = index
      if (index === 1) {
        this.getDeal()
      }
    },
    getDeal () {
      Axios.post(url.deal, { id }).then(res => {
        if (!this.dealLists) {
          this.dealLists = res.data.data.lists
        }
      })
    },
    chooseSku (type) {
      this.skuType = type
      this.showSku = true
    },
    changeSkuNumber (number) {
      if (number < 0 && this.skuNumber === 1) return
      this.skuNumber += number
    },
    addToCart () {
      Axios.post(url.addcart, { id, number: this.skuNumber }).then(res => {
        if (res.data.status === 200) {
          this.showSku = false
          this.inCart = true
          this.showAddMsg = true
          setTimeout(() => {
            this.showAddMsg = false
          }, 1800)
        }
      })
    }
  },
  mixins: [mixin]
}).$mount('#app')
