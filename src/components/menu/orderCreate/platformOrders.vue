<template>
  <div>
      <div class="platform">
         <el-table
         id="coutsm"
         :data="tableData"
         :header-cell-style="headerStyle"
         :cell-style="cellStyle"
         style="width: 100%">
         <el-table-column
           label="下单时间"
           width="160">
           <template slot-scope="scope">
             <p @click="routerLinkTo(hashs)">
               {{scope.row.date}}
             </p>
             <span>
               {{scope.row.date}}
             </span>
           </template>
         </el-table-column>
         <el-table-column
           property="date"
           label="发货地"
           >
         </el-table-column>
         <el-table-column
           property="date"
           label="目的地"
           >
         </el-table-column>
         <el-table-column
           property="date"
           label="物流推荐"
           width="140">
         </el-table-column>
         <el-table-column
           property="name"
           label="包裹数量">
         </el-table-column>
         <el-table-column
           property="address"
           label="预计运费">
         </el-table-column>
         <el-table-column
           label="操作"
           width="180">
           <template slot-scope="scope">
             
             <span>
               查看订单
             </span>
             <i class="iconfont icon-youxiang" style="color:#F4B33D;font-size:20px;margin-left:5px;" />
             <i class="iconfont icon-guanbi" style="color:#2F9AC0;font-size:19px;margin-left:5px;" />
           </template>
         </el-table-column>
        </el-table>
      </div>
  </div>
</template>

<script>

  export default {
    name:'orderTable',
    props:[''],
    data () {
      return {
            tableData: [{
              date: '2016-05-02',
              name: '王小虎',
              address: '上海市普陀'
            }, {
              date: '2016-05-04',
              name: '王小虎',
              address: '上海市'
            }, {
              date: '2016-05-01',
              name: '王小虎',
              address: '上海市'
            }, {
              date: '2016-05-03',
              name: '王小虎',
              address: '上海市普'
            }],
            headerStyle: {
              'color': '#fff',
              'font-weight': '400',
              'font-size':'14px',
              'border-bottom': '1px #F2F2F2 dashed'
            },
            cellStyle: {
              'color': '#666',
              'font-size':'14px',
              'border-bottom': '1px #F2F2F2 dashed'
            },
            hashs:''
      };
    },

    components: {},

    computed: {},

    beforeMount() {},

    mounted() {
        this.hashs=this.$route.hash;
        // console.log(this.$route)
    },

    methods: {
        handleCurrentChange(val) {
         this.currentRow = val;
        },
        routerLinkTo(hash){
            const _this=this;
            _this.$router.push('/menu/orderCenter/orderDetail'+hash)
            
        }
        
    },

    watch: {
      $route(to,from){
        this.hashs=to.hash
      }
    }

  }

</script>
<style lang='' scoped>
    .platform{
        padding:33px;
        box-shadow:0px 4px 18px 0px rgba(227,227,227,0.5);
        border-radius:7px;
    }
</style>