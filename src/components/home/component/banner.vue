<template>
  <section class="banner">
      <img src="@/assets/img/banner2.png" class="img-responsive banner-bg bigshow" alt="">
      <img src="@/assets/img/banner1.png" class="img-responsive banner-bg bigshow1" alt="">
      <div class="container">
        <div class="row">
          <div class="col-md-6 col-lg-7">
            <h2 class="big-size-title" style="text-align:center">{{banner.jumbotronTitle}}</h2>
            <div class="small-size-title" style="text-align:center">{{banner.jumbotronContent}}</div>
          </div>
          <div class="col-md-5 col-lg-4 col-md-offset-1 col-lg-offset-1 bigshow">
            <form class="calculate-fee">
              <!--<div class="calcualte-items">-->
                <!--<label>{{banner.originalCountry}}</label>-->
                <!--<el-select v-model="fromData.origin" filterable @change="destinationCountryDirectory('default')"  id="region-select1" style="width: 100%;">-->
                  <!--<el-option-->
                    <!--v-for="(item,index) in orginList"-->
                    <!--:key="index"-->
                    <!--:label="item"-->
                    <!--:value="index"-->
                    <!--@click.native="originSelected(item,index)">-->
                    <!--&lt;!&ndash; <span style="float: left">{{ item.label }}</span>-->
                    <!--<span style="float: right; font-size: 13px">{{ item.value }}</span> &ndash;&gt;-->
                  <!--</el-option>-->
                <!--</el-select>-->
              <!--</div>-->
              <div class="calcualte-items">
                <label>{{banner.destinationCountry}}</label>
                <el-select v-model="fromData.destination" filterable id="region-select2" style="width: 100%;">
                  <el-option
                    v-for="(item,index) in destinationList"
                    :key="index"
                    :label="item.name"
                    :value="item.country_code"
                    @click.native="destinationListSelected(item,index)">
                    <!-- <span style="float: left">{{ item.label }}</span>
                    <span style="float: right; font-size: 13px">{{ item.value }}</span> -->
                  </el-option>
                </el-select>
              </div>
              <div class="calcualte-items weight-input">
                <label>{{banner.weight}}</label>
                <input type="number" v-model="weightVal">
                <strong>KG</strong>
              </div>
              <div class="calculate-boutton">
                <button type="button" @click="sendData()">{{banner.freightEstimate}}</button>
                <span class="estimated-sample"  @click="EstimateTemplate();centerDialogVisible = true">{{banner.freightEstimateTemplate}}</span>
              </div>
            </form>
          </div>
          <div class="calculate-boutton bigshow1">
                <button type="button">{{banner.freightEstimate}}</button>
          </div>
        </div>
      </div>
      <el-dialog
      id="template"
      :title="banner.freightEstimateTemplate"
      :visible.sync="centerDialogVisible"
      :show-close="true"
      :lock-scroll="false"
      :close-on-click-modal="true"
      style="border-radius:20px;"
      center>
        <el-table
        v-loading="loading"
        :data="productTable"
        empty-text="没有相关物流商产品"
        height="395px"
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
                        <p style="font-size: 12px; text-align: center;">{{scope.row.lastmile_name}}</p>
                        <p style="font-size: 12px; text-align: center;">{{scope.row.service_name}}</p>
                    </div>
                </template>
            </el-table-column>
            <!-- <el-table-column
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
            </el-table-column> -->
            <el-table-column
                :label="menu.Delivery_time"
                align="center"
                width="180">
                <template slot-scope="scope">
                    <!-- <range-slider style="width: 63%;" :min="scope.row.claimed_min_lead_time" :max="scope.row.claimed_max_lead_time"/> -->
                    <p class="date-text">{{scope.row.claimed_min_lead_time}}~{{scope.row.claimed_max_lead_time}}{{menu.day}}</p>
                </template>
            </el-table-column>
            <!--<el-table-column-->
                <!--align="center"-->
                <!--width="50"-->
                <!--:label="menu.tax_package">-->
                <!--<template slot-scope="scope">-->
                    <!--<i :class="scope.row.import_tax_all_in === 'Y' ? 'el-icon-check' : 'el-icon-close'" style="padding: 1px; font-size:16px;"></i>-->
                <!--</template>-->
            <!--</el-table-column>-->
            <el-table-column
                align="center"
                :label="menu.Estimated_freight">
                <template slot-scope="scope">
                    <!--<strong v-if="scope.row.import_tax_all_in === 'Y'" class="price-tariff">￥{{scope.row.shipping_cost}} <span v-if="!(scope.row.import_tax_all_in === 'Y')">+ {{menu.tax}}</span></strong>-->
                    <!--<el-popover-->
                        <!--v-else-->
                        <!--placement="bottom"-->
                        <!--title=""-->
                        <!--trigger="hover">-->
                        <!--<p class="hover-tip">{{menu.Expected_tariff}}:￥{{scope.row.tax_and_duty}}</p>-->
                        <!--<strong slot="reference" class="price-tariff">￥{{scope.row.shipping_cost}} <span v-if="!(scope.row.import_tax_all_in === 'Y')"> + {{menu.tax}}</span></strong>-->
                    <!--</el-popover>-->
                    <strong>{{scope.row.cost_currency}}</strong>
                    <strong>{{scope.row.shipping_cost}}</strong>
                </template>
            </el-table-column>
            <el-table-column
                align="center"
                width="210"
                :label="menu.operation">
                <template slot-scope="scope">
                    <!-- <el-checkbox class="opt-checkboc" name="type"></el-checkbox> -->
                    <span v-if="scope.row.best_price && scope.row.fastest && scope.row.highest_score" class="selected-product all-perfect">{{menu.integrated_optimal}}</span>
                    <span v-else-if="scope.row.best_price" class="selected-product single-perfect">{{menu.best_price}}</span>
                    <span v-else-if="scope.row.fastest" class="selected-product single-perfect">{{menu.Aging_fastest}}</span>
                    <span v-else-if="scope.row.highest_score" class="selected-product single-perfect">{{menu.Evaluation_highest}}</span>
                    <span v-else class="selected-product">{{menu.choose}}</span>
                </template>
            </el-table-column>
        </el-table>
      </el-dialog>
  </section>
