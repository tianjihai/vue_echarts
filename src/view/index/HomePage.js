/**
 * Created by
 * @Auther: tianjihai
 * @Date: 2018-12-26 18:48
 */


/**
 * 加密（需要先加载lib/aes/aes.min.js文件）
 */

import CryptoJS from 'crypto-js/crypto-js'
import 'aes-js/index'
import topMenu from '../../component/topMenu1'
import topMenu2 from '../../component/topMenu2'

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
  name: 'HelloWorld',
  components: {topMenu,topMenu2},
  data() {

    return {
      loginForm: {
        pass: '',
        username: '',
      },
      loginRule: {
        pass: [{required: true, message: '密码？！', trigger: 'blur'}],
        username: [{required: true, message: '姓名呢？！', trigger: 'blur'}],
      },

      info: {
        city: '',
        time: '',
        temp: '',
        windDirect: '',
        windLevel: '',
        wet: '',
        todayTemp: '',
        uv: '',
        advice: '',
      },
      username: '',
      password: '',
      msg: '该页面是使用vue-cli脚手架完成',
      ct: 'aaa',
      restaurants: [],
      state2: '',
      cityname: [],
      cityCode: '',
      dialogVisible: false,
    }
  },

  mounted() {
    this.restaurants = this.loadAll()
    this.send2()
    this.getCity()
  },
  methods: {
    jiami() {
      //console.log('加密-----', this.d1)
      let dd = encrypt(this.d1)
      //console.log(dd)
    },
    jiemi() {
      //console.log('解密-----', this.d2)
      let dd2 = decrypt(this.d2)
      //console.log(dd2)
    },

    // showPosition() {
    // 	let nvaga = navigator.geolocation
    // 	nvaga.getCurrentPosition(updatPos, errorLoca)
    //
    // 	function updatPos(position) {
    // 		let latitude = position.coords.latitude//十进制单位
    // 		let longitude = position.coords.longitude//十进制单位
    // 		let accuracy = position.coords.accuracy//以m为单位制定纬度和经度与实际位置的差距
    // 		let timestamp = position.timestamp
    // 		console.log('经度坐标' + latitude)
    // 		console.log('纬度坐标' + longitude)
    // 		console.log('准确度' + accuracy)
    // 		console.log('获取位置数据的时间' + timestamp)//时间戳
    // 	}
    //
    // 	function errorLoca(error) {
    // 		switch (error.code) {
    // 		case 0:
    // 			console.log('位置信息获取失败，失败原因' + error.message)
    // 			break
    // 		case 1://错误编码 PERMISSION_DENIED
    // 			console.log('用户拒绝共享其位置信息')
    // 			break
    // 		case 2://错误编码 POSITION_UNAVAILABLE
    // 			console.log('尝试获取用户位置数据，但失败了')
    // 			break
    // 		case 3://错误编码 TIMEOUT
    // 			console.log('尝试获取用户的位置数据超时')
    // 			break
    // 		}
    // 	}
    //
    //
    // },

    goPage2() {
      this.$router.push('/page2')
    },
    goPage3() {
      this.$router.push('/page3')
    },
    GRZX() {
      this.$router.push('/my')
    },
    CityWeather() {
      this.$router.push('/cityweather')
    },
    send() {

      let appid = ''
      for (let i = 0; i < 6; i++) {
        appid += Math.floor(Math.random() * 10)
      }
      let sign = encrypt(appid);
      //console.log(this.cityCode);

      this.$axios({
        method: 'get',
        url: 'http://47.93.193.61:8080/getWeatherById?appId='+appid+'&sign='+sign+'&cityCode='+this.cityCode
      }).then(res => {
        console.log(res)
        this.info.city = res.data.cityInfo.city
        this.info.time = res.data.cityInfo.updateTime
        this.info.temp = res.data.data.wendu
        this.info.windDirect = res.data.data.forecast[0].fx
        this.info.windLevel = res.data.data.forecast[0].fl
        this.info.wet = res.data.data.shidu
        this.info.todayTemp = res.data.data.forecast[0].high + res.data.data.forecast[0].low
        this.info.uv = res.data.data.quality
        this.info.advice = res.data.data.ganmao +'   '+ res.data.data.forecast[0].notice
      }).catch(error => {
        console.log(error)
      }).finally(() => this.loading = false)

    },

    send2() {

      let appid = ''
      let cs = '北京'
      for (let i = 0; i < 6; i++) {
        appid += Math.floor(Math.random() * 10)
      }
      let sign = encrypt(appid);

      //官方推荐的axios 代替传统ajax
      this.$axios({
        method: 'get',
        url: 'http://47.93.193.61:8080/getWeatherById?appId='+appid+'&sign='+sign+'&cityCode=101010100'

      }).then(res => {
        this.info.city = res.data.cityInfo.city
        this.info.time = res.data.cityInfo.updateTime
        this.info.temp = res.data.data.wendu
        this.info.windDirect = res.data.data.forecast[0].fx
        this.info.windLevel = res.data.data.forecast[0].fl
        this.info.wet = res.data.data.shidu
        this.info.todayTemp = res.data.data.forecast[0].high + res.data.data.forecast[0].low
        this.info.uv = res.data.data.quality
        this.info.advice = res.data.data.ganmao +'   '+ res.data.data.forecast[0].notice
      })
        .catch(error => {
          console.log(error)
        })
        .finally(() => this.loading = false)
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

    searchCityCode(cityObj) {
      return cityObj.value === this.state2
    },

    querySearch(queryString, cb) {
      var restaurants = this.restaurants
      var results = queryString ? restaurants.filter(this.createFilter(queryString)) : restaurants
      // 调用 callback回调 返回建议列表的数据
      cb(results)
      this.cityCode = this.cityname.find(this.searchCityCode).cityCode;
      console.log(this.cityCode)
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

    //提交登陆信息
    submitForm(formName) {
      this.$router.push('/my')
      // this.$refs[formName].validate((valid) => {
      //   if (valid) {
      //     //  登陆信息提交
      //     this.$axios({
      //       method: 'post',
      //       url: '',
      //       // data: {
      //       //   username: this.loginForm.username,
      //       //   pass: this.loginForm.pass,
      //       // }
      //     }).then(response => {
      //       console.log(response)
      //     })
      //       .catch(error => {
      //         let msg = {title: "提示", message: '无法提交信息', type: "error"};
      //         this.$notify(msg);
      //       })
      //       .finally(() => this.loading = false)
      //
      //     this.dialogFormVisible = false
      //
      //   } else {
      //     console.log('error submit!!')
      //     return false
      //   }
      // })
    },
    resetForm(formName) {
      this.$refs[formName].resetFields()
    }


  },


}
