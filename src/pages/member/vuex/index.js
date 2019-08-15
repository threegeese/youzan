import Vue from 'vue'
import Vuex from 'vuex'

import Address from 'js/addressServer.js'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    lists: null
  },
  mutations: {
    init (state, lists) {
      state.lists = lists
    },
    add (state, instance) {
      state.lists.push(instance)
    },
    remove (state, id) {
      let lists = state.lists
      let index = lists.findIndex(item => {
        return item.id === id
      })
      lists.splice(index, 1)
    },
    update (state, instance) {
      let lists = JSON.parse(JSON.stringify(state.lists))
      let index = lists.findIndex(item => {
        return item.id === instance.id
      })
      lists[index] = instance
      state.lists = lists
    },
    setDefault (state, id) {
      let lists = state.lists
      lists.forEach(item => {
        item.isDefault = item.id === id
      })
    }
  },
  actions: {
    getLists ({commit}) {
      Address.addressLists().then(res => {
        commit('init', res.data.lists)
      })
    },
    addAction ({commit}, instance) {
      Address.addAddress(instance).then(res => {
        // 模拟添加 id, 最好后台返回
        instance.id = Math.random() * 1000000
        commit('add', instance)
      })
    },
    removeAction ({commit}, id) {
      Address.removeAddress(id).then(res => {
        commit('remove', id)
      })
    },
    updateAction ({commit}, instance) {
      Address.updateAddress(instance).then(res => {
        commit('update', instance)
      })
    },
    setDefaultAction ({commit}, id) {
      Address.removeAddress(id).then(res => {
        commit('setDefault', id)
      })
    }
  }
})

export default store
