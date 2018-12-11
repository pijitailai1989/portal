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
    xAxisName: {
        type: String
    },
    yAxisName: {
        type: String
    },
    seriesData: {
        type: Array,
        default: function() {
        return []
        }
    },
    xData: {
        type: Array,
        default: function() {
        return []
        }
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
        this.$nextTick(()=>{
        myChart.setOption({
            
            grid: {
                top:'12%',
                left: '1%',
                right: '4%',
                bottom: '1%',
                width: '90%',
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
                data: this.xData
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
            series: [
               {
                 type: 'line',
                 itemStyle: {
                     normal: {
                     color: '#2F9AC0',
                     lineStyle: {
                         color: '#2F9AC0',
                         width: 2
                     }
                   }
                 },
                 smooth: true,
                 data: this.seriesData
               }
             ]
        });
        })
    }
  }
}

</script>

<style scoped>
</style>