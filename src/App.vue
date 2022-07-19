<template>
    <weather-list :listDays="listDays" :sityName="sityName" :firtsDay="firtsDay"/>
</template>

<script>
import WeatherList from './components/WeatherList.vue'

export default {
  name: 'App',
  components: {
    WeatherList,
  },
  data(){
		return {
      listDays: new Map(),
      sityName: '',
      firtsDay: {},
    }
  },
  created:async function(){
    const apiKey = 'b35878a2c5ab36e25486221e2dcd1cc3';
    const URL = 'http://api.openweathermap.org/data/2.5/forecast?';
    let city = 'Moscow';

    let response = await fetch(URL + `q=${city}` + `&appid=${apiKey}` + '&units=metric')
    let data = await response.json();
    //console.log(data.list);

    this.firtsDay = data.list[0];
    this.sityName = data.city.name;
//console.log(this.firtsDay)
    data.list.forEach(dateItem => {
      //console.log(dateItem)  
      let parentDate = dateItem.dt_txt.slice(0, -9);
      let filteredDays = data.list.filter(dateItem => dateItem.dt_txt.slice(0, -9) === parentDate); // группируем элементы по дате
      filteredDays = filteredDays.filter((dateItem, index, arr) => index === Math.round(arr.length / 2));  // выбираем средний элемент
      filteredDays.forEach((item) => this.listDays.set(parentDate, item)); 
    });

const currentData = this.firtsDay.dt_txt.slice(0, -9);
this.listDays.delete(currentData);
            
    
/* 
  fetch(URL + `q=${city}` + `&appid=${apiKey}` + '&units=metric')
  .then(response => response.json())
  .then( async(data) => {
    console.log(data.list[0]);
    this.dataArr.push(data.list[0]);
  }); */

    
/* const objArr = Object.entries(data.list);
console.log(objArr) */


/* data.list.forEach(dateItem => {
       console.log(dateItem)  */
/*     let parentDate = dateItem.dt_txt.slice(0, -9);
		let filteredDays = data.list.filter(dateItem => dateItem.dt_txt.slice(0, -9) === parentDate); // группируем элементы по дате
		filteredDays = filteredDays.filter((dateItem, index, arr) => index === Math.round(arr.length / 2));  // выбираем средний элемент
		filteredDays.forEach((item) => this.listDays.set(parentDate, item));  */
/* 	});
  console.log(this.listDays)  */

   },
/*    methods:{
    async fetchWeather(){
      const apiKey = 'b35878a2c5ab36e25486221e2dcd1cc3';
      const URL = 'http://api.openweathermap.org/data/2.5/forecast?';
      let city = 'Moscow';

      let response = await fetch(URL + `q=${city}` + `&appid=${apiKey}` + '&units=metric')
      let data = await response.json();
      console.log(data.list);



       data.list.forEach(dateItem => {
       console.log(dateItem)  
     let parentDate = dateItem.dt_txt.slice(0, -9);
		let filteredDays = data.list.filter(dateItem => dateItem.dt_txt.slice(0, -9) === parentDate); // группируем элементы по дате
		filteredDays = filteredDays.filter((dateItem, index, arr) => index === Math.round(arr.length / 2));  // выбираем средний элемент
		filteredDays.forEach((item) => this.listDays.set(parentDate, item)); 
    });
console.log(this.listDays)
    },

   }, */
/*   mounted() {
    const fetchData = async () =>{
      const days = this.fetchWeather();
      return days;
    } 
    fetchData();
  }, */

}
</script>

<style>
 #app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
} 
</style>
