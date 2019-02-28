<template>
    <div>
       <div v-show="shows" ref="chart_wrap" style="height:400px;width:100%"></div>
       <div v-show="!shows" style="height:400px;text-align:center;line-height:400px;">暂无相关数据</div>
    </div>
</template>

<script>
import {mapState,mapGetters,mapActions,mapMutations} from 'vuex'
export default {
  props: {
    id: {
      type: String
    },
    
    // xAxisName: {
    //     type: String,
    //     default: 'kg'
    // },
    // yAxisName: {
    //     type: String,
    //     default: '$'
    // },
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
    },
    
  },
  data () {
    return {
      msg: '',
      legendData:[],
      echartData:[],
      shows:true,
      myChart:null
    }
  },
  watch: {
      lastmileRate(newval,oldval){
        //  console.log(this.lastmileRate,'this.rateCard')
         
    //      this.lastmileRate.data.forEach(element => {
    //          let data={}
    //          data.name=element.service_name
    //          data.data=element.rate
    //          data.type='line'
    //          this.seriesData.push(data)
    //      });
         let arr=[]
         this.seriesData.forEach(element => {
             arr.push(element.name)
         });
         this.legendData=arr;
         this.xAxisName=this.lastmileRate.unit
         this.yAxisName=this.lastmileRate.currency
         if(this.seriesData.length>0){
             this.shows=true
             this.initCharts()
         }else{
             this.shows=false
         }
      },
      seriesData(newval,oldval){
          console.log(newval,'newval',this.xData)
          if(newval.length>0){
             this.setOptions(newval)
          }
      }
  },
  mounted(){
  },
  computed: {
        ...mapState('menu',[
            'country_list','overview','lastmileList','backGo','rateCard','priceList','lastmileCountry',
            'nextLocationList','searchArr','mapCountry','lastmileRate'
        ]),
        
    },
  methods: {
      initCharts() {
            this.myChart = this.$echarts.init(this.$refs.chart_wrap)
            this.setOptions();
        },
    setOptions(val){
        // 基于准备好的dom，初始化echarts实例
        // let myChart = this.$echarts.init(document.getElementById(this.id))
        // 绘制图表
        console.log(val,'val')
        this.myChart.setOption({
            
            grid: {
                top:'8%',
                left: '1%',
                right: '2%',
                bottom: '0%',
                width: '95%',
                containLabel: true
            },
            legend: {
                data:this.legendData
            },
            tooltip: {
                trigger: 'axis',
            },
            xAxis: {
                type: 'category',
                name: this.xAxisName,
                boundaryGap:false,
                data: this.xData,
                axisLabel:{
						     interval:5,//横轴信息全部显示
						    //  rotate:-30,//-30度角倾斜显示
						}
            },
            yAxis: {
                type: 'value',
                name: this.yAxisName,
            },
            series: val
        },true);
        //解决echarts的渲染问题
        
    }
  }
}

</script>

<style scoped>
</style>