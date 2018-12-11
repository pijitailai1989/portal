<template>
  <div>
    <el-table
    id="coutsm"
    :data="tableData"
    :header-cell-style="headerStyle"
    :cell-style="cellStyle"
    style="width: 100%">
    <el-table-column
      label="订单号"
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
      label="发货地/目的地"
      >
    </el-table-column>
    <el-table-column
      property="date"
      label="收件人"
      >
    </el-table-column>
    <el-table-column
      property="date"
      label="包裹描述"
      width="200">
    </el-table-column>
    <el-table-column
      property="name"
      label="预计费用">
    </el-table-column>
    <el-table-column
      label="操作"
      width="80">
      <template slot-scope="scope">
        
        <span style="color:#2F9AC0;" >
          打印标签
        </span>
        <span @click.prevent="">
          取消订单
        </span>
        <span @click="routerLinkTo">
          订单详情
        </span>
        <span @click.prevent="">
          取消退货
        </span>
      </template>
    </el-table-column>
   </el-table>
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
  
</style>