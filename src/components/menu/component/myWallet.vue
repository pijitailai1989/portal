<template>
  <div class="flexs a-center" style="height:60px;">
     <p>我的钱包</p>
     <i class="iconfont icon-qianbao" style="color:#F4B33D;font-size:23px;"/>
     <span>800<a>$</a></span>
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

    computed: {},

    beforeMount() {},

    mounted() {},

    methods: {},

    watch: {}

  }

</script>
<style lang='' scoped>
   p{
     font-size: 18px;
     color:#999;
   }
   i{
     margin:0 20px;
   }
   span{
     font-size:30px;
     color:#333;
   }
   a{
     font-size:20px;
   }
</style>