<template>
  <div>
    <div class="rows flexs j-between">
      <h1 class="box-title">{{menu.parcel_information}}</h1>
      <div class="chart-container">
          <el-form ref="form" @submit.native.prevent="searchProductsData()">
            <el-row class="from-row">
                <el-col :span="3" class="label-title">
                    <label class="Mandatory">{{menu.goods_to}}</label>
                </el-col>
                <el-col :span="4">
                    <el-form-item>
                    <el-select
                        v-model="selectedCountry"
                        filterable
                        class="custom-made"
                        style="width:113px;">
                        <el-option v-for="(item,index) in countryList" :label="item.name" :value="item.code" :key="index"></el-option>
                    </el-select>
                    </el-form-item>
                </el-col>
                <el-col :span="4">
                    <el-form-item>
                    <el-select
                        v-model="selectedProvince"
                        filterable
                        class="custom-made"
                        style="width:113px;">
                        <el-option v-for="(item,index) in provinceList" :label="item.name" :value="item.code" :key="index"></el-option>
                    </el-select>
                    </el-form-item>
                </el-col>
                <el-col :span="3" :offset="2" class="label-title">
                    <label  class="Mandatory">{{menu.parcel_weighs}}</label>
                </el-col>
                <el-col :span="8">
                    <el-form-item>
                        <div class="custom-made">
                            <el-input type="text" required="required" pattern="(?!(0[0-9]{0,}$))[0-9]{1,}[.]{0,}[0-9]{0,3}" title="最多3位小数点" v-model="form.weight" :placeholder="menu.Please_weight"></el-input>
                            <i class="units">kg</i>
                        </div>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row class="from-row">
                <el-col :span="3" class="label-title">
                    <label>{{menu.Package_size}}</label>
                </el-col>
                <el-col :span="11">
                    <el-form-item>
                        <div class="custom-made" style="width:100%;">
                            <el-input type="number" min="1" v-if="form.width" required :placeholder="menu.length" v-model="form.length" class="weight-input"></el-input>
                            <el-input type="number" min="1" v-else-if="form.height" required :placeholder="menu.length" v-model="form.length" class="weight-input"></el-input>
                            <el-input type="number" min="1" v-else  :placeholder="menu.length" v-model="form.length" class="weight-input"></el-input>×

                            <el-input min="1" v-if="form.length" type="number" required :placeholder="menu.width" v-model="form.width" class="weight-input"></el-input>
                            <el-input min="1" v-else-if="form.height" type="number" required :placeholder="menu.width" v-model="form.width" class="weight-input"></el-input>
                            <el-input min="1" v-else type="number"  :placeholder="menu.width" v-model="form.width" class="weight-input"></el-input>×

                            <el-input min="1" type="number" v-if="form.length" required :placeholder="menu.highly" v-model="form.height" class="weight-input"></el-input>
                            <el-input min="1" type="number" v-else-if="form.width" :placeholder="menu.highly" required v-model="form.height" class="weight-input"></el-input>
                            <el-input min="1" type="number" v-else :placeholder="menu.highly" v-model="form.height" class="weight-input"></el-input>
                            <i class="units">cm</i>
                        </div>
                    </el-form-item>
                </el-col>
            </el-row>
            <div :span="24" style="text-align:center;">
                <button type="submit" class="next-step">{{menu.next_step}}</button>
            </div>
        </el-form>
      </div>
    </div>

    <div class="rows flexs j-between blue-topBorder" v-if="productTable.length>0">
      <div class="chart-container table-container">
        <el-table
        :data="productTable"
        style="width: 100%">
            <el-table-column
                prop="name"
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
                prop="name"
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
                prop="date"
                :label="menu.Delivery_time"
                align="center"
                width="180">
                <template slot-scope="scope">
                    <!-- <range-slider style="width: 63%;" :min="scope.row.claimed_min_lead_time" :max="scope.row.claimed_max_lead_time"/> -->
                    <p class="date-text">{{scope.row.claimed_min_lead_time}}~{{scope.row.claimed_max_lead_time}}{{menu.day}}</p>
                </template>
            </el-table-column>
            <el-table-column
                prop="name"
                align="center"
                :label="menu.Estimated_freight">
                <template slot-scope="scope">
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
                    <!-- <span v-if="scope.row.best_price && scope.row.fastest && scope.row.highest_score" class="selected-product all-perfect" @click="selectProduct">{{menu.integrated_optimal}}</span>
                    <span v-else-if="scope.row.best_price" class="selected-product single-perfect" @click="selectProduct">{{menu.best_price}}</span>
                    <span v-else-if="scope.row.fastest" class="selected-product single-perfect" @click="selectProduct">{{menu.Aging_fastest}}</span>
                    <span v-else-if="scope.row.highest_score" class="selected-product single-perfect" @click="selectProduct">{{menu.Evaluation_highest}}</span>
                    <span v-else class="selected-product" @click="selectProduct">{{menu.choose}}</span> -->
                    <span v-if="scope.row.best_price && scope.row.fastest && scope.row.highest_score" class="selected-product all-perfect">{{menu.integrated_optimal}}</span>
                    <span v-else-if="scope.row.best_price" class="selected-product single-perfect">{{menu.best_price}}</span>
                    <span v-else-if="scope.row.fastest" class="selected-product single-perfect">{{menu.Aging_fastest}}</span>
                    <span v-else-if="scope.row.highest_score" class="selected-product single-perfect">{{menu.Evaluation_highest}}</span>
                    <!-- <span v-else class="selected-product">{{menu.choose}}</span> -->
                </template>
            </el-table-column>
        </el-table>
      </div>
    </div>
  </div>
