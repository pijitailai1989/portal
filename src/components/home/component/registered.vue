<template>
  <div class="container flexs columns a-center">
     <p>{{useSpider.useSpider}}</p>
     <i>{{news.PS}}</i>
     <span class="flexs columns a-center j-center">
       <em><input type="text" v-model="customerEmall" :placeholder='news.PE'></em>
       <a @click="subscribeFn()">{{news.LJ}}</a>
       <span>{{news.YG}} <strong> sales@spiderparcel.com</strong></span>
     </span>
  </div>
</template>

<script>
import {mapState,mapGetters,mapActions,mapMutations} from 'vuex'
  export default {
    name:'',
    props:[''],
    data () {
      return {
        customerEmall:''
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

    mounted() {},

    methods: {
      ...mapActions('home',[
            'ajaxNewsletter'
        ]),
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
        // }
    },

    watch: {}

  }

</script>
<style lang='' scoped>
   .container{
       padding:144px 0 0;
   }
   p{
       font-size: 40px;
       color:#333;
       font-weight: 600;
   }
   em{
     padding:20px 200px;
     background:#F6F6F6;
     border-radius: 50px;
     margin-bottom:60px;
   }
   em>input{
     width:300px;
     height:60px;
     border:none;
     font-size:30px;
     color:#AAAAAA;
     outline:none;
     background: #F6F6F6;
   }
   b{
     font-size:18px;
     color:#666;
   }
   strong{
     font-size:20px;
     color:#2F9AC0;
   }
   span>span{
     margin-bottom:20px;
   }
   i{
       font-size:24px;
       color:#aaa;
       padding:58px 20px 93px;
   }
   span>a{
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
     .container{
       padding:.4rem 0;
     }
     p{
       padding:0 5%;
       font-size: .34rem;
     }
     i{
       font-size:.24rem;
       padding:.4rem .8rem;
     }
     
     span>a{
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
     em{
     padding:10px 40px;
     background:#F6F6F6;
     border-radius: 50px;
     margin-bottom:20px;
   }
   em>input{
     width:200px;
     height:20px;
     font-size:20px;
     
   }
   span>span{
     margin-bottom:20px;
     font-size:.1rem;
   }
   strong{
     font-size:.1rem;
     color:#2F9AC0;
   }
   }
</style>