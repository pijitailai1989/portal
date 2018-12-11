<template>
  <div>
    <header-cmp :is-index-page="true"/>
    <banner-cmp/>
    <section class="section">
      <Service/> 
    </section>
    <section class="process">
       <Process/>        
    </section>
    <section class="container log flexs columns a-center" id="cess"  ref="cess">
      <div class="flexs columns a-center">
         <p>{{materialBenefits.materialBenefits}}</p>
         <span>{{materialBenefits.benefitsPresentation}}</span>
      </div>
      <div class="flexs content" v-if="anim">
          <div class="flexs a-center bounceInLeft mo">
              <div class="flexs columns ">
                  <img style="margin-top:0;" src="../../assets/img/Group15.png" alt="">
                  <img src="../../assets/img/Group17.png" alt="">
                  <img src="../../assets/img/Group19.png" alt="">
              </div>
              <div class="flexs columns " style="margin-left:40px;">
                  <img src="../../assets/img/Group16.png" alt="">
                  <img src="../../assets/img/Group18.png" alt="">
              </div>
          </div>
          <div class="flexs columns j-between" style="">
               <div class="bounceInRight1">
                  <p><a>-70%</a>{{materialBenefits.costSaving}}</p>
                  <span class="flexs columns">
                       <i>{{materialBenefits.savingfirst}}</i>
                       <i>{{materialBenefits.savingSecond}}</i>
                       <i>{{materialBenefits.savingThird}}</i>
                  </span>
               </div>
               <div class="bounceInRight2">
                  <p><a>+20%</a>{{materialBenefits.improveAging}}</p>
                  <span>{{materialBenefits.improveFirst}}</span> 
               </div>
               <div class="bounceInRight3">
                  <p><a>3 x</a>{{materialBenefits.increaseIncome}}</p>
                  <span>{{materialBenefits.increaseFirst}}</span>
               </div>
          </div>
      </div>
    </section>
    <section class="reg">
      <Registered/> 
    </section>
    <swiper-cmp/>
    <footer class="footer">
      <Footers></Footers>
      <div class="copy flexs a-center j-center">
        <span class="flexs a-center j-center">{{materialBenefits.copyRight}}： 2018 搜派 Spider All Rights Reserved ICP备10005645</span>
      </div>
    </footer>
  </div>
</template>

<script>
import {mapState,mapGetters,mapActions,mapMutations} from 'vuex'
import Registered from './component/registered'  //免费注册
import Footers from './component/footer'    //底部
import Process from './component/process'   //物流流程
import Service from './component/service'   //专属特色服务
import HeaderCmp from '@/components/home/component/header'
import BannerCmp from '@/components/home/component/banner'
import SwiperCmp from '@/components/home/component/swiper'
export default {
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      anim:false
    }
  },
  components: {
    Service,
    Process,
    Registered,
    HeaderCmp,
    BannerCmp,
    SwiperCmp,
    Footers
  },
  computed:{
    materialBenefits(){
        return this.$t('homeMaterialBenefits')
    }
  },
  methods:{
    // ...mapActions('home', ['ajaxSellerRate']),
    //   async getSellerRate() {
    //     let res = await this.ajaxSellerRate()
    //     console.log('商家评论列表',res)
    //     return res
    //   },
      handleScroll(){
        let scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
        let cess = document.getElementById("cess").offsetTop;
        // let offTop = cess.
        if( parseFloat(scrollTop) >= parseFloat(cess)-400 ){
            this.anim=true;
        }else{
            this.anim=false;
        }
      }
  },
  mounted() {
    // this.getSellerRate()
    window.addEventListener('scroll', this.handleScroll)
  },
  destroyed () {
     window.removeEventListener('scroll', this.handleScroll)
  }
}
</script>

<style scoped>
  
  .bounceInLeft {
	  animation-fill-mode: both;
    -webkit-animation:bounceInLeft 1.5s linear;
    animation:bounceInLeft 1.5s linear;
  }
  .bounceInRight1 {
    animation-fill-mode: both;
    -webkit-animation:bounceInRight 1.5s linear ;
    animation:bounceInRight 1.5s linear;
  }
  .bounceInRight2 {
    animation-fill-mode: both;
    -webkit-animation:bounceInRight 3s linear;
    animation:bounceInRight 3s linear;
  }
  .bounceInRight3 {
    animation-fill-mode: both;
    -webkit-animation:bounceInRight 4.5s linear;
    animation:bounceInRight 4.5s linear;
  }
  .section, .footer {
     min-height: 200px;
   }
   .copy{
       background: #FCFCFC;
       font-size:14px;
       color:#999;
       width:100%;
       height:50px;
   }
   .process{
       background: #FCFCFC;
   }
   .reg{
     background: #FCFCFC;
   }
   .log{padding:150px 0;}
   .log>div:nth-child(1){
     margin-bottom:100px; 
   }
   .log>div:nth-child(1) p{
     font-size:34px;
     font-weight: 600;
     color:#333;
   }
   .log>div:nth-child(1) span{
     font-size:18px;
     color:#aaa;
     margin:26px 0 0;
   }
   .content>div{
     width:50%;
   }
   .content>div:nth-child(1) img{
      width:180px;
      height:180px;
      margin-top:40px;
   }
   .content>div:nth-child(2){
     padding:40px 0 40px 20px;
   }
   .content>div:nth-child(2) p{
      font-size:26px;
      color:#333;
      font-weight: 600;
   }
   .content>div:nth-child(2) a{
      font-size:50px;
      color:#2F9AC0;
      margin-right:20px;
      font-family:Arial-BoldMT;
   }
   .content>div:nth-child(2) a::after{
     content:'|';
     color:#DDDDDD;
     font-size: 22px;
     margin-left:15px;
     
   }
   .content>div:nth-child(2) span{
      font-size:16px;
      color:#aaa;
      line-height:30px;
   }
   .content>div:nth-child(2) i{
      font-size:16px;
      color:#aaa;
      line-height:30px;
   }
   .content>div:nth-child(2) i::before{
      content:'●';
      color:#F4B33D;
      font-size:20px;
      margin-right:5px;

   }
   @media screen and (max-width: 992px) {
     
     
   }
   @media screen and (max-width: 768px) {
      .content{
       flex-flow: column;
     }
     .content>div{
     width:100%;
   }
     .log>div:nth-child(1) p{
       font-size:.34rem;
       font-weight: 600;
     }
     .log>div:nth-child(1) span{
       font-size:.24rem;
     }
     .content>div:nth-child(1) img{
      width:1.44rem;
      height:1.44rem;
      margin-bottom:.24rem;
     }
     .content>div:nth-child(2){
        padding:0 2%;
      }
      .content>div:nth-child(2)>div{
        margin:.4rem 0;
      }
     .content>div:nth-child(2) p{
       display: flex;
       justify-content: center;
       align-items: center;
      font-size:.28rem;
      color:#333;
      font-weight: 600;
      }
      .content>div:nth-child(2) a{
         font-size:.5rem;
      }
      .content>div:nth-child(2) span{
         font-size:.24rem;
      }


      .log{
        padding:.8rem;
      }
      .log>div:nth-child(1){
        padding:0 20px;
      }
    
      .copy span{
       font-size:.2rem;
      }
      .bounceInLeft {
        -webkit-animation:none;
        animation:none;
        
      }
      .mo{
        justify-content: center;
      }
      .bounceInRight1 {
        -webkit-animation:none;
        animation:none;
      }
      .bounceInRight2 {
        -webkit-animation:none;
        animation:none;
      }
      .bounceInRight3 {
        -webkit-animation:none;
        animation:none;
      }
   }
</style>
