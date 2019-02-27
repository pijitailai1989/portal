<template>
  <div class="container">
    <div class="flexs ser j-center">
        <p>平台服務</p>
    </div>
    <div class="flexs rows box">
       <div @mouseover="mouseoverFn(index)" @mouseout="mouseoutFn(index)"  v-for="(item,index) in serviceArr" :key="index">
        <div class="flexs columns contents a-center mar" :class="item.active?'active':''">
            <div v-if="item.active" class="">
                <i class="flexs a-center j-center circle1"><img :src="item.imgUrl1" alt=""></i>
                <div class="circle" style="width: 133px;height: 133px;">
                    <yd-progressbar progress="1"  stroke-color="" trail-width="1" trail-color="#91D2F3"></yd-progressbar>
                </div>
            </div>
            <div v-else class="flexs a-end j-center">
                <i class="flexs a-center j-center"><img :src="item.imgUrl" alt=""></i>
            </div>
            <div v-if="item.active"><p style="color:white;">{{characteristicService[item.name]}}</p></div>
            <div v-else><p>{{characteristicService[item.name]}}</p></div>
            <div style="padding:0 20px;"><span>{{characteristicService[item.msg]}}</span></div>
        </div>
       </div>
    </div>
    <div class="box1 flexs j-center">
       <div class="flexs rows ">
           <div v-for="(item,index) in serviceArr" :key="index" class="flexs columns a-center">
               <img :src="item.imgUrl" alt="">
               <p>{{characteristicService[item.name]}}</p>
               <!-- <span>{{characteristicService[item.msg]}}</span> -->
           </div>
       </div>
    </div>
  </div>
</template>

<script>
  import Vue from 'vue';
  import {ProgressBar} from 'vue-ydui/dist/lib.rem/progressbar';
  Vue.component(ProgressBar.name, ProgressBar);
  export default {
    name:'',
    props:[''],
    data () {
      return {
           serviceArr:[
             {name:'serviceSearch',   msg:'serviceSearchContent',   imgUrl1:require('../../../assets/img/copy1.png'),       imgUrl:require('../../../assets/img/copy.png'),       active:false},
             {name:'serviceBook',     msg:'serviceBookContent',     imgUrl1:require('../../../assets/img/chaoshi1.png'),    imgUrl:require('../../../assets/img/chaoshi.png'),    active:false},
             {name:'serviceTracking', msg:'serviceTrackingContent', imgUrl1:require('../../../assets/img/duibifenxi1.png'), imgUrl:require('../../../assets/img/duibifenxi.png'), active:false},
             {name:'serviceApi',      msg:'serviceApiContent',      imgUrl1:require('../../../assets/img/guanli1.png'),     imgUrl:require('../../../assets/img/guanli.png'),     active:false},
           ]
      };
    },
    computed:{
      characteristicService(){
        return this.$t('homeCharacteristicService')
      }
    },

    components: {},

    beforeMount() {},

    mounted() {
      // console.log(this.characteristicService, '我已经被打印出来了')
    },

    methods: {
      clearFn(){
        this.serviceArr.forEach(el=>{
          el.active=false;
        })
      },
      mouseoverFn(index){
         this.serviceArr[index].active=true;
      },
      mouseoutFn(index){
         this.clearFn()
      }
    },

    watch: {}

  }

</script>
<style lang='' scoped>
   .box1{
     display: none;

   }
   .box1>div{
     margin-top:30px;
   }
   .box1>div>div{
     width: 50%;
     padding:20px;
   }
   .box1 p{
     font-size: .28rem;
     font-weight: 600;
     color:#333;
     padding:20px 0 10px;
   }
   .box1 span{
     font-size: .2rem;
     color:#B9B9B9;
   }
   .ser{
     margin-top:332px;
   }
   .ser p{
     font-size:34px;
     font-weight:600;
     color:#333;
   }
   .box{
       width:100%;
   }
   .box>div{
       width: 25%;
       
     }
   .contents{
     height:360px;
     margin:60px 0;
   }
   .contents.active{
     background:rgba(74,167,213,1) linear-gradient(180deg,rgba(74,199,213,1) 0%,rgba(48,149,200,1) 100%);
     box-shadow:0px 5px 16px 0px rgba(195,230,247,1);
     -webkit-animation:pulse .6s linear;
     animation:pulse .6s linear;
     /* -webkit-transform-style:preserve-3d; */
   }
   .contents>div:nth-child(1){
     width: 100%;
     height:226px;
     padding:46px 0;
     position: relative;
   }
   .contents>div>i{
      width: 75px;
      height: 61px;
   }
   .contents>div>i>img{
      width: 75px;
      height: 61px;
   }
   .contents>div>p{
       height:41px;
       font-size:20px;
       color:#333;
   }
   .contents>div>span{
       font-size:13px;
       color:white;
   }
   
   
   @media screen and (max-width: 992px) {
     .box>div{
       width: 33.3%;
       
     }
     .contents{
     height:260px;
     margin:20px 0;
   }
     
   }
   @media screen and (max-width: 768px) {
     .container{
       padding-right:.1rem;
       padding-left:.1rem;
     }
     .ser{
        margin-top:.6rem;
      }
     .box{
       display: none;
     }
     .box1{
       width:100%;
       display: inline-block;
     }
     .ser p{
       font-size:.34rem;
       font-weight:600;
     }
     .box1>div>div{
       width: 50%;
       padding:.1rem;
       margin-bottom:.6rem;
     }
     
   }
   .circle{
     position:absolute;
     left:50%;
     top:50%;
     margin-left:-66.5px;
     margin-top:-66.5px;
   }
   .circle1{
     position:absolute;
     left:50%;
     top:50%;
     margin-left:-37.5px;
     margin-top:-30.5px;
   }
</style>
