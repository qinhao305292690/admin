<template>
    <div>
        <a-table
                bordered
                :scroll="{ x: 1300 }"
                :dataSource="tableData"
                :columns="columns"
                rowKey="name"
        />
    </div>
</template>

<script>
    export default {
        name: "Company",
        data() {
            return {
                tableData: [],
                columns: [
                    {
                        title: '公司名称',
                        dataIndex: 'name'
                    },
                    {
                        title: '公司地址',
                        dataIndex: 'address'
                    },
                    {
                        title: '行业',
                        dataIndex: 'industry'
                    },
                    {
                        title: '负责人',
                        dataIndex: 'post'
                    },
                    {
                        title: '法人',
                        dataIndex: 'loader'
                    },
                    {
                        title: '操作',
                        width: 140,
                        fixed: 'right',
                        customRender: ()=> ({
                            children: (
                                <section style="display: flex;justify-content: space-around;">
                                    <a-button type="primary" size="small">
                                        更新
                                    </a-button>
                                    <a-button type="primary" size="small">
                                        查看
                                    </a-button>
                                </section>
                            )
                        })
                    }
                ]
            }
        },
        created() {
            this.initTableData()
        },
        methods:{
            initTableData(){
                this.$axios({
                    url: '/api/companyList',
                }).then(res=>{
                    this.tableData = res.data.list
                })
            }
        }
    }
</script>

<style scoped>

</style>
