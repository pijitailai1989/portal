<template>
  <div class="menuL">
    <div v-for="(item,index) in menuList" :key="index" >
        <p :style="{color:item.color}" @click="routerLinkTo(item.path,index)">{{item.name}}</p>
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
                   name:'物流服务',path:'?',color:'#333',
               },
               {
                   name:'查询服务',path:'/cargo/expressTracking',color:'#333',children:[
                       {name:'服务网点查询',path:'?',color:'#999'},
                       {name:'运费时效查询',path:'?',color:'#999'},
                       {name:'违禁物品查询',path:'?',color:'#999'}
                   ]
               },
               

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
        sessionStorage.setItem('cargoList',JSON.stringify(this.menuList))
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
   .menuL{
       min-height:400px;
   }
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