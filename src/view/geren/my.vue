<template>
  <div class="main">
     <h2>个人中心</h2>


    <!-- Form -->
    <el-button  @click="dialogFormVisible = true">手机天气预报</el-button>
    <el-button @click="goBack">回到初始页</el-button>
    <el-button @click="refresh">获取数据</el-button>

    <el-dialog title="个人信息" :visible.sync="dialogFormVisible">
      <el-form :model="form">
        <el-form-item label="手机号" :label-width="formLabelWidth">
          <el-input v-model="form.phone" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="姓名" :label-width="formLabelWidth">
          <el-input v-model="form.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="时间" :label-width="formLabelWidth">
          <el-input v-model="form.time" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
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
  .main{
    position: absolute;
    width: 1000px;
    left: 50%;
    top: 0%;
    margin: 140px -600px;
    padding: 40px 100px;
    background-color: #f7f9fe;
    box-shadow: 0 0 30px lightgray;
    border-radius: 20px 20px 20px 20px;
  }
  h2{
    text-align: left;
  }
</style>
