<script>
    import {mapGetters} from 'vuex'

    export default {
        name: "LayoutMenus",
        data() {
            return {
                currentPath: []
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
                    theme="dark"
                    mode="inline"
                    style="border-top: 1px solid #3a3844"
                    selectedKeys={this.currentPath}>
                    {
                        this.menus.map(route => {
                            return route.children
                                ? (
                                    <a-sub-menu
                                        scopedSlots={{
                                            title: ()=> <span><a-icon type={route.meta.icon}/><span>{route.meta.title}</span></span>
                                        }}
                                        key={route.path}>
                                        {
                                            route.children.map(route=>(
                                                <a-menu-item key={route.path}>
                                                    <router-link to={route.path}>
                                                        <span>{route.meta.title}</span>
                                                    </router-link>
                                                </a-menu-item>
                                            ))
                                        }
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
                    }
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
