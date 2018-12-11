<template>
  <div style="margin-bottom:30px;" class="mb">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="item.path" v-for="(item,index) in breadArr" :key="index">
            {{ menu[item.name] || item.name }}
        </el-breadcrumb-item>
      </el-breadcrumb>
  </div>
</template>

<script>

  export default {
    name:'',
    props:[''],
    data () {
      return {
           breadArr:[
               
           ]
      };
    },

    components: {},

    computed: {
        menuList(){
            return JSON.parse(sessionStorage.getItem('cargoList'))
        },
        menu(){
          return this.$t('menu')
        }
    },

    beforeMount() {},

    mounted() {
        // console.log(this.menuList)
        let fullPath=this.$route.fullPath
        this.breadRoute(fullPath)
    },

    methods: {
        findFun(arr,date){
            // let newArr=[];
            let newData=[];
           if(arr.length>=1){
               arr.forEach( (element,i) => {
                   if(element.path==date){
                       let data={}
                    //    newArr.push(i)
                       
                       data['name']=element.name;
                       data['path']=element.path;
                       
                       if(date=='/menu/personalCenter'){
                        //    console.log(2222222)
                       }else{
                         newData.push(data)
                        //  console.log(1111111111,date)
                       }
                       return
                   }
                   if(element.children){
                       element.children.forEach( (item,n)=>{
                           if(item.path==date){
                               let data={}
                               let data1={}
                            //    newArr.push(i)
                            //    newArr.push(n)
                               data['name']=element.name;
                               data['path']=element.path;
                               newData.push(data)
                               data1['name']=item.name;
                               data1['path']=item.path;
                               newData.push(data1)
                               return
                           }
                           if(item.children){
                              item.children.forEach( (todo,n)=>{
                                  if(todo.path==date){
                                      let data={}
                                      let data1={}
                                      let data2={}
                                   //    newArr.push(i)
                                   //    newArr.push(n)
                                      data['name']=element.name;
                                      data['path']=element.path;
                                      newData.push(data)
                                      data1['name']=item.name;
                                      data1['path']=item.path;
                                      newData.push(data1)
                                      data2['name']=todo.name;
                                      data2['path']=todo.path;
                                      newData.push(data2)
                                      return
                                  }
                              } )
                           }
                       } )
                   }
               });
           }
           return newData
        },
        breadRoute(data){
           const _this =this;
           _this.breadArr=this.findFun(_this.menuList,data)
        //    console.log(_this.breadArr)
        }
    },

    watch: {
        $route(to,from){
            // console.log(to.fullPath)
            this.breadRoute(to.fullPath)
        }
    }

  }

</script>
<style lang='' scoped>
  
</style>