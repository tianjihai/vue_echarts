<template>
  <div>
    <img src="../../assets/bg-weather.jpg" alt="">

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
  import TestPage from './TestPage.js'
  export default TestPage
</script>

<style scoped lang="scss">
  @import url("./TestPage.scss");
</style>

