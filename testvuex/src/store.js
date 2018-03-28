import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
const store = new Vuex.Store({
    state: {
      count: 1,
      author:"Wise Wrong"
    },
    mutations: {
      increment (state) {
        // 变更状态
        state.count++
      },
      newAuthor(state,msg){
        state.author=msg
      }
    }
  })
  
  export default store