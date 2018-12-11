<template>
  <div class="flex colmun ">
    <div class="flex">

      <div class="popover2 flex colmun " style="">
        <div class="title mar colo" style="height:20px;">Lead time</div>
        <line-chart :linedata="chartdata.history_lead_time" width="560px" height="160px"/>
      </div>

    </div>
    <div>
      <div class="popover1">
        <el-row style="width:520px;margin-bottom:10px;">
          <el-col :span="24"><div class="title mar colo">Overall Rating</div></el-col>
        </el-row>
        <el-row style="margin-bottom:5px;">
          <el-col :span="7">
            <i class="iconfont icon-Location" style="color:#4A4A4A;font-size:18px;margin-left:5px;"/>
            <span>Track and Trace</span>
          </el-col>
          <el-col :span="6">
            <el-rate
              v-model="chartdata.track_and_trace_score"
              :colors="arrColor"
              :disabled="true"/>
          </el-col>
          <el-col :span="11"><div class="">Last 3 months track  and trace compleness. </div></el-col>
        </el-row>

        <el-row style="margin-bottom:5px;">
          <el-col :span="7">
            <i class="iconfont icon-sey-Location" style="color:#4A4A4A;font-size:18px;margin-left:5px;"/>
            <span>Failed Delivery</span>
          </el-col>
          <el-col :span="6">
            <el-rate
              v-model="chartdata.failed_delivery_score"
              :colors="arrColor"
              :disabled="true"/>
          </el-col>
          <el-col :span="11"><div class="">Last 3 months track FD rate. </div></el-col>
        </el-row>

        <el-row style="margin-bottom:5px;">
          <el-col :span="7">
            <i class="iconfont icon-xiaoxi" style="color:#4A4A4A;font-size:18px;margin-left:5px;"/>
            <span>Customer Comment</span>
          </el-col>
          <el-col :span="6">
            <el-rate
              v-model="chartdata.customer_comment_score"
              :colors="arrColor"
              :disabled="true"/>
          </el-col>
          <el-col :span="11"><div class=""/></el-col>
        </el-row>

      </div>
    </div>
  </div>
</template>

<script>
import lineChart from '@/components/common/Charts/lineCharts'
export default {
  name: 'PopoverCharts',
  components: {
    lineChart
  },
  props: {
    chartdata: {
      type: Object,
      default: function() {
        return { }
      }
    }
  },
  data() {
    return {
      value5: 3,
      arrColor: ['#46AD9B', '#46AD9B', '#46AD9B']
    }
  },
  mounted() {
    // this.chartdata.cost=parseFloat(this.chartdata.cost)
    // this.chartdata.customCost=parseFloat(this.chartdata.customCost)
    // this.chartdata.customer_comment_score=parseFloat(this.chartdata.customer_comment_score)
    // this.chartdata.failed_delivery_score=parseFloat(this.chartdata.failed_delivery_score)
    // this.chartdata.max_lead_time=parseFloat(this.chartdata.max_lead_time)
    // this.chartdata.min_lead_time=parseFloat(this.chartdata.min_lead_time)
    // this.chartdata.package_tax=parseFloat(this.chartdata.package_tax)
    // this.chartdata.rate_card_id=parseFloat(this.chartdata.rate_card_id)
    // this.chartdata.tax_in=parseFloat(this.chartdata.tax_in)
    // this.chartdata.track_and_trace_score=parseFloat(this.chartdata.track_and_trace_score)
    // let time=this.chartdata.history_lead_time
    // Object.keys(time).forEach(item => {
    //           time[item]=parseFloat(time[item])
    //         })
    // console.log(this.chartdata, 'this')
  },
  methods: {

  }
}
</script>

<style scoped>
    .popover{
    width:220px;
    padding:5px 10px;
    font-size:13px;
    }
    .popover1{
    width:100%;
    padding:5px 10px;
    font-size:13px;
    }
    .popover2{
    width:100%;
    height:180px;
    }
  .mar{margin-bottom:0;}
  .colo{color:#46AD9B;}
  .title{font-weight:600;}
</style>
