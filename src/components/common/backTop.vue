<template>
  <div class="leftRight1 flexs rows j-end" v-show="showTop">
           <span   @click="clickTop" style="" class="flexs a-center j-center">
              <i class="iconfont icon-xiangshang" style="color: #fff;font-size: 22px;"/>
           </span> 
    </div>
</template>

<script>

  export default {
    name:'backTop',
    props:[''],
    data () {
      return {
         showTop:false
      };
    },

    components: {},

    computed: {},

    beforeMount() {},

    mounted() {
      window.addEventListener('scroll', this.handleScroll)
    },
    destroyed () {
      window.removeEventListener('scroll', this.handleScroll)
    },
    methods: {
        handleScroll(){
          let scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
          if(scrollTop>=400){
             this.showTop=true
          }else{
             this.showTop=false;
          }
          
        //   console.log(scrollTop)
        },
        clickTop(){
            document.body.scrollTop = 0
            document.documentElement.scrollTop = 0
        },
    },

    watch: {}

  }

</script>
<style lang='' scoped>
  .leftRight1{
         position: fixed;
         width:1240px;
         bottom:10vh;
         left:0;
         right:-60px;
         margin:auto;
     }
     .leftRight1>span{
        width:40px;
        height:40px;
        background:#ECECEC;
        border-radius: 5px;
        -webkit-box-shadow: 0px 2px 8px rgba(230,230,230,0.7);
        box-shadow: 0px 2px 8px rgba(230,230,230,0.7);
        cursor:pointer;
     }
</style>