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
        // let shiJian = res.data.result.sk.time;
        // let wenDu = res.data.result.sk.temp;

        // let fengXiang = res.data.result.sk.wind_direction;
        // let fengJi = res.data.result.sk.wind_strength;
        // let shiDu = res.data.result.sk.humidity;
        // let jinRiTemp = res.data.result.today.temperature;
        // let ziWaiXian = res.data.result.today.uv_index;
        // let jianYi = res.result.data.today.dressing_advice;
      },
      username: '',
      password: '',
      msg: '该页面是使用vue-cli脚手架完成',
      ct: 'aaa',
      restaurants: [],
      state2: '',
      cityname: [
        {'value': '北京'},
        {'value': '天津'},
        {'value': '大连'},
        {'value': '沈阳'},
        {'value': '吉林'},
        {'value': '霸州'},
        {'value': '廊坊'},
        {'value': '台北'},
        {'value': '上海'},
        {'value': '香港'},
        {'value': '澳门'},
        {'value': '哈尔滨'},
        {'value': '南京'},
        {'value': '杭州'},
        {'value': '长沙'},
      ],
      dialogVisible: false,
    }
  },

  mounted() {
    this.restaurants = this.loadAll()
    this.send2()
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

      let appid = '';
      
      let cs = this.state2;
      for (let i = 0; i < 6; i++) {
        appid += Math.floor(Math.random() * 10)
      }
      let sign = encodeURIComponent(encrypt(appid))
      let city = encodeURIComponent(encodeURIComponent(cs))

      this.$axios({
        method: 'get',
        url: '/api/getWeatherByName?appId=' + appid + '&sign=' + sign + '&cityname=' + city + '&dtype=json&format=1',
      }).then(res => {

        this.info.city = res.data.result.today.city
        this.info.time = res.data.result.sk.time
        this.info.temp = res.data.result.sk.temp
        this.info.windDirect = res.data.result.sk.wind_direction
        this.info.windLevel = res.data.result.sk.wind_strength
        this.info.wet = res.data.result.sk.humidity
        this.info.todayTemp = res.data.result.today.temperature
        this.info.uv = res.data.result.today.uv_index
        this.info.advice = res.data.result.today.dressing_advice

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
      // http://47.93.193.61:8080/getWeatherByName?appId='+appid+'&sign='+sign+'&cityname='+city+'&dtype=json&format=1
      let sign = encodeURIComponent(encrypt(appid))
      let city = encodeURIComponent(encodeURIComponent(cs))


      //官方推荐的axios 代替传统ajax
      this.$axios({
        method: 'get',
        url: '/api/getWeatherByName?appId=' + appid + '&sign=' + sign + '&cityname=' + city + '&dtype=json&format=1',
        // data: {
        //   firstName: 'Fred',
        //   lastName: 'Flintstone'
        // }
      }).then(res => {
        this.info.city = res.data.result.today.city
        this.info.time = res.data.result.sk.time
        this.info.temp = res.data.result.sk.temp
        this.info.windDirect = res.data.result.sk.wind_direction
        this.info.windLevel = res.data.result.sk.wind_strength
        this.info.wet = res.data.result.sk.humidity
        this.info.todayTemp = res.data.result.today.temperature
        this.info.uv = res.data.result.today.uv_index
        this.info.advice = res.data.result.today.dressing_advice
      })
        .catch(error => {
          console.log(error)
        })
        .finally(() => this.loading = false)
    },

    getCity() {
      $.ajax({
        type: 'GET',
        async: false,
        url: 'http://t.weather.sojson.com/api/weather/city/101030100',
        dataType: 'json',
        success: function (res) {

          for (let j = 0; j < res.result.length; j++) {

          }

        }
      })
    },
    querySearch(queryString, cb) {
      var restaurants = this.restaurants
      var results = queryString ? restaurants.filter(this.createFilter(queryString)) : restaurants
      // 调用 callback 返回建议列表的数据
      cb(results)
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


    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          alert(this.loginForm.username)

          //  登陆信息提交
          this.$axios({
            method: 'post',
            url: '',
            // data: {
            //   username: this.loginForm.username,
            //   pass: this.loginForm.pass,
            // }
          }).then(response => {
            console.log(response)
          })
            .catch(error => {
              console.log(error)
              alert('无法提交信息')
            })
            .finally(() => this.loading = false)

          this.dialogFormVisible = false

        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    resetForm(formName) {
      this.$refs[formName].resetFields()
    }


  },


}
