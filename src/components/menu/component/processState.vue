<template>
  <div>
    <ul class="flexs">
        <li v-for="(item,index) in statusArr" :key="index" class="flexs columns">
            <p :style="{color:item.color?'#2F9AC0':'',fontWeight:item.color?'600':'',cursor:item.color?'pointer':''}" @click="childData(item.status,item.color)" >{{menu[item.name]}}</p>
            <p :style="{color:item.color?'#2F9AC0':'',fontWeight:item.color?'600':'',cursor:item.color?'pointer':''}" @click="childData(item.status,item.color)">{{item.status}}</p>
            <span v-show="index!=0" :style="{background:item.color?'#2F9AC0':''}"></span>
        </li>
    </ul>
  </div>
</template>

<script>

  export default {
    name:'processState',
    props:{
        postNum:{
            type:Number,
            default:1
        },
        statusArr:{
            type:Array
        }
        },
    data () {
      return {
         
      };
    },

    components: {},

    computed: {
        menu(){
          return this.$t('menu')
          }
    },

    beforeMount() {},

    mounted() {
        
        this.statusFn()
    },

    methods: {
        statusFn(data){
           const _this=this; 
           this.statusArr.forEach(el=>{
               if(el.status<=_this.postNum){
                  el.color=true
               }else{
                   el.color=false
               }
           })
        },
        childData(status,color){
            const _this=this;
            if( color && status < _this.postNum){
                this.$emit('postStatus',status)
            }
        }
    },

    watch: {
        postNum:'statusFn'
    }

  }

</script>
<style lang='' scoped>
    ul{
        width:600px;
        padding:30px 0 30px;
    }
    ul>li{
        flex:1;
        position:relative;
        /* background: red; */
        
    }
    ul>li>p:nth-child(1){
        width:100px;
        font-size:14px;
        color:#999;
        padding:0 0 40px;
        text-align:center;
        /* background: red; */
    }
    ul>li>p:nth-child(2){
        position:absolute;
        top:38px;
        left:43px;
        z-index:1;
        font-size:16px;
        padding:2px 2px;
        background: white;
    }
    ul>li>span{
        width:100%;
        height:1px;
        background: #F8F8F8;
        position:absolute;
        top:50px;
        left:-107px;
        z-index:-1;
    }
    
</style>