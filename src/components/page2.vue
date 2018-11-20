<template>
  <div>
    <button @click="goBack">回到初始页</button>
    <h1>This is page 2!</h1>
    <div id="myChart" :style="{width: '600px', height: '400px'}"></div>
  </div>
</template>

<script>
  export default {
    name: "page2",
    mounted(){
      this.drawLine();
    },
    methods: {
      goBack() {
        this.$router.push('/')
      },
      drawLine() {
        // 基于准备好的dom，初始化echarts实例
        let myChart = this.$echarts.init(document.getElementById('myChart'))
        // 绘制图表
        myChart.setOption({
          title: {text: '在Vue中使用echarts'},
          tooltip: {},
          xAxis: {
            data: ["衬衫", "羊毛衫", "雪纺衫", "裤子", "高跟鞋", "袜子"]
          },
          yAxis: {},
          series: [{
            name: '销量',
            type: 'line',
            data: [5, 20, 36, 10, 10, 20]
          }]
        });
      },
    }
  }
</script>

<style scoped>
  h1 {
    font-size: 20px;
    color: lightblue;
  }

  #myChart{
    border: 1px solid red;
    margin: 40px auto;

  }
</style>
