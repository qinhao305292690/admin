<script>
    import {mapGetters} from 'vuex'

    export default {
        name: "LayoutMenus",
        data() {
            return {
                currentPath: [],
                currentParentPath: ''
            }
        },
        methods: {
            /**
             * @@ 递归遍历菜单,原则上来说可以支持无限级菜单,一般之后2层,
             * @ 这只是个菜单测试
             * **/
            menusListMap(menus) {
                let constMenusList = menus.map(route => {
                    return route.children
                        ? (
                            <a-sub-menu
                                key={route.path}
                                scopedSlots={{
                                    title: () => <span><a-icon
                                        type={route.meta.icon}/><span>{route.meta.title}</span></span>
                                }}
                            >
                                {this.menusListMap(route.children)}
                            </a-sub-menu>
                        )
                        : (
                            <a-menu-item
                                key={route.path}
                            >
                                <router-link to={route.path}>
                                    <a-icon type={route.meta.icon}/>
                                    <span>{route.meta.title}</span>
                                </router-link>
                            </a-menu-item>
                        )
                })
                return constMenusList
            }
        },
        render() {
            return (
                /**
                 * @ 如有有children就返回 <a-sub-menu title="子菜单">
                 * <a-menu-item>子菜单项</a-menu-item>
                 * </a-sub-menu>
                 * **/
                <a-menu
                    default-open-keys={this.currentParentPath}
                    defaultSelectedKeys={this.currentPath}
                    theme="dark"
                    mode="inline"
                    style="border-top: 1px solid #3a3844">
                    {this.menusListMap(this.menus)}
                </a-menu>
            )
        },
        computed: {
            ...mapGetters({
                menus: 'MENUS'
            })
        },
        watch: {
            $route: {
                handler: function (route) {
                    const {matched} = route
                    const index = matched.findIndex(({path}) => path === route.path)
                    this.currentParentPath = [matched[index - 1].path]
                    this.currentPath = [route.path]
                },
                deep: true,
                immediate: true
            }
        }
    }
</script>

<style scoped>

</style>
