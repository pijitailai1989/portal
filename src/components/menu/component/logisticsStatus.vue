<template>
  <div>
      <ul>
          <li class="status flexs" v-for="(item,index) in statusArr" :key="index">
               <div class="a">{{item.date}}</div>
               <div class="b flexs j-center">
                   <span v-show="index+1!=statusArr.length"></span>
                   <i v-if="index==0" class="iconfont icon-icon" style="color:#2F9AC0;font-size:20px;" />
                   <i v-else class="yuan"></i>
               </div>
               <div class="c">
                   <p :class="index==0?'active':''">{{item.text}}</p>
                   <span>{{item.msg}}</span>
               </div>
          </li>
      </ul>
  </div>
</template>

<script>

  export default {
    name:'logisticsStatus',
    props:[''],
    data () {
      return {
         statusArr:[
             {date:'10-28 15:38',text:'已签收',msg:'包裹已经被签收，如有问题请电联顺丰物流0734-8978-288'},
             {date:'10-28 15:38',text:'派送中',msg:'包裹已经被签收，如有问题请电联顺丰物流0734-8978-288'},
             {date:'10-28 15:38',text:'运输中',msg:'包裹已经被签收，如有问题请电联顺丰物流0734-8978-288'},
             {date:'10-28 15:38',text:'已入库',msg:'包裹已经被签收，如有问题请电联顺丰物流0734-8978-288'}
         ]
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
   
   .status>.a{
      width:40px;
      height:80px;
      color:#C4C4C4;
      font-size:14px;
   }
   .status>.b{
      width:30px;
      height:80px;
      position: relative;
   }
   .status>.b>i{
      position: absolute;
      z-index:2;
      top:5px;
   }
   .status>.b>span{
      width:1px;
      height:80px;
      background: #F0F0F0;
      position: absolute;
      z-index:1;
      top:10px;
   }
   .status>.b>span:last-child{
       width:0;
   }

   .status>.c{
      flex:1;
      height:80px;
   }
   .status>.c>p{
       color:#666;
       font-size:16px;
   }
   .status>.c>p.active{
       color:#2F9AC0;
   }
   .status>.c>span{
       color:#C4C4C4;
       font-size:14px;
   }
   .yuan{
       border:1px solid #D6D6D6;
       border-radius: 50%;
       background: white;
       width:18px;
       height:18px;
   }
</style>