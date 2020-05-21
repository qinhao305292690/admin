<template>
    <div>
        <slot :params="name" name="title">默认字段</slot>
    </div>
</template>

<script>
    export default {
        name: "TestCom",
        data() {
            return {
                name: '你好,我是胡剑锋'
            }
        }
    }
</script>

<style scoped>

</style>
