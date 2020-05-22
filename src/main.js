import Vue from 'vue'
import App from './App.vue'
import router from './route'
import store from './store'
import './utils'
import './mock'

Vue.config.productionTip = false

let vm = new Vue({
    router,
    store,
    render: h => h(App),
})
vm.$mount('#app')
