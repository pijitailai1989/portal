<template>
  <div>
      <div class="flexs fun">
         <div class="nameUrl">
             <HeadPortrait/> 
         </div>
         <div class="myWallet">
             <MyWallet/>
         </div>
      </div>
      <div class="statuList flexs">
           <div class="flexs columns j-end a-center" v-for="(item,index) in statuArr" :key="index" @click="routerLinkTo(item.path,index)">
             <i class="iconfont" :class="item.iconTpey" :style="{ color: item.color, fontSize: item.size + 'px' }"/>
             <p :style="{color:item.text,fontWeight:item.color=='#2F9AC0'?'600':''}">{{item.name}}</p>
           </div>
      </div>
      <div class="orderTable">
           <OrderTable/>
      </div>
  </div>
</template>

<script>
 import HeadPortrait from '../component/headPortrait'
 import MyWallet from '../component/myWallet'
 import OrderTable from '../component/orderTable'
  export default {
    name:'orderCenter',
    props:[''],
    data () {
      return {
          statuArr:[
            {name:'待入库订单',iconTpey:'icon-weishiyong',size:'37',color:'#636262',text:'#666',path:'/menu/orderCenter#0'},
            {name:'待付款订单',iconTpey:'icon-qianbao1',size:'34',color:'#636262',text:'#666',path:'/menu/orderCenter#1'},
            {name:'待收货订单',iconTpey:'icon-wuliu',size:'37',color:'#636262',text:'#666',path:'/menu/orderCenter#2'},
            {name:'异常订单',iconTpey:'icon-xy-yichangbaoguo',size:'30',color:'#636262',text:'#666',path:'/menu/orderCenter#3'},
            {name:'全部订单',iconTpey:'icon-fenlei',size:'37',color:'#636262',text:'#666',path:'/menu/orderCenter#4'}
          ]
      };
    },

    components: {
      HeadPortrait,
      MyWallet,
      OrderTable
    },

    computed: {},

    beforeMount() {},

    mounted() {
        let hashs = this.$route.hash
        this.colorFun(hashs)
    },

    methods: {
      colorFun(data){
        const _this =this;
        _this.clearColor()
         if(data){
          let arr=data.split('#')
          let index =arr[1]
          if(index>=0){
             _this.statuArr[index].color='#2F9AC0';
             _this.statuArr[index].text='#2F9AC0';
          }
        }
      },
      clearColor(){
        const _this =this;
        _this.statuArr.forEach(el=>{
          el.color='#636262';
          el.text ='#666'
        })
      },
      routerLinkTo(path,index){
            const _this=this;
            if(path){
               _this.$router.push(path)
               _this.clearColor()
               _this.statuArr[index].color='#2F9AC0';
               _this.statuArr[index].text='#2F9AC0';
            }
            
        }
    },

    watch: {
      $route(to,from){
        this.colorFun(to.hash)
      }
    }

  }

</script>
<style lang='' scoped>
   .fun{
     width:100%;
     height:120px;
     border-bottom:1px dashed #F2F2F2;
   }
   .nameUrl{
     flex:1;
     height: 120px;
     padding:10px 0 30px 10px;
   }
   .myWallet{
     flex:1;
     height: 120px;
     padding:10px 0 30px 10px;
   }
   .statuList{
    height:120px;
    width:100%;
    padding-bottom:20px;
    margin-bottom:30px;
   }
   .statuList>div{
     flex:1;
     cursor:pointer;
   }
   .statuList>div>p{
     margin-top:5px;
     font-size:16px;
   }
   .orderTable{
      width:100%;
      min-height:500px;
      box-shadow:0 4px 18px 0px rgba(227,227,227,0.5);
      border-radius:7px;
      padding:20px;
      
   }
</style>