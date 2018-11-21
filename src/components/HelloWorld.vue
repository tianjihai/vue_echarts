<template>
  <div class="hello">

    <el-button @click="goPage2">跳转到图表页面</el-button>
    <el-button @click="goPage3">跳转到空气质量图页面</el-button>
    <el-button @click="send">vue axios请求</el-button>
    <h1>{{ msg }}</h1>
    <h2>vue-cli</h2>


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
      },
      send(){
        this.$axios({
          method:'get',
          url:'http://t.weather.sojson.com/api/weather/city/101030100'
        }).then(function(resp){
          console.log(resp.data);
        }).catch(resp => {
          console.log('请求失败：'+resp.status+','+resp.statusText);
        });
      },
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

  .text {
    font-size: 14px;
  }

  .item {
    padding: 18px 0;
  }

  .box-card {
    width: 480px;
    border-radius: 10px 10px 10px 10px;
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
