<template>
  <div id="app">
    <!--<img src="./assets/logo.png">-->
    <img src="./assets/bg-weather.jpg" alt="">
    <vue-particles
      color="#fff"
      :particleOpacity="0.7"
      :particlesNumber="60"
      shapeType="circle"
      :particleSize="4"
      linesColor="#fff"
      :linesWidth="1"
      :lineLinked="true"
      :lineOpacity="0.4"
      :linesDistance="150"
      :moveSpeed="2"
      :hoverEffect="true"
      hoverMode="grab"
      :clickEffect="true"
      clickMode="push"
      class="lizi"
      style=""
    >
    </vue-particles>

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
  * {
    cursor: default;
  }

  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
  }

  img {
    position: absolute;
    z-index: -11;
    top: 0;
    left: 0;
    width: 100%;
  }

  #particles-js {
    z-index: 22;
    height: 300px;
  }
</style>
