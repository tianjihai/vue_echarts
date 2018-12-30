<template>
  <div class="main">
    <h1>个人中心</h1>
    <h3>欢迎回来 {name}</h3>


    <!-- Form -->
    <el-button @click="dialogFormVisible = true">设置手机天气预报</el-button>
    <el-button @click="goBack">回到初始页</el-button>
    <el-button @click="refresh">获取数据</el-button>

    <el-dialog title="输入信息" :visible.sync="dialogFormVisible" class="infoDialog">

      <el-form :model="form" class="infoForm">

        <el-form-item label="手机号" prop="phone" :label-width="formLabelWidth" :rules="rules.phone">
          <el-input class="input" v-model="form.phone" type="" autocomplete="off" clearable></el-input>
        </el-form-item>
        <el-form-item label="姓名" prop="name" :label-width="formLabelWidth" :rules="rules.name">
          <el-input class="input" v-model="form.name" type="" autocomplete="off" clearable></el-input>
        </el-form-item>
        <el-form-item label="所在城市" prop="city" :label-width="formLabelWidth" :rules="rules.city">
          <el-input class="input" v-model="form.city" type="" autocomplete="off" clearable></el-input>
        </el-form-item>
        <el-form-item label="每日发送时间" prop="time" :label-width="formLabelWidth" :rules="rules.time">
          <el-input class="input" v-model="form.time" type="" autocomplete="off" clearable></el-input>
        </el-form-item>

      </el-form>

      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="infoSubmit">确 定</el-button>
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
