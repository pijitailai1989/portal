<template>
        <div  slot="reference" style="padding:0 20px;height:100%;" class="flexs columns j-around infot">
            <p class="hiddenT">订单号：{{postItem.order_number}}</p>
            <p class="hiddenT">包裹描述：{{postItem.item_description}}</p>
            <p class="hiddenT">目的地：{{postItem.consignee_address_detail}}</p>
            <div class="flexs j-center" style="height:15px;">
                 <el-popover
                  placement="bottom"
                  width="740"
                  title="订单详情"
                  trigger="hover"
                  @show="showPopo"
                  @hide="hidePopo">
                  <PopoverMap  v-if="chartshow" :post-item="postItem"/>
                  <i slot="reference" class="iconfont icon-101" style="color: #2F9AC0;font-size: 16px"/>
                 </el-popover>
            </div>
        </div>
      
</template>

<script>
  import PopoverMap from './popoverMap'
  export default {
    name:'information',
    props:{
      postItem: {
      type: Object,
      default: function() {
        return { }
      }
     }
    },
    data () {
      return {
         chartshow:false
      };
    },

    components: {
      PopoverMap
    },

    computed: {},

    beforeMount() {},

    mounted() {
      
    },

    methods: {
      showPopo(){
          this.chartshow=true;
      },
      hidePopo(){
          this.chartshow=false;
      }
    },

    watch: {}

  }

</script>
<style lang='' scoped>
  .infot{
      border-right:1px solid #F4F4F4;
      position: relative;
      cursor:pointer;
  }
  .pop{
    position: absolute;
    width:85%;
    height:100%;
    z-index:1;
  }
  p{
      width:191px;
      font-size:14px;
      color:rgba(153,153,153,1);
  }
  i{
    cursor:pointer;
  }
</style>