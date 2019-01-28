<template>
  <div class="main">
    <h1>个人中心</h1>
    <h3>欢迎回来</h3>


    <!-- Form -->
    <el-button @click="dialogFormVisible = true">设置手机天气预报</el-button>
    <el-button @click="goBack">回到初始页</el-button>
    <el-button @click="refresh">刷新</el-button>

    <el-dialog title="输入信息" :visible.sync="dialogFormVisible" class="infoDialog">

      <el-form :model="form" class="infoForm" ref="form">

        <el-form-item label="手机号" prop="phoneNum" :label-width="formLabelWidth" :rules="rules.phoneNum">
          <el-input class="input" placeholder="填写手机号" v-model="form.phoneNum" type="" autocomplete="off" clearable ></el-input>
        </el-form-item>
        <el-form-item label="姓名" prop="recipient" :label-width="formLabelWidth" :rules="rules.recipient">
          <el-input class="input" placeholder="填写姓名" v-model="form.recipient" type="" autocomplete="off" clearable></el-input>
        </el-form-item>
        <el-form-item label="所在城市" prop="state2" :label-width="formLabelWidth" :rules="rules.state2">
          <el-autocomplete
            class="input"
            v-model="form.state2"
            :fetch-suggestions="querySearch"
            placeholder="填写城市名"
            :trigger-on-focus="false"
            @select="handleSelect"
          ></el-autocomplete>
        </el-form-item>
        <el-form-item label="城市编号" prop="cityCode" :label-width="formLabelWidth" >
          <el-input class="input" v-model="form.cityCode" type="" autocomplete="off" readonly="readonly"></el-input>
        </el-form-item>

      </el-form>

      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button @click="resetForm('form')">重 置</el-button>
        <el-button type="primary" @click="infoSubmit">提 交</el-button>
      </div>

    </el-dialog>


  </div>
</template>

<script>
  import my from './my.js'

  export default my
</script>

<style scoped lang="scss">
  @import url("./my.scss");



</style>
