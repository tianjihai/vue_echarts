<template>
  <div>

    <div class="topBar">
      <el-button type="text" @click="dialogVisible = true" class="loginBtn">登陆</el-button>
    </div>

    <el-dialog
      title="登陆信息"
      :visible.sync="dialogVisible"
      width="30%">

      <el-input
        placeholder="请输入用户名"
        v-model="username"
        clearable>
      </el-input>

      <el-input
        type="password"
        placeholder="请输入密码"
        v-model="password"
        clearable>
      </el-input>

      <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="GRZX">登 陆</el-button>
      </span>
    </el-dialog>

    <div class="hello">
      <el-card class="box-card tempInfo">
        <p style="font-size: 10px;">{{info.city}}<br/></p>
        <p style="font-size: 10px;">中央气象台 {{info.time}} 发布 <br/></p>
        <span class="wendu" id="temp">{{info.temp}}</span><span class="wendu">°</span><span class="tgwd">体感温度</span><br/>

        <div class="info">
          风向： {{info.windDirect}} {{info.windLevel}}<br/>
          湿度： {{info.wet}} <br/>
          今日气温：{{info.todayTemp}} <br/>
          紫外线强度：{{info.uv}}<br/><br/>
          <b style="font-size: 16px;">提醒您：{{info.advice}}</b>
        </div>

        <img id="sunImg" src="../../assets/sun.png" alt="">


      </el-card>

      <div style="float: left;width: 100%;margin: 0 auto;margin: 20px;">
        <el-col>
          <el-autocomplete
            style="width: 300px;"
            class="inline-input"
            v-model="state2"
            :fetch-suggestions="querySearch"
            placeholder="搜索其它城市天气"
            :trigger-on-focus="false"
            @select="handleSelect"
          ></el-autocomplete>
          <el-button @click="send">搜索</el-button>
        </el-col>
      </div>


      <div style="margin-top: 300px;">

        <el-button @click="goPage2">近五天的天气情况</el-button>
        <el-button @click="goPage3">全国空气质量监控</el-button>


      </div>
    </div>
  </div>

</template>


<script>
  import HomePage from './HomePage.js'

  export default HomePage
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<!--use scss-->
<style scoped lang="scss">
  @import url("./HomePage.scss");
</style>
