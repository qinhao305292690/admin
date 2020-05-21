import axios from '../utils/axios'
import router, {syncRoutesMap} from '../route'

function filterSyncMenus(menus) {
    let {children: HOME_ROUTERS} = syncRoutesMap.find(({name}) => name === 'index')
    return HOME_ROUTERS.filter(route => menus.includes(route.path))
}

export default {
    namespaced: true,
    state: {
        userData: {},
        menus: []//处理之后的菜单
    },
    mutations: {
        SET_USERDATA(state, userData) {
            state.userData = userData
            state.menus = filterSyncMenus(userData.menus)
            const routes = syncRoutesMap.find(item => item.name == 'index')
            routes.children = state.menus
            // router.options.routes = [routes, ...router.options.routes]
            router.addRoutes([routes])

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
