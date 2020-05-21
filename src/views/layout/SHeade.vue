<template>
    <div class="user-info">
        <section>
            <a-avatar :src="$store.state.user.userData.avatar" :size="32"
                      icon="user"/>
            <a-dropdown>
                <a class="ant-dropdown-link">
                    {{ $store.state.user.userData.name }}
                    <a-icon type="down"/>
                </a>
                <a-menu slot="overlay">
                    <a-menu-item>
                        <a href="javascript:;" @click="$message.info('暂未开放')">个人中心</a>
                    </a-menu-item>
                    <a-menu-item>
                        <a href="javascript:;" @click="$router.push('/settings')">设置</a>
                    </a-menu-item>
                    <a-menu-item>
                        <a href="javascript:;" @click="loginOut">退出登录</a>
                    </a-menu-item>
                </a-menu>
            </a-dropdown>
        </section>
    </div>
</template>

<script>
    export default {
        name: "SHeade",
        data() {
            return {}
        },
        methods: {
            loginOut() {
                this.$confirm({
                    title: '提示',
                    content: '确定要退出登录吗?',
                    okText: '确认',
                    cancelText: '取消',
                    onOk: () => {
                        sessionStorage.removeItem('userData')
                        this.$router.push('/login')
                    }
                })
            }
        }
    }
</script>

<style scoped>
    .user-info {
        float: right;
        padding-right: 15px;
    }
</style>
