<template>
  <div class="hello">

    <el-card class="box-card tempInfo">

      <p style="font-size: 10px;"><span id="city"></span><br/></p>
      <p style="font-size: 10px;">中央气象台 <span id="time"></span> 发布<br/></p>
      <span class="wendu" id="temp"></span><span class="wendu">°</span><span class="tgwd">体感温度</span><br/>

      <div class="info">
        风向： <span id="wind"></span> <span id="windlv"></span><br/>
        湿度： <span id="wet"></span> <br/>
        今日气温：<span id="todaytemp"></span> <br/>
        紫外线强度：<span id="uv"></span><br/><br/>
        <b style="font-size: 16px;">海海提醒您：<span id="advice"></span></b>
      </div>

      <img id="sunImg" src="../assets/sun.png" alt="">


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
      <!--<el-button @click="CityWeather">查看天气预报</el-button>-->
      <!--<el-button @click="showPosition">获取定位</el-button>-->

      <!--<h1>{{ msg }} {{state2}}</h1>-->
      <!--<h2>vue-cli</h2>-->

    </div>


  </div>

</template>


<script>

  import CryptoJS from 'crypto-js/crypto-js'
  import 'aes-js/index'

  /**
   * 加密（需要先加载lib/aes/aes.min.js文件）
   */
  function encrypt(word) {
    var key = CryptoJS.enc.Utf8.parse("6145986487626488");
    var srcs = CryptoJS.enc.Utf8.parse(word);
    var encrypted = CryptoJS.AES.encrypt(srcs, key, {mode: CryptoJS.mode.ECB, padding: CryptoJS.pad.Pkcs7});
    return encrypted.toString();
  }

  /**
   * 解密
   */
  function decrypt(word) {
    var key = CryptoJS.enc.Utf8.parse("6145986487626488");
    var decrypt = CryptoJS.AES.decrypt(word, key, {mode: CryptoJS.mode.ECB, padding: CryptoJS.pad.Pkcs7});
    return CryptoJS.enc.Utf8.stringify(decrypt).toString();
  }


  export default {
    name: 'HelloWorld',

    data() {
      return {

        msg: '该页面是使用vue-cli脚手架完成',
        ct: 'aaa',
        restaurants: [],
        state2: '',
        cityname: [
          {"value": "北京"},
          {"value": "天津"},
          {"value": "大连"},
          {"value": "沈阳"},
          {"value": "吉林"},
          {"value": "霸州"},
          {"value": "廊坊"},
          {"value": "台北"},
          {"value": "上海"},
          {"value": "香港"},
          {"value": "澳门"},
          {"value": "哈尔滨"},
          {"value": "南京"},
          {"value": "杭州"},
          {"value": "长沙"},

        ],
      };
    },

    mounted() {
      this.restaurants = this.loadAll();
      this.send2();
    },
    methods: {
      jiami() {
        console.log("加密-----", this.d1);
        let dd = encrypt(this.d1)
        console.log(dd)
      },
      jiemi() {
        console.log("解密-----", this.d2);
        let dd2 = decrypt(this.d2)
        console.log(dd2);
      },

      showPosition() {

        let nvaga = navigator.geolocation;
        nvaga.getCurrentPosition(updatPos, errorLoca);

        function updatPos(position) {
          let latitude = position.coords.latitude;//十进制单位
          let longitude = position.coords.longitude;//十进制单位
          let accuracy = position.coords.accuracy;//以m为单位制定纬度和经度与实际位置的差距
          let timestamp = position.timestamp;
          console.log('经度坐标' + latitude);
          console.log('纬度坐标' + longitude);
          console.log('准确度' + accuracy);
          console.log('获取位置数据的时间' + timestamp);//时间戳
        }

        function errorLoca(error) {
          switch (error.code) {
            case 0:
              console.log('位置信息获取失败，失败原因' + error.message);
              break;
            case 1://错误编码 PERMISSION_DENIED
              console.log('用户拒绝共享其位置信息');
              break;
            case 2://错误编码 POSITION_UNAVAILABLE
              console.log('尝试获取用户位置数据，但失败了');
              break;
            case 3://错误编码 TIMEOUT
              console.log('尝试获取用户的位置数据超时');
              break;
          }
        }


      },

      goPage2() {
        this.$router.push('/page2')
      },
      goPage3() {
        this.$router.push('/page3')
      },
      CityWeather() {
        this.$router.push('/cityweather')
      },
      send() {

        $("#city").empty();
        $("#time").empty();
        $("#temp").empty();
        $("#wind").empty();
        $("#windlv").empty();
        $("#wet").empty();
        $("#todaytemp").empty();
        $("#uv").empty();
        $("#advice").empty();

        let appid = "";
        let cs = this.state2;
        for (let i = 0; i < 6; i++) {
          appid += Math.floor(Math.random() * 10);
        }
        let sign = encodeURIComponent(encrypt(appid));
        let city = encodeURIComponent(encodeURIComponent(cs));

        $.ajax({
          type: 'GET',
          async: false,
          url: '/api/getWeatherByName?appId=' + appid + '&sign=' + sign + '&cityname=' + city + '&dtype=json&format=1',
          dataType: 'json',
          success: function (res) {
            console.log(res);


            let chengShi = res.result.today.city;
            let shiJian = res.result.sk.time;
            let wenDu = res.result.sk.temp;
            let fengXiang = res.result.sk.wind_direction;
            let fengJi = res.result.sk.wind_strength;
            let shiDu = res.result.sk.humidity;
            let jinRiTemp = res.result.today.temperature;
            let ziWaiXian = res.result.today.uv_index;
            let jianYi = res.result.today.dressing_advice;

            $("#city").append(chengShi);
            $("#time").append(shiJian);
            $("#temp").append(wenDu);
            $("#wind").append(fengXiang);
            $("#windlv").append(fengJi);
            $("#wet").append(shiDu);
            $("#todaytemp").append(jinRiTemp);
            $("#uv").append(ziWaiXian);
            $("#advice").append(jianYi);

          },
          error: function () {

          }
        });
      },
      send2() {

        let appid = '';
        let cs = '北京';
        for (let i = 0; i < 6; i++) {
          appid += Math.floor(Math.random() * 10);
        }
        // http://47.93.193.61:8080/getWeatherByName?appId='+appid+'&sign='+sign+'&cityname='+city+'&dtype=json&format=1
        let sign = encodeURIComponent(encrypt(appid));
        let city = encodeURIComponent(encodeURIComponent(cs));

        $.ajax({
          type: 'GET',
          async: false,
          url: '/api/getWeatherByName?appId=' + appid + '&sign=' + sign + '&cityname=' + city + '&dtype=json&format=1',
          dataType: 'json',
          success: function (res) {
            //console.log(res.result.future);

            let chengShi = res.result.today.city;
            let shiJian = res.result.sk.time;
            let wenDu = res.result.sk.temp;
            let fengXiang = res.result.sk.wind_direction;
            let fengJi = res.result.sk.wind_strength;
            let shiDu = res.result.sk.humidity;
            let jinRiTemp = res.result.today.temperature;
            let ziWaiXian = res.result.today.uv_index;
            let jianYi = res.result.today.dressing_advice;

            $("#city").append(chengShi);
            $("#time").append(shiJian);
            $("#temp").append(wenDu);
            $("#wind").append(fengXiang);
            $("#windlv").append(fengJi);
            $("#wet").append(shiDu);
            $("#todaytemp").append(jinRiTemp);
            $("#uv").append(ziWaiXian);
            $("#advice").append(jianYi);


          }
        });
      },
      getCity() {
        $.ajax({
          type: 'GET',
          async: false,
          url: 'http://t.weather.sojson.com/api/weather/city/101030100',
          dataType: 'json',
          success: function (res) {

            for (let j = 0; j < res.result.length; j++) {

            }

          }
        });
      },
      querySearch(queryString, cb) {
        var restaurants = this.restaurants;
        var results = queryString ? restaurants.filter(this.createFilter(queryString)) : restaurants;
        // 调用 callback 返回建议列表的数据
        cb(results);
      },
      createFilter(queryString) {
        return (restaurant) => {
          return (restaurant.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0);
        };
      },
      loadAll() {
        return this.cityname;
      },
      handleSelect(item) {
        console.log(item);
      }

    },


  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  #tianqi {
    margin: 40px auto;

  }
  .hello {
    width: 100%;
  }

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

  .tempInfo {
    color: gray;
    padding: 40px;
    text-align: left;
    position: absolute;
    top: 0;
    left: 50%;
    margin: 140px -500px;
    border: 0;
    box-shadow: 0 0 30px lightgray;
    width: 1000px;
    border-radius: 20px 20px 20px 20px;
  }

  .info {
    font-size: 14px;
  }

  #sunImg {
    z-index: 11111;
    width: 160px;
    left: 80%;
    margin-top: 130px;
    margin-left: -80px;
    animation:big 2s infinite;
  }

  @keyframes big
  {
    0% {width:140px;}
    50% {
      width:160px;
      left: 80%;
      margin-top: 120px;
      margin-left: -80px;
    }
    100% {width:140px;}
  }

  .tgwd {
    margin-left: 25px;
  }

  .wendu {
    font-size: 90px;
    color: lightblue;
    font-weight: bold;
  }

</style>


<!--use scss-->
<style lang="scss">
  div {
    h2 {
      color: lightblue;
      &:hover {
        color: red;
        transition: color 1s;
      }
    }

  }

</style>
