<template>
  <div class="container">
    <div class="flexs ser j-center">
        <p>{{news.PL}}</p>
    </div>
    <div class="flexs columns box">
       
       <ul class="flexs j-between">
         <li v-for="(item,index) in serviceArray" :key="index" @click="activeFn(index)" class="flexs columns a-center" :class="{active:item.active}">
             <i class="iconfont" :class="item.icon" :style="{color: item.color,fontSize: item.size+'px'}"/>
             <p>{{news[item.name]}}</p>
         </li>
       </ul>
       <div class="text flexs j-center">
           <p>{{news[msg+'1']}}</p>
       </div>
       <div>
         <template>
           <el-carousel @change="carouselFn" ref="carousel" :initial-index="clickIndex" :interval="5000" arrow="always">
             <el-carousel-item v-for="(item,index) in serviceArray" :key="index">
               <i v-if="i18=='zh'"><img :src="item.imgUrl" alt=""></i>
               <i v-else><img :src="item.imgUrlen" alt=""></i>
             </el-carousel-item>
           </el-carousel>
         </template>
       </div>
       <div class="ji">
          <div class="flexs a-center">
              <h3>{{news.TR}}</h3>
              <b></b>
              <span @click="sendData()" style="cursor:pointer;">{{news.IM}}</span>
          </div>
          <div class="flexs">
              <p>{{news.AL}}</p>
          </div>
       </div>
    </div>
    <div class="box1 flexs j-center">
       <div class="flexs rows ">
           <div v-for="(item,index) in serviceArr" :key="index" class="flexs columns a-center">
               <img :src="i18=='zh'?item.imgUrl:item.imgUrlen" alt="">
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
            //  {name:'serviceBook',     msg:'serviceBookContent',     imgUrl1:require('../../../assets/img/chaoshi1.png'),    imgUrl:require('../../../assets/img/chaoshi.png'),    active:false},
             {name:'serviceTracking', msg:'serviceTrackingContent', imgUrl1:require('../../../assets/img/duibifenxi1.png'), imgUrl:require('../../../assets/img/duibifenxi.png'), active:false},
             {name:'serviceApi',      msg:'serviceApiContent',      imgUrl1:require('../../../assets/img/guanli1.png'),     imgUrl:require('../../../assets/img/guanli.png'),     active:false},
           ],
           serviceArray:[
             {
               name:'MG',icon:'icon-wuliukuaidi',size:'80',active:false,color:'#2F9AC0',
               msg:'MG',
               imgUrl:require('../../../assets/img/carousel.png'),
               imgUrlen:require('../../../assets/img/carouselen.png')
             },
            //  {
            //    name:'YD',icon:'icon-naozhong1',size:'80',active:false,color:'#F4B33D',
            //    msg:'ACS',
            //    imgUrl:require('../../../assets/img/carousel.png')
            //  },
             {
               name:'QC',icon:'icon-shujuquxianzoushiqushifazhantubiaoshangsheng',size:'80',active:false,color:'#5AC6C9',
               msg:'QC',
               imgUrl:require('../../../assets/img/carousel.png'),
               imgUrlen:require('../../../assets/img/carouselen.png')
             },
             {
               name:'API',icon:'icon-ziyuanduijie-',size:'80',active:false,color:'#E78483',
               msg:'API',
               imgUrl:require('../../../assets/img/carousel.png'),
               imgUrlen:require('../../../assets/img/carouselen.png')
             }
           ],
           clickIndex:0,
           msg:''
      };
    },
    computed:{
      characteristicService(){
        return this.$t('homeCharacteristicService')
      },
      news(){
       return this.$t('news')
      },
      i18(){
        return this.$i18n.locale;
      }
    },

    components: {},

    beforeMount() {},

    mounted() {
      // console.log(this.characteristicService, '我已经被打印出来了')
    },

    methods: {
      sendData() {
      this.$router.push({
          path: 'menu/logisticsService',
          name: 'logisticsService'
      })
    },
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
      },
      carouselFn(i,y){
        this.serviceArray[i].active=true;
        if(y!=-1){
           this.serviceArray[y].active=false;
        }
        this.msg=this.serviceArray[i].msg
      },
      activeFn(index){
        this.$refs.carousel.setActiveItem(index);
      }
    },

    watch: {}

  }

</script>
<style lang='' scoped>
   .el-carousel__item i {
    color: #475669;
    font-size: 18px;
    width:100%;
    margin: 0;
  }
  .el-carousel__item i>img {
    width:100%;
  }
  
  .box{
    padding:90px 0 20px;
  }
  .box>.text{
    font-size: 14px;
    color:#999;
    padding:40px 0;
  }
  .box>ul{
    width:100%;

  }
  .box>ul>li{
    width:25%;
    padding:60px 0;
    cursor:pointer;
  }
  .box>ul>li>p{
    margin-top:20px;
    font-size: 18px;
    color:#333;
  }
  .box>ul>li.active{
    background:rgba(255,255,255,1);
    box-shadow:0px 4px 14px rgba(193,193,193,0.5);
    border-radius:23px;
  }
  .box>.ji{
    padding:60px 0;
  }
  .box>.ji span{
    width:179px;
    height:40px;
    background:rgba(47,154,192,1) linear-gradient(138deg,rgba(47,183,192,1) 0%,rgba(47,154,192,1) 100%);
    border-radius:20px;
    text-align: center;
    line-height:40px;
    font-size:18px;
    color:white;
  }
  .box>.ji>div{
    padding:10px 0;
  }
  .box>.ji h3{
    width:300px;
    color:#333;
    font-size:30px;
  }
  .box>.ji b{
    margin:0 5px;
    flex:1;
    height:1px;
    border:1px dashed rgba(220,220,220,1);
  }
  .box>.ji p{
    font-size:16px;
    color:rgba(170,170,170,1);
  }


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
     margin-top:60px;
   }
   .ser p{
     font-size:34px;
     font-weight:600;
     color:#333;
   }
   
   
   @media screen and (max-width: 992px) {
     
     
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
