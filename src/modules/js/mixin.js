import Foot from 'components/Footer.vue'

const mixin = {
  filters: {
    priceFilter (price) {
      return price.toFixed(2)
    }
  },
  components: {
    Foot
  }
}

export default mixin
