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
				name: '',
				region: '',
				date1: '',
				date2: '',
				delivery: false,
				type: [],
				resource: '',
				desc: ''
			},
			formLabelWidth: '120px'
		}
	},
	methods:{
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
	}
}
