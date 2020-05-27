<template>
    <div>
        <a-table
                bordered
                rowKey="title"
                :columns="columns"
                :data-source="payload">
            <template #aCode="text,row,index">
                <a-input @input="(e)=>handleInput(e,'aCode',index,row)" placeholder="请输入" :value="text"/>
            </template>
            <template #code="text,row,index">
                <a-input @input="(e)=>handleInput(e,'code',index,row)" placeholder="请输入" :value="text"/>
            </template>
            <template #price="text,row,index">
                <a-input @input="(e)=>handleInput(e,'price',index,row)" placeholder="请输入" :value="text"/>
            </template>
        </a-table>
    </div>
</template>

<script>
    export default {
        props: {
            tableData: {
                type: Array
            }
        },
        methods: {
            handleInput({target}, keys, index,recods) {
                let val = target.value
                let result = [...this.tableData];
                result.forEach(item=>{
                    item.czg.forEach(row=>{
                        if(row.title == recods.title){
                            console.log(keys);
                            row[keys] = val
                        }
                    })
                })
                this.$emit('update:tableData', result)
            }
        },
        name: "TableInfo",
        data() {
            return {
                columns: [],
                payload: []
            }
        },
        watch: {
            tableData: {
                handler: function (arr) {
                    this.columns = arr.map(item => ({
                        title: item.specValue == 'colorList' ? '颜色' : item.specValue == 'sizeList' ? '尺寸' : '尺码',
                        dataIndex: 'title',
                    }))
                    this.columns = [
                        ...this.columns,
                        {
                            title: '规格编码',
                            dataIndex: 'aCode',
                            scopedSlots: {customRender: 'aCode'}
                        },
                        {
                            title: '规格条码',
                            dataIndex: 'code',
                            scopedSlots: {customRender: 'code'}
                        },
                        {
                            title: '建议价格',
                            dataIndex: 'price',
                            scopedSlots: {customRender: 'price'}
                        }]
                    for (const Aval of arr) {
                        this.payload = Aval.czg.map(item => Object.assign(item))
                    }

                },
                deep: true
            }
        }
    }
</script>

<style scoped>

</style>
