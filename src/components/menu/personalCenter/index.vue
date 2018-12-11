<template>
  <div>
    <!-- 图像部分 -->
    <div class="rows flexs j-between">
      <div class="portrait">
        <head-portrait/>
      </div>
      <div class="select-diy">
        <el-date-picker
          v-model="value6"
          type="daterange"
          range-separator="~"
          start-placeholder=""
          end-placeholder=""
        
          style="width:100%;">
        </el-date-picker>
      </div>
    </div>
    <!-- 表格清单 -->
    <div class="rows flexs j-between chart-box1">
        <div class="chart-container">
          <line-chart 
            id="DoubleLine" 
            width="100%" 
            height="100%"
            :xAxisName="menu.date"
            :yAxisName="menu.amount"
            :seriesData="dataList1"
          />
        </div>
        <div class="order-container">
          <ul class="order-list">
            <li class="flexs">
              <strong class="lt-title">{{menu.totalOrder}}</strong>
              <p class="rt-text">¥898888</p>
            </li>
            <li>
              <strong class="lt-title">{{menu.logisticsCost}}</strong>
              <span class="rt-text">¥89</span>
              <ul class="logistics-details">
                <li class="flexs">
                  <span>{{menu.tariffs}}:</span>
                  <div>¥128</div>
                </li>
                <li class="flexs">
                  <span>{{menu.logisticsCost}}:</span>
                  <div>¥128</div>
                </li>
                <li class="flexs">
                  <span>{{menu.OtherFees}}:</span>
                  <div>¥128</div>
                </li>
              </ul>
            </li>
            <li class="flexs">
              <strong class="lt-title">{{menu.orderNumber}}</strong>
              <p class="rt-text">988</p>
            </li>
            <li class="flexs">
              <strong class="lt-title">{{menu.AverageCost}}</strong>
              <p class="rt-text">¥898888</p>
            </li>
          </ul>
        </div>
    </div>
    <!-- 表格2 -->
    <div class="rows flexs j-between chart-box2">
      <div class="chart-container">
          <line-chart 
            id="SingleLine"
            width="100%"
            height="100%"
            :isLegendShow="false"
            :xAxisName="menu.date"
            :yAxisName="menu.orderNumber"
            :seriesData="dataList"
          />
      </div>
    </div>
    <!-- 表格3 -->
    <div class="rows flexs j-between chart-box3">
      <div class="rank-compare">
        <h2 class="rank-tilte">{{menu.DestinationRanking}}</h2>
        <div class="rank-box">
          <ul>
            <li class="flexs j-between rank-items">
              <div class="destination">发往美国</div>
              <progress-bar/>
            </li>
            <li class="flexs j-between rank-items">
              <div class="destination">发往泰国</div>
              <progress-bar/>
            </li>
            <li class="flexs j-between rank-items">
              <div class="destination">发往新加坡</div>
              <progress-bar/>
            </li>
          </ul>
        </div>
      </div>
      <div class="rank-compare">
        <h2 class="rank-tilte">{{menu.companyRanks}}</h2>
        <div class="rank-box">
          <ul>
            <li class="flexs j-between rank-items">
              <div class="destination">Etu</div>
              <progress-bar/>
            </li>
            <li class="flexs j-between rank-items">
              <div class="destination">Glc</div>
              <progress-bar/>
            </li>
            <li class="flexs j-between rank-items">
              <div class="destination">Ske</div>
              <progress-bar/>
            </li>
          </ul>
        </div>
      </div>
      <div class="rank-compare">
        <h2 class="rank-tilte">{{menu.ChannelContrast}}</h2>
        <div class="rank-box channel-pie" style="padding: 20px 30px;">
          <pie-chart  width="200px'" height="180px"/>
          <ul>
            <li class="flexs j-between rank-items">
              <div class="destination">亚马逊</div>
              <progress-bar bgcolor="#33A9D3" :progress="40"/>
            </li>
            <li class="flexs j-between rank-items">
              <div class="destination">京东</div>
              <progress-bar bgcolor="#E78483" :progress="45"/>
            </li>
            <li class="flexs j-between rank-items">
              <div class="destination">淘宝</div>
              <progress-bar bgcolor="#FFD78E" :progress="15"/>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <!-- 表格4 -->
    <div class="rows flexs j-between chart-box4">
      <h1 class="box-title">{{menu.StateInstrument}}</h1>
      <div class="chart-container chart-box4-container">
          <bar-chart  width="100%" height="100%"/>
      </div>
    </div>
    <!-- <line-chart width="900px'" height="300px"/>
                  <bar-chart  width="900px'" height="300px"/>
                  <pie-chart  width="900px'" height="300px"/> -->
  </div>
