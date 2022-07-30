import axios from "axios";

const API_KEY = 'b35878a2c5ab36e25486221e2dcd1cc3';
const URL = 'http://api.openweathermap.org/data/2.5/forecast?';

const filterdWeatherByDay = (data) => {
	const groupDays = [];
	data.list.forEach(dateItem => {
		const targetDay = new Date(dateItem.dt_txt).getDay();
		groupDays[targetDay] ? groupDays[targetDay].push(dateItem) : groupDays[targetDay] = [dateItem]
	});
	const days = groupDays.filter(Boolean).flatMap(item => {
		return item[Math.floor(item.length / 2)]
	}).sort((a, b) => a.dt - b.dt);
	days.shift();
	return days;
}

export default {
	namespaced: true,
	state: {
		arrlistDays: [],
		cityName: '',
		firtsDay: {},
		enterCity: 'Moscow',
		isError: false,
	},
	mutations: {
		/* 		updateWeather(state, days) {
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
				}, */
		set(state, udatedState) {
			for (const key in udatedState) {
				state[key] = udatedState[key]
			}
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
		async fetchWeather({ commit, state }, city = state.enterCity) {
			try {
				let data;
				//const response = await fetch(`${URL}q=${city}&appid=${API_KEY}&units=metric`);
				//const data = await response.json();
				await axios.get(`${URL}q=${city}&appid=${API_KEY}&units=metric`)
					.then(response => {
						data = response.data;
					})
				commit('set', { enterCity: city });
				commit('set', { firstDay: data.list[0] });
				commit('set', { cityName: data.city.name });
				const days = filterdWeatherByDay(data);
				commit('set', { arrlistDays: days });
				if (state.isError) {
					commit('set', { isError: false });
				}
			} catch (error) {
				commit('set', { isError: true });
			}
		}
	},
}