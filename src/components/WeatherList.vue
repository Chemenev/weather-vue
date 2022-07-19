<template>
	<div class="weather-container">
		<div class="current-weather">
			<div class="current-weather__info">
				<h1>{{sityName}}</h1>
				<p>{{currentDayName}}</p>
				<p>{{currentFullDate}}</p>
				<p class="current-weather__wind">Wind {{currentWind}} km/h</p>
			</div>
			<div class="current-weather__icon">
				<img :src=currentWeatherIconSrc alt="weather">
			</div>
			<div class="current-weather__temp">
				<div class="current-weather__other-temp">
					<span>Min: {{minWeatherTemperature}}°C</span>
					<span>Max: {{maxtWeatherTemperature}}°C</span>
				</div>
				<div class="current-weather__current-temp">{{currentWeatherTemperature}}°C</div>
			</div>
		</div>
		<weather-item v-for="(day, index) in listDays" :key="index" :day="day[1]" />
	</div>
</template>

<script>
const DAY_NAME = ['SUNDAY', 'MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY', 'SATURDAY'];
import WeatherItem from '@/components/WeatherItem.vue'
export default {
	components:{
		WeatherItem
	},
	props: {
		listDays : {
			type: Map,
			default: () => {}
		},
		sityName: {
			type: String,
			default: ''
		},
		firtsDay: {
			type: Object,
			default: () => {}
		},
	}, 
	computed:{
		currentWeatherTemperature(){
			return Math.trunc(this.firtsDay.main.temp);
		},
		minWeatherTemperature(){
			return Math.trunc(this.firtsDay.main.temp_min);
		},
		maxtWeatherTemperature(){
			return Math.trunc(this.firtsDay.main.temp_max);
		},
		currentWeatherIconSrc(){
			return `https://openweathermap.org/img/wn/${this.firtsDay.weather[0]['icon']}@4x.png`;
		},
		currentWind(){
			return  this.firtsDay.wind.speed
		},
		currentFullDate(){
			return this.firtsDay.dt_txt.slice(0, -9);
		},
		currentDayName(){
			let numDay = new Date(this.firtsDay.dt_txt).getDay();
			return DAY_NAME[numDay];
		},
	}
}
</script>

<style>
.weather-container {
   display: flex;
   flex-wrap: wrap;
   justify-content: space-between;
   padding: 10vh;
   margin: 5vh 20vh;
   background: #fafafa;
}

.current-weather {
   width: 100%;
   display: flex;
   justify-content: space-around;
   align-items: center;
	margin-bottom: 50px;
}

.current-weather__info {
   font-size: 43px;
   text-transform: uppercase;
   text-align: left;
}

.current-weather__info p{
	margin: 20px 0;
}

.current-weather__wind{
	font-size: 25px;
	text-transform: initial;
}

.current-weather__temp {
   font-weight: 600;
}

.current-weather__other-temp {
   display: flex;
   justify-content: space-around;
   font-size: 18px;
}

.current-weather__current-temp {
   font-size: 116px;
}
</style>