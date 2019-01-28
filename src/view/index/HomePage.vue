<template>
  <div>

    <div class="topBar">
      <el-button type="text" @click="dialogVisible = true" class="loginBtn">登陆</el-button>
    </div>

    <el-dialog
      title="登陆信息"
      :visible.sync="dialogVisible"
      width="30%">

      <el-form :model="loginForm" status-icon :rules="loginRule" ref="loginForm" label-width="100px" class="demo-ruleForm">
        <el-form-item label="用户名" prop="username">
          <el-input  v-model="loginForm.username" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="pass">
          <el-input type="password" v-model="loginForm.pass" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('loginForm')">登陆</el-button>
          <el-button @click="resetForm('loginForm')">重置</el-button>
        </el-form-item>
      </el-form>
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
          空气质量：{{info.uv}}<br/><br/>
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
