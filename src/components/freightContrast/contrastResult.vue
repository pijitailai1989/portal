<template>
  <div>
      <div class="display-table">
          <div class="table-tools flexs j-between">
              <div class="orginal">
                  <!--<span>发货国：</span>{{origin}}-->
              </div>
              <a class="export-excel" @click="downloadFile()">
                <i class="icon iconfont icon-daochu" style="color: #F4B33D;"></i>{{news.DCYFDB}}
              </a>
          </div>
          <div class="table-container">
              <div class="table-header">{{news.YFDBJG}}</div>
              <el-table
                id="dataList"
                :data="tableData"
                height="480"
                style="width: 100%;border-bottom-left-radius:10px;
      border-bottom-right-radius:10px;">
                <el-table-column
                  prop="destination"
                  :label="news.SHG"
                  align="center">
                </el-table-column>
                <el-table-column
                  prop="province"
                  :label="news.SJCS"
                  align="center">
                </el-table-column>
                <!--<el-table-column-->
                  <!--prop="has_battery"-->
                  <!--label="是否带电"-->
                  <!--align="center">-->
                  <!--<template slot-scope="scope">-->
                      <!--<span>{{scope.row.has_battery === 'Y'? '是' : '否'}}</span>-->
                  <!--</template>-->
                <!--</el-table-column>-->
                <el-table-column
                  prop="weight"
                  :label="news.WEIGHT"
                  align="center">
                </el-table-column>
                <el-table-column
                  prop="actual_expense"
                  :label="news.NDYF"
                  align="center">
                  <template slot-scope="scope">
                    {{scope.row.actual_currency}} {{scope.row.actual_expense}}
                  </template>
                </el-table-column>
                <el-table-column
                  prop="spider_expense"
                  :label="news.SPYF"
                  align="center">
                  <!-- :render-header="renderHeader" -->
                  <template slot-scope="scope">
                    {{scope.row.spider_currency}} {{scope.row.spider_expense}}
                  </template>
                </el-table-column>
              </el-table>
          </div>
          <p class="tip"><span v-if="tableItems > 1000">{{news.TSJJSQ}}</span></p>
          <div class="flexs j-end">
              <ul class="fee-box">
                  <li>{{news.NDYFZE}}：<b>{{currency+' '+actual_cost}}</b></li>
                  <li>{{news.SPDYFZE}}：<b>{{currency}}<span class="bigger"> {{spider_cost}}</span></b></li>
              </ul>
          </div>
      </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      Pid: '',
      origin: '',
      actual_cost: 0,
      currency: 'CNY',
      spider_cost: 0,
      tableData: [],
      excelUrl: '/seller-tools/compare-file-download?processID=',
      tableItems: 0,
      timeOut: null,
      loadingInstance: null,
      currentItem: 0,
      totleItems: 0,
      percentage: 0
    }
  },
  computed:{
    
    materialBenefits(){
        return this.$t('homeMaterialBenefits')
    },
    nav(){
       return this.$t('nav')
     },
     news(){
       return this.$t('news')
     }
  },
  mounted() {
    // this.getDatas()
    this.loadingInstance = this.$loading({
            text: "正在加载中...",
            target: document.querySelector('#dataList')
        })
        // console.log(this.loadingInstance, 'jjsjfjdj')
    this.timeOut = setInterval(() => this.getDatas(), 1500)
  },
  // ,
  // computed: {
  //     loadingInstance() {
  //        return this.$loading({
  //           text: '',
  //           target: document.querySelector('#dataList')
  //       })
  //     }
  // },
  methods: {
    getDatas() {
      this.Pid = this.$route.query.data
      this.$http.get('/seller-tools/compare-file-process?processID='+ this.Pid).then(res => {
          console.log(res.data, '')
          if(res.data.status === 'pending') {
              this.currentItem = res.data.progress[0]
              this.totleItems = res.data.progress[1]
              this.percentage = res.data.progress[2]*100+'%'
              // this.loadingInstance.text = "正在加载中，已完成"+res.data.progress[0]+"条，总共"+res.data.progress[1]+"条，已完成"+res.data.progress[2]
          }else if(res.data.status === 'success'){
              clearInterval(this.timeOut)
              this.tableData = res.data.result.data
              this.origin = res.data.result.origin
              this.actual_cost = res.data.result.actual_cost
              this.currency = res.data.result.currency
              this.spider_cost = res.data.result.spider_cost
              // this.tableItems = res.data.result.data.length
              this.tableItems = res.data.result.total_count
              this.loadingInstance.text = "已完成"
              this.loadingInstance.close()
          }
      })
    },
    downloadFile() {
        this.Did = this.$route.query.data
        let _Url = process.env.BASE_API
        _Url += this.excelUrl
        _Url += this.Did
        window.location.href = _Url

    }
    // ,
    // renderHeader (h, params) {
    //   return [h('span', params.column.label),h('span', '（'+this.currency+'）')]
    // }
  }
}

</script>

<style scoped>
    .display-table{
      width: 950px;
      margin: 100px auto;
    }
    .table-tools{
      margin: 20px 0;
    }
    .orginal{
      font-size: 16px;
      color: #333333;
    }
    .orginal>span{
      color: #999999;
    }
    .export-excel{
      display: block;
      font-size: 16px;
      color: #F4B33D;
      cursor: pointer;
    }
    .table-container{
      background:rgba(255,255,255,1);
      box-shadow:0px 6px 12px 0px rgba(230,230,230,0.5);
      border-radius:10px;
    }
    .table-header{
      line-height: 40px;
      text-align: center;
      font-size: 18px;
      background: #2F9AC0;
      color: #ffffff;
      border-top-left-radius:10px;
      border-top-right-radius:10px;
    }
    .tip{
      margin-top: 15px;
      font-size:14px;
      color: #AAAAAA;
      line-height:19px;
    }
    .fee-box li{
      color: #AAAAAA;
      padding: 5px 0;
    }

    .fee-box li>b{
      color: #2F9AC0;
      font-size: 18px;
    }
    .fee-box li>b span.bigger{
      font-size: 26px;
    }
</style>
