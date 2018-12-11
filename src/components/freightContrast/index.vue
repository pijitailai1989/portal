<template>
  <div>
    <header>
        <HeaderCmp/>   
    </header>
    <section class="container flexs" style="padding: 0;">
        <main>
            <!-- <Breadcrumb/> -->
            <router-view></router-view>
        </main>
    </section>
    <footer>
        <Footers></Footers>
        <div class="copy flexs a-center j-center">
          <span class="flexs a-center j-center">版权所有： 2018 搜派 Spider All Rights Reserved ICP备10005645</span>
        </div>
    </footer>
  </div>
</template>

<script>
import HeaderCmp from '@/components/home/component/header'
import Breadcrumb from '@/components/menu/component/breadcrumb'  //面包屑
import Footers from '@/components/home/component/footer'    //底部
import UploadFile from '@/components/common/uploadFile'
export default {
  data() {
    return {
    }
  },

  components: {
      HeaderCmp,
      Breadcrumb,
      Footers,
      UploadFile
  },

  methods: {}
}

</script>
<style scoped>
    header{
        /* background: #333;   */
        min-height: 90px;
    }
    section{
        margin-top:20px;
        
    }
    main{
        min-height:437px;
        width: 100%;
        padding: 0 20px;
    }
    .copy{
       background: #FCFCFC;
       font-size:14px;
       color:#999;
       width:100%;
       padding:20px 5%;
   }
</style>