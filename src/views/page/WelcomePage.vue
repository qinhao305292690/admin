<template>
    <div class="container">
        <div class="padding" :key="index" v-for="(item,index) of specis">
            <a-button @click="hanleRemoveItem(index)" type="link" style="float:right;cursor: pointer"
                      icon="close-circle"></a-button>
            <section class="wrap">
                <span>
                   规格设置：
                </span>
                <a-select
                        @change="handleHasItem(index)"
                        v-model="item.specValue"
                        style="width: 150px">
                    <a-select-option
                            :value="item.target"
                            :key="item.target"
                            v-for="item of specificationsList">
                        {{item.title}}
                    </a-select-option>
                </a-select>
            </section>
            <br>
            <!--颜色:-->
            <aside class="tag-container">
                <a-tag @close="() => handleClose(i.title,i.target,index)" :key="i.title" v-for="(i) in item.czg"
                       closable
                       :visible="true" color="cyan">
                    {{i.title}}
                </a-tag>

                <a-popover :destroyTooltipOnHide="!has_specis" title="请选择" trigger="click" placement="bottom">
                    <template slot="content">
                    <span>
                       规格参数：
                    </span>
                        <a-select
                                v-if="item.specValue=='colorList'"
                                autoClearSearchValue
                                v-model="item.c"
                                mode="multiple"
                                style="width: 150px"
                                placeholder="请选择"
                                @change="(e)=>handleChange(e,'c',index)">
                            <a-select-option :key="r.value" v-for="(r) in colorList" :value="r.title">
                                {{r.title}}
                            </a-select-option>
                        </a-select>
                        <a-select
                                v-model="item.z"
                                v-if="item.specValue=='sizeList'"
                                mode="multiple"
                                style="width: 150px"
                                placeholder="请选择"
                                @change="(e)=>handleChange(e,'z',index)">
                            <a-select-option :key="r.value" v-for="(r) in sizeList" :value="r.title">
                                {{r.title}}
                            </a-select-option>
                        </a-select>
                        <a-select
                                v-model="item.g"
                                v-if="item.specValue=='ggList'"
                                mode="multiple"
                                style="width: 150px"
                                placeholder="请选择"
                                @change="(e)=>handleChange(e,'g',index)">
                            <a-select-option :key="r.value" v-for="(r) in ggList" :value="r.title">
                                {{r.title}}
                            </a-select-option>
                        </a-select>
                    </template>
                    <a-button :disabled="has_specis" type="link" icon="plus" style="margin-top: 10px;">添加</a-button>
                </a-popover>
            </aside>
        </div>
        <a-button :disabled="specis.length>=3" @click="handleAddspecis" style="margin-top: 10px;" type="primary">添加规格
        </a-button>
        <section style="margin-top: 10px;background: #fff;">
            <p style="margin: 10px 0 10px 0;">规格信息:</p>
            <table-info
             :tableData.sync="specis"
            />
        </section>
    </div>
</template>
<script>
    import TableInfo from '@/views/components/TableInfo'

    /**
     *  @@ 默认添加的对象
     * **/
    const specisChildrenObj = {
        specValue: '',
        c: [],
        z: [],
        g: [],
        czg: []
    }

    export default {
        name: "WelcomePage",
        components: {
            TableInfo
        },
        data() {
            return {
                has_specis: false,
                // TODO: 这是每一项数据
                specis: [{...specisChildrenObj}],
                specificationsList: [
                    {
                        title: '颜色',
                        target: 'colorList'
                    },
                    {
                        title: '尺寸',
                        target: 'sizeList'
                    },
                    {
                        title: '尺码',
                        target: 'ggList'
                    }
                ],
                colorList: [
                    {
                        title: '红色',
                        value: 'color'
                    },
                    {
                        title: '黄色',
                        value: 'yellow'
                    }
                ],
                sizeList: [
                    {
                        title: '大号',
                        value: 'plus'
                    },
                    {
                        title: '小号',
                        value: 'small'
                    }
                ],
                ggList: [
                    {
                        title: '大号1',
                        value: 'plus1'
                    },
                    {
                        title: '小号2',
                        value: 'small2'
                    }
                ],
            }
        },
        created() {

        },
        methods: {
            handleAddspecis() {
                console.log(specisChildrenObj, 'aaa');
                this.specis.push({...specisChildrenObj})
            },
            hanleRemoveItem(index) {
                this.specis.splice(index, 1)
            },
            handleHasItem(index) {
                let flag = false
                for (let i = 0, length = this.specis.length; i < length; i++) {
                    if (i === index) continue;
                    if (this.specis[i].specValue === this.specis[index].specValue) {
                        flag = true
                        this.$message.warning('规格名不能相同,请更换')
                    }
                }
                this.has_specis = flag

            },
            handleChange(valueArr, target, index) {
                this.specis[index][target] = valueArr
                this.specis[index].czg = this.mapArray(index)
            },
            mapArray(index) {
                // if()
                return [
                    ...this.specis[index].c.map((item,i) =>
                        (Object.assign({
                            title: item, target: 'c',aCode:'', code: '0', price: '0'
                            },
                            this.specis[index].czg[i]
                        ))
                    ),
                    ...this.specis[index].z.map(item => ({title: item, target: 'z',aCode:'', code: '0', price: '0'})),
                    ...this.specis[index].g.map(item => ({title: item, target: 'g',aCode:'', code: '0', price: '0'}))
                ]
            },
            handleClose(title, target, index) {
                this.specis[index][target] = this.specis[index][target].filter(ArrTitle => ArrTitle !== title)
                this.specis[index].czg = this.specis[index].czg.filter(item => item.title !== title)
            }
        },
    }
</script>

<style scoped>
    .container {
        width: 80%;
        margin: 0 auto;
    }

    .wrap {
        display: flex;
        align-items: center;
        margin-top: 5px;
    }

    .tag-container {
        border: 1px solid #caedf7;
        min-height: 50px;
        margin-top: 10px;
        border-radius: 5px;
        padding: 6px;
    }

    .padding {
        border: 1px solid #eeecf7;
        padding: 10px;
        border-radius: 5px;
        margin-top: 10px;
    }
</style>
