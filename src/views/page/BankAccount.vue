<template>
<div>
    <a-button @click="send">点击</a-button>
</div>
</template>

<script>
    export default {
        name: "BankAccount",
        data() {
            return {
                websock: ''
            }
        },
        created() {
            const wsuri = "ws://127.0.0.1:3000";
            this.websock = new WebSocket(wsuri);
            this.websock.onopen = this.open()
            this.websock.onerror = this.error()
            this.websock.onmessage = this.getMsg()
            console.log(this.websock)
        },
        destroyed() {
            // 销毁监听
            this.websock.onclose = this.close
        },
        methods: {
            open() {
                console.log('socket连接成功')
            },
            error() {
                console.log('连接错误')
            },
            send(params) {
                this.websock.send('game1')
            },
            getMsg(msg) {
                console.log(msg, 'msg')
            },
            close() {
                console.log('socket已关闭')
            },
        }
    }
</script>