</template>

<script>
import RangeSlider from '@/components/common/progressBar/thickBar'
export default {
    components: {
       RangeSlider
    },
    data() {
        return {
            selectedCountry: null,
            selectedProvince: null,
            countryList: [],
            provinceList: [],
            form: {
              weight: null,
              length: null,
              width: null,
              height: null,
            },
            productTable: [],
            isEmpty: false,
            loading: true,
            acceptDefaults: {},
            responseData: null
        }
    },

    computed: {
        menu(){
            return this.$t('menu')
        }
    },
    mounted() {
        this.getDistrictData('default');
        this.acceptDefaults = this.$route.params.dataObj
        console.log(this.acceptDefaults, '收到的参数')
    },
	watch: {
		selectedCountry: function () {
			this.updateCity()
		}
	},

    methods: {
        getDistrictData(arg) {
            this.$http.get('/spider-product/on-search-products').then(res => {
                console.log(res.data, '111222333')
                this.responseData = res.data
	            this.countryList = res.data
	            if(arg === 'default') {
                    if(this.$route.params.dataObj){
                    	console.log(this.acceptDefaults,'穿件来的参数')
                        for (let key in res.data) {
	                        let result = res.data[key]
                            console.log(result,'生成的变量')
                            console.log(this.acceptDefaults.destinationInit.code,'错误的原因')
                            if(this.acceptDefaults.destinationInit.code === result.code){
	                            this.selectedCountry = result.code
                                console.log(this.selectedCountry,'结果1')
	                            this.selectedProvince =result.province[0].code;
	                            console.log(this.selectedProvince,'结果2')
                                break;
                            }
                        }
	                    this.form.weight = this.acceptDefaults.weightInit
                    }
		            this.updateCity()
                }
	            if(this.$route.params.dataObj){
		            this.searchProductsData()
	            }
            })
        },
        updateCity() {
            for(let i in this.responseData){
                let obj = this.responseData[i]
                if(obj.code === this.selectedCountry){
                    this.provinceList = obj.province
	                this.selectedProvince = this.provinceList[0].code;
                    break;
                }
            }
	        // this.selectedProvince = this.provinceList[0].code;
        },
        searchProductsData() {
            let _this=this;
            const data = {
                country: this.selectedCountry,
                weight: this.form.weight,
                province: this.selectedProvince
            }
            if(_this.form.length&&_this.form.width&&_this.form.height){
               data.dim=`${_this.form.length},${_this.form.width},${_this.form.height}`;
            }
            this.$http.get('/spider-product/products?' + this.$qs.stringify(data)).then(res => {
                console.log(res.data, '产品数据')
                this.isEmpty = true
                if(res.status === 200 && res.data.length > 0){
                    this.productTable = res.data
                }else{
                    this.productTable = []
                    this.$message({
                     message: '没有找到相关的信息！',
                     type: 'success',
                     duration:1000
                   })
                }
                this.loading = false
            })
        },
        selectProduct() {

            this.$router.push('/menu/orderCreate')
            let data={
                dst: this.selectedCountry,
                city: this.selectedProvince
            }
            sessionStorage.setItem('params',JSON.stringify(data)  )
        }
    }
}

</script>

<style scoped>
    .box-title{
        font-size: 18px;
        font-weight: bold;
        color: #999999;
        line-height: 25px;
        margin-bottom: 35px;
        margin-top: 36px;
    }
    .chart-container{
        width: 100%;
        /*height:470px;*/
        margin-bottom: 50px;
        padding: 56px 90px;
        background:rgba(255,255,255,1);
        box-shadow:0px 6px 16px 0px rgba(225,225,225,0.5);
        border-radius:7px;
    }

    .blue-topBorder{
        border-top: 5px solid #2F9AC0;
    }

    .table-container{
        padding: 20px;
        height: auto;
    }

    .label-title{
        line-height: 40px;
        text-align: center;
    }

    .from-row{
        margin-bottom: 15px;
    }

    .custom-made{
        position: relative;
        width: 240px;
    }
    .units{
        position: absolute;
        top: 0;
        right: 8px;
        color: #333333;
        font-weight: bold;
    }
    .weight-input{
        width: 28%;
    }
    .Mandatory::before{
        content:'*';
        color:red;
        margin-right:5px;
    }
    .next-step{
        display: inline-block;
        outline: none;
        border: 0;
        width:260px;
        height:50px;
        line-height: 50px;
        background:rgba(47,154,192,1) linear-gradient(138deg,rgba(47,183,192,1) 0%,rgba(47,154,192,1) 100%);
        border-radius:30px;
        font-size:20px;
        font-weight:500;
        color:rgba(255,255,255,1);
        cursor: pointer;
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
