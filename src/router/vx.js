import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex);
// try{		
// 	var city=localStorage.getItem('lycity')?localStorage.getItem('lycity'):0;
// }catch(err){
// 	console.log(err);
// }
// Vue.use(Vuex);
export default new Vuex.Store({
	state:{
		booe:0
	},
	mutations:{
		ok:function(state,v){
			state.booe = v
		}
		// currentind:function(state,o){
		// 	state.currentindex = o
		// }
	}
});