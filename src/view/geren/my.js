/**
 * Created by
 * @Auther: tianjihai
 * @Date: 2018-12-28 18:47
 */

import CryptoJS from 'crypto-js/crypto-js'
import 'aes-js/index'

/**
 * 加密（需要先加载lib/aes/aes.min.js文件）
 */

function encrypt(word) {
  var key = CryptoJS.enc.Utf8.parse('6145986487626488')
  var srcs = CryptoJS.enc.Utf8.parse(word)
  var encrypted = CryptoJS.AES.encrypt(srcs, key, {mode: CryptoJS.mode.ECB, padding: CryptoJS.pad.Pkcs7})
  return encrypted.toString()
}

/**
 * 解密
 */
function decrypt(word) {
  var key = CryptoJS.enc.Utf8.parse('6145986487626488')
  var decrypt = CryptoJS.AES.decrypt(word, key, {mode: CryptoJS.mode.ECB, padding: CryptoJS.pad.Pkcs7})
  return CryptoJS.enc.Utf8.stringify(decrypt).toString()
}

export default {
  name: 'my',

  data() {
    return {
      dialogTableVisible: false,
      dialogFormVisible: false,
      form: {
        phoneNum: '',
        recipient: '',
        cityCode: '',
        sign: '',
        appId: '',
        state2: ''
      },
      cityname: [],

      restaurants: [],
      /* 各个字段的校验规则定义 */
      rules: {
        phoneNum: [{required: true, message: '填手机号！', trigger: 'blur'}],
        recipient: [{required: true, message: '姓名呢？！', trigger: 'blur'}],
        state2: [{required: true, message: '填写城市名！', trigger: 'blur'}],
      },

      formLabelWidth: '120px'
    }
  },
  mounted() {
    this.restaurants = this.loadAll()
    this.getCity()
  },
  methods: {
    jiami() {
      let dd = encrypt(this.d1)
    },
    jiemi() {
      let dd2 = decrypt(this.d2)
    },
    goBack() {
      this.$router.push('/')
    },
    refresh() {
      this.$axios({
        method: 'get',
        url: 'http://t.weather.sojson.com/api/weather/city/101030100',
        // data: {
        //   firstName: 'Fred',
        //   lastName: 'Flintstone'
        // }
      }).then(response => {
        console.log(response)
      })
        .catch(error => {
          console.log(error)
        })
        .finally(() => this.loading = false)


      this.$router.go(0)
    },

    /*信息提交*/
    infoSubmit() {

      let appid = ''
      for (let i = 0; i < 6; i++) {
        appid += Math.floor(Math.random() * 10)
      }
      let sign = encrypt(appid)

      this.form.appId = appid
      this.form.sign = sign
      let url = 'http://47.93.193.61:8080/sendMessage?appId=' + this.form.appId + '&sign=' + this.form.sign + '&cityCode=' + this.form.cityCode + '&recipient=' + this.form.recipient + '&phoneNum=' + this.form.phoneNum

      if(this.form.appId===''|| this.form.sign===''|| this.form.cityCode===''|| this.form.recipient===''|| this.form.phoneNum===''){
        //console.log(this.form.sign)
        let msg = {title: '提示', message: '请输入信息！', type: 'warning'}
        this.$notify(msg)
      }else{

        this.$axios({
          method: 'post',
          url: url,
        }).then(response => {
          let msg = {title: '成功', message: '提交成功！', type: 'success'}
          this.$notify(msg)
        }).catch(error => {
          let msg = {title: '失败', message: '提交失败！', type: 'error'}
          this.$notify(msg)
        }).finally(() => this.loading = false)

        this.dialogFormVisible = false

      }


    },

    searchCityCode(cityObj) {
      return cityObj.value === this.form.state2
    },

    //通过第三方接口获取城市名push到cityname
    getCity() {
      //官方推荐的axios 代替传统ajax
      this.$axios({
        method: 'get',
        url: 'http://47.93.193.61/json/city.json',
      }).then(res => {
        for (let i = 0; i < res.data.length; i++) {
          let obj = {'value': res.data[i].city_name, 'cityCode': res.data[i].city_code}
          this.cityname.push(obj)
        }
      }).catch(error => {
        console.log(error)
      }).finally(() => this.loading = false)


    },

    querySearch(queryString, cb) {
      var restaurants = this.restaurants
      var results = queryString ? restaurants.filter(this.createFilter(queryString)) : restaurants
      // 调用 callback回调 返回建议列表的数据
      cb(results)
      this.form.cityCode = this.cityname.find(this.searchCityCode).cityCode
    },

    createFilter(queryString) {
      return (restaurant) => {
        return (restaurant.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0)
      }
    },
    loadAll() {
      return this.cityname
    },

    handleSelect(item) {
      //console.log(item)
    },
    resetForm(formName) {
      this.$refs[formName].resetFields()
    }

  },
}
