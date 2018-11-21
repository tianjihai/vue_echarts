<template>
  <div id="app">
    <img src="./assets/logo.png">

    <!--路由跳转后页面的呈现部分-->
    <router-view/>
  </div>
</template>

<!--??-->
<script>
export default {
  name: 'App'
}

</script>

<style>
  *{
    cursor: default;
  }
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 30px;
}
</style>
