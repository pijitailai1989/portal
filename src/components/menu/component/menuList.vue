<template>
  <div class="menuL">
    <div v-for="(item,index) in menuList" :key="index" >
        <p :style="{color:item.color}" @click="routerLinkTo(item.path,index)">{{menu[item.name] || item.name}}</p>
        <ul v-if="item.children">
            <li :style="{color:todo.color,fontWeight:todo.color=='#2F9AC0'?'600':''}" v-for="(todo,i) in item.children" :key="i" @click="routerLinkTo(todo.path,index,i)">
                {{ menu[todo.name] || todo.name }}
            </li>
        </ul>
    </div>

  </div>
</template>

<script>

  export default {
    name:'menuList',
    props:[''],
    data () {
      return {
           menuList:[
               {
                   name:'Personal',path:'/menu/personalCenter',color:'#333',
               },
               {
                   name:'Create',path:'/menu/orderCreate',color:'#333',children:[
                       {name:'Single',path:'/menu/orderCreate#single',color:'#999'},
                       {name:'Offline',path:'/menu/orderCreate/offlineOrder',color:'#999'},
                       {name:'Platform',path:'/menu/orderCreate/platformOrder',color:'#999'},
                       {name:'Unplaced',path:'?',color:'#999'}
                   ]
               },
               {
                   name:'OrderCenter',path:'/menu/orderCenter',color:'#333',children:[
                       {name:'WaitingWarehousing',path:'/menu/orderCenter#0',color:'#999',children:[
                         {name:'OrderDetails',path:'/menu/orderCenter/orderDetail#0'}
                       ]},
                       {name:'WaitingPayment',path:'/menu/orderCenter#1',color:'#999',children:[
                         {name:'OrderDetails',path:'/menu/orderCenter/orderDetail#1'}
                       ]},
                       {name:'WaitingGoods',path:'/menu/orderCenter#2',color:'#999',children:[
                         {name:'OrderDetails',path:'/menu/orderCenter/orderDetail#2'} 
                       ]},
                       {name:'Abnormal',path:'/menu/orderCenter#3',color:'#999',children:[
                         {name:'OrderDetails',path:'/menu/orderCenter/orderDetail#3'}
                       ]},
                       {name:'All',path:'/menu/orderCenter#4',color:'#999',children:[
                         {name:'OrderDetails',path:'/menu/orderCenter/orderDetail#4'}
                       ]},
                   ]
               },
               {
                   name:'LogisticsService',path:'/menu/logisticsService',color:'#333',children:[
                       {name:'FreightCalculator',path:'/menu/logisticsService#calculator',color:'#999'},
                       {name:'ServiceContrast',path:'/menu/logisticsService/aA',color:'#999'}
                   ]
               },
               {
                   name:'AccountSettings',path:'?',color:'#333',children:[
                       {name:'MyWallet',path:'?',color:'#999'},
                       {name:'PersonalInformation',path:'?',color:'#999'},
                       {name:'AddressManagement',path:'/menu/AccountSettings/AddressManagement',color:'#999'},
                   ]
               }

           ]
      };
    },

    components: {},

    computed: {
        locale(){
          return this.$i18n.locale
        },
        menu(){
          return this.$t('menu')
        }
    },

    beforeMount() {},

    mounted() {
        let paths = this.$route.fullPath
        this.routerColor(paths)
        sessionStorage.setItem('menuList',JSON.stringify(this.menuList))
    },

    methods: {
        routerColor(path){
            const _this=this;
            const num = (path.split('/')).length-1;
            const sum = (path.split('#')).length-1;
            // console.log(sum,path.split('#'))
            _this.clearData()
            _this.menuList.forEach(el=>{
                if(num==3){
                    if(el.children){
                      el.children.forEach(item=>{
                          if(item.path==path) item.color='#2F9AC0';
                      })
                    }
                }else if(num==2&&sum){
                    if(el.children){
                      el.children.forEach(item=>{
                          if(item.path==path) item.color='#2F9AC0';
                      })
                    }
                }else if(num==2){
                    if(el.path==path) el.color='#2F9AC0';
                }
            })
        },
        clearData(){
            const _this=this;
            _this.menuList.forEach(el=>{
                el.color='#333';
                if(el.children){
                    el.children.forEach(item=>{
                     item.color='#999';
                    })
                }
                
            })
        },
        routerLinkTo(path,index,i){
            const _this=this;
            _this.$router.push(path)
            _this.clearData()
            if(i>=0){
                _this.menuList[index].children[i].color='#2F9AC0'
            }else{
                _this.menuList[index].color='#2F9AC0'
            }
            
        },
        
    },

    watch: {
        $route(to,from){
            this.routerColor(to.fullPath)
        },
        
    }

  }

</script>
<style lang='' scoped>
   .menuL p{
      font-size:18px;
      padding:30px 0 10px;
      cursor:pointer;
      font-weight: 600;
   }
   .menuL li{
      font-size:14px;
      padding:5px 0;
      cursor:pointer;
   }
   .menuL p:hover,.menuL li:hover{
       color:#2F9AC0 !important;
   }
</style>