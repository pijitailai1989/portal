<template>
  <div>
    <div style="margin:20px 0 40px;">
             <el-row class="from-row">
                    <el-col :span="3" class="label-title">
                        <label>推荐物流 :</label> 
                    </el-col>
                    <el-col :span="5">
                        <el-select
                            v-model="defaultLogistics"
                            filterable
                            class="custom-made"
                            >
                            <el-option v-for="(item,index) in selectLogs" :label="item" :value="index" :key="index"></el-option>
                        </el-select>
                    </el-col>
                    <el-col :span="16">
                        <div class="flexs j-end a-end" style="cursor: pointer;height:40px;">
                           <el-pagination
                             :page-size="6"
                             @current-change="currentChange"
                             layout="prev, pager, next"
                             :total="tableContent.length">
                           </el-pagination>
                         </div>
                    </el-col>
             </el-row>
    </div>
    <div class="shadow-box">
         <div class="serviceTitle flexs">
             <p>包裹详情</p>
             <p>敏感类型</p>
             <p>推荐物流</p>
         </div>
         <div class="flexs">
             <div class="info">
                <ul class="infoType flexs" v-for="(item,index) in logisticsTable" :key="index">
                   <li>
                       <Information :post-item="item"/>
                   </li>
                   <li>
                       <SensitiveType @posttoparent="posttoType" :post-item="item" :post-code="item.sensitive_code" :post-index="index"/>    
                   </li>
                </ul>
             </div>
             <div class="info1 scrollbar" ref="scrollCont">
                <ul class="serviceInfo flexs" v-for="(item,index) in logisticsTable" :key="index">
                    <li v-for="(todo,i) in item.products" :key="i">
                       <LogisticsServices @posttoparent="posttoLog" :post-todo="todo"  :post-i="i" :post-index="index"/>
                    </li>
                </ul>
                
             </div>
         </div>
         
    </div>
    <ul class="expectPrice flexs columns">
        <li class="flexs j-end a-center">
            <p>预计运费 ：</p>
            <span>{{totalCost.cost}} {{totalCost.currency}}</span>
        </li>
        <li class="flexs j-end a-center">
            <p>预计关税 ：</p>
            <span>{{totalCost.package_tax}} {{totalCost.currency}}</span>
        </li>
        <li class="flexs j-end a-center">
            <p></p>
        </li>
        <li class="flexs j-end a-center">
            <p>预计总费用 ：</p>
            <span style="font-size:18px;color:#2F9AC0">{{totalCost.total_cost}} {{totalCost.currency}}</span>
        </li>
        <li class="flexs j-end a-center">
            <p>实际运输费用会基于分拣仓扫描出的实际重量计算</p>
        </li>
    </ul>
    <div style="width:100%;padding:40px 0 20px;">
         <ul class="address" v-if="GetRess.length>0">
              <li  @mouseover="btnOver(index)" @mouseout="btnOut(index)" class="flexs a-center" @click="deliveryClick(item,index)" v-for="(item,index) in GetRess" :key="index" :class="[item.btnClick?'active':'']" >
                  <i v-if="item.btnClick" class="iconfont icon-dingweiweizhi" style="color: #2F9AC0;font-size: 18px"/>
                  <a v-if="item.btnClick" style="color: #2F9AC0;font-size: 14px;width:60px;">发货地址</a>
                  <a v-else style="color: #2F9AC0;font-size: 14px;width:60px;"></a>
                  <i class="iconfont " :class="[item.btnClick?'icon-quan1':'icon-wo']" :style="{color: item.btnClick?'#2F9AC0':'#aaa',fontSize:item.btnClick?'15px':'18px'}"/>
                  <p class="hiddenT" :style="{color:item.btnClick?'':'#aaa'}" @mouseover="btnOver(index)">{{item.country}}{{item.city}}{{item.address}} ( {{item.name}} ) {{item.phone}}</p>

                  <span class="flexs rows j-end">
                       <a v-show="item.is_default=='1'" style="color:#ccc;">默认地址</a>
                       <a v-if="item.btn" v-show="item.is_default=='0'" @click.stop="setDefault(item,'default')">{{menu.default_address}}</a>
                       <a v-show="item.btnClick" @click.stop="setDefault(item,'updata')">{{menu.Modify}}</a>
                  </span>
              </li>
         </ul>
         <div @click="addRessFn" class="flexs j-center a-center" style="cursor: pointer;height:40px;">
              <i class="iconfont icon-jiajianzujianjiahao" style="color: #F4B33D;font-size: 16px"/>
              <span style="color:#F4B33D;font-size:16px;margin-left:10px;">{{menu.Add_address}}</span>
         </div>
    </div>
    <div class="upload-btn" style="margin-top:100px;">
            <i class="goBack">返回</i>
            <el-button type="primary" @click.prevent="SubmitOrders">提交订单</el-button>
            <span class="saveRecord">保存订单</span>
    </div>
    <MessageBox v-show="messageB" @posttoparent="getfromchild">
        <span v-if="updataRess" slot="header">{{menu.Add_address}}</span>
        <span v-else slot="header">{{menu.Revise_address}}</span>
        <div  v-if="updataRess" class="chart-container1">
          <el-form ref="shipper"  @submit.native.prevent="postAddress()">
             <el-row class="from-row">
                <el-col :span="3" class="label-title">
                    <label class="Mandatory">{{menu.contact}}</label>
                </el-col>
                <el-col :span="8">
                    <el-form-item>
                        <div class="custom-made">
                            <el-input type="text" :maxlength="50" required :placeholder="menu.Please_person" v-model="shipper.name"></el-input>
                        </div>
                    </el-form-item>
                </el-col>
                <el-col :span="3" :offset="1" class="label-title">
                    <label class="Mandatory">{{menu.Contact_phone}}</label>
                </el-col>
                <el-col :span="8">
                    <el-form-item>
                        <div class="custom-made">
                            <i class="units1">+</i>
                            <el-input type="number" :maxlength="5" style="width:65px;" :placeholder="menu.area_code" v-model="shipper.phone_district" required class="weight-input"></el-input>
                            <el-input  type="tel" :maxlength="25" style="width:140px;margin-left:10px;"
                             required :placeholder="menu.Please_contact" v-model="shipper.phone"></el-input>
                        </div>
                    </el-form-item>
                </el-col>
            </el-row> 
            <el-row class="from-row">
                <el-col :span="3" class="label-title">
                    <label>{{menu.zip_code}}</label>
                </el-col>
                <el-col :span="8">
                    <el-form-item>
                        <div class="custom-made">
                            <el-input type="number" :maxlength="30" :placeholder="menu.Please_zipcode" v-model="shipper.postcode"></el-input>
                        </div>
                    </el-form-item>
                </el-col>
                <el-col :span="3" :offset="1" class="label-title">
                    <label>{{menu.Email}}</label>
                </el-col>
                <el-col :span="8">
                    <el-form-item>
                        <div class="custom-made">
                            <el-input type="email" :maxlength="100" :placeholder="menu.Please_email" v-model="shipper.email"></el-input>
                        </div>
                    </el-form-item>
                </el-col>
            </el-row> 
            <el-row class="from-row">
                <el-col :span="3" class="label-title">
                    <label class="Mandatory">{{menu.Point_origin}}</label>
                </el-col>
                <el-col :span="8">
                    <el-form-item>
                        
                        <el-select
                            v-model="shipper.country"
                            filterable
                            class="custom-made"
                            @change="clearableFn('shipper');cityData(shipper.country,'shipper');"
                            >
                            <el-option v-for="(item,index) in GetAddress" :label="item" :value="index" :key="index"></el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
                <el-col :span="3" :offset="1" class="label-title">
                    <label class="Mandatory">{{menu.city}}</label>
                </el-col>
                <el-col :span="8">
                    <el-form-item>
                        <el-select
                            v-model="shipper.city"
                            filterable
                            class="custom-made">
                            <el-option v-for="(item,index) in GetCity" :label="item" :value="item" :key="index"></el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
            </el-row> 
            <el-row class="from-row">
                <el-col :span="3" class="label-title">
                    <label class="Mandatory">{{menu.Detailed_address}}</label>
                </el-col>
                <el-col :span="21">
                    <el-form-item>
                        <div class="custom-made" style="width:100%;">
                            <el-input type="text" pattern="[\u4e00-\u9fffa-zA-Z0-9]{1,255}" title="不能超过255" :maxlength="255" required :placeholder="menu.Please_address" v-model="shipper.address" class="weight-input1"></el-input>
                        </div>
                    </el-form-item>
                </el-col>
            </el-row>
        
            <div :span="24" style="text-align:center;margin-top:40px;">
                <button type="submit" class="next-step">{{menu.save}}</button>
            </div>       
         </el-form>
        </div>
        <div class="chart-container1" v-else>
          <el-form ref="shipper" @submit.native.prevent="ajaxUpdate(shipper.id,'updata')">
             <el-row class="from-row">
                <el-col :span="3" class="label-title">
                    <label class="Mandatory">{{menu.contact}}</label>
                </el-col>
                <el-col :span="8">
                    <el-form-item>
                        <div class="custom-made">
                            <el-input type="text" :maxlength="50" required :placeholder="menu.Please_person" v-model="shipper.name"></el-input>
                        </div>
                    </el-form-item>
                </el-col>
                <el-col :span="3" :offset="1" class="label-title">
                    <label class="Mandatory">{{menu.Contact_phone}}</label>
                </el-col>
                <el-col :span="8">
                    <el-form-item>
                        <div class="custom-made">
                            <i class="units1">+</i>
                            <el-input type="number" :maxlength="5" style="width:65px;" :placeholder="menu.area_code" v-model="shipper.phone_district" required class="weight-input"></el-input>
                            <el-input  type="tel" :maxlength="25" style="width:140px;margin-left:10px;"
                             required :placeholder="menu.Please_contact" v-model="shipper.phone"></el-input>
                        </div>
                    </el-form-item>
                </el-col>
            </el-row> 
            <el-row class="from-row">
                <el-col :span="3" class="label-title">
                    <label>{{menu.zip_code}}</label>
                </el-col>
                <el-col :span="8">
                    <el-form-item>
                        <div class="custom-made">
                            <el-input type="number" :maxlength="30" :placeholder="menu.Please_zipcode" v-model="shipper.postcode"></el-input>
                        </div>
                    </el-form-item>
                </el-col>
                <el-col :span="3" :offset="1" class="label-title">
                    <label>{{menu.Email}}</label>
                </el-col>
                <el-col :span="8">
                    <el-form-item>
                        <div class="custom-made">
                            <el-input type="email" :maxlength="100" :placeholder="menu.Please_email" v-model="shipper.email"></el-input>
                        </div>
                    </el-form-item>
                </el-col>
            </el-row> 
            <el-row class="from-row">
                <el-col :span="3" class="label-title">
                    <label class="Mandatory">{{menu.Point_origin}}</label>
                </el-col>
                <el-col :span="8">
                    <el-form-item>
                        <el-select
                            v-model="shipper.country"
                            filterable
                            class="custom-made"
                            @change="clearableFn('shipper');cityData(shipper.country,'shipper');"
                            >
                            <el-option v-for="(item,index) in GetAddress" :label="item" :value="index" :key="index"></el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
                <el-col :span="3" :offset="1" class="label-title">
                    <label class="Mandatory">{{menu.city}}</label>
                </el-col>
                <el-col :span="8">
                    <el-form-item>
                        <el-select
                            v-model="shipper.city"
                            filterable
                            class="custom-made">
                            <el-option v-for="(item,index) in GetCity" :label="item" :value="item" :key="index"></el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
            </el-row> 
            <el-row class="from-row">
                <el-col :span="3" class="label-title">
                    <label class="Mandatory">{{menu.Detailed_address}}</label>
                </el-col>
                <el-col :span="21">
                    <el-form-item>
                        <div class="custom-made" style="width:100%;">
                            <el-input type="text" pattern="[\u4e00-\u9fffa-zA-Z0-9]{1,255}" title="不能超过255" required :maxlength="255" :placeholder="menu.Please_address" v-model="shipper.address" class="weight-input1"></el-input>
                        </div>
                    </el-form-item>
                </el-col>
            </el-row>
            <div :span="24" style="text-align:center;margin-top:40px;">
                <button type="submit" class="next-step">{{menu.save}}</button>
            </div>       
         </el-form>
        </div>
    </MessageBox>
    <div class="leftRight flexs rows j-between" v-show="showLr">
              <i @click="clickLeft" class="iconfont icon-xiangyou-copy-copy" style="color: #2F9AC0;font-size: 30px;margin-left:185px;"/>
              <i @click="clickRight" class="iconfont icon-xiangyou-copy" style="color: #2F9AC0;font-size: 30px;margin-right:-35px;"/>
    </div>
    <BackTop/>
    
  </div>