</template>

<script>
  import HeadPortrait from "@/components/menu/component/headPortrait"
  import LineChart from "@/components/common/chart/lineChart"
  import BarChart from "@/components/common/chart/barChart"
  import PieChart from "@/components/common/chart/pieChart"
  import ProgressBar from "@/components/common/progressBar"
  export default {
    name: 'personalCenter',
    components: {
      HeadPortrait,
      LineChart,
      BarChart,
      ProgressBar,
      PieChart
    },
    props: [''],
    computed :{
       menu(){
          return this.$t('menu')
        }
    },
    data() {
      return {
        value6: [new Date(2018, 9, 10), new Date(2018, 9, 17)],
        dataList: [
          {
            name: '订单金额',
            type: 'line',
            itemStyle: {
                normal: {
                color: '#F5BA50',
                lineStyle: {
                    color: '#E78483',
                    width: 2
                }
              }
            },
            smooth: true,
            data: [330, 210, 160, 90, 190, 780, 450]
          }
        ],
        dataList1: [
          {
            name: '物流费用',
            type: 'line',
            itemStyle: {
                normal: {
                    color: '#59AFCD',
                    lineStyle: {
                        color: '#59AFCD',
                        width: 2
                    }
                }
            },
            smooth: true,
            data: [500, 200, 360, 100, 100, 200,700]
          },
          {
            name: '订单金额',
            type: 'line',
            itemStyle: {
                normal: {
                color: '#F5BA50',
                lineStyle: {
                    color: '#F5BA50',
                    width: 2
                }
                // areaStyle: {
                //     color: '#f3f8ff'
                // }
                }
            },
            smooth: true,
            data: [330, 270, 60, 190, 100, 280,670]
          }
        ]
      }
    },
    methods: {
      
    }
  
  }
</script>

<style lang='' scoped>
  .select-diy{
    width: 311px;
    text-align: center;
  }

  select{
    font-size: 20px;
    color: #666666;
    border: none;
    outline: none;
    background: none;
    background-color: #ffffff;
  }

  .chart-box1, .chart-box2, .chart-box3, .chart-box4{
    height: auto;
    width: 100%;
    margin-top: 55px;
  }

  .portrait{
    width: 590px;
  }
  
  .chart-container{
    width: 590px;
    height:454px;
    background:rgba(255,255,255,1);
    box-shadow:0px 6px 16px 0px rgba(225,225,225,0.5);
    border-radius:7px;
  }

  .chart-box3-container, .chart-box4-container{
    width: 100%;
  }

  .order-container{
    width: 311px;
    height:454px;
    padding: 45px 30px;
    background:rgba(255,255,255,1);
    box-shadow:0px 6px 16px 0px rgba(225,225,225,0.5);
    border-radius:7px;
  }

  .order-list>li{
    margin-bottom: 35px;
  }

  .lt-title{
    line-height: 34px;
    color: #666666;
    font-size: 16px;
    font-weight: 400;
  }

  .rt-text{
    margin-left: 22px;
    color: #333333;
    font-size: 24px;
    font-weight: 500;
  }

  .logistics-details>li>*{
    font-size:14px;
    font-weight:400;
    color:rgba(153,153,153,1);
    line-height:20px;
    margin-top: 12px;
  }

  .box-title{
    font-size:18px;
    font-weight:500;
    color:rgba(102,102,102,1);
    line-height:25px;
    margin-bottom: 30px;
  }

  .rank-compare{
    width: 290px;
  }

  .rank-tilte{
    margin-bottom: 28px;
    font-size:18px;
    font-weight:400;
    color:rgba(102,102,102,1);
  }

  .rank-box{
    height: 350px;
    padding: 51px 30px;
    background:rgba(255,255,255,1);
    box-shadow:0px 6px 16px 0px rgba(225,225,225,0.5);
    border-radius:7px;
  }

  .destination{
    min-width: 70px;
    font-size:14px;
    font-weight:400;
    color:rgba(153,153,153,1);
  }

  .rank-items{
    margin-bottom: 55px;
  }

  .channel-pie .rank-items{
    margin-bottom: 15px;
  }
</style>