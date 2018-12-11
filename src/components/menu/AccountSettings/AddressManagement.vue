<template>
  <div class="flexs rows j-center">
     <div class="table-container">
              <div class="table-header">管理发货地址</div>
              <el-table
                id="dataList"
                :data="GetRess"
                
                :header-cell-style="headerStyle"
                :cell-style="cellStyle"
                style="width: 100%;border-bottom-left-radius:10px;
                   border-bottom-right-radius:10px;text-align:center">
                <el-table-column
                  width="140"
                  style="color:#333;"
                  label="发货人">
                  <template slot-scope="scope">
                      <span style="color:#333;">{{scope.row.name}}</span>
                  </template>
                </el-table-column>
                
                <el-table-column
                  label="发货地址"
                  width="440">
                  <template slot-scope="scope">
                      <span>{{scope.row.country}} </span>
                       <span> {{scope.row.city}} </span>
                       <span> {{scope.row.address}} </span>
                       <span v-if="scope.row.postcode">( {{scope.row.postcode}} )</span>
                  </template>
                </el-table-column>
                <el-table-column
                  label="联系电话">
                  <template slot-scope="scope">
                      <span style="color:#333;">+ </span>
                      <span style="color:#333;">{{scope.row.phone_district}}</span>
                      <span style="color:#333;">{{scope.row.phone}}</span>
                  </template>
                </el-table-column>
                <el-table-column
                  label="操作"
                  width="220">
                  <template slot-scope="scope">
                    <div class="flexs rows j-between set">
                        <span>编辑</span>
                        <span @click="deleteAddress(scope.row.id)">删除</span>
                        <span style="color:white;background:#2F9AC0;" v-if="scope.row.is_default=='1'">默认地址</span>
                        <span style="color:#2F9AC0;" v-else>设置默认地址</span>
                    </div>
                  </template>
                </el-table-column>
              </el-table>
     </div>
     <div class="flexs j-center a-center" style="cursor: pointer;height:40px;margin-top:30px;">
              <i class="iconfont icon-jiajianzujianjiahao" style="color: #F4B33D;font-size: 16px"/>
              <span style="color:#F4B33D;font-size:16px;margin-left:10px;">{{menu.Add_address}}</span>
     </div>
  </div>
</template>

<script>
  import {mapState,mapGetters,mapActions,mapMutations} from 'vuex'
  export default {
    name:'',
    props:[''],
    data () {
      return {
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
      };
    },

    components: {
    },

    computed: {
        menu(){
          return this.$t('menu')
          },
          ...mapState('menu',[
                        'GetRess'
                        ]),
    },

    beforeMount() {},

    mounted() {
        this.ajaxGetress()
    },

    methods: {
        ...mapMutations('menu',['btnOver']),
        ...mapActions('menu', [
                           'ajaxUpdateAddress',
                           'ajaxGetPackage1',
                           'ajaxGetPackage',
                           'ajaxQuoteSingle',
                           'ajaxGetress',
                           'ajaxGetAddress',
                           'ajaxGetCity',
                           'ajaxGetCity1',
                           'ajaxPostAddress',
                           'ajaxGetDestination',
                           'ajaxDeleteAddress'
                           ]),
        async deleteAddress(id){
            let res = await this.ajaxDeleteAddress( id )
            if(res.status===200){
                 this.ajaxGetress()
            }
            return res;
        }
    },

    watch: {}

  }

</script>
<style lang='' scoped>
   .table-container{
      margin-top:40px;
      width: 100%;
      background:rgba(255,255,255,1);
      box-shadow:0px 6px 12px 0px rgba(230,230,230,0.5);
      border-radius:10px;
    }
    .table-header{
      line-height: 40px;
      text-align: center;
      font-size: 18px;
      background: #2F9AC0;
      color: #ffffff;
      border-top-left-radius:10px;
      border-top-right-radius:10px;
    }
    .set>span:nth-child(1),.set>span:nth-child(2){
      width:30px;
      color:#F4B33D;
      line-height: 30px;
      height:30px;
      text-align:center;
      cursor:pointer;
    }
    .set>span:nth-child(3){
      width:100px;
      height:30px;
      border-radius:15px;
      line-height: 30px;
      height:30px;
      text-align:center;
      cursor:pointer;
    }
</style>