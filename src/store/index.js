import vue from 'vue'
import Vuex from 'vuex'
import user from './user'
import getters from "./getters";

vue.use(Vuex)

export default new Vuex.Store({
    modules: {
        user
    },
    getters
})
