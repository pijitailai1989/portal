<template>
  <div class="banner-bg">
    <header-cmp :is-index-page="true" @postFn="headerFn"/>
    <banner-cmp/>
    <section ref='hz'>
        <swiper-cmp @childPost="swiperFn" />
    </section>
    <section class="section" ref='fg'>
      <google-map/>
    </section>
    <section style="background:#FBFBFB" ref="pt">
      <Service/> 
    </section>
<!--
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
                  <p><a style="font-family:arial;">-70%</a>{{materialBenefits.costSaving}}</p>
                  <span class="flexs columns">
                       <i>{{materialBenefits.savingfirst}}</i>
                       <i>{{materialBenefits.savingSecond}}</i>
                       <i>{{materialBenefits.savingThird}}</i>
                  </span>
               </div>
               <div class="bounceInRight2">
                  <p><a style="font-family:arial;">+20%</a>{{materialBenefits.improveAging}}</p>
                  <span>{{materialBenefits.improveFirst}}</span> 
               </div>
               <div class="bounceInRight3">
                  <p><a style="font-family:arial;">3 x</a>{{materialBenefits.increaseIncome}}</p>
                  <span>{{materialBenefits.increaseFirst}}</span>
               </div>
          </div>
      </div>
    </section>
-->
    <section class="reg">
      <Registered/> 
    </section>
    
    <footer class="footer">
      <!-- <Footers></Footers> -->
      <div class="copy flexs a-center j-center">
        <span class="flexs a-center j-center">{{materialBenefits.copyRight}}：2019 {{nav.logoName}} All Rights Reserved</span>
      </div>
    </footer>
    <MessageBoxs v-if="serviceAlert" @posttoparent="childListFn2">
        <span slot="header">{{news.WLFWXQ}}</span>
        <div style="padding:10px 20px 20px;">
           <div class="loglogo flexs a-center" style="padding:10px 0 20px;">
                 <i style="width:150px;height:50px;"><img  style="width:100%;;height:100%;" :src="baseURL+lastmile_logo" alt=""></i>
                 <p style="width:650px;padding:0 20px;" class="flexs rows">{{lastmile_summary}}</p>
           </div>
           <!-- <div>
               <p style="padding:10px 0;border-bottom:1px dashed #ECECEC;font-weight:600;color:#333;">服务</p>
               <ul class="flexs j-around" style="padding:15px 0;">
                   <li class="flexs columns a-center">
                       <i class="iconfont icon-yixiaoshida" style="color: #2F9AC0;font-size: 40px;"/>
                       <p>一小时收件</p>
                   </li>
                   <li class="flexs columns a-center">
                       <i class="iconfont icon-lingdanciriyun" style="color: #EB914D;font-size: 40px;"/>
                       <p>次日送达</p>
                   </li>
                   <li class="flexs columns a-center">
                       <i class="iconfont icon-naozhong" style="color: #EDC647;font-size: 40px;"/>
                       <p>1-3天送达</p>
                   </li>
                   <li class="flexs columns a-center">
                       <i class="iconfont icon-wenjian" style="color: #61B8BF;font-size: 40px;"/>
                       <p>派送文件</p>
                   </li>
                   <li class="flexs columns a-center">
                       <i class="iconfont icon-baoguo" style="color: #DD7777;font-size: 40px;"/>
                       <p>超大件</p>
                   </li>
                   <li class="flexs columns a-center">
                       <i class="iconfont icon-qianbao" style="color: #FDA26F;font-size: 40px;"/>
                       <p>货到付款</p>
                   </li>
               </ul>
           </div> -->
           <div>
               <p style="padding:10px 0;border-bottom:1px dashed #ECECEC;font-weight:600;color:#333;">{{news.FG}}</p>
               <div style="width:100%;height:200px;padding:10px 0;">
                   <GoogleMaps @childList="childListFn1" :childProvince="provinceText" :childNameMap="nameMap"></GoogleMaps>
               </div>
           </div>
           <div class="price">
            <p style="padding:10px 0;border-bottom:1px dashed #ECECEC;font-weight:600;color:#333;">{{news.JGB}}</p>
            <div class="flexs priceList scrollnone" ref="scrollHeadr">
                <ul>
                    <li></li>
                    <li class="flexs a-center">{{news.JJD}}</li>
                    <li class="flexs a-center">{{news.SHD}}</li>
                </ul>
                <ul v-for="(item,index) in rateCard" :key="index">
                    <li class="flexs columns j-center">
                        <el-popover
                           placement="right"
                           trigger="hover">
                           <p slot="reference" class="hiddenT">{{item.service_name}}</p>
                           <div style="padding:10px;">{{item.service_name}}</div>
                         </el-popover>
                        
                        <span>{{item.claimed_min_lead_time}}-{{item.claimed_max_lead_time}} days</span>
                    </li>
                    <li class="flexs a-center">
                        <el-popover
                           placement="right"
                           trigger="hover">
                           <p slot="reference" class="hiddenT">{{item.receive_region_name}}</p>
                           <div class="details scrollbar" style="padding:10px;">
                               <p v-for="(todo,i) in item.receive_region" :key="i">
                                   {{todo.name_multi_language.en}}
                               </p>
                           </div>
                         </el-popover>
                    </li>
                    <li class="flexs a-center">
                        <el-popover
                           placement="right"
                           trigger="hover">
                           <p slot="reference" class="hiddenT">{{item.delivery_region_name}}</p>
                           <div class="details scrollbar" style="padding:10px;">
                               <p v-for="(todo,i) in item.delivery_region" :key="i">
                                   {{todo.name_multi_language.en}}
                               </p>
                           </div>
                        </el-popover>
                    </li>
                </ul>
            </div>
            <div class="priceList1 flexs columns scrollbar" ref="scrollCont" @scroll="handleScroll">
                <ul v-for="(item,index) in priceList" :key="index" class="flexs">
                    <li class="flexs a-center " >
                        <span>{{item.ctl}}</span>
                    </li>
                    <li class="flexs a-center" v-for="(todo,i) in rateCard" :key="i" v-if="item['rate'+i]">
                        <p class="hiddenT" >{{item['rate'+i]}}</p>
                    </li>
                </ul>
            </div>
           </div>
        </div>
    </MessageBoxs>
  </div>
