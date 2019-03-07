import axios from '../axiosPath.js'
import qs from 'qs'

export default {
  namespaced: true,
  state() {
    return {
      GetPackage:{
        currency:[],
        items:{},
        sitems:{}
      },
      countryData:{

      },
      GetAddress:{},
      GetCity:{},
      GetRess:[],
      GetDestination:{},
      GetDstCity:{},
      GetProductInfo:[],
      result:{},
      products:[],
      total_cost:{},
      country_list:[],
      overview:{},
      lastmileList:[],
      regionLocation:[],
      backGo:false,
      rateCard:[],
      priceList:[],
      lastmileCountry:[],
      scrollArr:[],
      nextLocationList:[],
      searchArr:[],
      mapCountry:[],
      lastmileRate:{},
      ips:{
        map:1
      }
    }
  },
  getters: {
    // // find the weight break
        //   var rate_break = [];
        //   response.data.rate_card.forEach(function(rate, idx) {
        //       rate.rate.forEach(function(b, j) {
        //         rate_break.push(b.weight_from);
        //         rate_break.push(b.weight_to);
        //       });
        //   });

        //   // sort and remove duplicated weight point
        //   rate_break = rate_break.sort(function(a, b){return a - b}).filter(function(item, pos, ary) {return !pos || item != ary[pos - 1];});
        //   // build the weight break column
        //   rate_break = rate_break.map(function(r, pos, ary) {
        //     if (pos < ary.length - 1)
        //       return {"ctl": ary[pos] / 1000 + 'kg - ' + ary[pos + 1] / 1000 + ' kg', "start": ary[pos], "end": ary[pos + 1]};
        //   });
        //   rate_break.pop();
        //   // fill in the price of each weight break
        //   response.data.rate_card.forEach(function(rate, idx) {
        //       rate.rate.forEach(function(b, j) {
        //         for (var i = 0; i < rate_break.length; i++) {
        //           if (rate_break[i].start >= b.weight_from || b.weight_to <= rate_break[i].end)
        //             rate_break[i]["rate" + idx] = response.data.currency + " " + b.cost;
        //         }
        //       });
        //   });
    
    tableContent:state=>{
       return state.result.table_content
    },
    tableHead:state=>{
      return state.result.table_head
    },
    totalCost:state=>{
      return state.total_cost
    },

  },
  mutations: {
    getLastmileRate(state,data){

      state.lastmileRate=data
      // console.log(state.lastmileRate,'state.lastmileRate')
    },
    getLastmileMapcountry(state,data){
      state.mapCountry=data
    },
    gitLastmileSearch(state,data){
      state.searchArr=data
    },
    gitNextLocationList(state,data){
      state.nextLocationList=data
    },
    getScroll(state,data){
      state.scrollArr=data
    },
    getLastmileCountry(state,data){
      state.lastmileCountry=data
    },
    setPriceList(state,data){
      let arr=[]
      data.rate_card.forEach(function(rate, idx) {
              rate.rate.forEach(function(b, j) {
                arr.push(b.weight_from);
                arr.push(b.weight_to);
              });
          });

       arr = arr.sort(function(a, b){return a - b}).filter(function(item, pos, ary) {return !pos || item != ary[pos - 1];});

       arr = arr.map(function(r, pos, ary) {
            if (pos < ary.length - 1)
              return {"ctl": ary[pos] / 1000 + 'kg - ' + ary[pos + 1] / 1000 + ' kg', "start": ary[pos], "end": ary[pos + 1]};
          });
      arr.pop();
      data.rate_card.forEach(function(rate, idx) {
                  rate.rate.forEach(function(b, j) {
                    for (var i = 0; i < arr.length; i++) {
                      if (arr[i].start >= b.weight_from || b.weight_to <= arr[i].end)
                        arr[i]["rate" + idx] = data.currency + " " + b.cost;
                    }
                  });
              });

      state.priceList=arr
      // console.log(state.priceList)
    },
    getRateCard(state,data){
      state.rateCard=data
    },
    setback(state,data){
      state.backGo=data
    },
    getRegionLocation(state,date){
      let arr=[]
      if(date.length>=1){

      
        date.forEach(function(data) {
        data.geo_json.features.forEach(function(feature) {
          if (feature.geometry.type === 'MultiPolygon') {
            feature.geometry.coordinates.forEach(function(coordinates) {
              arr.push({
                "id" : data.location_code,
                "name" : data.name_multi_language.local,
                "paths" : coordinates.map(linearRing => linearRing.slice(0, linearRing.length - 1).map(([lng, lat]) => ({lat, lng}))),
                "next_level" : data.has_next_level
              });
            });
          } else if (feature.geometry.type === 'Polygon') {
            arr.push({
              "id" : data.location_code,
              "name" : data.name_multi_language.local,
              "paths" : feature.geometry.coordinates.map(linearRing => linearRing.slice(0, linearRing.length - 1).map(([lng, lat]) => ({lat, lng}))),
              "next_level" : data.has_next_level
            });
          }
        });
      });
      }
      state.regionLocation=arr
    },
    getRegionLocation1(state,date){
      let arr=[]
      if(date.length>=1){

      
        date.forEach(function(data) {
        data.geo_json.features.forEach(function(feature) {
          if (feature.geometry.type === 'MultiPolygon') {
            feature.geometry.coordinates.forEach(function(coordinates) {
              arr.push({
                "id" : data.location_code,
                "name" : data.name_multi_language ? data.name_multi_language.local : '-',
                "paths" : coordinates.map(linearRing => linearRing.slice(0, linearRing.length - 1).map(([lng, lat]) => ({lat, lng}))),
                "next_level" : false
              });
            });
          } else if (feature.geometry.type === 'Polygon') {
            arr.push({
              "id" : data.location_code,
              "name" : data.name_multi_language ? data.name_multi_language.local : '-',
              "paths" : feature.geometry.coordinates.map(linearRing => linearRing.slice(0, linearRing.length - 1).map(([lng, lat]) => ({lat, lng}))),
              "next_level" : false
            });
          }
        });
      });
      }
      state.regionLocation=arr
    },
    getLastmileList(state,data){
      if(data.length>0){
        data.forEach(el=>{
          el.icon=0;
        })
      }
      state.lastmileList=data
    },
    setLastmileList(state,val){
      state.lastmileList.forEach(el=>{
        if(el.lastmile_name==val.name){
          el.icon=val.icon;
        }
      })
      // console.log(state.lastmileList,'state.lastmileList')
    },
    setsearchArr(state,val){
      state.searchArr.forEach(el=>{
        if(el.lastmile_name==val.name){
          el.icon=val.icon;
        }
      })
      // console.log(state.lastmileList,'state.lastmileList')
    },
    getOverview(state,data){
      state.overview=data
    },
    getCountrylist(state,data){
      state.country_list=data
    },
    setTotalCost(state,data){
      if(!data){
        state.total_cost.cost = state.result.total_cost.price.cost
        state.total_cost.tax_in = state.result.total_cost.price.tax_in
        state.total_cost.package_tax = state.result.total_cost.price.package_tax
        state.total_cost.total_cost = state.result.total_cost.price.total_cost
      }else if(data.type){
        state.total_cost.cost = state.result.total_cost[data.type].cost
        state.total_cost.tax_in = state.result.total_cost[data.type].tax_in
        state.total_cost.package_tax = state.result.total_cost[data.type].package_tax
        state.total_cost.total_cost = state.result.total_cost[data.type].total_cost
      }else if(data.a){
        state.total_cost.cost = Math.round( ( parseFloat(state.total_cost.cost) - parseFloat(data.lastAmount) + parseFloat(data.amount) ) * 100) / 100
        state.total_cost.total_cost =  Math.round( ( parseFloat(state.total_cost.total_cost) - parseFloat(data.lastAmount) + parseFloat(data.amount) ) * 100) / 100
        // console.log(data,parseFloat(data.lastAmount))
      }
    },
    getAddress(state,data){
      state.GetAddress=data.origin
    },
    getCity(state,data){
      state.GetCity=data
    },
    getRess(state,data){
      if(data.length>0){
         data.forEach( (element,index) => {
           element.btn=false;
           element.btnClick=false;
           if(element.is_default=='1'){
             data.splice(index,1)
             data.unshift(element)
           }
           
         });
         data[0]['btnClick']=true;
      }
      state.GetRess=data
    },
    btnClick(state,index){
      let arr = state.GetRess;
      if(arr.length){
        arr.forEach(element => {
          element.btnClick=false;
        });
      }
       state.GetRess[index].btnClick=true;
    },
    btnOut(state,index){
       state.GetRess[index].btn=false;
    },
    btnOver(state,index){
      let arr = state.GetRess;
      if(arr.length){
        arr.forEach(element => {
          element.btn=false;
        });
      }
       state.GetRess[index].btn=true;
    },
    getDestination(state,data){
      state.GetDestination=data.dst
    },
    getDstCity(state,data){
      state.GetDstCity=data
    },
    getPackage(state,data){
      state.GetPackage=data
    },
    getProductInfo(state,data){
      state.GetProductInfo=data
    },
    getProcess(state,data){
      state.result=data.result
    },
    getReselectProduct(state,data){
      state.products=data.data
    },
    getIp(state,data){
      state.ips=data.data
    }
  },
  actions: {
    //获取ip.
    async ajaxMap({commit},data) {
      let res = await axios.get('/last-mile/map')
      // console.log(res,'MAP')
      commit("getIp",res)
      return res
      
    },
    //获取excel.
    async ajaxExport({commit},data) {
      let res = await axios.get('/last-mile/map/lastmile_rate-card-export/'+data)
      // console.log(res,5)
      return res
      
    },
    //提交订单.
    async ajaxPlaceOrder({commit},data) {
      let res = await axios.post('/multiple-quote/place-order',data)
      // console.log('订单提交成功！' ,res)
      return res
      
    },
    //更改敏感类型重新获取产品.
    async ajaxReselectProduct({commit},data) {
      let res = await axios.get('/multiple-quote/reselect-product?'+data)
      // console.log(res,5656565)
      commit("getReselectProduct",res)
      return res
      
    },
    //获取多订单数据
    async ajaxGetProcess({commit},id) {
      let {data: res} = await axios.get('/multiple-quote/process?processID='+id)
      // console.log(res)
      commit("getProcess",res)
      return res
      
    },
    //提交订单
    async ajaxStageProduct({commit},data) {
      let  res = await axios.post('/quote/quote-single?stage=product',data)
      return res
    },
    //提交包裹信息
    async ajaxGetPackage1({commit},data) {
      let {data: res} = await axios.post('/quote/quote-single?stage=package',data)
      commit("getProductInfo",res)
      return res
    },
    //获取包裹信息页面地址
    async ajaxGetPackage({commit}) {
      let {data: res} = await axios.get('/quote/on-package')
      commit("getPackage",res)
      return res
    },
    //提交订单地址信息
    async ajaxQuoteSingle({commit},data) {
      let  res = await axios.post('/quote/quote-single?stage=address',data)
      return res
    },
    //获取发货国
    async ajaxGetAddress({commit}) {
      let {data: res} = await axios.get('/address/support-address')
      commit("getAddress",res)
      return res
    },
    //改变国家获取城市时
    async ajaxGetCity({commit},DST) {
      let {data: res} = await axios.get('/address/support-city?dst='+DST)
      commit("getCity",res)
      return res
    },
    async ajaxGetCity1({commit},DST) {
      let {data: res} = await axios.get('/address/support-city?dst='+DST)
      commit("getDstCity",res)
      return res
    },
    //添加发货地址
    async ajaxPostAddress({commit},data){
      let res = await axios.post('/user/address?type=shipper', data) 
      return res
    },
    //删除发货地址
    async ajaxDeleteAddress({commit},id){
      // let date=qs.parse(data)
      // console.log(qs.parse(data),'data')
      let res = await axios.delete('/user/address/'+id)
      return res
    },
    //更新发货地址
    async ajaxUpdateAddress({commit},data){
      let date=qs.parse(data)
      // console.log(qs.parse(data),'data')
      let res = await axios.put('/user/address/'+date.id, data) 
      return res
    },
    //获取发货地址
    async ajaxGetress({commit},data){
      let { data : res } = await axios.get('/user/address', data) 
      commit("getRess",res)
      return res
    },
    //获取目的国
    async ajaxGetDestination({commit}, ORI) {
      let {data: res} = await axios.get('/address/support-dst-country?ori='+ ORI)
      commit("getDestination",res)
      return res
    },
    
   //获取物流服务点
    async ajaxCountrylist({commit}){
       let {data:res} = await axios.get('/last-mile/map/support-country-list')
          commit("getCountrylist",res)
          // console.log(res,'res')
        return res
    },
    //获取物流服务点信息
    async ajaxOverviewCountry({commit}){
      let {data:res} = await axios.get('/last-mile/map/overview-by-country')
         commit("getOverview",res)
        //  console.log(res,'res')
       return res
    },
    //获取国家物流服务点列表信息
    async ajaxLastmileList({commit},data){
      let {data:res} = await axios.get('/last-mile/map/lastmile-list-by-country?'+data)
         commit("getLastmileList",res)
        //  console.log(res,'res')
       return res
    },
    //获取城市物流服务点列表信息
    async ajaxLastmileListRegion({commit},data){
      let {data:res} = await axios.get('/last-mile/map/lastmile-list-by-region/'+data)
         commit("getLastmileList",res)
        //  console.log(res,'res')
       return res
    },
    //获取物流服务点范围
    async ajaxRegionLocation({commit},data){
      let {data:res} = await axios.get('/last-mile/map/region-by-location/'+data)
         commit("getRegionLocation",res)
        //  console.log(res,'res')
       return res
    },
    //获取单个物流服务点范围
    async ajaxLastmileCode({commit},data){
      let {data:res} = await axios.get('/last-mile/map/lastmile-by-code/'+data)
         commit("getRegionLocation1",res.delivery_region)
        //  console.log(res,'res')
       return res
    },
    //获取单个物流服务价格详情
    async ajaxRateCard({commit},data){
      let {data:res} = await axios.get('/last-mile/map/rate-card-by-lastmile-code/'+data)
         commit("getRateCard",res.rate_card)
         commit("setPriceList",res)
        //  console.log(res,'res')
       return res
    },
    //获取末公里国家城市
    async ajaxLastmileCountry({commit},data){
      let {data:res} = await axios.get('/home/last-mile/country')
         commit("getLastmileCountry",res)
        //  console.log(res,'res')
       return res
    },
    //获取首页城市服务
    async ajaxScroll({commit},data){
      let {data:res} = await axios.get('/home/scroll')
         commit("getScroll",res)
        //  console.log(res,'res')
       return res
    },
    //获取地图详情城市服务
    async ajaxNextLocationList({commit},data){
      let {data:res} = await axios.get('/last-mile/next-location-list/'+data)
         commit("gitNextLocationList",res)
        //  console.log(res,'res')
       return res
    },
    //筛选城市服务
    async ajaxLastmileSearch({commit},data){
      let {data:res} = await axios.post('/last-mile/map/lastmile-delivery-search',data)
         commit("gitLastmileSearch",res)
        //  console.log(res,'res')
       return res
    },
    //获取地图详情城市服务
    async ajaxNextLocationList({commit},data){
      let {data:res} = await axios.get('/last-mile/next-location-list/'+data)
         commit("gitNextLocationList",res)
        //  console.log(res,'res')
       return res
    },
    //获取地图详情国家城市
    async ajaxLastmileMapcountry({commit},data){
      let {data:res} = await axios.get('/last-mile/map/country')
         commit("getLastmileMapcountry",res)
        //  console.log(res,'res')
       return res
    },
    //获取物流服务运费对比
    async ajaxLastmileRate({commit},data){
      let {data:res} = await axios.get('/last-mile/map/compare-lastmile-rate?'+data)
         commit("getLastmileRate",res)
        //  console.log(res,'res')
       return res
    },
  }
}
