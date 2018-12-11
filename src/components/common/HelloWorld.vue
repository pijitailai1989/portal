<template>
  <div class="hello">
    <h1 v-for="(item,index) in sellerInfo" :key="index" >{{sellerInfo }}</h1>
    <h2>Essential Links</h2>
    
  </div>
</template>

<script>
import {mapState,mapGetters,mapActions,mapMutations} from 'vuex'
export default {
  name: 'HelloWorld',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  },
  computed:{
    // sellerInfo(){
    //   return this.$store.state.home.sellerInfo
    // },
    ...mapState('home',['sellerInfo'])
  },
  methods:{
    ...mapActions('home', ['ajaxSellerRate']),
      async getSellerRate() {
        let res = await this.ajaxSellerRate()
        // console.log('商家评论列表',res)
        return res
      },

  },
  mounted() {
    console.log(mapState)
    this.getSellerRate()
  },
}
</script>

<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
