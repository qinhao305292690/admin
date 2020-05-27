<template>
    <div>
        <a-table
         bordered
         rowKey="title"
         :columns="columns"
         :data-source="tableData">
            <template #code="text,row,index">
                <a-input @input="(e)=>handleInput(e,'code',index)" placeholder="请输入" :value="text"/>
            </template>
            <template #price="text,row,index">
                <a-input @input="(e)=>handleInput(e,'price',index)" placeholder="请输入" :value="text"/>
            </template>
        </a-table>
    </div>
</template>

<script>
    export default {
        props:{
            tableData:{
                type: Array
            }
        },
        methods: {
            handleInput({target},keys,index){
                console.log(target.value,index);
                let val = target.value
                let result = [...this.tableData];
                result[index][keys] = val;
                this.$emit('update:tableData',result)
            }
        },
        name: "TableInfo",
        data() {
            return {
                columns:[
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
                ],
                payload: []
            }
        }
    }
</script>

<style scoped>

</style>
