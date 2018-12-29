<template>
  <div>
    <div id="echart2" :style="{width: '1400px', height: '800px'}"></div>
    <el-button @click="goBack">回到初始页</el-button>
  </div>
</template>

<script>
  import page3 from './page3.js'
  export default page3
</script>

<style scoped lang="scss">
  @import url(./page3.scss);
</style>
