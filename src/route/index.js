import VueRouter from 'vue-router'
import Vue from 'vue'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import store from '../store'

Vue.use(VueRouter)
/**
 *  动态路由表,原则上来说是通过后端进行比对动态添加
 * **/
export const syncRoutesMap = [
    {
        name: 'index',
        path: '/',
        redirect: '/WelcomePage',
        component: () => import ('@/views/Home.vue'),
        meta:{hujianfeng: 1},
        children: [
            {
                name: 'WelcomePage',
                path: '/WelcomePage',
                meta: {
                    title: '首页',
                    icon: 'ant-design'
                },
                component: () => import ('@/views/page/WelcomePage')
            },
            {
                name: 'company',
                path: '/company',
                redirect: '/company/list',
                meta: {
                    title: '公司信息',
                    icon: 'zhihu'
                },
                component: () => import ('@/views/layout/LayoutView.vue'),
                children: [
                    {
                        name: 'company-list',
                        path: '/company/list',
                        meta: {
                            title: '公司列表',
                            icon: 'zhihu'
                        },
                        component: () => import ('@/views/page/CompanyList'),
                        children: [
                            {
                                name: 'company-sub',
                                path: '/company/sub',
                                meta: {
                                    title: '公司探戈',
                                    icon: 'zhihu'
                                },
                                component: () => import ('@/views/page/CompanyList')
                            }
                        ]
                    },
                    {
                        name: 'company-detail',
                        path: '/company/detail',
                        meta: {
                            title: '公司详情',
                            icon: 'zhihu'
                        },
                        component: () => import ('@/views/page/CompanyDetail'),
                    }
                ]
            },
            {
                name: 'contract',
                path: '/contract',
                meta: {
                    title: '合同管理',
                    icon: 'container'
                },
                component: () => import ('@/views/page/Contract')
            },
            {
                name: 'bankAccount',
                path: '/bankAccount',
                meta: {
                    title: '银行信息',
                    icon: 'bank'
                },
                component: () => import ('@/views/page/BankAccount')
            },
            {
                name: 'settings',
                path: '/settings',
                meta: {
                    title: '个人设置',
                    icon: 'setting'
                },
                component: () => import ('@/views/page/Settings')
            },
        ]
    }
]
export const constRoutesMap = [
    {
        name: 'login',
        path: '/login',
        component: () => import('@/views/auth/Login')
    },
    {
        name: '404',
        path: '*',
        component: () => import('@/views/404')
    }
]
const router = new VueRouter({
    routes: constRoutesMap // routes: routes 的简写
})

// TODO:路由守卫拦截登录

router.beforeEach((to, from, next) => {
    NProgress.start()
    const info = sessionStorage.getItem('userData')
    const userData = info !== 'undefined' ? JSON.parse(info) : null
    if (userData && userData.token) {
        if (to.path === '/login') {
            sessionStorage.removeItem('userData')
            store.state.user.menus = [] // TODO: 清空菜单
        }
        if (store.getters.MENUS.length == 0) {
            store.dispatch('user/GET_USERDATA').then(() => {
                next(to.path)
            })
        } else {
            next()
        }
    } else {
        if (to.path === '/login') {
            sessionStorage.removeItem('userData')
            next()
        } else {
            next({path: '/login'})
        }

    }
})
router.afterEach(() => {
    NProgress.done()
})

export default router
