<template>
  <div style="height:100vh;" class="flexs columns">
    <header>
        <HeaderCmp/>   
    </header>
    <section class="flexs" style="padding:0;">
        <aside class="flexs columns">
            <div style="background:#2F9AC0;height:50px;padding:0 10px;position: relative;" class="flexs a-center j-center">
                 <i class="iconfont icon-web-icon-ico" style="color: #FFF;font-size: 28px" v-show="backGo" @click="backGO"/>
                 <p style="color:white;font-size:16px;">{{news.FB}}</p>
             </div>
             <div class="flexs a-center" style="hieght:50px;background:#FCFCFC;padding:5px 5px 0 5px;" v-show="selectedProvince">
                 <el-row class="from-row flexs a-center">
                     <el-col :span="4" :offset="1" class="label-title">
                          <label class="Mandatory"> {{news.CFD}}</label>
                      </el-col>
                      <el-col :span="9" :offset="1" style="padding: 0 15px;">
                          <label style="font-size:16px;color:#333;"> {{fromProvince}}</label>
                      </el-col>
                      <el-col :span="9" style="padding: 0 15px;">
                          <label style="font-size:16px;color:#333;"> {{fromCity}}</label>
                      </el-col>
                 </el-row>
             </div>
             <div class="flexs a-center selects" style="hieght:50px;background:#FCFCFC;" v-show="selectedProvince">
                 <el-row class="from-row flexs a-center">
                      <el-col :span="4" :offset="1" class="label-title">
                          <label class="Mandatory"> {{news.JJD}}</label>
                      </el-col>
                      <el-col :span="9" :offset="1">
                          <el-select
                              v-model="selectedProvince"
                              filterable
                              class="custom-made"
                              @change="selectFromProvince"
                              >
                              <el-option v-for="(item,index) in mapCountry" :label="item.name" :value="item.country_code" :key="index"></el-option>
                          </el-select>
                      </el-col>
                      <el-col :span="9">
                          <el-select
                              v-model="selectedFromCity"
                              filterable
                              class="custom-made"
                              @change="selectFromCity"
                              >
                              <el-option v-for="(item,index) in mapCity" :label="item.name" :value="item.location_code" :key="index"></el-option>
                          </el-select>
                      </el-col>
                 </el-row>
             </div>
             <div class="flexs a-center" style="padding:0 5px 10px;hieght:50px;background:#FCFCFC;" v-show="selectedProvince">
                 <div v-if="submitShow" class="yunfei active" @click="echartCon">{{news.YF}}</div>
                 <div v-else class="yunfei">{{news.YF}}</div>
             </div>
             <div class="scrollbar listss" v-if="lastmileList.length<=0&&!selectedProvince" style="">
                      <ul class="cName">
                          <li v-for="(item,index) in nameList" :key="index" style="padding:10px 30px;border:1px solid #C3CCDD;margin:5px;" @click="listNameMap(item.content)">
                               <p>{{item.country_name}}</p>
                               <p style="padding:5px 0;">{{item.lastmile_count}}&nbsp;{{news.GFWS}}</p>
                          </li>
                      </ul>
                      
             </div>
             <div class="scrollbar list" v-else-if="searchArr1.length>=1||searchArr2.length>=1">
                  <div v-show="searchArr1.length>=1">
                     <log-list @childPost="childListFn" @childPost3="childListFn3" @childPost1="childListFnIcon" v-for="(item,index) in searchArr1" :class="[selectIndex==index?'active':'']" :key="index" :post-item="item" @click.native="selectClick(index,item.lastmile_code)"></log-list>
                  </div>
                  <div style="border-top:1px solid #ccc;" v-show="searchArr2.length>=1">
                      <div style="height:50px;background:#F1F1F1;margin-bottom:5px;" class="flexs a-center j-center"><span>{{news.YX}}:</span></div>
                     <log-list @childPost="childListFn" @childPost3="childListFn3" @childPost1="childListFnIcon" v-for="(item,index) in searchArr2" :class="[selectIndex1==index?'active':'']" :key="index" :post-item="item" @click.native="selectClick1(index,item.lastmile_code)"></log-list>
                  </div>
             </div>
             
             <div class="scrollbar list" v-else>
                  <log-list @childPost="childListFn" @childPost3="childListFn3" @childPost1="childListFnIcon"  v-for="(item,index) in lastmileList" :class="[selectIndex==index?'active':'']" :key="index" :post-item="item" @click.native="selectClick(index,item.lastmile_code)"></log-list>
                  <div v-show="lastmileList.length<=0" style="text-align:center;height:80px;line-height:80px;">{{news.nodata}}</div>
                  
             </div>
        </aside>
        <main>
              <leaflet-map  v-if="maps.map==1" @childPost="childFn" @childList="childListName" :childProvince="provinceText"  :childCity="cityText" :childNameMap="nameMap"></leaflet-map>
              <GoogleMap v-else @childPost="childFn" @childList="childListName" :childProvince="provinceText"  :childCity="cityText" :childNameMap="nameMap"></GoogleMap>
        </main>
    </section>
    <!-- <footer> -->
        <!-- <Footers></Footers> -->
        <!-- <div class="copy flexs a-center j-center">
          <span class="flexs a-center j-center">{{$t('homeMaterialBenefits').copyRight}}： 2018 搜派 Spider All Rights Reserved ICP备10005645</span>
        </div>
    </footer> -->
    <MessageBoxs v-if="messAlert" @posttoparent="childListFn1">
        <span slot="header">{{news.JGXQ}}</span>
        <a slot="excel" :href="baseURL+'/last-mile/map/lastmile_rate-card-export/'+exportCode" style="color:white;font-size:20x;" class="excel">{{news.DCEXCEL}}</a>
        <div style="padding:10px 20px 20px;">
        <div class="price">
            
            <div class="flexs priceList scrollnone" ref="scrollHeadr">
                <ul>
                    <li></li>
                    <li class="flexs a-center">{{news.JJDL}}</li>
                    <li class="flexs a-center">{{news.SHD}}</li>
                </ul>
                <ul v-for="(item,index) in rateCard" :key="index">
                    <li class="flexs columns j-center">
                        <el-popover
                           placement="right"
                           trigger="hover">
                           <p slot="reference" class="hiddenT">{{item.service_name}}</p>
                           <div style="padding:10px;">{{item.service_name}}</div>
                         </el-popover>
                        
                        <span>{{item.claimed_min_lead_time}}-{{item.claimed_max_lead_time}} {{menu.day}}</span>
                    </li>
                    <li class="flexs a-center">
                        <el-popover
                           placement="right"
                           trigger="hover">
                           <p slot="reference" class="hiddenT">{{item.receive_region_name}}</p>
                           <div class="details scrollbar" style="padding:10px;">
                               <p v-for="(todo,i) in item.receive_region" :key="i">
                                   {{todo.name_multi_language.en}}
                               </p>
                           </div>
                         </el-popover>
                    </li>
                    <li class="flexs a-center">
                        <el-popover
                           placement="right"
                           trigger="hover">
                           <p slot="reference" class="hiddenT">{{item.delivery_region_name}}</p>
                           <div class="details scrollbar" style="padding:10px;">
                               <p v-for="(todo,i) in item.delivery_region" :key="i">
                                   {{todo.name_multi_language.en}}
                               </p>
                           </div>
                        </el-popover>
                    </li>
                </ul>
            </div>
            <div class="priceList1 flexs columns scrollbar" ref="scrollCont" @scroll="handleScroll">
                <ul v-for="(item,index) in priceList" :key="index" class="flexs">
                    <li class="flexs a-center " >
                        <span>{{item.ctl}}</span>
                    </li>
                    <li class="flexs a-center" v-for="(todo,i) in rateCard" :key="i" v-if="item['rate'+i]">
                        <p class="hiddenT" >{{item['rate'+i]}}</p>
                    </li>
                </ul>
            </div>
        </div>
        </div>
        
    </MessageBoxs>
    <MessageBoxs v-if="echartAlert" @posttoparent="childListFn4" :width="width" :height="height" class="flexs columns">
        <span slot="header">{{news.YF}}</span>
        <div style="">
            <el-row class="from-row1 flexs a-center row-bg" type="flex">
                      <el-col :span="3" :offset="1" class="label-title">
                          <label class="Mandatory">{{news.JJDL}} :</label>
                      </el-col>
                      <el-col :span="4" :offset="1">
                          <label style="font-size:16px;color:#333;"> {{fromCity}}</label>
                          <!-- <el-select
                              v-model="send"
                              filterable
                              class="custom-made"
                              @change="chartsFn()"
                              >
                              <el-option v-for="(item,index) in mapCity" :label="item.name" :value="item.code" :key="index"></el-option>
                          </el-select> -->
                      </el-col>
                      <el-col :span="2" :offset="1" class="label-title">
                          <label class="Mandatory">{{news.SHD}} :</label>
                      </el-col>
                      <el-col :span="4" :offset="1">
                          <el-select
                              v-model="receipt"
                              filterable
                              class="custom-made"
                              @change="chartsFn()"
                              >
                              <el-option v-for="(item,index) in mapCity1" :label="item.name" :value="item.location_code" :key="index"></el-option>
                          </el-select>
                      </el-col>
                      <el-col :span="3">
                           <div class="block" style="margin-left:20px;">
                             <el-slider
                               v-model="steps"
                               :step="1"
                               :min="1"
                               :max="10"
                               @change="chartsFn()"
                               >
                             </el-slider>
                           </div>
                      </el-col>
                      <el-col :span="6">
                          <div style="padding-left:10px;">{{news.YSTS}} : {{steps>=10?10:steps}}&nbsp;{{steps>=10?menu.day+menu.jys:menu.day}}</div>
                      </el-col>
            </el-row>
        </div>
        <div style="padding:10px 20px 0;width:100%;height:calc(80vh - 140px);">
            <!-- <line-chart
            
            width="100%"
            :xData="lastmileRate.coordinates"
            :seriesData="echartData"
            ></line-chart> -->
            <!-- <x-chart :id="id" :xData="lastmileRate.coordinates" :seriesData="echartData" @chartFn="lineChartFn"></x-chart> -->
            <e-chart :xData="lastmileRate.coordinates" :seriesData="echartData" @chartFn="lineChartFn"></e-chart>
           
        </div>
        <ul class="flexs inside j-between" style="padding:0 90px 0 60px;">
            <!-- <li style="" v-for="(item,index) in lastmileRate.coordinates" :key="index">{{item}}</li> -->
            <li style="margin-left:10px;">{{mindata}}</li>
            <li style="margin-right:5px;">{{maxdata}}</li>
        </ul>
    </MessageBoxs>
    <MessageBoxs v-if="serviceAlert" @posttoparent="childListFn2">
        <span slot="header">{{news.WLFWXQ}}</span>
        <div style="padding:10px 20px 20px;" class="boxScroll scrollnone">
           <div class="loglogo flexs a-center" style="padding:10px 0 20px;">
                 <i style="width:150px;height:50px;"><img  style="width:100%;;height:100%;" :src="baseURL+serDetail.logo" alt=""></i>
                 <p style="width:600px;padding:0 20px;" class="flexs rows">{{serDetail.summary}}</p>
           </div>
           <!-- <div>
               <p style="padding:10px 0;border-bottom:1px dashed #ECECEC;font-weight:600;color:#333;">服务</p>
               <ul class="flexs j-around" style="padding:15px 0;">
                   <li class="flexs columns a-center">
                       <i class="iconfont icon-yixiaoshida" style="color: #2F9AC0;font-size: 40px;"/>
                       <p>一小时收件</p>
                   </li>
                   <li class="flexs columns a-center">
                       <i class="iconfont icon-lingdanciriyun" style="color: #EB914D;font-size: 40px;"/>
                       <p>次日送达</p>
                   </li>
                   <li class="flexs columns a-center">
                       <i class="iconfont icon-naozhong" style="color: #EDC647;font-size: 40px;"/>
                       <p>1-3天送达</p>
                   </li>
                   <li class="flexs columns a-center">
                       <i class="iconfont icon-wenjian" style="color: #61B8BF;font-size: 40px;"/>
                       <p>派送文件</p>
                   </li>
                   <li class="flexs columns a-center">
                       <i class="iconfont icon-baoguo" style="color: #DD7777;font-size: 40px;"/>
                       <p>超大件</p>
                   </li>
                   <li class="flexs columns a-center">
                       <i class="iconfont icon-qianbao" style="color: #FDA26F;font-size: 40px;"/>
                       <p>货到付款</p>
                   </li>
               </ul>
           </div> -->
           <div>
               <p style="padding:10px 0;border-bottom:1px dashed #ECECEC;font-weight:600;color:#333;">{{news.FG}}</p>
               <div style="width:100%;height:200px;padding:10px 0;">
                   
                   <leaflet-maps  v-if="maps.map==1" :childProvince="provinceText" :childNameMap="nameMap"></leaflet-maps>
                   <GoogleMaps v-else :childProvince="provinceText" :childNameMap="nameMap"></GoogleMaps>
               </div>
           </div>
           <div class="price">
            <p style="padding:10px 0;border-bottom:1px dashed #ECECEC;font-weight:600;color:#333;">{{news.JGB}}</p>
            <div class="flexs priceList scrollnone" ref="scrollHeadr">
                <ul>
                    <li></li>
                    <li class="flexs a-center">{{news.JJDL}}</li>
                    <li class="flexs a-center">{{news.SHD}}</li>
                </ul>
                <ul v-for="(item,index) in rateCard" :key="index">
                    <li class="flexs columns j-center">
                        <el-popover
                           placement="right"
                           trigger="hover">
                           <p slot="reference" class="hiddenT">{{item.service_name}}</p>
                           <div style="padding:10px;">{{item.service_name}}</div>
                         </el-popover>
                        
                        <span>{{item.claimed_min_lead_time}}-{{item.claimed_max_lead_time}} days</span>
                    </li>
                    <li class="flexs a-center">
                        <el-popover
                           placement="right"
                           trigger="hover">
                           <p slot="reference" class="hiddenT">{{item.receive_region_name}}</p>
                           <div class="details scrollbar" style="padding:5px 10px;">
                               <p v-for="(todo,i) in item.receive_region" :key="i">
                                   {{todo.name_multi_language.en}}
                               </p>
                           </div>
                         </el-popover>
                    </li>
                    <li class="flexs a-center">
                        <el-popover
                           placement="right"
                           trigger="hover">
                           <p slot="reference" class="hiddenT">{{item.delivery_region_name}}</p>
                           <div class="details scrollbar" style="padding:5px 10px;">
                               <p v-for="(todo,i) in item.delivery_region" :key="i">
                                   {{todo.name_multi_language.en}}
                               </p>
                           </div>
                        </el-popover>
                    </li>
                </ul>
            </div>
            <div class="priceList1 flexs columns scrollbar" ref="scrollCont" @scroll="handleScroll">
                <ul v-for="(item,index) in priceList" :key="index" class="flexs">
                    <li class="flexs a-center " >
                        <span>{{item.ctl}}</span>
                    </li>
                    <li class="flexs a-center" v-for="(todo,i) in rateCard" :key="i" v-if="item['rate'+i]">
                        <p class="hiddenT" >{{item['rate'+i]}}</p>
                    </li>
                </ul>
            </div>
           </div>
        </div>
    </MessageBoxs>
  </div>
