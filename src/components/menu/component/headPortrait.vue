<template>
  <div class="flexs">
     <div class="flexs a-center j-center imgs">
         <img src="@/assets/img/head.png" alt="">
     </div>
     <div class="text flexs columns j-center">
         <p>{{userProfile.name}}</p>
         <span>{{menu.CompleteAddress}} ></span>
     </div>
  </div>
</template>

<script>
  
  import {mapState} from 'vuex'
  export default {
    name:'headPortrait',
    props:[''],
    data () {
      return {

      };
    },

    components: {},

    computed: {
        ...mapState('home',['userProfile']),
        menu(){
          return this.$t('menu')
        },
    },

    beforeMount() {},

    mounted() {},

    methods: {},

    watch: {}

  }

</script>
<style lang='' scoped>
   .imgs{
       width:80px;
       height:80px;
   }
   .imgs>img{
       width:100%;
       height: 100%;
       border-radius: 50%;
       background: #ccc;
   }
   .text{
       flex:1;
       height:80px;
       padding:0 0 0 15px; 
   }
   .text>p{
       padding:0 0 10px 0;
       font-size: 20px;
       color:#666;
   }
   .text>span{
       font-size:14px;
       color:#2F9AC0;
   }
</style>