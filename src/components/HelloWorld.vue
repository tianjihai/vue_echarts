<template>
  <div class="hello">
    <button @click="goPage2">跳转到图表页面</button>
    <button @click="goPage3">跳转到空气质量图页面</button>
    <h1>{{ msg }}</h1>
    <h2>图表使用echarts</h2>




  </div>

</template>



<script>

  export default {
    name: 'HelloWorld',
    data() {
      return {
        msg: '该页面是使用vue-cli脚手架完成'
      }
    },
    methods: {
      goPage2(){
        this.$router.push('/page2')
      },
      goPage3(){
        this.$router.push('/page3')
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  h1, h2 {
    font-weight: normal;
  }

  ul {
    list-style-type: none;
    padding: 0;
  }

  li {
    display: inline-block;
    margin: 0 10px;
  }

  a {
    color: #42b983;
  }

</style>

<!--use scss-->
<style lang="scss">
div{
  h2{
    color: lightblue;
    &:hover{
      color: red ;
      transition: color 1s;
    }
  }

}

</style>
