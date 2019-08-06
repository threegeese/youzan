import fetch from 'js/fetch.js'
import url from 'js/api.js'

export default class Cart {
  static add (id) {
    return fetch(url.addcart, {
      id,
      number: 1
    })
  }
}
