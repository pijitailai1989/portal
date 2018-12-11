<template>
  <div class="messageBox flexs a-center j-center">
      <div>
       <header >
           <slot name="header"></slot>
           <i @click="clickClose" class="iconfont icon-cha" style="color:white;font-size:24px;" />
       </header>
       <main>
           <slot></slot>
       </main>
       <footer>
           <slot name="footer"></slot>
       </footer>
      </div>
  </div>
</template>

<script>

  export default {
    name:'messageBox',
    props:['postMess'],
    data () {
      return {
      };
    },

    components: {},

    computed: {},

    beforeMount() {},

    mounted() {
          
          
    },

    methods: {
        clickClose(){
           this.$emit('posttoparent',false);
        }
    },

    watch: {

    }

  }

</script>
<style lang='' scoped>
   .messageBox{
       position: fixed;
       top: 0;
       bottom: 0;
       left: 0;
       right: 0;
       width:100%;
       height:100%;
       background: rgba(0, 0, 0, 0.5);
       z-index:2000;
   }
   .messageBox>div{
       width:800px;
       min-height:200px;
       background: white;
       border-radius:20px;
   }
   .messageBox>div>header{
       border-radius:20px 20px 0 0 ;
       height:68px;
       width:100%;
       background: #2F9AC0;
       position: relative;
       line-height: 68px;
       text-align:center;
       color:white;
       font-size:22px;
   }
   .messageBox>div>header>i{
       position:absolute;
       right: 20px;
       top:0px;
       cursor: pointer;
   }
</style>