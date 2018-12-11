<template>
  <div :id="id" :style="{height:height,width:width}"></div>
</template>

<script>
export default {
  props: {
    id: {
      type: String,
      default: 'PieChart'
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
  methods: {
    drawLine(){
        // 基于准备好的dom，初始化echarts实例
        let myChart = this.$echarts.init(document.getElementById(this.id))
        // 绘制图表
        myChart.setOption({
            tooltip : {
                trigger: 'item',
                // formatter: "{a} <br/>{b} : {c} ({d}%)"
                formatter: "{b} : {d}%"
            },
            grid: {
                left: '3%',
                right: '4%',
                bottom: '3%',
                width: '80%',
                containLabel: true
            },
            series: [
                {
                    type: 'pie',
                    radius : '75%',
                    center: ['50%', '50%'],
                    data:[
                        {value:45, name:'京东'},
                        {value:15, name:'淘宝'},
                        {value:40, name:'亚马逊'}
                    ],
                    label: {
                        normal: {
                            show: false
                        },
                        emphasis: {
                            show: false
                        }
                    },
                    labelLine: {
                        normal: {
                            show: false
                        },
                        emphasis: {
                            show: true
                        }
                    },
                    itemStyle: {
                        emphasis: {
                            shadowBlur: 1,
                            shadowOffsetX: 1,
                            shadowColor: 'rgba(0, 0, 0, 0.3)'
                        }
                    }
                }
            ],
            color: ["#E78483", "#FFD78E", "#2F9AC0"]
        });
    }
  }
}

</script>

<style scoped>
</style>