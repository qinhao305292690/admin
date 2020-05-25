<template>
    <div>
        <a-table
         bordered
         rowKey="title"
         :columns="columns"
         :data-source="payload">
            <template #code="text">
                <a-input placeholder="请输入" :value="text"/>
            </template>
            <template #price="text">
                <a-input placeholder="请输入" :value="text"/>
            </template>
        </a-table>
    </div>
</template>

<script>
    const columns = [
        {
            title: '规格',
            dataIndex: 'title',
        },
        {
            title: '规格编码',
            dataIndex: 'code',
            scopedSlots:{customRender:'code'}
        },
        {
            title: '价格',
            dataIndex: 'price',
            scopedSlots:{customRender:'price'}
        },
    ]
    export default {
        props:{
            tableData:{
                type: Array
            }
        },
        watch: {
            tableData: function (obj) {
                this.payload = this.tableData.map(item=>({
                    title: item,
                    price: '1.00',
                    code: ''
                }))
            }
        },
        name: "TableInfo",
        data() {
            return {
                columns,
                payload: []
            }
        }
    }
</script>

<style scoped>

</style>
