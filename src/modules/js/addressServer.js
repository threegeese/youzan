import fetch from 'js/fetch.js'
import url from 'js/api.js'

export default class Address {
  static addressLists () {
    return fetch(url.addresslists)
  }

  static addAddress (data) {
    return fetch(url.addAddress, data)
  }

  static removeAddress (id) {
    return fetch(url.removeAddress, id)
  }

  static updateAddress (data) {
    return fetch(url.updateAddress, data)
  }

  static setDefault (id) {
    return fetch(url.addressSetDefault, id)
  }
}
