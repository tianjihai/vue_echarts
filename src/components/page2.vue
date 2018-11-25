<template>
  <div>
    <!--<el-button-->
      <!--plain-->
      <!--@click="open3">-->
      <!--成功-->
    <!--</el-button>-->
    <!--<el-button-->
      <!--plain-->
      <!--@click="open4">-->
      <!--警告-->
    <!--</el-button>-->
    <!--<el-button-->
      <!--plain-->
      <!--@click="open5">-->
      <!--消息-->
    <!--</el-button>-->
    <!--<el-button-->
      <!--plain-->
      <!--@click="open6">-->
      <!--错误-->
    <!--</el-button>-->

    <el-button @click="goBack">回到初始页</el-button>
    <!--<h1>This is page 2!</h1>-->

    <!--<el-card class="box-card card">-->
      <!--<div class="swiper-container card-container">-->
        <!--<div class="swiper-wrapper">-->
          <!--<div class="swiper-slide">-->
            <!--<div id="slide1">-->
              <!--第一页-->
            <!--</div>-->
          <!--</div>-->
          <!--<div class="swiper-slide">-->
            <!--<div id="slide2">-->
              <!--第二页-->
            <!--</div>-->
          <!--</div>-->
          <!--<div class="swiper-slide">-->
            <!--<div id="slide3">-->
              <!--第三页-->
            <!--</div>-->
          <!--</div>-->
        <!--</div>-->
      <!--</div>-->
    <!--</el-card>-->

    <div id="myChart" :style="{width: '1000px', height: '400px'}"></div>
    <div id="myChart2" :style="{width: '1000px', height: '400px'}"></div>

  </div>
</template>

<script>
  import Swiper from 'swiper';
  import 'swiper/dist/css/swiper.min.css';

  import CryptoJS from 'crypto-js/crypto-js'
  import 'aes-js/index'

  /**
   * 加密（需要先加载lib/aes/aes.min.js文件）
   */
  function encrypt(word){
    var key = CryptoJS.enc.Utf8.parse("6145986487626488");
    var srcs = CryptoJS.enc.Utf8.parse(word);
    var encrypted = CryptoJS.AES.encrypt(srcs, key, {mode:CryptoJS.mode.ECB,padding: CryptoJS.pad.Pkcs7});
    return encrypted.toString();
  }

  /**
   * 解密
   */
  function decrypt(word){
    var key = CryptoJS.enc.Utf8.parse("6145986487626488");
    var decrypt = CryptoJS.AES.decrypt(word, key, {mode:CryptoJS.mode.ECB,padding: CryptoJS.pad.Pkcs7});
    return CryptoJS.enc.Utf8.stringify(decrypt).toString();
  }




  export default {
    name: "page2",
    mounted() {
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
        let high = [];
        let low = [];
        $.ajax({
          type: 'GET',
          async: false,
          url: 'http://t.weather.sojson.com/api/weather/city/101030100',
          dataType: 'json',
          success: function (res) {
            console.log(res);
            let aqiArray = [];
            let dateArray = [];
            let highTemp = [];
            let lowTemp = [];

            for (let i = 0; i < res.data.forecast.length; i++) {
              aqiArray.push(res.data.forecast[i].aqi);
              dateArray.push(res.data.forecast[i].date);
              highTemp.push(parseInt(res.data.forecast[i].high.substring(1).substring(1).substring(1)));
              lowTemp.push(parseInt(res.data.forecast[i].low.substring(1).substring(1).substring(1)));
            }
            aqi = aqiArray;
            date = dateArray;
            high = highTemp;
            low = lowTemp;
          }
        });

        console.log(aqi);
        console.log(date);
        console.log(high);
        console.log(low);

        // 基于准备好的dom，初始化echarts实例
        let myChart = this.$echarts.init(document.getElementById('myChart'));
        // 绘制图表
        myChart.setOption({

          title: {text: '近五天的空气质量AQI'},
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


        // 基于准备好的dom，初始化echarts实例
        let myChart2 = this.$echarts.init(document.getElementById('myChart2'));
        // 绘制图表
        myChart2.setOption({

          title: {
            text: '近五天天气情况'
          },
          tooltip: {
            trigger: 'axis'
          },
          legend: {
            data:['最高气温','最低气温']
          },
          xAxis: {
            data: date
          },
          yAxis: {
          },
          series: [
            {
              name:'最高气温',
              type:'line',
              stack: '总量',
              data: high
            },
            {
              name:'最低气温',
              type:'line',
              stack: '总量',
              data: low
            }
          ]
        });


      },
      open3() {
        this.$notify({
          title: '成功',
          message: '这是一条成功的提示消息',
          type: 'success'
        });
      },

      open4() {
        this.$notify({
          title: '警告',
          message: '这是一条警告的提示消息',
          type: 'warning'
        });
      },

      open5() {
        this.$notify.info({
          title: '消息',
          message: '这是一条消息的提示消息'
        });
      },

      open6() {
        this.$notify.error({
          title: '错误',
          message: '这是一条错误的提示消息'
        });
      }
    }
  }
</script>

<style scoped>
  h1 {
    font-size: 20px;
    color: lightblue;
  }

  #myChart {
    margin: 40px auto;

  }
  #myChart2 {
    margin: 40px auto;

  }

  #slide1, #slide2, #slide3 {
    margin: 0 auto;
    width: 700px;
    height: 100px;
    border-radius: 20px 20px 20px 20px;
  }

  #slide1 {
    background: lightcyan;
  }

  #slide2 {
    background: lightcoral;
  }

  #slide3 {
    background: lightgreen;
  }

  .card {
    width: 800px;
    margin: 0 auto;
  }

  .card-container {
    width: 700px;
  }

</style>