</template>

<script>
  import Footers from '@/components/home/component/footer'    //底部
  import HeaderCmp from '@/components/home/component/header'
  import LogList from './component/logList'
  import GoogleMap from './component/googleMap'
  import GoogleMaps from './component/googleMaps'
  import MessageBoxs from '@/components/common/messageBoxs'
  import LeafletMap from './component/leafletMap'
  import LeafletMaps from './component/leafletMaps'
  import {mapState,mapGetters,mapActions,mapMutations} from 'vuex'
  import LineChart from "@/components/common/chart/lineeChart"
  // 导入chart组件
//   import XChart from '@/components/common/chart/lineChart'
  import EChart from '@/components/common/chart/mapEcharts'
// 导入chart组件模拟数据
//   import options from './component/ser'
  export default {
    props:[''],
    data () {
        // let option = options.bar
      return {
          fromProvince:'',
          fromCapital_code:'',
          fromCity:'',
          width:'80%',
          height:'80%',
          id: 'echart',
        //   option: option,
           steps:2,
           mapCity:[],
           mapCity1:[],
           listArr:[],
           selectIndex:null,
           selectIndex1:null,
           messAlert:false,
           serviceAlert:false,
           echartAlert:false,
           serDetail:{},
           countryList:[],
           provinceList:[],
           selectedFromCity:'',
           selectedProvince:'',
           country:'',
           searchArr1:[],
           searchArr2:[],
           echartData:[
               
           ],
           send:'',
           receipt:'',
           chartShow:true,
           provinceText:'',
           cityText:{},
           submitShow:false,
           nameList:[],
           nameMap:{},
           exportCode:null,
           mindata:null,
           maxdata:null,
           echartShow:false
      };
    },
    components: {
        HeaderCmp,
        Footers,
        LogList,
        GoogleMap,
        MessageBoxs,
        GoogleMaps,
        LineChart,
        EChart,
        LeafletMap,
        LeafletMaps
    },

    computed: {
        ...mapState('menu',[
            'country_list','overview','lastmileList','backGo','rateCard','priceList','lastmileCountry',
            'nextLocationList','searchArr','mapCountry','lastmileRate','ips'
        ]),
        news(){
       return this.$t('news')
      },
      menu(){
       return this.$t('menu')
      },
      maps(){
         return this.ips;
      }
    },

    beforeMount() {},

    mounted() {
        this.ajaxMap()
        // this.ajaxLastmileCountry()
        this.ajaxLastmileMapcountry()
        document.documentElement.scrollTop=0
        document.body.scrollTop=0
        window.pageYOffset=0
        this.getLastmileList( [] )
        // this.gitLastmileSearch( [] )
        
        
    },
    methods: {
        ...mapActions('menu',[
            'ajaxCountrylist','ajaxLastmileCode','ajaxRateCard','ajaxLastmileCountry','ajaxLastmileRate','ajaxMap','ajaxOverviewCountry','ajaxCountrylist',
            'ajaxNextLocationList','ajaxLastmileSearch','ajaxLastmileMapcountry','ajaxLastmileList','ajaxLastmileListRegion','ajaxExport'
        ]),
        ...mapMutations('menu',[
          'setback','getLastmileList','setPriceList','getRateCard','gitNextLocationList',
          'gitLastmileSearch','setLastmileList','setsearchArr','gitLastmileSearch'
        ]),
        lineChartFn(){
            this.echartCon()
        },
        backGO(){
           this.setback(false)
        },
        selectClick(index,lastmile_code){
            // this.selectIndex=index
            // this.ajaxLastmileCode( lastmile_code )
            // this.selectIndex1=null
        },
        selectClick1(index,lastmile_code){
            // this.selectIndex1=index
            // this.selectIndex=null
            // this.ajaxLastmileCode( lastmile_code )
        },
		reloadForCountryChange(val,location_code) {
            const _this = this ;
            this.submitShow=false;
            this.selectedFromCity=''
            this.selectedProvince=''
            this.selectIndex=null
            this.selectIndex1=null
            this.cityText= {
                         c:val,
                         type:0
                     }
            var num = val.length
            if(num==2){
              this.country=val
              this.selectedProvince=val
              this.mapCity=[]
              this.mapCity1=[]
              this.mapCity.push({location_code:location_code,name:'All'})
              this.mapCountry.forEach(el => {
                  let capital = '';
                  if(el.country_code==val){
                      el.province.forEach(item =>{
                         this.mapCity.push(item)
                         this.mapCity1.push(item)
                         if (item.location_code == el.capital) capital = item.name;
                      })
                      this.fromProvince = el.name
                      this.fromCity = capital
                      this.fromCapital_code = el.capital
                  }
              })
              if(this.mapCity[0]){
                  this.selectedFromCity=this.mapCity[0].location_code

              }
            }else if(num!=2){
               _this.mapCountry.forEach(el => {
                  el.province.forEach( item => {
                      if(item.location_code==val){
                          this.country=el.country_code
                          this.selectedProvince=el.country_code
                          this.selectedFromCity=item.location_code
                      }
                  })
               })
            }
            // this.gitLastmileSearch( [] )
            // this.provinceList=[]
            // this.gitNextLocationList( [] )
		},
        childFn(val){
            this.reloadForCountryChange(val.c,val.lc);
        },
        childListName(val){
            const _this =this;
            this.nameList=val
        },
        listNameMap(data){
            this.nameMap=data;
        },
        childListFn(val){
            this.messAlert=true
            // this.getRateCard([])
            // this.setPriceList([])
            this.ajaxRateCard(val)
            this.exportCode=val;
        },
        childListFn3(val){
            this.serDetail=val
            this.serviceAlert=true
            this.ajaxRateCard(val.lastmile_code)
            this.ajaxLastmileCode( val.lastmile_code )
            this.nameMap=this.nameMap;
        },
        childListFn1(val){
            this.messAlert=val
        },
        childListFn2(val){
            this.serviceAlert=val
        },
        childListFn4(val){
            this.echartAlert=val
        },
        async chartsFn(){
            let data = {}
            let arr = []
            this.echartAlert = true;
            if (this.searchArr.length > 0) {
                this.searchArr.forEach(el => {
                    if(el.icon==1){
                        arr.push(el.lastmile_code)
                    }
                })
            } else {
                this.lastmileList.forEach(el => {
                    if (el.icon == 1) {
                        arr.push(el.lastmile_code)
                    }
                })
            }
            data.lastmile = arr;
            data.day = this.steps
            data.from = this.fromCapital_code
            data.to = this.receipt
            let res = await this.ajaxLastmileRate(this.$qs.stringify(data))
            // this.chartShow=true;
            
        },

        echartCon(val){
            let data = {}
            var arr = []
            this.echartAlert = true;
            if (this.searchArr.length > 0) {
                this.searchArr.forEach(el => {
                    if (el.icon == 1) {
                        arr.push(el.lastmile_code)
                    }
                })
            } else {
                this.lastmileList.forEach(el => {
                    if (el.icon == 1) {
                        arr.push(el.lastmile_code)
                    }
                })
            }
            
            var num = this.selectedFromCity.length
            if (num!=2) {
               data.to = this.selectedFromCity
               this.receipt = this.selectedFromCity
            //    console.log(this.receipt,'this.receipt')
            } else if(num==2) {
               data.to = this.fromCapital_code
               this.receipt = this.fromCapital_code
            //    console.log(this.receipt,'this.receipt1')
            }
            this.mapCity.forEach( (el,i)=>{
                if(el.location_code==this.selectedFromCity&&i==0){
                     data.to = this.fromCapital_code
                     this.receipt = this.fromCapital_code
                }
            })
            data.lastmile = arr;
            data.day = 2
            data.from = this.fromCapital_code
            this.steps = 2
            this.ajaxLastmileRate( this.$qs.stringify(data) )
        },
        childListFnIcon(val){
            let arr=[]
            if(this.searchArr.length>0){
                this.searchArr.forEach(el=>{
                   if(el.icon==1){
                    arr.push(el)
                   }
                })
                if(val.icon==1){
                    this.submitShow=true;
                }else if(val.icon==0&&arr.length>=2){
                    this.submitShow=true;
                }else{
                    this.submitShow=false;
                }
                if(arr.length<10000||val.icon==0){
                    this.setsearchArr(val)
                }
                
            }else{
               this.lastmileList.forEach(el=>{
                if(el.icon==1){
                    arr.push(el)
                }
                })
                
                if(arr.length<10000||val.icon==0){
                    this.setLastmileList(val)
                }
                if(val.icon==1){
                    this.submitShow=true;
                }else if(val.icon==0&&arr.length>=2){
                    this.submitShow=true;
                }else{
                    this.submitShow=false;
                }
            }
            
        },
        handleScroll(){
            let clientWidth=this.$refs.scrollCont.clientWidth
            let scrollLeft=this.$refs.scrollCont.scrollLeft
            let scrollTop=this.$refs.scrollCont.scrollTop
            this.$refs.scrollHeadr.scrollLeft=scrollLeft

        },
        selectFromProvince(val){
            this.submitShow=false;
            this.searchArr1=[]
            this.searchArr2=[]
            this.provinceText = val
            this.mapCountry.forEach(el=>{
                if(el.country_code==val){
                  this.reloadForCountryChange(val,el.location_code);
                }
            })
            this.selectedProvince = val

            let data = {country : val};
            // this.ajaxLastmileList(this.$qs.stringify(data))
            
            this.nameList.forEach(el => {
               if (val == el.content.country) { 
                   let code = el.content.location_code
                   this.$router.push({path: '/mapDetail', query: {country : val, code : code}})
               }
           })
        },
        selectFromCity(val){
            this.submitShow = false;
            this.selectIndex = null
            this.selectIndex1 = null
            this.searchArr1 = []
            this.searchArr2 = []
            this.cityText = {
                         c:val,
                         type:1
                     }
            this.mapCity.forEach( (el,i)=>{
                if(el.location_code==val&&i==0){
                     this.cityText = {
                         c:val,
                         type:0
                     }
                }
            })
            

            // console.log(this.selectedProvince,'selectedProvince')
            // let data={}
            // data['country']=this.selectedProvince;
            // var num = val.length
            
            // if(num!=2){
            //    data['province']=val
               
            // }
            // this.ajaxLastmileList(this.$qs.stringify(data))
            this.ajaxLastmileListRegion(val)
        }
        
    },

    watch: {
        selectedProvince(newval,oldval){
           this.nameList.forEach(el=>{
               if(newval == el.content.country) { 
                   let code = el.content.location_code
                   this.$router.push({path: '/mapDetail', query: {country: newval,code:code}})
               }
           })
        },
        lastmileList(newval,oldval){
            this.searchArr1 = []
            this.searchArr2 = []
            this.lastmileList.forEach(el => {
                if (el.active) {
                    this.searchArr1.push(el)
                } else {
                    this.searchArr2.push(el)
                }
                      
            })
        },
        mapCountry (newval,oldval){
            const _this = this
            if (this.$route.query.country) {
                 this.selectedProvince = this.$route.query.country
                 this.mapCountry.forEach(el => {
                     if (el.country_code == _this.$route.query.country) {
                         this.mapCity.push({location_code : _this.$route.query.code, name : 'All'})
                         let capital = '';
                         el.province.forEach(item => {
                             _this.mapCity.push(item)
                             _this.mapCity1.push(item)
                             if (item.location_code == el.capital)
                                 capital = item.name;
                         })
                         _this.fromProvince = el.name
                         _this.fromCity = capital
                         _this.fromCapital_code = el.capital
                    }
                })
                if (this.mapCity.length && this.mapCity[0].location_code) {
                    this.selectedFromCity = this.mapCity[0].location_code
                } 
            }
        },
          
          lastmileRate:{
              handler:function(newval,oldval){
              let arr = this.lastmileRate.coordinates
             if(arr.length>0){
                 this.mindata = arr[0]
                 this.maxdata = arr[arr.length - 1]
             }else{
                 this.mindata = null
                 this.maxdata = null
             }
             this.echartData=[]
             this.lastmileRate.data.forEach(element => {
                 let data={
                     
                 }
                 data.name=element.lastmile_name+' - '+element.service_name
                 data.data=element.rate
                 data.data1=element.rate
                 data.type='line'
                 
                 this.echartData.push(data)
             })
          },
          deep:true
          }
    }

  }

