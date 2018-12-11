<template>
  <div class="flexs columns" style="padding:0 10px 10px;">
    
    <div class="popover2 flexs columns">
      <line-chart 
        id="SingleLine"
        width="580px"
        height="240px"
        :xAxisName="menu.date"
        :yAxisName="menu.SpendTime"
        :seriesData="dataList"
        :xData="xdata"
      />
    </div>
    <div class="popover1">
        <el-row style="margin-bottom:20px;">
          <el-col :span="14"><div class="title mar colo">评价详情</div></el-col>
          <el-col :span="10"><div class="title mar colo">费用详情</div></el-col>
        </el-row>

        <el-row style="margin-bottom:10px;">
          <el-col :span="4">
            <span style="color:#333;">物流反馈率</span>
          </el-col>
          <el-col :span="10">
            <el-rate
              v-model="postTodo.track_and_trace_score"
              :colors="arrColor"
              :disabled="true"/>
          </el-col>
          <el-col :span="10">
            <span style="color:#999;">运费：</span>
            <span style="color:#333;">{{postTodo.amount}} {{postTodo.currency}}</span>
          </el-col>
        </el-row>

        <el-row style="margin-bottom:10px;">
          <el-col :span="4">
            <span style="color:#333;">配送成功率</span>
          </el-col>
          <el-col :span="10">
            <el-rate
              v-model="postTodo.failed_delivery_score"
              :colors="arrColor"
              :disabled="true"/>
          </el-col>
          <el-col :span="10">
            <span style="color:#999;">关税：</span>
            <span style="color:#333;">{{postTodo.package_tax}} {{postTodo.currency}}</span>
          </el-col>
        </el-row>

        <el-row style="margin-bottom:10px;">
          <el-col :span="4">
            <span style="color:#333;">用户评价</span>
          </el-col>
          <el-col :span="10">
            <el-rate
              v-model="postTodo.customer_comment_score"
              :colors="arrColor"
              :disabled="true"/>
          </el-col>
          <el-col :span="10">
            <div class=""/>
          </el-col>
        </el-row>
    </div>
  </div>
</template>

<script>
import lineChart from '@/components/common/chart/lineCharts'
export default {
  name: 'User',
  components: {
    lineChart
  },
  props: {
    postTodo: {
      type: Object,
      default: function() {
        return { }
      }
     }
  },
  data() {
    return {
      value5: 3,
      arrColor: ['#E78483', '#E78483', '#E78483'],
      dataList: [],
      xdata:[],
      objectData:{}
    }
  },
  computed:{
    menu(){
          return this.$t('menu')
        }
  },
  mounted() {
      //  console.log(this.postTodo,'charts')
       this.objectData=JSON.parse(this.postTodo.history_lead_time)
      //  console.log(this.objectData,'charts')
       for(let key in this.objectData){
          this.xdata.push(key)
          this.dataList.push(this.objectData[key])
       }
      //  console.log(this.xdata,this.dataList,'6666')
  },
  methods: {

  }
}
</script>

<style scoped>
    .popover1{
      width:100%;
      padding:10px 30px;
    }
    .popover2{
      width:100%;
      height:240px;
      margin-bottom:30px;
    }
  .mar{margin-bottom:0;}
  .colo{color:#333;}
  .title{font-weight:600;}
</style>
