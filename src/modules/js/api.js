// const host = 'https://easy-mock.com/mock/5d22e80d07e3c95eeba9707a/youzan'

const host = 'https://mockapi.eolinker.com/xCpzskt6d079826f9913e75ceb3606e774a72480c695c48'

const url = {
  hotlists: '/hotlists',
  bannerlists: '/bannerlists',
  toplists: '/category/toplists',
  sublists: '/category/sublists',
  rank: '/category/rank',
  searchlists: '/search/lists',
  goodsInfo: '/goods/details',
  deal: '/goods/deal',
  cartlists: '/cart/list',
  addcart: '/cart/add',
  reducecart: '/cart/reduce',
  updatecart: '/cart/update',
  removecart: '/cart/remove',
  removemore: '/cart/removemore',
  addresslists: '/address/list',
  addAddress: '/address/add',
  removeAddress: '/address/remove',
  updateAddress: '/address/update',
  addressSetDefault: '/address/setDefault'
}

for (let key in url) {
  if (url.hasOwnProperty(key)) {
    url[key] = host + url[key]
  }
}

export default url
