<template>
    <div class="container">
        <section class="wrap">
            <span>
               规格：
            </span>
            <a-select v-model="specValue" style="width: 150px">
                <a-select-option :value="item.target" :key="item.target" v-for="item of specificationsList">
                    {{item.title}}
                </a-select-option>
            </a-select>
        </section>
        <br>
        <!--颜色:-->
        <aside class="tag-container">
            <a-tag @close="() => handleClose(i.title,i.target)" :key="i.title" v-for="(i,index) in czg" closable
                   :visible="true" color="cyan">
                {{i.title}}
            </a-tag>

            <a-popover title="请选择" trigger="click" placement="bottom">
                <template slot="content">
                <span>
                   规格参数：
                </span>
                    <a-select
                            v-if="specValue=='colorList'"
                            autoClearSearchValue
                            v-model="c"
                            mode="multiple"
                            style="width: 150px"
                            placeholder="请选择"
                            @change="(e)=>handleChange(e,'c')">
                        <a-select-option :key="item.value" v-for="(item) in colorList" :value="item.title">
                            {{item.title}}
                        </a-select-option>
                    </a-select>
                    <a-select
                            v-model="z"
                            v-if="specValue=='sizeList'"
                            mode="multiple"
                            style="width: 150px"
                            placeholder="请选择"
                            @change="(e)=>handleChange(e,'z')">
                        <a-select-option :key="item.value" v-for="(item) in sizeList" :value="item.title">
                            {{item.title}}
                        </a-select-option>
                    </a-select>
                    <a-select
                            v-model="g"
                            v-if="specValue=='ggList'"
                            mode="multiple"
                            style="width: 150px"
                            placeholder="请选择"
                            @change="(e)=>handleChange(e,'g')">
                        <a-select-option :key="item.value" v-for="(item) in ggList" :value="item.title">
                            {{item.title}}
                        </a-select-option>
                    </a-select>
                </template>
                <a-button type="link" icon="plus" style="margin-top: 10px;">添加</a-button>
            </a-popover>
        </aside>

        <a-button style="margin-top: 10px;" type="primary">添加规格</a-button>
        <section style="margin-top: 10px;background: #fff;">
            <p style="margin: 10px 0 10px 0;">规格信息:</p>

            <table-info
                    :tableData.sync="czg"
            ></table-info>
        </section>
    </div>
</template>
<script>
    import TableInfo from '@/views/components/TableInfo'

    export default {
        name: "WelcomePage",
        components: {
            TableInfo
        },
        data() {
            return {
                specis: [
                    
                ],
                specValue: 'colorList',
                c: [],
                z: [],
                g: [],
                czg: [],
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
            handleChange(valueArr,target) {
                this[target] = valueArr
                this.czg = this.mapArray()
            },
            mapArray(){
                return [
                    ...this.c.map(item=>({title:item,target:'c',code: '0',price: '0'})),
                    ...this.z.map(item=>({title:item,target:'z',code: '0',price: '0'})),
                    ...this.g.map(item=>({title:item,target:'g',code: '0',price: '0'}))
                ]
            },
            handleClose(title, target) {
                this[target] = this[target].filter(ArrTitle=>ArrTitle!==title)
                console.log(this[target],'thiss');
                this.czg = this.czg.filter(item=>item.title!==title)
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
</style>
