<template>
    <a-layout id="components-layout-demo-custom-trigger">
        <a-layout-sider v-model="collapsed" :trigger="null" collapsible>
            <div class="logo" @click="$router.push('/')">
                <a-icon type="codepen-circle"/>
                <span style="margin-left: 5px;white-space:nowrap;" v-if="!collapsed">自动化管理系统</span>
            </div>
            <layout-menus/>
        </a-layout-sider>
        <a-layout>
            <a-layout-header style="background: #fff; padding: 0">
                <a-icon
                        class="trigger"
                        :type="collapsed ? 'menu-unfold' : 'menu-fold'"
                        @click="() => (collapsed = !collapsed)"
                />
                <s-heade></s-heade>
            </a-layout-header>
            <a-layout-content
                    :style="{ margin: '24px 16px', padding: '24px', background: '#fff', minHeight: '280px' }"
            >
                <transition name="page-transition">
                    <router-view/>
                </transition>
            </a-layout-content>
        </a-layout>
    </a-layout>
</template>
<script>
    import SHeade from "./layout/SHeade";
    import {mapGetters} from 'vuex'
    import LayoutMenus from "./system/LayoutMenus";

    export default {
        name: "home",
        data() {
            return {
                collapsed: false,
            };
        },
        computed: {
            ...mapGetters({userInfo:'userData'})
        },
        components: {
            LayoutMenus,
            SHeade
        },
        created() {
            window.onresize = function () {
                let screen = document.body.clientWidth
                this.collapsed = screen < 900 ? true : false
            }.bind(this)
        }
    };
</script>
<style scoped>
    .page-transition-enter {
        opacity: 0;
    }

    .page-transition-leave-active {
        opacity: 0;
    }

    .page-transition-enter .page-transition-container,
    .page-transition-leave-active .page-transition-container {
        -webkit-transform: scale(1.1);
        transform: scale(1.1);
    }
    #components-layout-demo-custom-trigger {
        height: 100%;
    }

    #components-layout-demo-custom-trigger .trigger {
        font-size: 18px;
        line-height: 64px;
        padding: 0 24px;
        cursor: pointer;
        transition: color 0.3s;

    }

    #components-layout-demo-custom-trigger .trigger:hover {
        color: #1890ff;
    }

    #components-layout-demo-custom-trigger .logo {
        cursor: pointer;
        height: 32px;
        line-height: 32px;
        margin: 14px;
        text-align: center;
        color: #fff;
        font-size: 16px;
        white-space: nowrap;
    }
</style>