</template>

<script>
import {mapState,mapGetters,mapActions,mapMutations} from 'vuex'
import Registered from './component/registered'  //免费注册
// import Footers from './component/footer'    //底部 // CK : Hidden footer first
import Process from './component/process'   //物流流程
import Service from './component/service'   //专属特色服务
import HeaderCmp from '@/components/home/component/header'
import BannerCmp from '@/components/home/component/banner'
import SwiperCmp from '@/components/home/component/swiper'
import GoogleMap from './component/googleMap'
import GoogleMaps from './component/googleMaps'
import MessageBoxs from '@/components/common/messageBoxs'
export default {
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      anim:false,
      serviceAlert:false,
      lastmile_logo:'',
      lastmile_summary:'',
      nameMap:{},
      provinceText:'',
      makers:[],
      lastmile_code:'',
      country_name:''
    }
  },
  components: {
    Service,
    Process,
    Registered,
    HeaderCmp,
    BannerCmp,
    SwiperCmp,
    // Footers, // CK : Hidden footer first
    GoogleMap,
    MessageBoxs,
    GoogleMaps
  },
  computed:{
    ...mapState('menu',[
            'country_list','overview','lastmileList','backGo','rateCard','priceList','lastmileCountry',
            'nextLocationList','searchArr','mapCountry'
        ]),
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
  methods:{
    // ...mapActions('home', ['ajaxSellerRate']),
    //   async getSellerRate() {
    //     let res = await this.ajaxSellerRate()
    //     console.log('商家评论列表',res)
    //     return res
    //   },
      // handleScroll(){
      //   let scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
      //   let cess = document.getElementById("cess").offsetTop;
      //   // let offTop = cess.
      //   if( parseFloat(scrollTop) >= parseFloat(cess)-400 ){
      //       this.anim=true;
      //   }else{
      //       this.anim=false;
      //   }
      // }
      ...mapActions('menu',[
            'ajaxCountrylist','ajaxLastmileCode','ajaxRateCard','ajaxLastmileCountry',
            'ajaxNextLocationList','ajaxLastmileSearch','ajaxLastmileMapcountry','ajaxLastmileList'
        ]),
       childListFn2(val){
            this.serviceAlert=val
            
        },
        childListFn1(val){
             
             this.makers=val
        },
        swiperFn(val){
          this.serviceAlert=true;
          this.lastmile_logo=val.lastmile_logo
          this.lastmile_summary=val.lastmile_summary
          this.ajaxRateCard(val.lastmile_code)
          this.lastmile_code=val.lastmile_code
          this.country_name=val.country_name
        //   this.ajaxLastmileCode( val.lastmile_code )
            //    console.log(val,'val')
        },
        handleScroll(){
            // let clientWidth=this.$refs.scrollCont.clientWidth
            // let scrollLeft=this.$refs.scrollCont.scrollLeft
            // let scrollTop=this.$refs.scrollCont.scrollTop
            // console.log(scrollLeft,scrollTop,'scrollHeight')
            // this.$refs.scrollHeadr.scrollLeft=scrollLeft
        },
        headerFn(val){
            // console.log(val,'val',this.$refs.hz.offsetTop)
            switch (val){
                case 'hz' :
                document.documentElement.scrollTop =this.$refs.hz.offsetTop - 100;
                document.body.scrollTop=this.$refs.hz.offsetTop - 100;
                break;
                case 'fg' :
                document.documentElement.scrollTop =this.$refs.fg.offsetTop - 100;
                document.body.scrollTop=this.$refs.fg.offsetTop - 100;
                break;
                case 'pt' :
                document.documentElement.scrollTop =this.$refs.pt.offsetTop - 100;
                document.body.scrollTop=this.$refs.pt.offsetTop - 100;
                break;
            }
            
            
        }
  },
  watch: {
        makers:{
            handler:function(newval,oldval){
                const _this=this;
              if(newval.length>0){
                //  console.log(newval,'new')
                 
                 newval.forEach(element => {
                     if(element.content.country==this.country_name){
                         _this.nameMap=element.content
                         _this.ajaxLastmileCode( _this.lastmile_code )
                     }
                 });
              }
            },
            deep:true 
        }
        
  },
  mounted() {
    // this.getSellerRate()
    // window.addEventListener('scroll', this.handleScroll)
    // document.documentElement.scrollTop=0
    //         document.body.scrollTop=0
    //         window.pageYOffset=0
  },
  destroyed () {
    //  window.removeEventListener('scroll', this.handleScroll)
  }
}
</script>