</template>

<script>
import RangeSlider from '@/components/common/progressBar/thickBar'
export default {
  components: {
    RangeSlider
  },
  data() {
    return {
      centerDialogVisible: false,
      oldNum: 0,
      weightVal: 1,
      orginList: [],
      destinationList: [],
      destinationListKey: '',
      originKey: '',
      fromData: {
        // origin: '',
        destination: ''
      },
      // isDefault1: true,
      isDefault2: true,
      // oriSel: {},
      disSel: {},
      // oriTem: '',
      dstTem: '',
      productTable: [],
      loading: false
    }
  },
  mounted() {
    // this.getAddressInfo('default')
    this.getDestinationCoutry('default')
  },
  computed:{
    banner(){
      return this.$t('homeBanner')
     },
    menu(){
      return this.$t('menu')
    }
  },
  methods: {
  	getDestinationCoutry(arg) {
	    this.$http.get('/home/last-mile/country').then(res => {
            if (res.status === 200) {
                this.destinationList = res.data
			    if (arg === 'default' && this.isDefault2){
				    this.fromData.destination = Object.values(res.data)[0].name
				    this.dstTem = res.data[0].country_code
				    this.disSel = res.data[0]
                }
            }
        })
    },
    // getAddressInfo(arg) {
    //   this.$http.get('/home/support-country').then(res => {
    //     if(res.status === 200){
    //       this.orginList = res.data.origin
    //       this.destinationList = res.data.destination
    //       if(arg === 'default' && this.isDefault1){
    //           this.fromData.origin = Object.values(res.data.origin)[0]
    //           this.fromData.destination = Object.values(res.data.destination)[0]
    //           this.oriSel[Object.keys(res.data.origin)[0]] = Object.values(res.data.origin)[0]
    //           this.disSel[Object.keys(res.data.destination)[0]] = Object.values(res.data.destination)[0]
    //           this.oriTem = Object.keys(res.data.origin)[0]
    //           this.dstTem = Object.keys(res.data.destination)[0]
    //       }
    //     }
    //   })
    // },

    // destinationCountryDirectory(arg) {
    //   let value = this.fromData.origin
    //   this.$http.get('/home/support-dstctry?ori=' + value).then(res => {
    //     this.isDefault = false
    //     // console.log(res.data, '目的国')
    //       this.destinationList = res.data
    //       if (arg === 'default' && this.isDefault2) {
    //         this.fromData.destination = res.data[Object.keys(res.data)[0]]
    //         this.disSel[Object.keys(res.data)[0]] = Object.values(res.data)[0]
    //         this.dstTem = Object.keys(res.data)[0]
    //       }
    //   })
    // },
    // originSelected(val,key) {
    //   this.isDefault1 = false
    //   this.oriSel = {}
    //   this.oriSel[key] = val
    //   this.oriTem = key
    //   console.log(this.oriSel, '1111')
    // },
    destinationListSelected(val,key) {
  		// console.log(val,'value的值')
      this.isDefault2 = false
      this.disSel = {}
      this.disSel = val
      this.dstTem = val.country_code
    },


    sendData() {
      let dataObj = {
        // originInit: this.oriSel,
        destinationInit: this.disSel,
        weightInit: this.weightVal
      }
      // console.log(dataObj, '传递数据')

      this.$router.push({
          path: 'menu/logisticsService',
          name: 'logisticsService',
          params: {
              dataObj: dataObj
          }
      })
    },
    EstimateTemplate() {
      let dataA = {
        // ori: this.oriTem,
        country: this.dstTem,
        weight: this.weightVal
      }
      this.loading = true
      this.$http.get('/home/last-mile/sample-product?' + this.$qs.stringify(dataA)).then(res => {
          console.table(res.data)
          if(res.status === 200){
                this.loading = false
                this.productTable = res.data
            }else{
                this.productTable = []
                this.$message({
                 message: '没有找到相关的信息！',
                 type: 'success',
                 duration:1000
               })
            }
      })
    }
  }
}

