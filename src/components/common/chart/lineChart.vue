<template>
  <div :id="id" :style="{height:height,width:width}"></div>
</template>

<script>
export default {
  props: {
    id: {
      type: String
    },
    width: {
      type: String,
      default: '200px'
    },
    height: {
      type: String,
      default: '200px'
    },
    isLegendShow: {
        type: Boolean,
        default: true
    },
    legendArray: {
        type: Array,
        default: () => {
            return ["物流费用", "订单金额"]
        }
    },
    xAxisName: {
        type: String
    },
    yAxisName: {
        type: String
    },
    seriesData: {
        type: Array
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
  methods: {
    drawLine(){
        // 基于准备好的dom，初始化echarts实例
        let myChart = this.$echarts.init(document.getElementById(this.id))
        // 绘制图表
        myChart.setOption({
            legend: {
                top: '20',
                show: this.isLegendShow,
                data: this.legendArray
            },
            grid: {
                left: '3%',
                right: '4%',
                bottom: '3%',
                width: '88%',
                containLabel: true
            },
            tooltip: {
                trigger: 'axis',
                axisPointer: {
                type: 'cross'
            },
            padding: [5, 10]
            },
            xAxis: {
                type: 'category',
                name: this.xAxisName,
                boundaryGap: false,
                axisLine:{
                    lineStyle:{
                        color:'#999999'
                    }
                },
                splitLine: {
                    show: false
                },
                data: ["10/1","10/2","10/3","10/4","10/5","10/6","10/7"]
            },
            yAxis: {
                type: 'value',
                name: this.yAxisName,
                axisLine:{
                    lineStyle:{
                        color:'#999999'
                    }
                },
                splitLine: {
                    show: false
                }
            },
            series: this.seriesData
        });
    }
  }
}

</script>

<style scoped>
</style>