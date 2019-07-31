<template>
  <div class="charts" style="width:100%;height:100%;">
    <div v-show="shows" id="myChart" style="width:100%;height:100%;" ref="echarts"></div>
    <div v-show="!shows" style="text-align:center;height:200px;line-height:200px;">{{news.nodata}}</div>
  </div>
</template>
<script>
import {mapState,mapGetters,mapActions,mapMutations} from 'vuex'
// var echarts = require('echarts');
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
      
    // this.xAxisName=this.lastmileRate.unit
    // this.yAxisName=this.lastmileRate.currency
    this.drawLine();
    this.init()
  },
  watch: {
     lastmileRate(newval,oldval){
         if(this.seriesData.length>0){
             this.shows=true
             this.xAxisName=this.lastmileRate.unit
             this.yAxisName=this.lastmileRate.currency
             this.init()
             this.drawLine();
             
         }else{
             this.shows=false
         }

     }
  },
  methods:{
      init(){
             const self = this;//因为箭头函数会改变this指向，指向windows。所以先把this保存
             setTimeout(() => {
                window.onresize = function() {
                    self.chart = self.$echarts.init(self.$refs.echarts);
                    self.chart.resize();
                }
             },20)
            },
      drawLine(){
        // 基于准备好的dom，初始化echarts实例
        let myChart = this.$echarts.init(this.$refs.echarts)
        // 绘制图表
        let weight = this.xAxisName;
        let price = this.yAxisName;
        let xTitle = this.news.ZLL;
        myChart.clear();
        myChart.setOption({
            tooltip: {
                 trigger: 'axis',
                //  position: function (pt) {
                //      return [pt[0], '10%'];
                //  },
                position: function (point, params, dom, rect, size) {
                  // 鼠标坐标和提示框位置的参考坐标系是：以外层div的左上角那一点为原点，x轴向右，y轴向下
                  // 提示框位置
                  var x = 0; // x坐标位置
                  var y = 0; // y坐标位置
                 
                  // 当前鼠标位置
                  var pointX = point[0];
                  var pointY = point[1];
                 
                  // 外层div大小
                  // var viewWidth = size.viewSize[0];
                  // var viewHeight = size.viewSize[1];
                 
                  // 提示框大小
                  var boxWidth = size.contentSize[0];
                  var boxHeight = size.contentSize[1];
                 
                  // boxWidth > pointX 说明鼠标左边放不下提示框
                  if (boxWidth > pointX) {
                    x = 5;
                  } else { // 左边放的下
                    x = pointX - boxWidth;
                  }
                 
                  // boxHeight > pointY 说明鼠标上边放不下提示框
                  if (boxHeight > pointY) {
                    y = 5;
                  } else { // 上边放得下
                    y = pointY - boxHeight;
                  }
                 
                  return [x, y];
                },
                 backgroundColor:'rgba(255,255,255,0.8)',
                 borderColor:'#2F9AC0',
                 borderWidth:1,
                 formatter: function( params ){
                   var startDiv = '<div>';
                   var centerDiv = '';
                   var endDiv = '</div>';
                   centerDiv += `<p style="color:#333;padding:5px">${xTitle} : ${params[0].name}  ${weight}</p>`;
                   for(let i=0;i<params.length;i++){
                       let item = params[i]
                      centerDiv += `<p style="color:${item.color}">
                                     <i class="iconfont icon-hengxian" style="color: ${item.color};font-size: 15px;margin-right:3px;"></i>
                                     <span>${item.seriesName} : ${price} ${item.value}</span>
                                    </p>`
                   }
                   
                   return startDiv + centerDiv + endDiv ;
                 }
             },
             title: {
                 left: 'center',
                 text: '',
             },
             grid:{
                    x:50,
                    y:30,
                    x2:85,
                    y2:70,
                    borderWidth:1
                },
             xAxis: {
                 type: 'category',
                 boundaryGap: false,
                 data: this.xData,
                 name: `${this.news.ZLL}( ${this.xAxisName} )`
             },
             yAxis: {
                 type: 'value',
                 boundaryGap: [0, '100%'],
                 name: `${this.news.JGL}( ${this.yAxisName} )`
             },
             dataZoom: [{
                 type: 'inside',
                 start: 0,
                 end: 30,
                 showDetail:true
             }, {
                 start: 0,
                 end: 60,
                 handleIcon: 'M10.7,11.9v-1.3H9.3v1.3c-4.9,0.3-8.8,4.4-8.8,9.4c0,5,3.9,9.1,8.8,9.4v1.3h1.3v-1.3c4.9-0.3,8.8-4.4,8.8-9.4C19.5,16.3,15.6,12.2,10.7,11.9z M13.3,24.4H6.7V23h6.6V24.4z M13.3,19.6H6.7v-1.4h6.6V19.6z',
                 handleSize: '80%',
                 handleStyle: {
                     color: '#fff',
                     shadowBlur: 3,
                     shadowColor: 'rgba(255, 255, 255, 0.2)',
                     shadowOffsetX: 2,
                     shadowOffsetY: 2
                 }
             }],
             series: this.seriesData
        },this);
    }
  },
  destroyed () {
    window.onresize = null;
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