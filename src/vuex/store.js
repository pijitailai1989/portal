import Vue from 'vue'
import Vuex from 'vuex'
import home from './home'
import menu from './menu'
import axios from '../axiosPath.js'
import createPersistedState from 'vuex-persistedstate'


Vue.use(Vuex)

export default new Vuex.Store({
    modules:{
        home,
        menu
    }
    // plugins: [createPersistedState()]
})