import { createStore } from 'vuex'
import weather from "./modules/weather";


const store = createStore({
	modules: {
		weather
	}
})

export default store;