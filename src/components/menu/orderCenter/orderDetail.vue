<template>
  <div>
      <div class="flexs">
          <div class="address">
              <div class="flexs a-center">
                 <i class="iconfont icon-iconfontdayinji" style="color:#2F9AC0;font-size:20px;margin-left:5px;" />
                 <p style="color:#2F9AC0;font-size:18px;margin:0 40px 0 10px;">打印标签</p>
                 <span style="color:#F4B33D;font-size:16px;">取消订单</span>
              </div>
              <DeliveryGoods>
                  <span slot="title" style="font-size:18px;">收货地址</span>
              </DeliveryGoods>
              <DeliveryGoods>
                   <span slot="title" style="font-size:18px;">发货地址</span>
              </DeliveryGoods>
          </div>
          <div class="information letter-box">
               <div class="childBox">
                   <div class="a-in">
                       <p>物流信息</p>
                   </div>
                   <div class="b-in">
                        <span>物流公司： 54565265895614332545</span>
                        <span>服务等级：亚马逊</span>
                   </div>
                   <div class="flexs">
                     <div>
                         <span>物流单号：</span>
                     </div>
                     <div class="c-in">  
                          <div>
                             <span>12452454545454524545</span>
                             <span style="color:#AAAAAA;">（入库前）</span>
                          </div>
                          <div>
                             <span>12454543434358675757</span>
                             <span style="color:#AAAAAA;">（入库后）</span>
                          </div>
                          
                     </div>
                    </div>
                    <div class="flexs columns d-in">
                        <div><span>物流状态：</span></div>
                        <div>
                            <LogisticsStatus/>
                        </div>
                    </div>
               </div>
          </div>
      </div>


      <div class="letter-box orderinfo">
          <div class="childBox">
              <div class="a-info">
                  <p>订单信息</p>
              </div>
              <div class="b-info">
                  <span>订单号： 545652658956232015669853214332545</span>
                  <span>来源渠道：亚马逊</span>
              </div>
              <div class="c-info flexs">
                  <div class="spanP">
                      <span>包裹描述：</span>
                  </div>
                  <div>  
                       <div class="spanP">
                          <span>1</span>
                          <span>笔记本电脑</span>
                          <span>2400￥*10</span>
                       </div>
                       <div class="spanP">
                          <span>2</span>
                          <span>笔记本电脑</span>
                          <span>2400￥*10</span>
                       </div>
                       <div class="spanP">
                          <span>3</span>
                          <span>笔记本电脑</span>
                          <span>2400￥*10</span>
                       </div>
                  </div>
                  <div class="mar">
                       <div class="spanP">
                         <span>预计重量:240KG</span>
                         <span>实际重量：240kg</span>
                       </div>
                       <div class="spanP">
                         <span>预计关税：180￥</span>
                         <span>实际关税：240￥</span>
                       </div>
                  </div>
              </div>
              <div class="d-info">
                  <span>包裹类型：电子产品</span>
                  <span>敏感物品：电子产品</span>
              </div>
          </div>
      </div>
  </div>
</template>

<script>
  import LogisticsStatus from '../component/logisticsStatus.vue'
  import DeliveryGoods from '../component/deliveryGoods.vue'
  export default {
    name:'',
    props:[''],
    data () {
      return {

      };
    },

    components: {
      LogisticsStatus,
      DeliveryGoods
    },

    computed: {},

    beforeMount() {},

    mounted() {},

    methods: {},

    watch: {}

  }

</script>
<style lang='' scoped>
    .address{
      flex:1;
    }
    .address>div:nth-child(1){
       width:100%;
       height:120px;
       background:rgba(255,255,255,1);
       box-shadow:0px 4px 14px 0px rgba(232,232,232,0.5);
       padding:20px;
    }
    .address>div:nth-child(2){
       width:100%;
       margin-top:50px;
    }
    .address>div:nth-child(3){
       width:100%;
       margin-top:50px;
    }
    .information{
      flex:1;
      margin-left:30px;
    }
    .orderinfo{
      width:100%;
      margin-top:50px;
    }
    .childBox{
      padding:10px 20px;
    }
    .address1{
      font-size:18px;
      color:#333;
      font-weight:600;
      padding:15px 0;
    }
    .address2{
      font-size:14px;
      color:#666;
      padding:10px 0;
    }
    .orderinfo>.childBox>div{
      padding:10px 0;
    }
    .information>.childBox>div{
      padding:6px 0;
    }
    .information p,.orderinfo>.childBox p{
       font-size:18px;
       color:#333;
       font-weight:600;
    }
    .information span,.orderinfo>.childBox span{
       font-size:14px;
       color:#666;
    }
    .b-info span,.d-info span,.c-info span{
      margin-right:40px;
    }
    .b-in span,.c-in span{
      margin-right:20px;
    }
    .c-in>div{
      margin-bottom:5px;
    }
    .spanP{
      padding:10px 0;
    }
    .mar{
      padding-left: 40px;
      border-left:2px dashed #D8D8D8;
    }
    .d-in>div:nth-child(1){
      height:40px;
    }
    .d-in>div:nth-child(2){
      flex:1;
    }
</style>