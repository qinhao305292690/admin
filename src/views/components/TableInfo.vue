<template>
    <div>
        你好
    </div>
</template>

<script>
    export default {
        name: "TableInfo",
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
