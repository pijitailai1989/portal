<template>
  <div style="padding:0 20px;height:100%;" class="flexs columns j-around infot log">
      
      <div style="width:90px;height:40px;margin-bottom:8px;"><img :src="baseURL+postTodo.logo" :onerror="errorImg" alt=""></div>
      <div>
          <!-- <span style="#999;">总费用：</span> -->
          <span style="color:#333;">{{postTodo.amount}} {{postTodo.currency}}</span>
      </div>
      <div>
          <span style="color:#333;">{{postTodo.min_lead_time}}-{{postTodo.max_lead_time}}天</span>
      </div>
      <div class="flexs j-between a-center">
          <span v-if="!postTodo.best_price_product&&!postTodo.fastest_product&&!postTodo.highest_score_product" style="color: #2F9AC0;"></span>
          <span v-else-if="!postTodo.best_price_product&&!postTodo.fastest_product&&postTodo.highest_score_product" style="color: #2F9AC0;">最高评分</span>
          <span v-else-if="postTodo.best_price_product&&!postTodo.fastest_product&&!postTodo.highest_score_product" style="color: #2F9AC0;">最便宜</span>
          <span v-else-if="!postTodo.best_price_product&&postTodo.fastest_product&&!postTodo.highest_score_product" style="color: #2F9AC0;">最快速</span>
          <el-tooltip  v-else-if="postTodo.best_price_product&&postTodo.fastest_product&&!postTodo.highest_score_product" class="item" effect="dark" content="最便宜,最快速" placement="left">
            <span style="color: #2F9AC0;">最优推荐</span>
          </el-tooltip>
          <el-tooltip  v-else-if="!postTodo.best_price_product&&postTodo.fastest_product&&postTodo.highest_score_product" class="item" effect="dark" content="最高评分,最快速" placement="left">
            <span style="color: #2F9AC0;">最优推荐</span>
          </el-tooltip>
          <el-tooltip  v-else-if="postTodo.best_price_product&&!postTodo.fastest_product&&postTodo.highest_score_product" class="item" effect="dark" content="最高评分,最便宜" placement="left">
            <span style="color: #2F9AC0;">最优推荐</span>
          </el-tooltip>
          <el-tooltip  v-else class="item" effect="dark" content="最高评分,最便宜,最快速" placement="left">
            <span style="color: #2F9AC0;">最优推荐</span>
          </el-tooltip>
          <i v-if="postTodo.choose==1" class="iconfont icon-icon" style="color: #2F9AC0;font-size: 18px"/>
          <i v-else @click="selectLog(postTodo.product_id,postI,postIndex,postTodo.amount,postTodo.package_tax,postTodo.rate_id
          )" class="iconfont icon-wo" style="color: #DCDCDC;font-size: 18px"/>
      </div>
      <div style="height:20px;" class="flexs j-center">
          <el-popover
            placement="bottom"
            width="600"
            title="费用详情"
            trigger="hover"
            @show="showPopo"
            @hide="hidePopo"
            >
            <PopoverChart v-if="chartshow" :post-todo="postTodo"/>
                 <i slot="reference" class="iconfont icon-101" style="color: #2F9AC0;font-size: 16px"/>
            </el-popover>
      </div>
  </div>
</template>

<script>
  import PopoverChart from './popoverChart'
  export default {
    name:'logisticsServices',
    props:{
      postTodo: {
      type: Object,
      default: function() {
        return { }
      }
     },
     postIndex:{
        type: Number,
        default: 0
      },
      postI:{
        type: Number,
        default: 0
      }
    },
    data () {
      return {
        chartshow:false,
        errorImg: 'this.src="' + require('@/assets/img/errorImg.png') + '"'
      };
    },

    components: {
      PopoverChart,
    },

    computed: {},

    beforeMount() {},

    mounted() {
      // console.log(this.postTodo,'p11111111ostTodo')
    },

    methods: {
      showPopo(){
          this.chartshow=true;
      },
      hidePopo(){
          this.chartshow=false;
      },
      selectLog(product_id,i,index,amount,package_tax,rate_id){
        let data={
             product_id:product_id,
             i:i,
             index:index,
             amount:amount,
             rate_id:rate_id,
             package_tax:package_tax
           }
        this.$emit('posttoparent',data)
        
      }
    },

    watch: {}

  }

</script>
<style lang='' scoped>
 .infot{
      border-left:1px solid #F4F4F4;
  }
  .log{
    width:160px;
    height:130px;
  }
  .log img{
    height:40px;
    width:90px;

  }
  i,span{
    cursor:pointer;
  }
</style>