</script>

<style scoped>

    .banner{
        position: relative;
        padding-top: 96px;
        height: 650px;
    }
    .banner-bg{
      position: absolute;
      width:100%;
      height: 100%;
      top: 0;
      left: 0;
      z-index: -1;
      object-fit: cover;
    }

    .weight-input{
      position: relative;
    }

    input::-webkit-outer-spin-button,
    input::-webkit-inner-spin-button{
      -webkit-appearance: none !important;
      margin: 0;
    }

    .weight-input strong{
      position: absolute;
      top: 10px;
      right: 6px;
      font-size: 16px;
      font-weight: normal;
      color: #ffffff;
    }

    @media only screen and (min-width: 992px) {
      .container {
          margin-top: 68px;
      }
      .big-size-title{
        font-size:32px;
        font-weight:500;
        color:rgba(255,255,255,1);
      }
      .small-size-title{
        margin-top: 42px;
        font-size:20px;
        font-weight:500;
        line-height: 44px;
        color:rgba(255,255,255,1);
      }
      .calculate-fee{
        display: block;
        width: 300px;
        margin: 0 auto;
        text-align: center;
      }
      .calculate-fee select, .calculate-fee select > option, .calculate-fee input{
        display: block;
        width: 100%;
        border: none;
        border-bottom: 1px solid #41A4C9;
        outline: none;
        padding: 10px;
        background: none;
        background-color: transparent;
        color:rgba(119,204,234,1);
        font-size: 16px;
      }
      .calculate-fee input{
        padding: 10px 16px;
        color: #ffffff;
      }
      ::-webkit-input-placeholder {
        color:rgb(119,204,234);
      }
      :-moz-placeholder {
        color:rgb(119,204,234);
        opacity:  1;
      }
      ::-moz-placeholder {
        color:rgb(119,204,234);
        opacity:  1;
      }
      :-ms-input-placeholder {
        color:rgb(119,204,234);
      }
      .calculate-boutton button{
        display: inline;
        width:100%;
        height:56px;
        margin-top: 30px;
        font-size:20px;
        font-weight:500;
        color:rgba(47,154,192,1);
        background:rgba(255,255,255,1);
        border-radius:30px;
        border: none;
        outline: none;
      }
    }

    @media (max-width: 991px) {
      .container {
          margin-top: 68px;
      }
      .big-size-title{
        font-size:40px;
        font-weight:500;
        color:rgba(255,255,255,1);
      }
      .small-size-title{
        margin-top: 42px;
        font-size:20px;
        font-weight:500;
        line-height: 44px;
        color:rgba(255,255,255,1);
      }
      .calculate-fee{
        display: block;
        width: 90%;
        padding: 5%;
        margin: 50px auto 0;
        text-align: center;
        background-color: #41A4C9;
        border-radius: 5%;
      }
      .calculate-fee select, .calculate-fee input{
        display: block;
        width: 100%;
        border: none;
        border-bottom: 1px solid #41A4C9;
        outline: none;
        padding: 10px;
        margin-bottom: 15px;
        background: none;
        background-color: transparent;
        color:rgba(255,255,255,1);
        font-size: 18px;
      }
      .calculate-fee input{
        padding: 10px 16px;
      }
      ::-webkit-input-placeholder { /* WebKit browsers */
        color:rgb(119,204,234);
      }
      :-moz-placeholder { /* Mozilla Firefox 4 to 18 */
        color:rgb(119,204,234);
        opacity:  1;
      }
      ::-moz-placeholder { /* Mozilla Firefox 19+ */
        color:rgb(119,204,234);
        opacity:  1;
      }
      :-ms-input-placeholder { /* Internet Explorer 10+ */
        color:rgb(119,204,234);
      }
      .calculate-boutton button{
        display: inline;
        width:100%;
        height:46px;
        margin-top: 30px;
        font-size:20px;
        font-weight:500;
        color:rgba(47,154,192,1);
        background:rgba(255,255,255,1);
        border-radius:30px;
        border: none;
        outline: none;
      }
    }
     .bigshow{
       display: block;
     }
     .bigshow1{
       display: none;
     }
     @media screen and (max-width: 768px) {
       .big-size-title{
         font-size:.4rem;
         text-align: center;
       }
       .small-size-title{
         margin-top:.4rem;
         font-size:.24rem;
         line-height: 24px;
         text-align: center;
         padding:0 10%;
         color:white;
       }
       .container {
          margin-top: 40px;
       }
       .bigshow{
       display: none;
       }
       .bigshow1{
         display: block;
       }
       .banner{
         min-height: 6rem;
         height: 6.8rem;
         padding-top: 1.2rem;
       }
       .calculate-boutton button{
         width:2.4rem;
         height:.7rem;
         font-size:.28rem;
         font-weight:600;
         margin-top:20px;
       }
       .calculate-boutton{
         display: flex;
         justify-content: center;
       }
       .banner-bg{
         height:6.6rem;
       }

     }
     .calcualte-items{
       display: flex;
       padding: 3px 0;
     }
     .calcualte-items > label{
       width: 200px;
       line-height: 40px;
       text-align: right;
       padding:0 10px;
       font-size: 16px;;
       color: #86D7F4;
       font-weight: normal;
     }


     .estimated-sample{
       padding: 5px 0;
       line-height: 50px;
       font-size: 16px;
       color: #ffffff;
       cursor: pointer;
     }
    .blue-topBorder{
      border-top: none !important;
    }
    .chart-container{
      -webkit-box-shadow: none;
      box-shadow: none;
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
