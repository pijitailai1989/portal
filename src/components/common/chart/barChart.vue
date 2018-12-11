<template>
  <div :id="id" :style="{height:height,width:width}"></div>
</template>

<script>
export default {
  props: {
    id: {
      type: String,
      default: 'BarChart'
    },
    width: {
      type: String,
      default: '200px'
    },
    height: {
      type: String,
      default: '200px'
    }
  },
  data () {
    return {
      msg: ''
    }
  },
  mounted(){
    this.drawLine();
  },
  computed :{
       menu(){
          return this.$t('menu')
        }
    },
  methods: {
    drawLine(){
        // 基于准备好的dom，初始化echarts实例
        let myChart = this.$echarts.init(document.getElementById(this.id))
        // 绘制图表
        myChart.setOption({
            color: ['#3398DB'],
            tooltip : {
                show: true
            },
            grid: {
                left: '3%',
                right: '4%',
                bottom: '3%',
                width: '86%',
                containLabel: true
            },
            xAxis : [
                {
                    type : 'category',
                    name: this.menu.LogisticsStatus,
                    axisLine:{
                        lineStyle:{
                            color:'#999999'
                        }
                    },
                    splitLine: {
                        show: false
                    },
                    data : ['待入库', '代付款', '航空运输', '已到目的国', '代收费', '异常处理'],
                    axisTick: {
                        alignWithLabel: true
                    }
                }
            ],
            yAxis : [
                {
                    type : 'value',
                    name: this.menu.orderNumber,
                    axisLine:{
                        lineStyle:{
                            color:'#999999'
                        }
                    },
                    splitLine: {
                        show: false
                    }
                }
            ],
            series: [
                {
                    name: '订单数量',
                    type: 'bar',
                    barWidth: '35%',
                    label: {
                        normal: {
                            show: true,
                            position: 'inside'
                        }
                    },
                    color: '#2F9AC0',
                    data: [500, 200, 360, 100, 100, 700]
                }
            ]
        });
    }
  }
}

</script>

<style scoped>
</style>