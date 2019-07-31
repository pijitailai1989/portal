<template>
  <div style="height:100vh;" class="flexs columns">
    <section class=" flexs" style="padding:0;">
        <aside class="flexs columns">
            <div style="background:#2F9AC0;height:50px;padding:0 10px;position: relative;" class="flexs a-center j-center">
                 <i class="iconfont icon-web-icon- ico" style="color: #FFF;font-size: 28px" v-show="backGo" @click="backGO"/>
                 <p style="color:white;font-size:16px;">{{news.FB}}</p>
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
                              @change="provinceFn"
                              >
                              <el-option v-for="(item,index) in mapCountry" :label="item.name" :value="item.code" :key="index"></el-option>
                          </el-select>
                      </el-col>
                      <el-col :span="9">
                          <el-select
                              v-model="selectedCity"
                              filterable
                              class="custom-made"
                              @change="cityFn"
                              >
                              <el-option v-for="(item,index) in mapCity" :label="item.name" :value="item.code" :key="index"></el-option>
                          </el-select>
                      </el-col>
                 </el-row>
             </div>
             <div class="flexs a-center" style="padding:0 5px 10px;hieght:50px;background:#FCFCFC;" v-show="selectedProvince">
                 <div v-if="submitShow" class="yunfei active" @click="echartCon">{{news.YF}}</div>
                 <div v-else class="yunfei">{{news.YF}}</div>
             </div>
             <div class="scrollbar list" v-if="searchArr1.length>=1||searchArr2.length>=1">
                  <div v-show="searchArr1.length>=1">
                     <log-list @childPost="childListFn" @childPost3="childListFn3" @childPost1="childListFnIcon" v-for="(item,index) in searchArr1" :class="[selectIndex==index?'active':'']" :key="index" :post-item="item" @click.native="selectClick(index,item.lastmile_code)"></log-list>
                  </div>
                  <div style="border-top:1px solid #ccc;" v-show="searchArr2.length>=1">
                      <div style="height:50px;background:#F1F1F1;margin-bottom:5px;" class="flexs a-center j-center"><span>{{news.YX}}:</span></div>
                     <log-list @childPost="childListFn" @childPost3="childListFn3" @childPost1="childListFnIcon" v-for="(item,index) in searchArr2" :class="[selectIndex1==index?'active':'']" :key="index" :post-item="item" @click.native="selectClick1(index,item.lastmile_code)"></log-list>
                  </div>
             </div>
             <div class="scrollbar list" v-else>
                 
                  <div v-if="lastmileList.length<=0" style="">
                      <ul class="cName">
                          <li v-for="(item,index) in nameList" :key="index" style="padding:10px 30px;border:1px solid #C3CCDD;margin:5px;" @click="listNameMap(item.content)">
                               <p>{{item.country_name}}</p>
                               <p style="padding:5px 0;">{{item.lastmile_count}}&nbsp;{{news.GFWS}}</p>
                          </li>
                      </ul>
                      
                  </div>
                  <log-list v-else @childPost="childListFn" @childPost3="childListFn3" @childPost1="childListFnIcon"  v-for="(item,index) in lastmileList" :class="[selectIndex==index?'active':'']" :key="index" :post-item="item" @click.native="selectClick(index,item.lastmile_code)"></log-list>
                 
                  
             </div>
        </aside>
        <main>
             
              
              <leaflet-map  v-if="maps.map==1" @childPost="childFn" @childList="childListName" :childProvince="provinceText" :childNameMap="nameMap"></leaflet-map>
              <GoogleMap v-else @childPost="childFn" @childList="childListName" :childProvince="provinceText" :childNameMap="nameMap"></GoogleMap>
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
    <MessageBoxs v-if="echartAlert" @posttoparent="childListFn4">
        <span slot="header">{{news.YF}}</span>
        <div style="">
            <el-row class="from-row1 flexs a-center row-bg" type="flex">
                      <el-col :span="3" :offset="1" class="label-title">
                          <label class="Mandatory">{{news.JJDL}} :</label>
                      </el-col>
                      <el-col :span="4" :offset="1">
                          <el-select
                              v-model="send"
                              filterable
                              class="custom-made"
                              @change="chartsFn()"
                              >
                              <el-option v-for="(item,index) in mapCity" :label="item.name" :value="item.code" :key="index"></el-option>
                          </el-select>
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
                              <el-option v-for="(item,index) in mapCity" :label="item.name" :value="item.code" :key="index"></el-option>
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
        <div style="padding:10px 20px 0;width:1000px;">
            <!-- <line-chart
            
            width="100%"
            :xData="lastmileRate.coordinates"
            :seriesData="echartData"
            ></line-chart> -->
            <!-- <x-chart :id="id" :xData="lastmileRate.coordinates" :seriesData="echartData" @chartFn="lineChartFn"></x-chart> -->
            <e-chart :xData="lastmileRate.coordinates" :seriesData="echartData" @chartFn="lineChartFn"></e-chart>
        </div>
        <ul class="flexs inside" style="padding:0 90px 0 60px;">
            <li style="" v-for="(item,index) in lastmileRate.coordinates" :key="index">{{item}}</li>
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
          id: 'echart',
        //   option: option,
           steps:2,
           mapCity:[],
           listArr:[],
           selectIndex:null,
           selectIndex1:null,
           messAlert:false,
           serviceAlert:false,
           echartAlert:false,
           serDetail:{},
           countryList:[],
           provinceList:[],
           selectedCity:'',
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
           submitShow:false,
           nameList:[],
           nameMap:{},
           exportCode:null,
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
        if(this.$route.query.lang){
            this.toggleLang(this.$route.query.lang)
        }else{
            this.toggleLang('zh')
        }
        
    },
    methods: {
        ...mapActions('menu',[
            'ajaxCountrylist','ajaxLastmileCode','ajaxRateCard','ajaxLastmileCountry','ajaxLastmileRate','ajaxMap',
            'ajaxNextLocationList','ajaxLastmileSearch','ajaxLastmileMapcountry','ajaxLastmileList','ajaxExport'
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
            // console.log(index,lastmile_code,'index')
            this.selectIndex=index
            this.ajaxLastmileCode( lastmile_code )
            this.selectIndex1=null
        },
        selectClick1(index,lastmile_code){
            // console.log(index,lastmile_code,'index')
            this.selectIndex1=index
            this.selectIndex=null
            this.ajaxLastmileCode( lastmile_code )
        },
        childFn(val){
            // this.gitLastmileSearch( [] )
            this.country=val
            this.submitShow=false;
            this.mapCity=[]
            this.selectedCity=''
            this.selectedProvince=''
            this.selectedProvince=val
            // this.provinceList=[]
            this.selectIndex=null
            this.selectIndex1=null
            this.mapCountry.forEach(el => {
                if(el.code==val){
                    this.mapCity=el.province
                }
            })
            if(this.mapCity[0]){
                this.selectedCity=this.mapCity[0].code
            }
            
            // this.gitNextLocationList( [] )
            // console.log(val,this.countryList,'val')
            
        },
        childListName(val){
            const _this =this;
            this.nameList=val
            // console.log(val,'val111111111111')
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
            // console.log(val,this.exportCode,'this.exportCod')
        },
        childListFn3(val){
            // console.log(val,'(index)')
            this.serDetail=val
            this.serviceAlert=true
            this.ajaxRateCard(val.lastmile_code)
            // console.log('alert')
            this.ajaxLastmileCode( val.lastmile_code )
            this.nameMap=this.nameMap;
            // console.log(this.lastmileList,'lastmileList3',this.searchArr1,this.searchArr2)
        },
        childListFn1(val){
            this.messAlert=val
        },
        childListFn2(val){
            this.serviceAlert=val
            // console.log(this.lastmileList,'lastmileList2',this.searchArr1,this.searchArr2)
        },
        childListFn4(val){
            this.echartAlert=val
        },
        async chartsFn(){
            let data={}
            let arr=[]
            this.echartAlert=true;
            if(this.searchArr.length>0){
                this.searchArr.forEach(el=>{
                   if(el.icon==1){
                    arr.push(el.lastmile_code)
                   }
                })
            }else{
               this.lastmileList.forEach(el=>{
                if(el.icon==1){
                    arr.push(el.lastmile_code)
                }
                })
            }
            data.lastmile=arr;
            data.day=this.steps
            data.from=this.send
            data.to=this.receipt
            // console.log(arr,'arr')
            let res = await this.ajaxLastmileRate( this.$qs.stringify(data) )
            // this.chartShow=true;
            // console.log(res,'45')
            
        },
      
        echartCon(val){
            let data={}
            let arr=[]
            this.echartAlert=true;
            if(this.searchArr.length>0){
                this.searchArr.forEach(el=>{
                   if(el.icon==1){
                    arr.push(el.lastmile_code)
                   }
                })
                
                // console.log(arr,this.searchArr,'searchArr')
            }else{
               this.lastmileList.forEach(el=>{
                if(el.icon==1){
                    arr.push(el.lastmile_code)
                }
                })
                
                // console.log(arr,this.lastmileList,'lastmileList')
            }
            data.lastmile=arr;
            data.day=2
            data.from=this.selectedCity
            data.to=this.mapCity[0].code
            this.steps=2
            this.send=this.selectedCity
            this.receipt=this.mapCity[0].code
            // console.log(arr,'arr')
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
                if(arr.length<3||val.icon==0){
                    this.setsearchArr(val)
                }
                // console.log(arr,val,'searchArr')
            }else{
               this.lastmileList.forEach(el=>{
                if(el.icon==1){
                    arr.push(el)
                }
                })
                if(arr.length<3||val.icon==0){
                    this.setLastmileList(val)
                }
                if(val.icon==1){
                    this.submitShow=true;
                }else if(val.icon==0&&arr.length>=2){
                    this.submitShow=true;
                }else{
                    this.submitShow=false;
                }
                // console.log(arr,val,'lastmileList')
            }
            
            
            
        },
        handleScroll(){
            let clientWidth=this.$refs.scrollCont.clientWidth
            let scrollLeft=this.$refs.scrollCont.scrollLeft
            let scrollTop=this.$refs.scrollCont.scrollTop
            // console.log(scrollLeft,scrollTop,'scrollHeight')
            this.$refs.scrollHeadr.scrollLeft=scrollLeft

        },
        provinceFn(val){
            this.provinceText=val
            this.selectedCity=''
            this.mapCountry.forEach(el => {
                if(el.code==val){
                    this.mapCity=el.province
                }
            })
            
            this.selectedCity=this.mapCity[0].code
            let data={}
           data['country']=val;
           data['province']=this.selectedCity
           this.ajaxLastmileList( this.$qs.stringify(data) )
           this.nameList.forEach(el=>{
               if(val==el.content.country){
                   let lang = null
                   if(this.$route.query.lang){
                       lang = this.$route.query.lang
                   }
                   let code=el.content.location_code
                //    console.log(1111,code)
                   this.$router.push({path: '/mapDetailUrl', query: {country: val,code:code,lang:lang?lang:'zh'}})
               }
           })
            // this.gitNextLocationList( [] )
            // this.ajaxNextLocationList(val)
        },
        cityFn(val){
            this.selectIndex=null
            this.selectIndex1=null
            this.searchArr1=[]
            this.searchArr2=[]
        //    console.log(val,'val')
           let data={}
           data['country']=this.selectedProvince;
           data['province']=val
        //    data['province']=this.selectedProvince;
        //    data['city']=val
        //    data['last_mile_data']=this.lastmileList
           this.ajaxLastmileList( this.$qs.stringify(data) )
        },
        toggleLang(lang) {
           let en = this.$i18n.locale;
           if(en != lang){
                if(lang == 'zh'){
                    sessionStorage.setItem('locale', 'zh')
                    this.$i18n.locale = sessionStorage.getItem('locale')
                    
                    this.switchLangUrl(this.$i18n.locale)
                    
                  } else if (lang == 'en') {
                    sessionStorage.setItem('locale', 'en')
                    this.$i18n.locale = sessionStorage.getItem('locale')
                   
                    this.switchLangUrl(this.$i18n.locale)
                 }
           }
           
          
         },
         switchLangUrl(lang) {
             this.$http.get('/set-locale/'+lang).then(res => {
               if(res.status === 200){
                 // this.$router.go(0)
                 // console.log(res.data)
                 location.reload();
               }
             })
         }
        
    },

    watch: {
        ips(newval,oldval){
            // console.log(newval,'new;;;ld')
        },
        selectedProvince(newval,oldval){
           this.nameList.forEach(el=>{
               if(newval==el.content.country){
                   let lang = null
                   if(this.$route.query.lang){
                       lang = this.$route.query.lang
                   }
                   let code=el.content.location_code
                //    console.log(1111,code)
                   this.$router.push({path: '/mapDetailUrl', query: {country: newval,code:code,lang:lang?lang:'zh'}})
               }
           })
        },
          lastmileList(newval,oldval){
              
             
              if(this.lastmileList.length>=1){
                  this.searchArr1=[]
                  this.searchArr2=[]
                  this.lastmileList.forEach(el=>{
                      if(el.active){
                         this.searchArr1.push(el)
                      }else{
                         this.searchArr2.push(el)
                      }
                      
                  })
              }
            //   console.log(this.searchArr1,this.searchArr2,'this.searchArr1')
          },
          mapCountry(newval,oldval){

              if(this.$route.query.country){
            // console.log(111111111111111,newval)
                   const _this = this
                 _this.selectedProvince=_this.$route.query.country
                 _this.mapCountry.forEach(el => {
                       if(el.code==_this.$route.query.country){
                           _this.mapCity=el.province
                       }
                   })
                   if(_this.mapCity[0].code){
                      _this.selectedCity=_this.mapCity[0].code
                   }
                   
               }
          },
          lastmileRate(newval,oldval){
            //   console.log(11111111111111111)
             this.echartData=[]
             this.lastmileRate.data.forEach(element => {
                 let data={
                     
                 }
                 data.name=element.lastmile_name+' - '+element.service_name
                 data.data=element.rate
                 data.data1=element.rate
                 data.type='line'
                 this.echartData.push(data)
             });
             
            //  console.log(this.lastmileRate,'lastmileRate')
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
  flex:1;
  text-align: center;
  color:#333;
  font-size:12px;
  border-right:1px solid #DDD;
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
      border-bottom:1px solid #2F9AC0;
      
  }
  main{
      flex:1;
      position: relative;
  }
  
  .list{
      overflow-y: scroll;
      overflow-x: none;
      height:calc( 100vh - 323px );
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
       width: 1000px;
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
       max-width:1020px;
      max-height:400px;
      overflow-x: auto;
      overflow-y: auto;
   }
   .boxScroll{
       overflow-y: auto;
       max-height:650px;
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