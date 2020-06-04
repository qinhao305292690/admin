<template>
    <div class="container">
        <a-button @click="toolge=toolge=='SSelect'?'TableInfo':'SSelect'">切换组件</a-button>
        <keep-alive>
            <component v-model="sss" :is="baseComp"></component>
        </keep-alive>
    </div>
</template>
<script>
    import TableInfo from '@/views/components/TableInfo'
    import SSelect from '@/views/components/SSelect'

    /**
     *  @@ 默认添加的对象
     * **/
    export default {
        name: "WelcomePage",
        components: {
            TableInfo,
            SSelect
        },
        computed: {
            baseComp() {
                return this.toolge
            }
        },
        data() {
            return {
                sss: true,
                toolge: 'SSelect',
                websock: ''
            }
        },
        created() {
        },
        methods: {},
    }
</script>

<style scoped>
    .container {
        width: 80%;
        margin: 0 auto;
    }
</style>
