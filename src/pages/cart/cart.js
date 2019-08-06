import Vue from 'vue'
import Axios from 'axios'
import Volecity from 'velocity-animate'

import Cart from 'js/cartServer.js'
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
    editingShopIndex: -1,
    removePopup: false,
    removeData: null,
    removeMsg: ''
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
      let arr = []
      if (this.editingShop) {
        this.editingShop.goodsList.forEach(goods => {
          if (goods.removeChecked) {
            arr.push(goods)
          }
        })
        return arr
      }
      return arr
    },
    removeAllSelected: {
      get () {
        if (this.editingShop) {
          return this.editingShop.removeChecked
        }
        return false
      },
      set (newValue) {
        if (this.editingShop) {
          this.editingShop.removeChecked = newValue
          this.editingShop.goodsList.forEach(goods => {
            goods.removeChecked = newValue
          })
        }
      }
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
            goods.removeChecked = false
          })
        })
        this.cartLists = lists
      })
    },

    selectAll () {
      let attr = this.editingShop ? 'removeAllSelected' : 'allSelected'
      this[attr] = !this[attr]
    },

    selectShop (shop) {
      let attr = this.editingShop ? 'removeChecked' : 'checked'
      shop[attr] = !shop[attr]
      shop.goodsList.forEach(goods => {
        goods[attr] = shop[attr]
      })
    },

    selectGoods (shop, goods) {
      let attr = this.editingShop ? 'removeChecked' : 'checked'
      goods[attr] = !goods[attr]
      shop[attr] = shop.goodsList.every(goods => {
        return goods[attr]
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
    },

    reduce (goods) {
      if (goods.number <= 1) return
      Axios.post(url.reducecart, {
        id: goods.id,
        number: 1
      }).then(res => {
        goods.number -= 1
      })
    },

    add (goods) {
      // Axios.post(url.addcart, {
      //   id: goods.id,
      //   number: 1
      // }).then(res => {
      //   goods.number += 1
      // })
      Cart.add(goods.id).then(res => {
        goods.number += 1
      })
    },

    remove (shop, shopIndex, goods, goodsIndex) {
      this.removePopup = true
      this.removeData = {shop, shopIndex, goods, goodsIndex}
      this.removeMsg = '确定要删除该商品吗？'
    },

    removeSelectedLists () {
      this.removePopup = true
      this.removeMsg = `确定将所选 ${this.removeLists.length} 个商品删除？`
    },

    removeConfirm () {
      if (this.removeMsg === '确定要删除该商品吗？') {
        let {shop, shopIndex, goods, goodsIndex} = this.removeData
        Axios.post(url.removecart, {
          id: goods.id
        }).then(res => {
          shop.goodsList.splice(goodsIndex, 1)
          if (!shop.goodsList.length) {
            this.cartLists.splice(shopIndex, 1)
            this.removeShop()
          }
          this.removePopup = false
          // this.$refs[`goods-${shopIndex}-${goodsIndex}`][0].style.left = '0px'
        })
      } else {
        let ids = []
        this.removeLists.forEach(good => {
          ids.push(good.id)
        })
        Axios.post(url.removemore, {
          ids
        }).then(res => {
          let arr = []
          this.editingShop.goodsList.forEach(good => {
            let index = this.removeLists.findIndex(item => {
              return item.id === good.id
            })
            if (index === -1) {
              arr.push(good)
            }
          })
          if (arr.length) {
            this.editingShop.goodsList = arr
          } else {
            this.cartLists.splice(this.editingShopIndex, 1)
            this.removeShop()
          }
          this.removePopup = false
        })
      }
    },

    removeShop () {
      this.editingShop = null
      this.editingShopIndex = -1
      this.cartLists.forEach(shop => {
        shop.isEditing = false
        shop.editMessage = '编辑'
      })
    },

    slideStart (event, goods) {
      goods.startX = event.changedTouches[0].clientX
    },

    slideEnd (evnet, shopIndex, goods, goodsIndex) {
      goods.endX = event.changedTouches[0].clientX
      let slideX = '0'
      if (goods.startX - goods.endX > 50) {
        slideX = '-60px'
      } else if (goods.endX - goods.startX > 50) {
        slideX = '0px'
      }
      Volecity(this.$refs[`goods-${shopIndex}-${goodsIndex}`], {
        left: slideX
      })
    }
  },

  mixins: [mixin]
}).$mount('.container')
