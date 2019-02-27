import axios from '../axiosPath.js'


export default {
  namespaced: true,
  state() {
    return {
      isLogin: false,
      threezerotwo: false,
      userProfile: {},
      originCountry: {}
    }
  },
  getters: {
    
  },
  mutations: {
    receiveOrigin(state, data) {
      state.originCountry = data
    },
    
  },
  actions: {
    async resOrigin({commit}) {
      let {data: res }= await axios.get('/address/support-address')
      commit("receiveOrigin",res)
    },
    //立即订阅
    async ajaxNewsletter({commit},data){
      let {data:res} = await axios.post('/subscribe-newsletter',data)
         
        //  console.log(res,'res')
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
