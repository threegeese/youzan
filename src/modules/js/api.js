const host = 'https://easy-mock.com/mock/5d22e80d07e3c95eeba9707a/youzan'

const url = {
  hotlists: '/hotlists',
  bannerlists: '/bannerlists'
}

for (let key in url) {
  if (url.hasOwnProperty(key)) {
    url[key] = host + url[key]
  }
}

export default url