</template>

<script>
  import Information from './com/information'
  import SensitiveType from './com/sensitiveType'
  import LogisticsServices from './com/logisticsServices'
  import MessageBox from '@/components/common/messageBox'
  import BackTop from '@/components/common/BackTop'
  import {mapState,mapGetters,mapActions,mapMutations} from 'vuex'
  export default {
    name:'selectLog',
    props:[''],
    data () {
      return {
        shipper:{
          name:'',
	      phone:'',
	      postcode:'',
	      email:'',
	      country:'',
	      city:'',
          address:'',
          phone_district:''
        },
        shipper1:{
            'shipper_name' : "",
		    'shipper_phone' : "",
		    'shipper_country' :"",		
		    'shipper_city' :"",
		    'shipper_address' :"",
		    'shipper_postcode' :"",
		    'shipper_email':""
        },
        messageB:false,
        updataRess:true,
        defaultLogistics:'best_price_product',
        showLr:false,
        indexTable:0,
        table_content:[],
        logisticsTable:[],
        selectLogs:{
            highest_score_product:"最高评分",
            fastest_product:"最快速",
            best_price_product:"最便宜",
        },
        loading:false,
        belArr:[]
      };
    },

    components: {
       MessageBox,
       Information,
       SensitiveType,
       LogisticsServices,
       BackTop
    },

    computed: {
        ...mapState('menu',[
                        'GetRess',
                        'GetAddress',
                        'GetCity',
                        'result',
                        'products',
                        
                        ]),
        ...mapGetters('menu',[
                        'tableContent',
                        'tableHead',
                        'totalCost'
                        
        ]),
        menu(){
          return this.$t('menu')
          }
    },

    beforeMount() {},

    mounted() {
        
        this.ajaxGetress()
        this.ajaxGetAddress()
        this.ajaxGetProcess('test123')
        this.setTotalCost()
        const _this=this;

        window.addEventListener('scroll', this.handleScroll)
        if(this.tableContent.length>=1){
        this.table_content=this.sliceArray(this.tableContent,6)
        // console.log(this.table_content,'this.table_content')
        // console.log(this.tableContent)
        this.logisticsTable=this.table_content[this.indexTable]
        this.$nextTick(()=>{
        this.logisticsTable.forEach(el=>{
            if(!el.sore){
                   el.sore=1;
                   el.choose=el[this.defaultLogistics];
                   let pro = el.products
                   el.products.forEach( (item,index)=>{
                        
                        if(item[this.defaultLogistics]){
                            pro.unshift(item)
                            pro.splice(index+1,1)
                        }
                        
      
                   })
            }
            
           })
          
        })
        // this.selectLogs.forEach( (el,key)=>{
        //        this.logisticsTable.forEach(item=>{
        //        let pro = el.products
        //        el.products.forEach( (todo,index)=>{
        //             if(todo[key]){
        //                 console.log(key)
        //                 pro.unshift(todo)
        //                 pro.splice(index+1,1)
        //             }
   
        //        })
        //       })
        //   })
        }
        console.log(this.logisticsTable,'logisticsTable')
    },
    destroyed () {
     window.removeEventListener('scroll', this.handleScroll)
    },
    watch:{
        GetRess:{
          handler(newVal,oldVal){
              newVal.forEach(el=>{
                  if(el.btnClick){
                      this.shipper1={
                           'shipper_name' : el.name,
		                   'shipper_phone' : el.phone,
		                   'shipper_country' : el.country,		
		                   'shipper_city' : el.city,
		                   'shipper_address' : el.address,
		                   'shipper_postcode' : el.postcode,
		                   'shipper_email': el.email
                       }
                  }
              })
            //   console.log(this.shipper1,'this.shipper1')
          },
          deep:true
        },
        messageB(curVal,oldVal){
         if(curVal==false){
              this.shipper={
              name:'',
	          phone:'',
	          postcode:'',
	          email:'',
              address:'',
              phone_district:''
            }
         }else{
             
         }
         
       },
       logisticsTable:{
           handler(newVal,oldVal){
            //    console.log('watch检查数组')
                let head = this.tableHead

                let arr = newVal
          
                if(arr.length>=1){
          
                  arr.forEach(el=>{
                    
                    let pro = el.products
                    if(pro.length>=1){
                       
                      pro.forEach(item=>{
          
                        if(el.best_price_product==item.product_id){
                           this.$set(item,"best_price_product", 1)
                        }else{
                           this.$set(item,"best_price_product", 0)
                        }
          
                        if(el.fastest_product==item.product_id){
                           this.$set(item,"fastest_product", 1)
                        }else{
                           this.$set(item,"fastest_product", 0)
                        }
          
                        if(el.highest_score_product==item.product_id){
                           this.$set(item,"highest_score_product", 1)
                        }else{
                           this.$set(item,"highest_score_product", 0)
                        }
          
                        if(el.choose==item.product_id){
                          this.$set(item,"choose", 1)
                        }else{
                          this.$set(item,"choose", 0)
                        }
          
                        item.currency=el.currency;
                        item.amount
                        head.forEach(todo=>{
                         if(item.product_id==todo.product_id){
                           Object.assign(item, todo);
                         }
                        })
                        
                      })
                    }
                  })
                }
           },
           deep:true
       },
       indexTable(curVal,oldVal){
        //    console.log(this.logisticsTable,'logisticsTable1')
           this.logisticsTable=this.table_content[curVal]
           const _this=this
           this.$nextTick(()=>{
           this.logisticsTable.forEach(el=>{
            // console.log(this.logisticsTable,'logisticsTable2')
            if(!el.sore){
               el.choose=el[_this.defaultLogistics];
               el.sore=1
            }
            
            let pro = el.products
            el.products.forEach( (item,index)=>{
                 if(item[_this.defaultLogistics]){
                    //  console.log('index')
                     pro.unshift(item)
                     pro.splice(index+1,1)
                    //  console.log(this.logisticsTable,'logisticsTable4')
                 }
                 
            })
           })
          })
        // console.log(this.table_content,'this.table_content')
       },
       defaultLogistics(curVal,oldVal){
           this.logisticsTable.forEach(el=>{
            el.choose=el[curVal];
            let pro = el.products
            el.products.forEach( (item,index)=>{
                 
                 if(item[curVal]==1){
                    //  console.log('def')
                     pro.unshift(item)
                     pro.splice(index+1,1)
                 }
            })
           })
           console.log(curVal,'curval')
           
           if(curVal==='best_price_product'){
               let data={}
               data.type='price'
               this.setTotalCost(data)
           }else if(curVal==='fastest_product'){
               let data={}
               data.type='speed'
               this.setTotalCost(data)
           }else if(curVal==='highest_score_product'){
               let data={}
               data.type='score'
               this.setTotalCost(data)
           }
       }
    },
    methods: {
    ...mapMutations('menu',[
                            'getCity',
                            'btnOver',
                            'btnClick',
                            'btnOut',
                            'getRess',
                            'setTotalCost'
                            
                            ]),
    ...mapActions('menu', [
                           'ajaxUpdateAddress',
                           'ajaxGetress',
                           'ajaxGetAddress',
                           'ajaxGetCity',
                           'ajaxPostAddress',
                           'ajaxGetProcess',
                           'ajaxReselectProduct',
                           'ajaxPlaceOrder'
                           ]),
    
    //提交订单
    async SubmitOrders(){
        let arr = []
        const _this =this;
        let data={}
        data.shipper={
            'shipper_name' : this.shipper1.shipper_name,
		    'shipper_phone' : this.shipper1.shipper_phone,
		    'shipper_country' :this.shipper1.shipper_country,		
		    'shipper_city' :this.shipper1.shipper_city,
		    'shipper_address' :this.shipper1.shipper_address,
		    'shipper_postcode' :this.shipper1.shipper_postcode,
		    'shipper_email':this.shipper1.shipper_email
        }
        this.table_content.forEach(el=>{
                el.forEach(item=>{
                    arr.push(item)
                })
           
        })
        
        data.package_data=arr;
        
        let res = await this.ajaxPlaceOrder( JSON.stringify(data) )
        console.log(res,'res')
        if(res.status==200){
            document.documentElement.scrollTop=0
            document.body.scrollTop=0
            window.pageYOffset=0
             this.$emit('posttoparent',4)
        }
        return res
    },
    sliceArray(array, size) {
      var result = [];
      for (var x = 0; x < Math.ceil(array.length / size); x++) {
          var start = x * size;
          var end = start + size;
          result.push(array.slice(start, end));
      }
      return result;
    },
    //物流服务选择
    posttoLog(val){
        
        let arr = this.logisticsTable[val.index].products
        arr.forEach(el=>{
            el.choose=0
        })
        this.logisticsTable[val.index].choose=val.product_id;
        this.logisticsTable[val.index].package_tax=val.package_tax;
        this.logisticsTable[val.index].rate_id=val.rate_id;
        
        arr[val.i].choose=1;
        
        // this.logisticsTable=this.table_content[this.indexTable]
        
        let data={
            amount:val.amount,
            lastAmount:this.logisticsTable[val.index].amount,
            a:1

        }
        // console.log(data,'obj')
        this.setTotalCost(data)
        // console.log('val',this.logisticsTable[val.index].amount,1)
        this.logisticsTable[val.index].amount=val.amount;
        // console.log('val',this.logisticsTable,val)
    },
    //敏感类型选择
    async posttoType(val){
       const _this=this;
       let arr = this.logisticsTable[val.index].sensitive_code
       if(arr.length<=0){
           arr.push(val.type)
       }else{
           arr.forEach( (el,index) =>{
           if(val.type==el){
               arr.splice(index,1)
           }else if(val.type!=el&&index==arr.length-1){
               arr.push(val.type)
           }
           })
       }
       let data={
          ori:this.result.origin,
          dst:this.logisticsTable[val.index].consignee_country_key,
          city:this.logisticsTable[val.index].consignee_city,
          weight:this.logisticsTable[val.index].weight,
          sitem:this.logisticsTable[val.index].sensitive_code,
          parcel_value:this.logisticsTable[val.index].parcel_value,
          currency:this.logisticsTable[val.index].currency
        }
        let res = await this.ajaxReselectProduct( _this.$qs.stringify(data) )
        .then(s=>{
              let data1={}
              data1.a=1
              this.logisticsTable[val.index].products=this.products;
              data1.lastAmount=this.logisticsTable[val.index].amount
              if(this.products.length>=1){
                 this.logisticsTable[val.index].choose=this.products[0].product_id
                 console.log(this.logisticsTable[val.index].choose,'this.logisticsTable[val.index].choose')
                 this.logisticsTable.forEach(el=>{
                //    el.choose=el[_this.defaultLogistics]
                   let pro = el.products
                   el.products.forEach( (item,index)=>{
                        
                        if(item[_this.defaultLogistics]==1){
                           //  console.log('def')
                            el.amount=item.amount
                            pro.unshift(item)
                            pro.splice(index+1,1)
                        }
                   })
                  })
                  data1.amount= _this.logisticsTable[val.index].amount 
                  this.logisticsTable[val.index].amount=this.products[0].amount
                  this.logisticsTable[val.index].package_tax=this.products[0].package_tax
                  this.logisticsTable[val.index].rate_id=this.products[0].rate_id
              }else{
                  data1.amount=0
                  this.logisticsTable[val.index].amount=0
                  this.logisticsTable[val.index].choose=""
                  this.logisticsTable[val.index].package_tax=0
                  this.logisticsTable[val.index].rate_id=""
              }
              

              this.setTotalCost(data1)
            //   console.log('val',this.logisticsTable[val.index])
            //   console.log(data1,'data')
        })
        .catch(e=>{
            if(val.i==1){
               arr.forEach( (el,index)=>{
                if(el==val.type){
                  arr.splice(index,1)
                }
               })
            }else if(val.i==-1){
                arr.push(val.type)
            }
        })
       
        return res
    },
    currentChange(val){
        this.$nextTick(()=>{
        this.indexTable = val - 1 
        })
    },
    handleScroll(){
      let clientWidth=this.$refs.scrollCont.clientWidth
      let scrollWidth=this.$refs.scrollCont.scrollWidth
      let scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
      let clientHeight =  document.documentElement.clientHeight || document.body.clientHeight
      let scrollHeight =  document.documentElement.scrollHeight || document.body.scrollHeight
    //   console.log(scrollHeight-clientHeight-scrollTop)
      if(scrollHeight-clientHeight-scrollTop<=390){
          this.showLr=false
      }else if(scrollWidth<=clientWidth){
          this.showLr=false
      }else if(clientWidth==0){
          this.showLr=false
      }else{
          this.showLr=true
      }
    },
    
    clickLeft(){
        let scrollLeft=this.$refs.scrollCont.scrollLeft
        if(scrollLeft>0){
           this.$refs.scrollCont.scrollLeft-=80
        }
        // console.log(this.$refs.scrollCont.scrollLeft,'this.$refs.scrollCont.scrollLeft')
    },
    clickRight(){
        let clientWidth=this.$refs.scrollCont.clientWidth
        let scrollWidth=this.$refs.scrollCont.scrollWidth
        let scrollLeft=this.$refs.scrollCont.scrollLeft
        if(scrollWidth-clientWidth-scrollLeft>0){
          this.$refs.scrollCont.scrollLeft+=80
        }
        // console.log(this.$refs.scrollCont.scrollLeft,'this.$refs.scrollCont.scrollLeft')
        
        
    },
    
     getfromchild(val){
       this.messageB=val
    //    console.log(val)
     },
     async cityData(dst,type){
      let res=null
      if(type=='shipper'){
         let obj={}
         this.getCity(obj)
         res = await this.ajaxGetCity(dst)
        //  console.log(1111111111111111111111111111111111111)
        //  this.shipper.city=''
         
      }else{
          let obj={}
          this.getDstCity(obj)
          res = await this.ajaxGetCity1(dst)
        //   this.form.city=''
         
      }
      return res
    },
     addRessFn(){
        this.messageB=true
        this.updataRess=true;
     },
     deliveryClick(data,index){
        this.btnClick(index);
        this.shipper1={
            'shipper_name' : data.name,
		    'shipper_phone' : data.phone,
		    'shipper_country' : data.country,		
		    'shipper_city' : data.city,
		    'shipper_address' : data.address,
		    'shipper_postcode' : data.postcode,
		    'shipper_email': data.email
        }
        // console.log(data,'data')
     },
     clearableFn(type){
       if(type==='shipper'){
           this.$set(this.shipper,'city','')
       }else if(type==='from'){
           this.$set(this.form,'city','')
       }
    },
     async setDefault(item,type){
        const _this=this;
        let data={}
        
        if(type==='updata'){
           _this.updataRess=false;  
           _this.messageB=true;
           _this.shipper=item

        
        }else if(type==='default'){
           data={
            type:'shipper',
            name:item.name,
            phone:item.phone,
            postcode:item.postcode,
            email:item.email,
            country:item.country,
            city:item.city,
            address:item.address,
            phone_district:item.phone_district,
            is_default:'1',
            id:item.id
           }
           _this.ajaxUpdate(data,type)
        }
        
        
       },
       async ajaxUpdate(data,type){
        const _this=this;
        let res=null
        if(type==='default'){
            res = await this.ajaxUpdateAddress( _this.$qs.stringify(data) )
        }else if(type==='updata'){
            let date={
                    name:_this.shipper.name,
                    phone:_this.shipper.phone,
                    postcode:_this.shipper.postcode,
                    email:_this.shipper.email,
                    country:_this.shipper.country,
                    city:_this.shipper.city,
                    address:_this.shipper.address,
                    phone_district:_this.shipper.phone_district,
                    is_default:_this.shipper.is_default,
                    id:data,
                    type: 'shipper'
                     }
            res = await this.ajaxUpdateAddress( _this.$qs.stringify(date) )
        }
       
        if(res.status===200){
            this.ajaxGetress()
            
            this.messageB=false;
        }
        return res
      },
      async postAddress(){
        const _this=this;
        if(!_this.shipper.country){
            this.$message({
                       showClose: true,
                       message: '请选择发货地',
                       type: 'warning'
            });
            return
        }
        if(!_this.shipper.city){
            this.$message({
                       showClose: true,
                       message: '请选择城市',
                       type: 'warning'
            });
            return
        }

        let data={
            name:_this.shipper.name,
            phone:_this.shipper.phone,
            postcode:_this.shipper.postcode,
            email:_this.shipper.email,
            country:_this.shipper.country,
            city:_this.shipper.city,
            address:_this.shipper.address,
            phone_district:_this.shipper.phone_district,
            is_default:'0'
           
        }

        let res = await this.ajaxPostAddress( _this.$qs.stringify(data) )
        if(res.status===200){
            
               this.messageB=false;
               this.ajaxGetress()
            
        }

        return res
    },
    },

  }

