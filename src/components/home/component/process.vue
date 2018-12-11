<template>
  <div class="container">
    <div class="flexs ser j-center">
        <p>{{operation.howToOperation}}</p>
    </div>
    <div class="box">
        <div class="flexs a-center j-between">
            <span style="padding-left:20px;">{{operation.placeOrder}}</span>
            <span style="padding-left:34px;">{{operation.warehousing}}</span>
            <span style="padding-left:30px;">{{operation.freightPayment}}</span>
            <span>{{operation.signFor}}</span>
        </div>
        <div><img src="../../../assets/img/xian.png" alt=""></div>
        <div>
            <span>{{operation.orderPresentation}}</span>
            <span style="margin-left:110px;">{{operation.warehousingPresentation}}</span>
            <span style="margin-left:110px;">{{operation.paymentPresentation}}</span>
        </div>
        <div class="flexs a-center j-between">
            <img src="../../../assets/img/1.png" alt="">
            <img src="../../../assets/img/jiantou.png" alt="">
            <img src="../../../assets/img/2.png" alt="">
            <img src="../../../assets/img/jiantou.png" alt="">
            <img src="../../../assets/img/3.png" alt="">
            <img src="../../../assets/img/jiantou.png" alt="">
            <img src="../../../assets/img/4.png" alt="">
        </div>
    </div>
    <div class="box1">
        <div class="flexs columns a-center">
            <i><img src="../../../assets/img/1.png" alt=""></i>
            <p>1.{{operation.placeOrder}}</p>
            <span>{{operation.orderPresentation}}</span>
            <img src="../../../assets/img/xia1.png" alt="">
        </div>
        <div class="flexs columns a-center">
            <i><img src="../../../assets/img/2.png" alt=""></i>
            <p>2.{{operation.warehousing}}</p>
            <span>{{operation.warehousingPresentation}}</span>
            <img src="../../../assets/img/xia2.png" alt="">
        </div>
        <div class="flexs columns a-center">
            <i><img src="../../../assets/img/3.png" alt=""></i>
            <p>3.{{operation.freightPayment}}</p>
            <span>{{operation.paymentPresentation}}</span>
            <img src="../../../assets/img/xia2.png" alt="">
        </div>
        <div class="flexs columns a-center">
            <i><img src="../../../assets/img/4.png" alt=""></i>
            <p>4.{{operation.signFor}}</p>
        </div>
    </div>
    <div class="suan flexs rows j-center a-center">
        <div class="text flexs columns">
             <p>{{operation.experienceOperation}}</p>
             <span>{{operation.experienceSubline}}</span>
        </div>
        <div class="btn flexs">
             <span>
                 <router-link to="/menu/logisticsService#calculator">{{operation.freightEstimate}}</router-link>
             </span>
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

    computed:{
      operation(){
        return this.$t('homeOperation')
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
   }
   .box>div:nth-child(2){
       padding:40px 0 25px 40px;
   }
   .box>div:nth-child(4){
       padding:35px 0 153px 30px;
   }
   .box>div:nth-child(2) img{
       width:100%;
       height:100%;}
    .box>div:nth-child(1) span{
      color:#666;
      font-size:20px;
    }
    .box>div:nth-child(3) span{
      color:#aaa;
      font-size:16px;
    }
   .container{
       padding:120px 0;
   }
   .text{
       flex:1;
   }
   .btn{
       width:180px;
   }
   .text>p{
       font-size:30px;
       color:#333;
       margin-bottom:24px;
   }
   .text>span{
       font-size:16px;
       color:#aaa;
   }
   .btn>span>a{
       display: inline-block;
       width:179px;
       height:40px;
       background:rgba(47,154,192,1) linear-gradient(138deg,rgba(47,183,192,1) 0%,rgba(47,154,192,1) 100%);
       border-radius:20px;
       font-size:18px;
       color:white;
       line-height: 40px;
   }
   .ser{
       margin-bottom:92px;
   }
   .ser p{
     font-size:34px;
     font-weight:600;
     color:#333;
   }
   .box>img{
       width:100%;
   }
   .suan{
   }
   
   .box1{
       display: none;
       padding:20px 0;
       width:100%;
   }
   .box1>div{
       width:100%;
   }
   .box1>div>p{
      font: size 0.28rem;
      font-weight:600;
      color:#333;
      margin-bottom:10px;
   }
   .box1>div>span{
       font-size:.22rem;
      color:#aaa;
   }
   .box1>div>i{

      margin-bottom:30px;
   }
   .box1>div>img{
      padding:40px 0;
   }
   
   
   @media screen and (max-width: 992px) {
     
     .suan{
         padding:0 5%;
     }
     .container{
       padding:60px 0;
     }
     
   }
   @media screen and (max-width: 768px) {
     .btn{
         width:2.6rem;
     }
   .text>p{
       font-size:.3rem;
       font-weight:600;
       margin-bottom: 15px;
   }
   .text>span{
       font-size:.2rem;
       
   }
   .btn>span{
       font-size:.24rem;
       border-radius: .4rem;
   }
     .container{
       padding:40px 0;
     }
     .ser p{
       font-size:.34rem;
       font-weight:600;
     }
     .ser{
         margin-bottom:.5rem;
     }
     .box{
         display: none;
     }
     .box1{
         display: inline-block;
     }
     .btn>span>a{
       display: inline-block;
       width:100px;
       height:30px;
       background:rgba(47,154,192,1) linear-gradient(138deg,rgba(47,183,192,1) 0%,rgba(47,154,192,1) 100%);
       border-radius:15px;
       font-size:.3rem;
       color:white;
       line-height: 30px;
   }
   }
</style>