</script>
<style lang='' scoped>
.inside{
    width:100%;
    position: relative;
    bottom:8px;
    left:0;
    z-index:100000;
}
.inside>li{
  height:22px;
  /* flex:1; */
  text-align: center;
  color:#333;
  font-size:12px;
  /* border-right:1px solid #DDD; */
  line-height: 27px;

}
.inside>li:last-child{
  border-right:none;
}
.excel{
    position: absolute;
    right:200px;
    cursor:pointer;
}
.cName li:hover{
  background: #F1F1F1;
  cursor: pointer;
}
.cName li p{
    font-size: 18px;
}
.yunfei{
    width:100%;
    height:50px;
    line-height: 50px;
    text-align: center;
    background: #F1F1F1;
    border-radius: 25px;
    color:#333;
    font-size:18px;
    cursor: not-allowed;
}
.yunfei.active{
    background: #2F9AC0;
    color:white;
    cursor: pointer;
}
.details{
    max-height: 300px;
    overflow-y: auto;
}
.margincss{
       /* margin-top:210px; */
   }
  header{
     /* background: #333;   */
     min-height: 96px;
  }
  .ico{
      /* position: relative; */
      position:absolute;
      left:20px;
      z-index:1;
      cursor: pointer;

  }
  .active{
     background: #F1F1F1;
  }
  section{
      flex:1;
  }
  aside{
      width:400px;
      background: #fff;
      border-bottom:2px solid #2F9AC0;
      
  }
  main{
      flex:1;
      position: relative;
      border-bottom:2px solid #2F9AC0;
      border-top:1px solid #2F9AC0;
  }
  
  .list{
      overflow-y: scroll;
      overflow-x: none;
      height:calc( 100vh - 323px );
      /* -webkit-box-flex: 1 ;  
       -moz-box-flex: 1;                  
       -webkit-flex: 1;     
       -ms-flex: 1;          
       flex: 1;     */
  }
  .listss{
      overflow-y: scroll;
      overflow-x: none;
      height:calc( 100vh - 146px );
  }
  footer{

  }
  .copy{
       background: #FCFCFC;
       font-size:14px;
       color:#999;
       width:100%;
       padding:20px 5%;
   }
   .container{
       width: 1200px;
   }
   .price{
      
      /* position: relative; */
   }
   .priceList{
       /* width:100%; */
       overflow-x: auto;
       width: 80vw;
       font-weight: 600;
   }
   .priceList>ul:first-child{
      width:160px;
   }
   .priceList>ul:first-child>li{
      width:160px;
   }
   .priceList>ul{
      max-width:100%;
      min-width: 160px;
      width: 100%;
   }
   
   .priceList>ul>li{
       width: 100%;
       padding:0 10px;
       height:60px;
       border-bottom:1px dashed #ECECEC;
       background: white;
   }
   .priceList>ul>li p{
       width: 100%;
       cursor: pointer;
       padding:5px 0;
   }
   .priceList1>ul>li>p{
       width: 100%;
   }
   .priceList1>ul>li>span{
       height:100%;
       width:160px;
       line-height: 50px;
   }
   .priceList1{
       max-width:80vw;
      max-height:400px;
      overflow-x: auto;
      overflow-y: auto;
   }
   .boxScroll{
       overflow-y: auto;
       max-height:76vh;
   }
   .priceList1>ul{
       width:100%;
       min-height:50px;
   }
   .priceList1>ul>li{
       max-width:100%;
       min-width: 160px;
       width: 100%;

       min-height:50px;
       padding:0 10px;
       border-bottom:1px dashed #ECECEC;
   }
   .priceList1>ul>li:first-child{
       width:160px;
   }
    .label-title{
        /* min-height: 40px; */
        text-align: center;
    }

    .from-row{
        padding:0 10px;
        width:100%;
        height:50px;
        background: #F1F1F1;
        border-radius:25px;
    }
    .from-row1{
        padding:10px 0;
        width:100%;
        height:50px;
        background: #FBFBFB;
    }
    .custom-made{
        position: relative;
        
    }
    .from-row1 .el-col-offset-1 {
       margin-left: 2%;
    }
    .selects{
        width:100%;
        
        padding:5px;
    }
</style>
