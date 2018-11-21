<template>
  <div>
    <el-button
      plain
      @click="open3">
      成功
    </el-button>
    <el-button
      plain
      @click="open4">
      警告
    </el-button>
    <el-button
      plain
      @click="open5">
      消息
    </el-button>
    <el-button
      plain
      @click="open6">
      错误
    </el-button>

    <el-button @click="goBack">回到初始页</el-button>
    <h1>This is page 2!</h1>
    <div id="myChart" :style="{width: '600px', height: '400px'}"></div>


    <div class="swiper-container">
      <div class="swiper-wrapper">
        <div class="swiper-slide">
          <div style="height: 30px;background: lightcyan;"></div>
        </div>
        <div class="swiper-slide">
          <div style="height: 30px;background: lightblue;"></div>
        </div>
        <div class="swiper-slide">
          <div style="height: 30px;background: lightgreen;"></div>
        </div>
      </div>
    </div>


  </div>
</template>

<script>
  import Swiper from 'swiper';
  import 'swiper/dist/css/swiper.min.css';

  export default {
    name: "page2",
    mounted() {
      this.drawLine();
      let mySwiper = new Swiper('.swiper-container', {});
    },
    methods: {
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
    border: 1px solid red;
    margin: 40px auto;

  }
</style>