<style scoped>
  .banner-bg{
     /* background: url(../../assets/img/banner2.png);
     background-repeat:no-repeat;
     background-size:100%;
     -moz-background-size:100%;
     background-position: center top; */
  }
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
     min-height: 50px;
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
   .priceList{
       /* width:100%; */
       overflow-x: auto;
       width: 800px;
       
   }
   .priceList>ul:first-child{
      width:120px;
   }
   .priceList>ul:first-child>li{
      width:120px;
   }
   .priceList>ul{
      max-width:100%;
      min-width: 120px;
      width: 100%;
   }
   
   .priceList>ul>li{
       width: 100%;
       padding:0 10px;
       height:70px;
       border-bottom:1px dashed #ECECEC;
       background: white;
   }
   .priceList>ul>li p{
       width: 100%;
       cursor: pointer;
       padding:5px 0;
   }
   .priceList1>ul>li>p{
       width: 100%;
   }
   .priceList1>ul>li>span{
       height:100%;
       width:100%;
       line-height: 50px;
   }
   .priceList1{
       max-width:800px;
      height:100px;
      overflow-x: auto;
      overflow-y: auto;
   }
   .priceList1>ul{
       width:100%;
       min-height:50px;
   }
   .priceList1>ul>li{
       max-width:100%;
       min-width: 120px;
       width: 100%;

       min-height:50px;
       padding:0 10px;
       border-bottom:1px dashed #ECECEC;
   }
   .priceList1>ul>li:first-child{
       width:120px;
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
