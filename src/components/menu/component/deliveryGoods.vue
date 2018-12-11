<template>
  <div class="letter-box">
     <div class="childBox flexs columns">
         <i v-if="postItem.is_default=='1'">默 认</i>
         <div v-else class="setDel flexs j-between a-center">
             <slot name="set"></slot>
             <slot name="del"></slot>
         </div>
         <p class="address1 flexs j-between">
             <slot name="title"></slot>
             <slot name="default"></slot>
         </p>
         <span class="address2 flexs j-between">
              <a>发货人： {{postItem.name}}</a> 
              <a>邮政编码：{{postItem.postcode}}</a> 
          </span>
         <span class="address2">电话： + {{postItem.phone_district}} {{postItem.phone}}</span>
         <span class="address2">地址： {{postItem.country}}{{postItem.city}}{{postItem.address}}</span>
     </div>
  </div>
</template>

<script>

  export default {
    name:'deliveryGoods',
    props:['postItem'],
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
   .childBox{
      width:450px;
      padding:10px 20px;
      position:relative;
    }
    .setDel{
      position:absolute;
      top:0;
      right:0;
      padding:10px 10px;
      

    }
    .childBox>i{
      position:absolute;
      top:0;right:0;
      width:60px;
      height:25px;
      background: #FCFCFC;
      text-align:center;
      line-height:25px;
      color:#ccc;
    }
   .address1{
      font-size:18px;
      color:#333;
      font-weight:600;
      padding:15px 0;
    }
    .address2{
      font-size:14px;
      color:#666;
      padding:10px 0;
    }
</style>