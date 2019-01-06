/**
 * Created by
 * @Auther: tianjihai
 * @Date: 2018-12-28 18:47
 */

export default {
  name: 'my',

  data() {
    return {
      dialogTableVisible: false,
      dialogFormVisible: false,
      form: {
        phone: '',
        name: '',
        time: '',
        city: '',
      },
      /* 各个字段的校验规则定义 */
      rules: {
        phone: [{required: true, message: '填手机号。！', trigger: 'blur'}],
        name: [{required: true, message: '姓名呢？！', trigger: 'blur'}],
        time: [{required: true, message: '写个时间啊!', trigger: 'blur'}],
        city: [{required: true, message: '写个地儿啊!', trigger: 'blur'}],
      },

      formLabelWidth: '120px'
    }
  },
  methods: {
    goBack() {
      this.$router.push('/')
    },
    refresh() {
      this.$axios({
        method: 'get',
        url: 'http://t.weather.sojson.com/api/weather/city/101030100',
        // data: {
        //   firstName: 'Fred',
        //   lastName: 'Flintstone'
        // }
      }).then(response => {
        console.log(response)
      })
        .catch(error => {
          console.log(error)
        })
        .finally(() => this.loading = false)
    },

    /*信息提交*/
    infoSubmit() {
      this.$axios({
        method: 'post',
        url: '',
        // data: {
        //   phone: this.form.phone,
        //   name: this.form.name,
        //   time: this.form.time,
        //   city: this.form.city,
        // }
      }).then(response => {
        console.log(response)
      })
        .catch(error => {
          console.log(error)
          alert('无法提交信息')
        })
        .finally(() => this.loading = false)

      this.dialogFormVisible = false;

    }

  }
}
