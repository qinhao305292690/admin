<template>
    <div class="container">
        <a-row :gutter="[16,16]">
            <a-col :span="12">
                <a-card :body-style="bodyLayout" title="折线图">
                    <div class="line" ref="line"/>
                </a-card>
            </a-col>
            <a-col :span="12">
                <a-card :body-style="bodyLayout" title="饼图">
                    <div class="pie" ref="pie"/>
                </a-card>
            </a-col>
        </a-row>
        <a-row :gutter="[16,16]">
            <a-col :span="12">
                <a-card :body-style="bodyLayout" title="柱状图">
                    <div class="bar" ref="bar"/>
                </a-card>
            </a-col>
            <a-col :span="12">
                <a-card :body-style="bodyLayout" title="漏斗">
                    <div class="funnel" ref="funnel"/>
                </a-card>
            </a-col>
        </a-row>
    </div>
</template>
<script>
  import echarts from 'echarts'

  require('echarts/lib/chart/line')
  require('echarts/lib/chart/pie')
  require('echarts/lib/chart/bar')
  require('echarts/lib/chart/funnel')

  /**
   *  @@ 默认添加的对象
   * **/
  export default {
    name: "WelcomePage",
    components: {},
    data() {
      return {
        bodyLayout: {
          padding: '5px'
        },
        line: {},
        pie: {},
        bar: {},
        funnel: {}, //漏斗
      }
    },
    created() {
      this.init();
      window.addEventListener('resize',this.delayReSize(()=>{
        this.line.resize()
        this.pie.resize()
        this.bar.resize()
        this.funnel.resize()
      },1000),false)
    },
    methods: {
      delayReSize(callback,delay){
        let tirme = null;
        return ()=>{
          if(tirme) clearTimeout(tirme)
          tirme = setTimeout(callback,delay)
        }
      },
      init(){
        this.$nextTick(() => {
          this.initCharts();
          this.initPie();
          this.initBar();
          this.initFunnel();
        })
      },
      initFunnel() {
        this.funnel = echarts.init(this.$refs['funnel'])
        const option = {
          title: {
            text: '漏斗图(对比)',
            subtext: '纯属虚构',
            left: 'left',
            top: 'bottom'
          },
          toolbox: {
            show: false,
            orient: 'vertical',
            top: 'center',
          },
          legend: {
            orient: 'vertical',
            left: 'left',
            data: ['产品A', '产品B', '产品C', '产品D', '产品E']
          },

          series: [{
            name: '漏斗图',
            type: 'funnel',
            width: '40%',
            height: '45%',
            left: '5%',
            top: '50%',
            funnelAlign: 'right',

            center: ['25%', '25%'], // for pie

            data: [{
              value: 60,
              name: '产品C'
            }, {
              value: 30,
              name: '产品D'
            }, {
              value: 10,
              name: '产品E'
            }, {
              value: 80,
              name: '产品B'
            }, {
              value: 100,
              name: '产品A'
            }]
          }, {
            name: '金字塔',
            type: 'funnel',
            width: '40%',
            height: '45%',
            left: '5%',
            top: '5%',
            sort: 'ascending',
            funnelAlign: 'right',

            center: ['25%', '75%'], // for pie

            data: [{
              value: 60,
              name: '产品C'
            }, {
              value: 30,
              name: '产品D'
            }, {
              value: 10,
              name: '产品E'
            }, {
              value: 80,
              name: '产品B'
            }, {
              value: 100,
              name: '产品A'
            }]
          }, {
            name: '漏斗图',
            type: 'funnel',
            width: '40%',
            height: '45%',
            left: '55%',
            top: '5%',
            funnelAlign: 'left',
            center: ['75%', '25%'], // for pie
            data: [{
              value: 60,
              name: '产品C'
            }, {
              value: 30,
              name: '产品D'
            }, {
              value: 10,
              name: '产品E'
            }, {
              value: 80,
              name: '产品B'
            }, {
              value: 100,
              name: '产品A'
            }]
          }, {
            name: '金字塔',
            type: 'funnel',
            width: '40%',
            height: '45%',
            left: '55%',
            top: '50%',
            sort: 'ascending',
            funnelAlign: 'left',
            center: ['75%', '75%'], // for pie
            data: [{
              value: 60,
              name: '产品C'
            }, {
              value: 30,
              name: '产品D'
            }, {
              value: 10,
              name: '产品E'
            }, {
              value: 80,
              name: '产品B'
            }, {
              value: 100,
              name: '产品A'
            }]
          }]
        };
        this.funnel.setOption(option);
      },
      initBar() {
        this.bar = echarts.init(this.$refs['bar'])
        const option = {
          color: ['#3398DB'],
          tooltip: {
            transitionDuration: 0,
            trigger: 'axis',
            axisPointer: { // 坐标轴指示器，坐标轴触发有效
              type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
            }
          },
          grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
          },
          xAxis: [{
            type: 'category',
            data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
            axisTick: {
              alignWithLabel: true
            }
          }],
          yAxis: [{
            type: 'value'
          }],
          series: [{
            name: '直接访问',
            type: 'bar',
            barWidth: '60%',
            data: [10, 52, 200, 334, 390, 330, 220]
          }]
        };
        // 绘制图表。
        this.bar.setOption(option);
      },
      initPie() {
        this.pie = echarts.init(this.$refs['pie'])
        const option = {
          series: {
            type: 'pie',
            data: [{
              name: 'A',
              value: 1212
            }, {
              name: 'B',
              value: 2323
            }, {
              name: 'C',
              value: 1919
            }]
          }
        }
        // 绘制图表。
        this.pie.setOption(option);
      },
      initCharts() {
        this.line = echarts.init(this.$refs['line']);
        const option = {
          xAxis: {
            type: 'category',
            data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
          },
          yAxis: {
            type: 'value'
          },
          series: [{
            data: [820, 932, 901, 934, 1290, 1330, 1320],
            type: 'line'
          }]
        };
        this.line.setOption(option)
      }
    },
  }
</script>

<style scoped lang="less">
    .container {
        overflow: hidden;
        margin: 0 auto;
        .padding(10, 10, 10, 10);

        .right {
            .margin(0, 10, 0, 0);
        }

        .left {
            .margin(0, 0, 0, 10);
        }

        .line,
        .pie,
        .bar,
        .funnel {
            overflow: hidden;
            .vh(280);
        }
    }
</style>
