import Vue from 'vue'
import Axios from 'axios'

import url from 'js/api.js'
import mixin from 'js/mixin.js'

import './cart.css'
import './cart_base.css'
import './cart_trade.css'

new Vue({
  data: {
    cartLists: null,
    total: 0,
    editingShop: null,
    editingShopIndex: -1
  },
  created () {
    this.getCartList()
  },
  computed: {
    allSelected: {
      get () {
        if (this.cartLists && this.cartLists.length) {
          return this.cartLists.every(shop => {
            return shop.checked
          })
        }
        return false
      },
      set (newValue) {
        this.cartLists.forEach(shop => {
          shop.checked = newValue
          shop.goodsList.forEach(goods => {
            goods.checked = newValue
          })
        })
      }
    },
    selectedLists () {
      let lists = []
      let total = 0
      if (this.cartLists && this.cartLists.length) {
        this.cartLists.forEach(shop => {
          shop.goodsList.forEach(goods => {
            if (goods.checked) {
              lists.push(goods)
              total += goods.price * goods.number
            }
          })
        })
      }
      this.total = total
      return lists
    },
    removeLists () {

    }
  },
  methods: {
    getCartList () {
      Axios.get(url.cartlists).then(res => {
        let lists = res.data.cartList
        lists.forEach(shop => {
          shop.checked = true
          shop.removeChecked = false
          shop.isEditing = false
          shop.editMessage = '编辑'
          shop.goodsList.forEach(goods => {
            goods.checked = true
            shop.removeChecked = false
          })
        })
        this.cartLists = lists
      })
    },
    selectAll () {
      this.allSelected = !this.allSelected
    },
    selectShop (shop) {
      shop.checked = !shop.checked
      shop.goodsList.forEach(goods => {
        goods.checked = shop.checked
      })
    },
    selectGoods (shop, goods) {
      goods.checked = !goods.checked
      shop.checked = shop.goodsList.every(goods => {
        return goods.checked
      })
    },
    edit (shop, shopIndex) {
      shop.isEditing = !shop.isEditing
      shop.editMessage = shop.isEditing ? '完成' : '编辑'
      this.cartLists.forEach((item, index) => {
        if (shopIndex !== index) {
          item.isEditing = false
          item.editMessage = shop.isEditing ? '' : '编辑'
        }
      })
      this.editingShop = shop.isEditing ? shop : null
      this.editingShopIndex = shop.isEditing ? shopIndex : -1
    }
  },
  mixins: [mixin]
}).$mount('.container')
