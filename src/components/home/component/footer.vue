<template>
  <div class="container flexs a-center j-center">
    <div class="flexs rows box j-between">
        <div class="flexs columns contents mar">
            <p>{{footer.newbieGuide}}</p>
            <span>{{footer.hotboom}}</span>
            <span>{{footer.transport}}</span>
            <span>{{footer.commonTools}}</span>
            <span>{{footer.contrabandGoods}}</span>
        </div>
        <div class="flexs columns contents mar">
            <p>{{footer.paymentPattern}}</p>
            <span>{{footer.topUp}}</span>
            <span>{{footer.Paypal}}</span>
            <span>{{footer.weChart}}</span>
            <span>{{footer.aliPay}}</span>
        </div>
        <div class="flexs columns contents mar">
            <p>{{footer.personalCenter}}</p>
            <span>{{footer.subCenter}}</span>
            <span>{{footer.myOrder}}</span>
            <span>{{footer.myWarehouse}}</span>
        </div>
        <div class="flexs columns contents mar">
            <p>{{footer.delivery}}</p>
            <span>{{footer.freightEstimate}}</span>
            <span>{{footer.customsAndDuties}}</span>
            <span>{{footer.parcelInquiryReceipt}}</span>
            <span>{{footer.shippingSchedule}}</span>
        </div>
        <div class="flexs columns contents mar">
            <p>{{footer.aboutUs}}</p>
            <span>{{footer.contactUs}}</span>
            <span>{{footer.cooperativeClient}}</span>
            <span>{{footer.warehouseAddress}}</span>
        </div>
        <div class="flexs columns contents">
            <p>{{footer.socialWebsite}}</p>
            <span>{{footer.facebook}}</span>
            <span>{{footer.twitter}}</span>
            <span>{{footer.instagram}}</span>
            <span>{{footer.medium}}</span>
        </div>
    </div>
    
  </div>
</template>

<script>

  export default {
    name:'',
    props:[''],
    data () {
      return {

      };
    },

    components: {},

    computed: {
      footer(){
        return this.$t('footer')
      }
    },

    beforeMount() {},

    mounted() {},

    methods: {},

    watch: {}

  }

</script>
<style lang='' scoped>
   
   .box{
       width:100%;
       padding:60px 0;
   }
   .contents{
     /* width: 15%; */
     background: white;
   }
   .mar{
     /* background: red; */
     margin-bottom:30px;
   }
   .contents>p{
       font-size:16px;
       color:#333;
       padding:0 5px;
       font-weight: bold;
       margin-bottom:26px;
   }
   .contents>span{
       font-size:13px;
       color:#888;
       padding:0 5px;
       margin-bottom:5px;
       /* height:28px; */
   }
   
   
   @media screen and (max-width: 992px) {
     .contents{
       width: 33%;
     }
     .mar{
      margin-right: 0
     }
     .contents>p{
       padding:0 70px;
     }
     .contents>span{
         padding:0 70px;
     }
     .box{
       padding:60px 0;
      }
   }
   @media screen and (max-width: 768px) {
     .contents{
       width: 33.3%;
     }
     .mar{
      margin-right: 0;
      
     }
     .box>div{
         padding-left: .3rem;
     }
      .contents>p{
          padding:0;
       font-size:.26rem;
      }
      .contents>span{
          padding:0;
        font-size:.24rem
      }
      .box{
       padding:.5rem 0;
       width:5.6rem;
      }
      .box>div:nth-child(1),.box>div:nth-child(2),.box>div:nth-child(3){
        border-bottom:1px dashed #D3D3D3;
        padding-bottom:.8rem;
      }
   }
</style>