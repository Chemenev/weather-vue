<template>
  <enter-form/>
  <weather-list />
</template>

<script>
import { mapActions } from "vuex";
import EnterForm from './components/EnterForm.vue'
import WeatherList from './components/WeatherList.vue' 

export default {
  name: 'App',
  async created(){
    this.fetchWeather();
  },
  methods: mapActions('weather',['fetchWeather']),
  components: {
    WeatherList,
    EnterForm
  }
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
