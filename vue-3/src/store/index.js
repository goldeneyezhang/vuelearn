import Vue from 'vue'
import Vuex from 'vuex'
import createLogger from 'vuex/dist/logger'
const debug=process.env.NODE_ENV!=='production'

Vue.use(Vuex)

export default new Vuex.Store({
    strict:debug,//设置运行模式
    plugin:debug?[createLogger()]:[]//调试模式则加入日志插件
})
