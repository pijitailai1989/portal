<template>
    <div class="rows flexs j-between blue-topBorder">
      <div class="chart-container table-container">
        <el-table
        :data="GetProductInfo"
        style="width: 100%">
            <el-table-column
                align="center"
                :label="menu.Logistics_company">
                <template slot-scope="scope">
                    <div>
                        <div style="max-width: 89px; height: 39px; margin: 0 auto;">
                            <img
                                :src="baseURL+scope.row.lastmile_logo"
                                style="display: block;width: 100%; height: 100%;">
                        </div>
                        <p style="font-size: 12px; text-align: center;">{{scope.row.product_name}}</p>
                    </div>
                </template>
            </el-table-column>
            <el-table-column
                align="center"
                :label="menu.Star_evaluation">
                <template slot-scope="scope">
                    <el-rate
                        v-model="scope.row.score"
                        disabled
                        void-color="#E78483"
                        score-template="{value}">
                    </el-rate>
                    <p class="rank-text">{{ scope.row.score }}{{menu.points}}</p>
                </template>
            </el-table-column>
            <el-table-column
                :label="menu.Delivery_time"
                align="center"
                width="180">
                <template slot-scope="scope">
                    <range-slider style="width: 63%;" :min="scope.row.min_lead_time" :max="scope.row.max_lead_time"/>
                    <p class="date-text">{{scope.row.min_lead_time}}~{{scope.row.max_lead_time}}{{menu.day}}</p>
                </template>
            </el-table-column>
            <el-table-column
                align="center"
                width="50"
                :label="menu.tax_package">
                <template slot-scope="scope">
                    <i :class="scope.row.import_tax_all_in === 'Y' ? 'el-icon-check' : 'el-icon-close'" style="padding: 1px; font-size:16px;"></i>
                </template>
            </el-table-column>
            <el-table-column
                align="center"
                :label="menu.Estimated_freight">
                <template slot-scope="scope">
                    <strong v-if="scope.row.import_tax_all_in === 'Y'" class="price-tariff">￥{{scope.row.shipping_cost}} <span v-if="!(scope.row.import_tax_all_in === 'Y')">+ {{menu.tax}}</span></strong>
                    <el-popover
                        v-else
                        placement="bottom"
                        title=""
                        trigger="hover">
                        <p class="hover-tip">{{menu.Expected_tariff}}:￥{{scope.row.tax_and_duty}}</p>
                        <strong slot="reference" class="price-tariff">￥{{scope.row.shipping_cost}} <span v-if="!(scope.row.import_tax_all_in === 'Y')"> + {{menu.tax}}</span></strong>
                    </el-popover>
                </template>
            </el-table-column>
            <el-table-column
                align="center"
                width="210"
                :label="menu.operation">
                <template slot-scope="scope">
                    <!-- <el-checkbox class="opt-checkboc" name="type"></el-checkbox> -->
                    <span v-if="scope.row.best_price && scope.row.fastest && scope.row.highest_score" class="selected-product all-perfect" @click="commitFn(scope.row.product_id,scope.row.rate_card_id)">{{menu.integrated_optimal}}</span>
                    <span v-else-if="scope.row.best_price" class="selected-product single-perfect" @click="commitFn(scope.row.product_id,scope.row.rate_card_id)">{{menu.best_price}}</span>
                    <span v-else-if="scope.row.fastest" class="selected-product single-perfect" @click="commitFn(scope.row.product_id,scope.row.rate_card_id)">{{menu.Aging_fastest}}</span>
                    <span v-else-if="scope.row.highest_score" class="selected-product single-perfect" @click="commitFn(scope.row.product_id,scope.row.rate_card_id)">{{menu.Evaluation_highest}}</span>
                    <span v-else class="selected-product" @click="commitFn(scope.row.product_id,scope.row.rate_card_id)">{{menu.choose}}</span>
                </template>
            </el-table-column>
        </el-table>
      </div>
    </div>
</template>

<script>
  import RangeSlider from '@/components/common/progressBar/thickBar'
  import {mapState,mapGetters,mapActions,mapMutations} from 'vuex'
  export default {
    name:'',
    props:['postData'],
    data () {
      return {
           productTable:[]
      };
    },
    components:{
        RangeSlider
    },
    computed:{
    // sellerInfo(){
    //   return this.$store.state.home.sellerInfo
    // },
    ...mapState('menu',['GetProductInfo']),
    menu(){
          return this.$t('menu')
          }
   },

    beforeMount() {},

    mounted() {},

    methods: {
        ...mapActions('menu', ['ajaxStageProduct']),
        commitFn(product_id,rate_card_id){
            let data={}
            data.rate_card_id=rate_card_id;
            data.product_id=product_id
            this.$emit('posttoparent1',data)
        }
        // async selectProduct(product_id,rate_card_id) {
        // const _this = this;
        // let data={}
        // data.rate_card_id=rate_card_id;
        // data.product_id=product_id
        // let res = await this.ajaxStageProduct( _this.$qs.stringify(data) )
        // if(res.status===200){
        //     this.$emit('posttoparent1',4)
        //     console.log(22222222222222)
        // }
        // console.log(res)
        // return res
        // }
    },

    watch: {}

  }

</script>
<style lang='' scoped>
   .box-title{
        font-size:18px;
        font-weight:500;
        color:rgba(102,102,102,1);
        line-height:25px;
        margin-bottom: 30px;
    }
    .chart-container{
        width: 100%;
        height:470px;
        margin-bottom: 50px;
        padding: 56px 90px;
        background:rgba(255,255,255,1);
        box-shadow:0px 6px 16px 0px rgba(225,225,225,0.5);
        border-radius:7px;
    }

    .blue-topBorder{
        border-top: 5px solid #2F9AC0;
        min-width: 800px;
    }

    .table-container{
        padding: 20px;
        height: auto;
    }
   .date-text{
        margin-top: 10px;
    }
    .rank-text{
        margin-top: 4px;
    }
    .price-tariff{
        font-size: 16px;
        color: #333333;
    }
    .selected-product{
        display: inline-block;
        min-width:120px;
        width: auto;
        line-height:36px;
        border-radius:20px;
        border:1px solid;
        font-size:16px;
        padding: 0 15px;
        color:rgba(47,154,192,1);
        cursor: pointer;
    }
    .hover-tip{
        letter-spacing: 2px !important;
    }
    .all-perfect, .single-perfect{
        color: #ffffff;
        background:rgba(47,154,192,1);
    }
    .all-perfect{
        background:rgba(244,179,61,1);
    }
</style>