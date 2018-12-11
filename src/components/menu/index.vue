<template>
  <div>
    <header>
        <HeaderCmp/>   
    </header>
    <section class="container flexs" style="padding:0;">
        <aside>
            <MenuList/>   
        </aside>
        <main>
            <Breadcrumb/>
            <router-view></router-view>
        </main>
    </section>
    <footer>
        <Footers></Footers>
        <div class="copy flexs a-center j-center">
          <span class="flexs a-center j-center">{{$t('homeMaterialBenefits').copyRight}}： 2018 搜派 Spider All Rights Reserved ICP备10005645</span>
        </div>
    </footer>
  </div>
</template>

<script>
  import Footers from '@/components/home/component/footer'    //底部
  import HeaderCmp from '@/components/home/component/header'
  import MenuList from './component/menuList'  //菜单列表
  import Breadcrumb from './component/breadcrumb'  //面包屑
  export default {
    name:'menus',
    props:[''],
    data () {
      return {

      };
    },
    components: {
        HeaderCmp,
        Footers,
        MenuList,
        Breadcrumb
    },

    computed: {},

    beforeMount() {},

    mounted() {},

    methods: {},

    watch: {}

  }

</script>
<style lang='' scoped>
  header{
     /* background: #333;   */
     min-height: 90px;
  }
  
  section{
      margin-top:20px;
  }
  aside{
      min-height: 300px;
      min-width:180px;
      background: #FCFCFC;
      padding:20px 0 60px 50px;
  }
  main{
      width:980px;
      margin-left:40px;
  }
  footer{

  }
  .copy{
       background: #FCFCFC;
       font-size:14px;
       color:#999;
       width:100%;
       padding:20px 5%;
   }
   .container{
       width: 1200px;
   }
</style>