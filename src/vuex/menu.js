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
      total_cost:{}
    }
  },
  getters: {
    tableContent:state=>{
      //  let head = state.data.result.table_head

      //  let arr = state.data.result.table_content

      //  if(arr.length>=1){

      //    arr.forEach(el=>{
      //      el.sort=0;
      //      let pro = el.products
      //      if(pro.length>=1){
              
      //        pro.forEach(item=>{

      //          if(el.best_price_product==item.product_id){
      //             item.best_price_product=1
      //          }else{
      //             item.best_price_product=0
      //          }

      //          if(el.fastest_product==item.product_id){
      //             item.fastest_product=1
      //          }else{
      //             item.fastest_product=0
      //          }

      //          if(el.highest_score_product==item.product_id){
      //           item.highest_score_product=1
      //          }else{
      //             item.highest_score_product=0
      //          }

      //          if(el.choose==item.product_id){
      //           item.choose=1
      //          }else{
      //             item.choose=0
      //          }

      //          item.currency=el.currency;

      //          head.forEach(todo=>{
      //           if(item.product_id==todo.product_id){
      //             Object.assign(item, todo);
      //           }
      //          })
               
      //        })
      //      }
      //    })
      //  }
       return state.result.table_content
    },
    tableHead:state=>{
      return state.result.table_head
    },
    totalCost:state=>{
      return state.total_cost
    }
  },
  mutations: {
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
    }
  },
  actions: {
    //提交订单.
    async ajaxPlaceOrder({commit},data) {
      let res = await axios.post('/multiple-quote/place-order',data)
      console.log('订单提交成功！' ,res)
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
    

    // getAxios({commit}){
    //     axios.get('/x-ray-scan/contraband-type').then(res=>{
    //       commit("setSeller",res.data)
    //       console.log(res,'res')
    //     })
    // }
    
    
  }
}