</script>
<style lang='' scoped>
    .mainContent{
        font-size:20px;
        font-weight:600;
        text-align: center;
        color:rgba(51,51,51,1);
        line-height:42px;
    }
    .confrimDialog{
        width:200px;
        height:50px;
        border: none;
        outline: none;
        color: #ffffff;
        font-size: 16px;
        background:rgba(47,154,192,1) linear-gradient(138deg,rgba(47,183,192,1) 0%,rgba(47,154,192,1) 100%);
        border-radius:30px;
    }
    .goBack{
         margin-right: 40px;
         font-size: 20px;
         color: #F4B33D;
     }
     .saveRecord{
         margin-left: 40px;
         color: #2F9AC0;
         font-size: 18px;
         cursor: pointer;
     }
     .upload-btn{
        margin-top: 60px;
        text-align: center;
    }
    .upload-btn>button{
        display: inline-block;
        width:300px;
        height:50px;
        background:rgba(47,154,192,1) linear-gradient(138deg,rgba(47,183,192,1) 0%,rgba(47,154,192,1) 100%);
        border-radius:30px;
        color: #ffffff;
        font-size: 20px;
        border: none;
        outline: none;
    }
    .serviceTitle{
        padding:30px 20px 0;
    }
    .serviceTitle>p:nth-child(1){
        width:225px;
    }
    .serviceTitle>p:nth-child(2){
        width:115px;
    }
    .serviceTitle>p:nth-child(3){
        flex:1
    }
    .infoType{
        height:181px;
        padding:20px 0 20px;
        border-bottom:1px dashed #E9E9E9;
    }
    .infoType>li:nth-child(1){
        width:225px;
        height:130px;
    }
    .infoType>li:nth-child(2){
        width:115px;
        height:130px;
    }
    .serviceInfo{
        height:181px;
    }
    .serviceInfo>li{
        width:160px;
        padding:20px 0;
        height:181px;
        border-bottom:1px dashed #E9E9E9;
    }
    .info>ul:last-child{
        border-bottom:none;
    }
    .info1{
       max-width: 640px;
       overflow-x:auto;
    }
    .info1>ul:last-child>li{
        border-bottom:none;
    }
    .shadow-box{
        width: 980px;
        background: rgba(255,255,255,1);
        -webkit-box-shadow: 0px 2px 12px 0px rgba(230,230,230,0.5);
        box-shadow: 0px 2px 12px 0px rgba(230,230,230,0.5);
        border-radius: 10px;
        margin-bottom:30px;
        z-index:2;
        position: relative;
    }
   .expectPrice>li{
       
       padding-bottom:15px;
   }
   .expectPrice>li:nth-child(3)>p{
       width:200px;
       height:1px;
       background: #ECECEC;
   }
   .expectPrice>li>p{
       color:#999;
       font-size:14px;
   }
   .expectPrice>li>span{
       color:#333;
       font-weight:600;
       font-size:14px;
   }
   .address{
        width:100%;
        
    }
    .address>li{
        margin-bottom:10px;
        height:40px;
        padding:0 10px 0 45px;
        cursor:pointer;
    }
    .address>li.active{
        padding:0 10px;
        height:54px;
        background:rgba(246,250,251,1);
        border-radius:27px;
        border:1px solid #2F9AC0;
    }
    .address>li>i{
        padding:0 8px;
    }
    .address>li>p,.address>li>span{
        font-size: 16px;
    }
    .address>li>span{
        width:180px;
        color:#2F9AC0;
    }
    .address>li>p{
        width:700px;
        color:#333;
        height: 54px;
        line-height: 54px;

    }
    .address>li>span>a{
        margin-right:10px;
        font-size: 16px;
        color:#2F9AC0;
        cursor:pointer;
    }
    .Mandatory::before{
        content:'*';
        color:red;
        margin-right:5px;
    }
    .box-title{
        font-size:18px;
        font-weight:600;
        color:#999;
        line-height:25px;
        margin-bottom: 30px;
    }
    .chart-container{
        width: 100%;
        min-height:300px;
        padding: 31px 38px;
        background:rgba(255,255,255,1);
        box-shadow:0px 6px 16px 0px rgba(225,225,225,0.5);
        border-radius:7px;
    }
    .chart-container1{
        width: 100%;
        min-height:300px;
        padding: 40px 40px;
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
        width: 100%;
    }
    .custom-made1{
        position: relative;
        width: 100%;
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
     .leftRight{
         position: fixed;
         width:1200px;
         top:45vh;
         left:0;
         right:0;
         margin:auto;
         z-index:1;
     }
     .leftRight>i{
         cursor: pointer;
     }
     
</style>