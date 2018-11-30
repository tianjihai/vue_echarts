<template>
  <div>
    <img src="../assets/bg-weather.jpg" alt="">

    <el-row class="demo-autocomplete">
      <el-col :span="12">
        <div class="sub-title">激活即列出输入建议</div>
        <el-autocomplete
          class="inline-input"
          v-model="state1"
          :fetch-suggestions="querySearch"
          placeholder="请输入内容"
          @select="handleSelect"
        ></el-autocomplete>
      </el-col>

      <el-col :span="12">
        <div class="sub-title">输入后匹配输入建议</div>
        <el-autocomplete
          class="inline-input"
          v-model="state2"
          :fetch-suggestions="querySearch"
          placeholder="请输入内容"
          :trigger-on-focus="false"
          @select="handleSelect"
        ></el-autocomplete>
      </el-col>
    </el-row>

    <el-button @click="goBack">回到初始页</el-button>
    <h1>城市天气预报</h1>


    <el-card class="box-card card">

      <div id="myChart" :style="{width: '1000px', height: '400px'}"></div>
    </el-card>



    <div>
      要加密的数据： <el-input v-model="d1" ></el-input>
      要解密的数据： <el-input v-model="d2" ></el-input>
      <el-button type="primary" @click="jiami" plain>加密</el-button>
      <el-button type="primary" @click="jiemi" plain>解密</el-button>

    </div>
  </div>
</template>

<script>
  import Swiper from 'swiper';
  import 'swiper/dist/css/swiper.min.css';

  import CryptoJS from 'crypto-js/crypto-js'
  import 'aes-js/index'

  /**
   * 加密（需要先加载lib/aes/aes.min.js文件）
   * @param word
   * @returns {*}
   */
  function encrypt(word){
    var key = CryptoJS.enc.Utf8.parse("6145986487626488");
    var srcs = CryptoJS.enc.Utf8.parse(word);
    var encrypted = CryptoJS.AES.encrypt(srcs, key, {mode:CryptoJS.mode.ECB,padding: CryptoJS.pad.Pkcs7});
    return encrypted.toString();
  }

  /**
   * 解密
   * @param word
   * @returns {*}
   */
  function decrypt(word){
    var key = CryptoJS.enc.Utf8.parse("6145986487626488");
    var decrypt = CryptoJS.AES.decrypt(word, key, {mode:CryptoJS.mode.ECB,padding: CryptoJS.pad.Pkcs7});
    return CryptoJS.enc.Utf8.stringify(decrypt).toString();
  }

  export default {
    data() {
      return {
        restaurants: [],
        state1: '',
        state2: ''
      };
    },
    name: "page2",
    mounted() {
      this.restaurants = this.loadAll();
      this.drawLine();
      let mySwiper = new Swiper('.swiper-container', {});
    },
    methods: {
      jiami(){
        console.log("加密-----",this.d1);
        let dd = encrypt(this.d1)
        console.log(dd)
      },
      jiemi(){
        console.log("解密-----",this.d2);
        let dd2= decrypt(this.d2)
        console.log(dd2);
      },
      goBack() {
        this.$router.push('/')
      },

      drawLine() {
        let aqi = [];
        let date = [];
        $.ajax({
          type: 'GET',
          async: false,
          url: 'http://t.weather.sojson.com/api/weather/city/101030100',
          dataType: 'json',
          success: function (res) {
            console.log(res);
                let aqiArray = [];
            let dateArray = [];
            for (let i = 0; i < res.data.forecast.length; i++) {
              aqiArray.push(res.data.forecast[i].aqi);
              dateArray.push(res.data.forecast[i].date);
            }
            aqi = aqiArray;
            date = dateArray;
          }
        });

        console.log(aqi);
        console.log(date);

        // 基于准备好的dom，初始化echarts实例
        let myChart = this.$echarts.init(document.getElementById('myChart'));
        // 绘制图表
        myChart.setOption({

          title: {text: '空气质量AQI'},
          tooltip: {},
          xAxis: {
            data: date
          },
          yAxis: {},
          series: [{
            name: '空气质量AQI',
            type: 'line',
            data: aqi
          }]
        });
      },

      querySearch(queryString, cb) {
        var restaurants = this.restaurants;
        var results = queryString ? restaurants.filter(this.createFilter(queryString)) : restaurants;
        // 调用 callback 返回建议列表的数据
        cb(results);
      },
      createFilter(queryString) {
        return (restaurant) => {
          return (restaurant.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0);
        };
      },
      loadAll() {
        return [
          { "value": "北京市"},
          { "value": "天津市"},
          { "value": "大连市"},
          { "value": "沈阳市"},
          { "value": "吉林市"},
          { "value": "霸州市"},
          { "value": "廊坊市"},
          { "value": "台北市"},
        ];
      },
      handleSelect(item) {
        console.log(item);
      }
    }
  }
</script>

<style scoped>
  img{
    position: absolute;
    top: 0;
    left: 0;
    z-index: -1999;
    width: 100%;
  }
  h1 {
    font-size: 20px;
    color: lightblue;
  }

  #myChart {
    margin: 40px auto;

  }
  .cityname{
    width: 180px;
  }
  .card {
    width: 1000px;
    margin: 0 auto;
  }

</style>

