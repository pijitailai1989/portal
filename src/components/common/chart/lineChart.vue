<template>
  <div class="charts">
    <div v-show="shows" :id="id" style="height:400px;width:100%"></div>
    <div v-show="!shows" style="height:400px;text-align:center;line-height:400px;">No data</div>
    <div class="dian"></div>
    <div class="reset" @click="allShowFn()" v-if="allShow">Reset zoom</div>
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
      yAxisName:'',
      xData1:[],
      allShow:true
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
            // console.log(newval,'newval')
         const _this = this;
         this.xAxisName=this.lastmileRate.unit
         this.yAxisName=this.lastmileRate.currency
         if(this.seriesData.length>0){
             this.shows=true
             this.initCharts()
             if(_this.allShow){
                let len = null;
                  _this.xData.forEach( (el,index)=>{
                      if(el>9.9&&el<10.1){
                          len = index;
                        //   console.log(len,'len')
                          return;
                      }
                  })
                //   console.log(len,'len',_this.xData)
                  _this.seriesData.forEach(el=>{
                    //   console.log(12233,el.data)
                      el.data.forEach( (item,index)=>{
                           
                            el.data.splice( len+1 , (el.data.length-1) )
                            // console.log(11111111111)
                          
                      })
                  })
                //   console.log(this.seriesData,'xData')
             }
             
         }else{
             this.shows=false;
            //  this.allShow=false;
             
         }
      },
      seriesData(newval,oldval){
        //   console.log(newval,'newval',this.xData)
          if(newval.length>0){
             this.initCharts()
             
          }else{
              this.allShow=false;
            //   console.log(this.allShow,'this.allShow')
          }
      }
  },
  methods:{
      allShowFn(){
          this.allShow=false;
          this.$emit('chartFn',true)
      },
      initCharts(){
          HighCharts.chart(this.id,
              {
                  chart: {
	        		type: 'line',
	        		zoomType: 'x',
	        		panning: true,
                    panKey: 'shift',
                    
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
<style scoped>
 .charts{
     position: relative;
 }
 .dian{
     position:absolute;
     width:80px;
     height:20px;
     background: white;
     bottom:0px;
     right:0;
 }
 .reset{
     position:absolute;
     width:100px;
     height:35px;
     background: #F7F7F7;
     top:20px;
     right:19px;
     border:1px solid #D6D6D6;
     text-align: center;
     line-height:35px;
     font-size:11px !important;
     color:#333;
     cursor: pointer;
 }
</style>