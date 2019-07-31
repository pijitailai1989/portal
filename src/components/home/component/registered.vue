<template>
  <div class="flexs columns a-center" ref="record">
    <div class="flexs columns a-center">
      <div class="container flexs columns a-center">
       <p>{{useSpider.useSpider}}</p>
       <i>{{news.PS}}</i>
       <span class="flexs columns a-center j-center">
         <em><input type="text" v-model="customerEmall" :placeholder='news.PE'></em>
         <a @click="subscribeFn()">{{news.LJ}}</a>
         <span>{{news.YG}} <a href="mailto:sales@spiderparcel.com"><strong> sales@spiderparcel.com</strong></a>  </span>
       </span>
      </div>
    </div>
    <div v-show="recordShow" class="recordDiv flexs columns a-center j-around" :class="recordShow?'record':''">
       <span @click="colseFixed" class="iconfont icon-cha" style="font-size:20px;color:white;"></span>
       <div style="color:white;font-size:18px">{{news.PS}}</div>
       <div style="height:50px;" class="flexs a-center">
         <em><input type="text" v-model="customerEmall" :placeholder='news.PE'></em>
         <a @click="subscribeFn()">{{news.LJ}}</a>
       </div>
    </div>
  </div>
</template>

<script>
import {mapState,mapGetters,mapActions,mapMutations} from 'vuex'
  export default {
    name:'',
    props:[''],
    data () {
      return {
        customerEmall:'',
        recordShow:false
      };
    },

    components: {},

    computed: {
      useSpider(){
        return this.$t('homeUseSpider')
      },
      nav(){
       return this.$t('nav')
      },
      news(){
       return this.$t('news')
      },
    },

    beforeMount() {},
    created(){
      
    },
    mounted() {
      this.scrollBody()
      window.addEventListener('scroll', this.scrollBody)
      
      
      
    },
    
    methods: {
      ...mapActions('home',[
            'ajaxNewsletter'
        ]),
        colseFixed(){
          this.$cookies.set('record',true);
          this.recordShow = false ;
        },
        async subscribeFn(){
          var reg=new RegExp(/^([a-zA-Z0-9._-])+@([a-zA-Z0-9_-])+(\.[a-zA-Z0-9_-])+/);
          const _this = this;
          if(!_this.customerEmall){
            return;
          }
          if( !reg.test(_this.customerEmall) ){
            return this.$message.error('The E-mail address you entered does not conform to the specification！');
          }
          // console.log( reg.test(_this.customerEmall) ,'elmaii')
          let data={}
          data.emailAddress=this.customerEmall
          let res = await this.ajaxNewsletter( data )
          // console.log(res,'res')
          switch(res.response_code)
                   {
                   case 201001:
                     _this.$message({
                        message: res.message,
                        type: 'success'
                      });
                    _this.$cookies.set('record',true);
                    _this.recordShow = false ;
                     break;
                   case 500001:
                     _this.$message.error( res.message );
                     break;
                   case 400001:
                     _this.$message({
                        message: res.message
                      });
                     break;
                   case 400002:
                     _this.$message.error( res.message );
                     break;
                   default:
                     _this.$message.error( res.message );
                   }
        },
        // isEmail(str){
        //      if(str==null) return;
             
        //      var reg=new RegExp(/^([a-zA-Z0-9._-])+@([a-zA-Z0-9_-])+(\.[a-zA-Z0-9_-])+/);
             
        //      return reg.test(str);
        // },
        scrollBody(){
          let cookies = this.$cookies.get('record');
          let offsetTop = this.$refs.record.offsetTop
          let scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;

          if( !cookies && scrollTop <= offsetTop-700 ){
             this.recordShow = true ;
          }else{
             this.recordShow = false ;
          }
          
        }
    },
    destroyed () {
     window.removeEventListener('scroll', this.scrollBody)
     },
    watch: {}

    }

</script>
<style lang='' scoped>
   .record{
     position:fixed;
     left:0;
     bottom:0;
     z-index:10000;
     width:100%;
   }
   .recordDiv{
     width:100%;
     height:140px;
     background:rgba(0,0,0,.4);
     color:white;
   }
   .recordDiv>span{
     position:absolute;
     right:5px;
     top:2px;
   }
   .recordDiv em{
     padding:10px 30px;
     background:#F6F6F6;
     border-radius: 50px;
     margin-right:50px;
   }
   .recordDiv em>input{
     width:250px;
     height:30px;
     border:none;
     font-size:18px;
     color:#AAAAAA;
     outline:none;
     background: #F6F6F6;
   }
   .recordDiv a{
     font-size:16px;
       color:white;
       font-weight: 500;
       width:180px;
       height:40px;
       background:rgba(47,154,192,1) linear-gradient(138deg,rgba(47,183,192,1) 0%,rgba(47,154,192,1) 100%);
       border-radius:35px;
       text-align:center;
       line-height: 40px;
       cursor:pointer;
   }
   .container{
       padding:144px 0 0;
   }
   .container p{
       font-size: 40px;
       color:#333;
       font-weight: 600;
   }
   .container em{
     padding:20px 200px;
     background:#F6F6F6;
     border-radius: 50px;
     margin-bottom:60px;
   }
   .container em>input{
     width:300px;
     height:60px;
     border:none;
     font-size:18px;
     color:#AAAAAA;
     outline:none;
     background: #F6F6F6;
   }
   .container b{
     font-size:18px;
     color:#666;
   }
   .container strong{
     font-size:20px;
     color:#2F9AC0;
   }
   .container span>span{
     margin-bottom:20px;
   }
   .container i{
       font-size:24px;
       color:#aaa;
       padding:58px 20px 93px;
   }
   .container span.flexs>a{
       font-size:22px;
       color:white;
       font-weight: 500;
       width:400px;
       height:70px;
       background:rgba(47,154,192,1) linear-gradient(138deg,rgba(47,183,192,1) 0%,rgba(47,154,192,1) 100%);
       border-radius:35px;
       text-align:center;
       line-height: 70px;
       margin-bottom:70px;
       cursor:pointer;
   }
   @media screen and (max-width: 992px) {
     
     .container{
       padding:60px 0;
     }
   }
   @media screen and (max-width: 768px) {
     .record{
       position: relative;
     }
     .recordDiv{
       display:none !important;
     }
     .container{
       display: flex !important;
       padding:.4rem 0;
     }
     .container p{
       padding:0 5%;
       font-size: .34rem;
     }
     .container i{
       font-size:.24rem;
       padding:.4rem .8rem;
     }
     
     .container span.flexs>a{
       font-size:.36rem;
       color:white;
       font-weight: 500;
       width:70%;
       height:40px;
       background:rgba(47,154,192,1) linear-gradient(138deg,rgba(47,183,192,1) 0%,rgba(47,154,192,1) 100%);
       border-radius:35px;
       text-align:center;
       line-height: 40px;
   }
     .container em{
     padding:10px 40px;
     background:#F6F6F6;
     border-radius: 50px;
     margin-bottom:20px;
   }
   .container em>input{
     width:200px;
     height:20px;
     font-size:20px;
     
   }
   .container span>span{
     margin-bottom:20px;
     font-size:.1rem;
   }
   .container strong{
     font-size:.1rem;
     color:#2F9AC0;
   }
   }
</style>