<template>
  <div class="container flexs columns a-center">
     <p>{{useSpider.useSpider}}</p>
     <i>{{useSpider.useSpiderInfor}}</i>
     <span class="flexs a-center j-center">
       <a v-if="!$store.state.home.isLogin" :href="baseURL+'/register'">{{useSpider.freeRegister}}</a>
        <router-link v-else to="/menu/orderCreate">{{nav.createOrder}}</router-link>
      </span>
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
      useSpider(){
        return this.$t('homeUseSpider')
      },
      nav(){
       return this.$t('nav')
     }
    },

    beforeMount() {},

    mounted() {},

    methods: {},

    watch: {}

  }

</script>
<style lang='' scoped>
   .container{
       padding:144px 0;
   }
   p{
       font-size: 40px;
       color:#333;
       font-weight: 600;
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
     span{
       width:2.56rem;
       height:.7rem;
       font-size:.28rem;
     }
     span>a{
       font-size:.36rem;
       color:white;
       font-weight: 500;
       width:400px;
       height:40px;
       background:rgba(47,154,192,1) linear-gradient(138deg,rgba(47,183,192,1) 0%,rgba(47,154,192,1) 100%);
       border-radius:35px;
       text-align:center;
       line-height: 40px;
   }
     
   }
</style>