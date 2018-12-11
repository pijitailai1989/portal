<template>
  <div class="flexs columns map">
    <div class="flexs popoTop">
      <div class="flexs columns j-between">
        <div class="flexs">
           <p>收货人：</p>
           <span>{{postItem.consignee_name}}</span>
        </div>
        <div class="flexs">
           <p>收货地址：</p>
           <span style="word-break:break-all;">
             {{postItem.consignee_address_detail}}
           </span>
        </div>
      </div>
      <div class="flexs columns j-between">
         <div class="flexs">
           <p>包裹重量：</p>
           <span>{{postItem.weight}} kg</span>
         </div>
         <div class="flexs">
           <p>包裹价值：</p>
           <span>{{postItem.parcel_value}} {{postItem.currency}}</span>
         </div>
         <div class="flexs">
           <p>包裹数量：</p>
           <span>{{postItem.item_total_quantity}}</span>
          </div>
      </div>
    </div>
    <div class="flexs popoCenter">
      <multipe-map :latitude="postItem.latitude" :longitude="postItem.longitude"/>
    </div>
    <div class="popoBottom1">
      <el-row>
        <el-col :span="14"><div class="weight">货物描述</div></el-col>
        <el-col :span="5"><div class="weight cen">货物数量</div></el-col>
        <el-col :span="5"><div class="weight cen">货物单价</div></el-col>
      </el-row>
    </div>
    <div class="popoBottom  scrollbar">
      <el-row class="line" v-for="(item,index) in postItem.items" :key="index">
        <el-col :span="14"><div class="">{{item.item_description}}</div></el-col>
        <el-col :span="5"><div class="cen">{{item.item_quantity}}</div></el-col>
        <el-col :span="5"><div class="cen">{{item.item_unit_price}} {{item.item_currency}}</div></el-col>
      </el-row>
      
    </div>
  </div>
</template>

<script>
import multipeMap from '@/components/common/Maps/multipeMap'
export default {
  name: 'User',
  components: {
    multipeMap
  },
  props: {
     postItem: {
      type: Object,
      default: function() {
        return { }
      }
     }
  },
  data() {
    return {

    }
  },
  mounted() {
    // console.log(this.postItem,'this.postItem')
  },
  methods: {

  }
}
</script>

<style scoped>
     .map{
         width:100%;
         padding:0 10px 10px 10px;
     }
    .popoTop{
        width:100%;
    }
    .popoTop>div{
       height:80px;
    }
    .popoTop>div:nth-child(1){
        width:520px;
    }
    .popoTop>div p{
        width:80px;
        font-size:14px;
        text-align:right;
    }
    .popoTop>div:nth-child(1) span{
        width:420px;
        font-size:14px;
        
    }
    .popoTop>div:nth-child(2) span{
        width:160px;
        font-size:14px;
        line-height:24px;
    }
    .popoTop>div:nth-child(2){
        width:240px;
        margin-left:20px;
    }
    .popoCenter{
        width:740px;
        height:200px;
        margin:10px 0;
        padding:10px 10px;
        margin-bottom:20px;
    }
    .popoBottom{
        padding:10px;
        max-height: 140px;
        overflow-y: auto;
    }
    .popoBottom1{
        padding:10px;
    }
    .line{
      border-top:1px dashed #E0E0E0;
      padding:10px 0;
    }
    .cen{
      text-align:center;
    }
</style>
