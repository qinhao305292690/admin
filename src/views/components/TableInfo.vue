<template>
    <div>
        你好
    </div>
</template>

<script>
    export default {
        name: "TableInfo",
        mixins: [],
        filters: {

        },
        props: {
            tableData: {
                type: Array
            }
        },
        methods: {
        },
        data() {
            return {
                columns: [],
                payload: []
            }
        }
    }
</script>

<style scoped>

</style>
