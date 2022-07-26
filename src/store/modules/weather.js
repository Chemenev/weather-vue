const API_KEY = 'b35878a2c5ab36e25486221e2dcd1cc3';
const URL = 'http://api.openweathermap.org/data/2.5/forecast?';

export default {
	state: {
		arrlistDays: [],
		cityName: '',
		firtsDay: {},
		enterCity: 'Moscow',
		isError: false,
	},
	mutations: {
		updateWeather(state, days) {
			state.arrlistDays = days
		},
		updateCityName(state, cityName) {
			state.cityName = cityName
		},
		updateFirstDay(state, firstDay) {
			state.firstDay = firstDay
		},
		updateCity(state, cityName) {
			state.enterCity = cityName
			console.log('mut' + state.enterCity)
			console.log('2')
		},
		updateError(state, flag) {
			console.log('updateError ' + flag)
			state.isError = flag
		}
	},
	getters: {
		listDays(state) {
			return state.arrlistDays
		},
		cityName(state) {
			return state.cityName
		},
		firstDay(state) {
			return state.firstDay
		},
		enterCity(state) {
			console.log('entCity ' + state.enterCity)
			return state.enterCity
		},
		isError(state) {
			console.log(state.isError)
			return state.isError
		}

	},
	actions: {
		async fetchWeather(ctx) {
			console.log('1')
			let city = ctx.state.enterCity;
			let response = await fetch(`${URL}q=${city}&appid=${API_KEY}&units=metric`);
			if (response.ok) {
				const data = await response.json();
				ctx.commit('updateFirstDay', data.list[0])
				ctx.commit('updateCityName', data.city.name);
				const groupDays = [];
				data.list.forEach(dateItem => {
					const targetDay = new Date(dateItem.dt_txt).getDay();
					groupDays[targetDay] ? groupDays[targetDay].push(dateItem) : groupDays[targetDay] = [dateItem]
				});
				const days = groupDays.filter(Boolean).flatMap(item => {
					return item[Math.floor(item.length / 2)]
				}).sort((a, b) => a.dt - b.dt);
				days.shift();
				ctx.commit('updateWeather', days);
				if (ctx.state.isError) {
					ctx.commit('updateError', false)
				}
			} else {
				console.log('ERR')
				ctx.commit('updateError', true)
			}
		}
	},
}