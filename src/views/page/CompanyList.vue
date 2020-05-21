<template>
    <div>
        <a-table
                bordered
                :scroll="{ x: 1300 }"
                :dataSource="tableData"
                :columns="columns"
                rowKey="name"
        >
            <div style="padding: 8px" slot="filterDropdown" slot-scope="{ setSelectedKeys, selectedKeys, confirm, clearFilters, column }">
                <a-input
                        v-ant-ref="c => (searchInput = c)"
                        :placeholder="`Search ${column.dataIndex}`"
                        :value="selectedKeys[0]"
                        style="width: 188px; margin-bottom: 8px; display: block;"
                        @change="e => setSelectedKeys(e.target.value ? [e.target.value] : [])"
                        @pressEnter="() => handleSearch(selectedKeys, confirm, column.dataIndex)"
                />
                <a-button
                        type="primary"
                        icon="search"
                        size="small"
                        style="width: 90px; margin-right: 8px"
                        @click="() => handleSearch(selectedKeys, confirm, column.dataIndex)"
                >
                    搜索
                </a-button>
                <a-button size="small" style="width: 90px" @click="() => handleReset(clearFilters)">
                    重置
                </a-button>
            </div>
            <!--     筛选出来的文字带颜色高亮       -->
            <template #customRender="text, record, index, column">
                 <span v-if="searchText && searchedColumn === column.dataIndex">
                    <template
                            v-for="(fragment, i) in text
                        .toString()
                        .split(new RegExp(`(?<=${searchText})|(?=${searchText})`, 'i'))"
                    >
                      <mark
                              v-if="fragment.toLowerCase() === searchText.toLowerCase()"
                              :key="i"
                              class="highlight"
                      >{{ fragment }}</mark
                      >
                      <template v-else>{{ fragment }}</template>
                    </template>
                  </span>
                <template v-else>
                    {{ text }}
                </template>
            </template>
        </a-table>
    </div>
</template>

<script>
    export default {
        name: "Company",
        data() {
            return {
                testText: 'testText',
                searchText: '',
                searchInput: null,
                searchedColumn: '',
                tableData: [],
                columns: [
                    {
                        title: '公司名称',
                        dataIndex: 'name',
                        // filtered: true,
                        scopedSlots: {
                            filterDropdown: 'filterDropdown',
                            filterIcon: 'filterIcon',
                            customRender: 'customRender',
                        },
                        onFilter: (value, record) =>
                            record.name
                                .toString()
                                .toLowerCase()
                                .includes(value.toLowerCase()),
                        onFilterDropdownVisibleChange: visible => {
                            if (visible) {
                                setTimeout(() => {
                                    this.searchInput.focus();
                                }, 0);
                            }
                        },
                    },
                    {
                        title: '公司地址',
                        dataIndex: 'address'
                    },
                    {
                        title: '行业',
                        dataIndex: 'industry',
                    },
                    {
                        title: '负责人',
                        dataIndex: 'post',
                        align: 'center',
                        colSpan: 2
                    },
                    {
                        // title: '法人',
                        // dataIndex: 'loader',
                        colSpan: 0
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
            handleSearch(selectedKeys, confirm, dataIndex) {
                confirm();
                this.searchText = selectedKeys[0];
                this.searchedColumn = dataIndex;
            },

            handleReset(clearFilters) {
                clearFilters();
                this.searchText = '';
            },
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
    .highlight {
        background-color: rgb(255, 192, 105);
        padding: 0px;
    }
</style>
