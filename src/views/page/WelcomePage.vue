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
                        @change="handleChange">
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
                        @change="handleChange">
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
                        @change="handleChange">
                    <a-select-option :key="item.value" v-for="(item) in ggList" :value="item.title">
                        {{item.title}}
                    </a-select-option>
                </a-select>
            </template>
            <a-button type="primary" style="margin-top: 10px;">添加</a-button>
        </a-popover>
        <br>
        颜色:
        <aside class="tag-container">
            <a-tag @close="() => handleClose(index,'c')" :key="i" v-for="(i,index) in c" closable :visible="true" color="cyan">
                {{i}}
            </a-tag>
        </aside>
        尺寸:
        <aside class="tag-container">
            <a-tag @close="() => handleClose(index,'z')" :key="i" v-for="(i,index) in z" closable color="yellow">
                {{i}}
            </a-tag>
        </aside>
        尺码:
        <aside class="tag-container">
            <a-tag @close="() => handleClose(index,'g')" :key="i" v-for="(i,index) in g" closable color="red">
                {{i}}
            </a-tag>
        </aside>
        <section style="margin-top: 10px;background: #fff;">
            <p style="margin: 10px 0 10px 0;">规格信息:</p>

            <table-info
            :tableData="[...c,...z,...g]"
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
                specValue: 'colorList',
                c: [],
                z: [],
                g: [],
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
        methods: {
            handleChange(valueArr) {
                let keys = this.specValue == 'colorList' ? 'c' : (this.specValue == 'sizeList' ? 'z' : 'g')
                this[keys] = valueArr
            },
            handleClose(index,target){
                this[target].splice(index,1)
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
