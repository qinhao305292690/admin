import axios from '../utils/axios'
import router, {syncRoutesMap} from '../route'

function filterSyncMenus(syncRoutes, menus) {
    let routes = syncRoutes.filter(route => {
        if (route.children && route.children.length) {
            route.children = filterSyncMenus(route.children, menus)
        }
        for (let i = 0; i < menus.length; i++) {
            if (menus[i] === route.path) {
                return true
            }
        }
        return false
    })
    return routes
}

export default {
    namespaced: true,
    state: {
        userData: {},
        menus: [] //处理之后的菜单
    },
    mutations: {
        SET_USERDATA(state, userData) {
            let routes = filterSyncMenus(syncRoutesMap, userData.menus)
            state.userData = userData
            state.menus = routes[0].children
            router.addRoutes(routes)
        }
    },
    actions: {
        GET_USERDATA({commit}) {
            return new Promise((resolve) => {
                axios({
                    method: 'get',
                    url: '/api/getMenus'
                }).then(res => {
                    commit('SET_USERDATA', res.data)
                    resolve(res)
                })
            })
        }
    }
}
