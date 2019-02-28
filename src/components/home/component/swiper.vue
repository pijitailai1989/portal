<template>
  <div class="container">
    <!-- <div class="swiper-container">
        <div class="swiper-items"><a href="#"><img class="img-responsive" src="@/assets/img/swiper1.png" alt=""></a></div>
        <div class="swiper-items"><a href="#"><img class="img-responsive" src="@/assets/img/swiper2.png" alt=""></a></div>
        <div class="swiper-items"><a href="#"><img class="img-responsive" src="@/assets/img/swiper3.png" alt=""></a></div>
        <div class="swiper-items"><a href="#"><img class="img-responsive" src="@/assets/img/swiper4.png" alt=""></a></div>
        <div class="swiper-items"><a href="#"><img class="img-responsive" src="@/assets/img/swiper5.png" alt=""></a></div>
    </div> -->
    <div class="swiper-container" v-show="textArr.length>=1">
      <div class="box flexs rown"  ref="maxBox">
        <div class="swiper-items" v-for="(item,index) in textArr" :key="index">
          <div :class="[colorShow&&index==3?'active':'']" style="cursor: pointer;" class="flexs columns j-around" @click="backTo('/mapDetail',item.country_name,item.country)">
           <p style="padding:0;margin:0;">{{item.country}}</p>
           <p style="padding:0;margin:0;font-size:12pt;">{{item.lastmile_count}} {{news.FW}}</p>
          </div>
        </div>
        
      </div>
    </div>
    <div class="swiper-img flexs" v-show="textArr.length>=1">
      <div class="flexs a-center j-center fadeInUp" v-if="imgArr.length>=1">
          <i v-for="(item,index) in imgArr"  style="cursor: pointer;"  :key="index"><img :src="baseURL+item.lastmile_logo" alt=""  @click="backPath(item.lastmile_code,item.lastmile_logo,item.lastmile_summary,item.country_name)"></i>
      </div>
    </div>
    
  </div>
</template>

<script>
import {mapState,mapGetters,mapActions,mapMutations} from 'vuex'

export default {
  data() {
    return {
      textArr:[],
      imgArr:[],
      timer:null,
      tiems1:null,
      maxBox:null,
      colorShow:true,
      
    }
  },
  computed:{
    ...mapState('menu',[
            'country_list','overview','scrollArr'
        ]),
      news(){
       return this.$t('news')
      },
  },
  components: {},
  watch:{
    //  overview(newval,oldval){
    //    if(Object.keys(oldval).length>0){
    //       //  console.log(newval,oldval)
    //        const _this = this;
    //        _this.textArr=[]
    //         if(newval!=oldval){
    //               for(let keys in _this.overview){
    //                 _this.textArr.push(_this.overview[keys])
    //               }
    //         }
    //         this.moveTo()
    //        }
       
    //  },
     scrollArr(newval,oldval){
        newval.forEach(element => {
          element.lastmile.forEach(item=>{
            item.country_name=element.country_name
          })
        });
        this.textArr=newval
        // console.log(this.textArr,'scrollArr')
        this.moveTo()
     }
  },
  created(){
          //  this.ajaxOverviewCountry()
          //  this.ajaxCountrylist()
          this.ajaxScroll()
  },
  mounted(){
           
           this.maxBox = this.$refs.maxBox
           
           
  },
  methods: {
    ...mapMutations('menu',[
            'getLastmileList'
        ]),
    ...mapActions('menu',[
          'ajaxOverviewCountry','ajaxCountrylist','ajaxLastmileList','ajaxScroll'
      ]),
     
    moveTo(){
      const _this= this;
       
           clearInterval(_this.tiems)
           clearInterval(_this.tiems1)
           let widths=0;
           _this.tiems=setInterval( ()=>{
             ++widths
             _this.maxBox.style.left='-'+widths+'px'
             _this.imgArr=[]
             if(widths==235){
              _this.imgArr=_this.textArr[3].lastmile
               clearInterval(_this.tiems)
               _this.tiems1=setInterval( ()=>{
                 clearInterval(_this.tiems1)
                 
                 _this.maxBox.style.left='0px'
                 let obj=null
                 obj = _this.textArr.splice(0,1);
                 _this.textArr.push(obj[0])
                 
                 this.moveTo()

               },5000)
             }
             
           },1)
      // console.log(_this.imgArr,'_this.imgArr')
    },
    setTime(){
          
    },
    backTo(url,country_name,country){
        this.$router.push({path: url, query: {country: country_name,code:country}})
      },
      backPath(lastmile_code,lastmile_logo,lastmile_summary,country_name){
          let data={}
          data.lastmile_code=lastmile_code
          data.lastmile_logo=lastmile_logo
          data.lastmile_summary=lastmile_summary
          data.country_name=country_name
          this.$emit('childPost',data)
          // console.log(data)
      }
  },
  destroyed () {
          clearInterval(this.tiems)
          clearInterval(this.tiems1)
  }
}

</script>

<style scoped>
    .fadeInUp {
	      animation-fill-mode: both;
        -webkit-animation:fadeInUp .2s linear;
        animation:fadeInUp .2s linear;
    }
    .swiper-container{
        max-width: 1170px;
        overflow-x: hidden;
        /* background:#ccc; */
        /* height:100px; */
    }
    .box{
        position: relative;
        left:0;
    }
    .swiper-container>div{
       
    }
    .swiper-items{
        width: 20%;
        padding:10px;
    }
    .swiper-items>div.active{
        /* border:1px solid #2F9AC0; */
        border-radius: 5px;
        /* box-shadow:0px 0px 18px 0px rgba(47,154,192); */
        background: rgba(47,154,192);
    }
    .swiper-items>div{
        /* border:1px solid none; */
        border-radius: 5px;
        box-sizing:border-box;
        -moz-box-sizing:border-box; /* Firefox */
        -webkit-box-sizing:border-box;
        width:215px;
        height:110px;
        background: #FBFBFB;
    }
    .swiper-items p{
      text-align: center;
      width:100%;
      font-size:20px;
      color:#666666;
    }
    .swiper-items>div.active p{
        color:white;
    }
    .swiper-items img{
      margin: 0 auto;

    }
    .swiper-img{
      max-width: 1170px;
      height:100px;
      background: #FBFBFB;
    }
    .swiper-img>div{
      width: 100%;;
      height:100%;
    }
    .swiper-img>div i{
      width: 200px;
      height:70px;
      margin-left:20px;
      box-sizing:border-box;
      -moz-box-sizing:border-box; /* Firefox */
      -webkit-box-sizing:border-box;
        /* border:1px solid #ccc; */
        box-shadow:0px 2px 8px 0px rgba(198,198,198,0.5);
    }
    .swiper-img>div i>img{
      width: 100%;
      height:100%;
      /* object-fit: cover; */
    }
    .container{
        margin:80px auto 20px;
    }
    @media screen and (max-width: 992px) {
     .swiper-items{
       width: 33.3%;
       padding: 10px;
     }
   }
   @media screen and (max-width: 768px) {
     .swiper-items{
       width: 50%;
       padding: 20px;

     }
     .container{
        margin:.8rem auto .2rem;
     }
     .swiper-items img{
       width:1.9rem;
       height:.64rem;

    }
   }
</style>
