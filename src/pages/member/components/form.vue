<template>
   <div class="container " style="min-height: 597px;">
    <div class="section section-first">
      <div class="block form js-form">
        <input class="js-id" name="id" type="hidden" value="">
        <div class="block-item" style="border-top:0;">
          <label>收货人</label>
          <input type="text" placeholder="请输入姓名" name="user_name" v-model="name" maxlength="20">
        </div>
        <div class="block-item">
          <label>联系电话</label>
          <input type="tel" placeholder="联系电话" name="tel" v-model="tel" maxlength="11">
        </div>
        <div class="block-item">
          <label>选择地区</label>
          <div class="select-group">
            <select class="js-province-selector" v-model="provinceValue">
              <option value="-1">选择省份</option>
              <option :value="address.value" v-for="address in addressData.list" :key="address.value">
                {{address.label}}
              </option>
            </select>
            <select class="js-city-selector" v-model="cityValue">
              <option value="-1">选择城市</option>
              <option :value="city.value" v-for="city in cityLists" :key="city.value">
                {{city.label}}
              </option>
            </select>
            <select class="js-county-selector" name="area_code" data-code="" v-model="districtValue">
              <option value="-1">选择地区</option>
              <option :value="district.value" v-for="district in districtLists" :key="district.value">
                {{district.label}}
              </option>
            </select>
          </div>
        </div>
        <div class="block-item">
          <label>详细地址</label>
          <input type="text" placeholder="街道门牌信息" name="address_detail" v-model="address" maxlength="100">
        </div>
      </div>
    </div>
    <div class="block section js-save block-control-btn">
      <div class="block-item c-blue center" @click="saveAddress">保存</div>
    </div>
    <div class="block section js-delete block-control-btn" v-show="type === 'edit'" @click="remove">
      <div class="block-item c-red center" >删除</div>
    </div>
    <div class="block stick-bottom-row center js-save-default" v-show="type === 'edit'" @click="setDefault">
      <button class="btn btn-standard js-save-default-btn">设为默认收货地址</button>
    </div>
  </div>
</template>

<script>
// import Address from 'js/addressServer.js'

export default {
  data () {
    return {
      name: '',
      tel: '',
      provinceValue: -1,
      cityValue: -1,
      districtValue: -1,
      address: '',
      id: '',
      type: '',
      instance: '',
      addressData: require('js/address.json'),
      cityLists: null,
      districtLists: null
    }
  },
  created () {
    this.type = this.$route.query.type
    this.instance = this.$route.query.instance
    if (this.type === 'edit') {
      this.provinceValue = parseInt(this.instance.provinceValue)
      this.name = this.instance.name
      this.tel = this.instance.tel
      this.address = this.instance.address
      this.id = this.instance.id

      if (this.type === 'edit') {
        this.cityValue = parseInt(this.instance.cityValue)
      }
    }
  },
  watch: {
    provinceValue (value) {
      if (value === -1) return
      let list = this.addressData.list
      let index = list.findIndex(item => {
        return item.value === value
      })
      this.cityLists = list[index].children
      this.cityValue = -1
      this.districtValue = -1
    },
    cityValue (value) {
      if (value === -1) return
      let list = this.cityLists
      let index = list.findIndex(item => {
        return item.value === value
      })
      this.districtLists = list[index].children
      this.districtValue = -1

      if (this.type === 'edit') {
        this.districtValue = parseInt(this.instance.districtValue)
      }
    },
    lists: {
      handler () {
        this.$router.go(-1)
      },
      deep: true
    }
  },
  computed: {
    lists () {
      return this.$store.state.lists
    }
  },
  methods: {
    saveAddress () {
      let {name, tel, provinceValue, cityValue, districtValue, address} = this
      let data = {name, tel, provinceValue, cityValue, districtValue, address}
      if (this.type === 'add') {
        // Address.addAddress(data).then(res => {
        //   this.$router.go(-1)
        // })
        this.$store.dispatch('addAction', data)
      } else if (this.type === 'edit') {
        data.id = this.id
        // Address.updateAddress(data).then(res => {
        //   this.$router.go(-1)
        // })
        this.$store.dispatch('updateAction', data)
      }
    },
    remove () {
      if (window.confirm('确认删除？')) {
        this.$store.dispatch('removeAction', this.id)
      }
    },
    setDefault () {
      // Address.setDefault(this.id).then(res => {
      //   this.$router.go(-1)
      // })
      this.$store.dispatch('setDefaultAction', this.id)
    }
  }
}
</script>
