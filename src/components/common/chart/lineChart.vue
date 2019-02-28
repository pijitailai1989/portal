<template>
  <div class="">
    <div v-show="shows" :id="id" style="height:400px;width:100%"></div>
    <div v-show="!shows" style="height:400px;text-align:center;line-height:400px;">暂无相关数据</div>
  </div>
</template>
<script>
import HighCharts from 'highcharts'
import {mapState,mapGetters,mapActions,mapMutations} from 'vuex'
export default {
  // 验证类型
  props: {
    id: {
      type: String
    },
    // option: {
    //   type: Object
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
      shows:true,
      xAxisName:'',
      yAxisName:''
    }
  },
  computed: {
        ...mapState('menu',[
            'country_list','overview','lastmileList','backGo','rateCard','priceList','lastmileCountry',
            'nextLocationList','searchArr','mapCountry','lastmileRate'
        ]),
        news(){
       return this.$t('news')
      },
    },
  mounted() {
    //   console.log(this.seriesData,'this.seriesData')
    
  },
  watch: {
      lastmileRate(newval,oldval){
            console.log(newval,'newval')
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
        //   console.log(newval,'newval',this.xData)
          if(newval.length>0){
             this.initCharts()
          }
      }
  },
  methods:{
      initCharts(){
          HighCharts.chart(this.id,
              {
                  chart: {
	        		type: 'line',
	        		zoomType: 'x',
	        		panning: true,
	        		panKey: 'shift'
	        	},
	        	title: {
	        		text: ''
                },
                tooltip:{
                    shared: true,
                    useHTML: true,
                    headerFormat: '<small>{point.key} '+this.xAxisName+'</small><table>',
                    pointFormat: '<tr><td style="color: {series.color}">{series.name}:</td>' +
                        '<td style="text-align: right"><b>'+this.yAxisName+ ' {point.y}</b></td></tr>',
                    footerFormat: '</table>',
                    valueDecimals: 2
                },
	        	subtitle: {
	        		text: ''
	        	},
	        	xAxis: {
                    categories: this.xData,
                    title: {
                        text:this.news.ZLL+'( '+this.xAxisName+' )'
                    }
                },
                yAxis:{
                    title: {
                        text:this.news.JGL+'( '+this.yAxisName+' )'
                    }
                },
	        	series: this.seriesData
              }
            )
      }
  }
}
</script>