<template>
  <div>

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
  import page2 from './page2.js'
  export default page2
</script>

<style scoped lang="scss">
  @import url("./page2.scss");
</style>

