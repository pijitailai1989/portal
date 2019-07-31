<template>
    <div style="padding:10px 10px 0;box-shadow:0 2px 2px #F1F1F1;" class="text anim">
        <div style="padding:10px 0">
            <img :src="baseURL + postItem.logo" alt="" v-if="postItem.logo">
			<p v-else>{{ postItem.lastmile_name }}</p>
        </div>
        <div style="padding:5px 0" v-show="postItem.capital_starting_price">
            <span style="color:#666;font-size:16px;">{{news.SD}}：{{postItem.currency}} </span>
            <span style="color:#2F9AC0;font-size:16px;">{{ postItem.capital_starting_price == postItem.capital_ending_price ? postItem.capital_starting_price : postItem.capital_starting_price + '-' + postItem.capital_ending_price }}</span>
            <span class="hiddenT" style="color:#999;font-size:16px;">( {{news.SZ}} )</span>
        </div>
     <div style="padding:5px 0" v-show="postItem.other_starting_price">
         <span style="color:#666;font-size:16px;">{{news.QT}}：{{postItem.currency}}</span>
         <span style="color:#2F9AC0;font-size:16px;">{{postItem.other_starting_price==postItem.other_ending_price?postItem.other_starting_price:postItem.other_starting_price+'-'+postItem.other_ending_price}}</span>
         <span class="hiddenT" style="color:#999;font-size:16px;">( {{news.SZ}} )</span>
     </div>
     <div class="flexs j-between a-center" style="padding:5px 0">
         <div class="flexs a-center">
             <el-tooltip class="item" :content="news.JGXQ" placement="bottom" effect="light">
             <i class="iconfont icon-biaoqian" style="color: #2F9AC0;font-size: 28px;cursor: pointer;" @click.stop="alertInfo(postItem.lastmile_code)"/>
             </el-tooltip>
             <el-tooltip class="item" :content="news.WLFWXQ" placement="bottom" effect="light">
             <i class="iconfont icon-liebiao" style="color: #2F9AC0;font-size: 30px;cursor: pointer;" @click.stop="alertDetail(postItem)"/>
             </el-tooltip>
         </div>
         <div class="flexs a-end" v-if="postItem.active">
             <!-- <p v-if="postItem.icon==1" class="flexs a-center" @click.stop="alertContrast(1)">
                 <span style="color:#E78483;cursor: pointer;">运费对比</span>
                 <i class="iconfont icon-jiantou_shangxiaqiehuan_o" style="color: #E78483;font-size: 25px;cursor: pointer;" />
             </p> -->
            
             <i v-if="postItem.icon==0" class="iconfont icon-quan" style="color: #2F9AC0;font-size: 22px;cursor: pointer;" @click.stop="setLastmileList(1,postItem.lastmile_name)"/>
             <i v-else class="iconfont icon-icon" style="color: #2F9AC0;font-size: 25px;cursor: pointer;" @click.stop="setLastmileList(0,postItem.lastmile_name)"/>
         </div>
     </div>
  </div>
</template>

<script>

  export default {
    name:'logList',
    props:{
        postItem:{
            type:Object,
            default:function(){
                return {}
            }
        }
    },
    data () {
      return {

      };
    },

    components: {

    },

    computed: {
        news(){
       return this.$t('news')
      },
    },

    beforeMount() {},

    mounted() {
        // console.log(this.postItem,'postItem')
    },

    methods: {
        alertContrast(data){
            
            this.$emit('echartContrast',data)
        },
        alertDetail(data){
            this.$emit('childPost3',data)
        },
        alertInfo(lastmile_code){
            this.$emit('childPost',lastmile_code)
        },
        setLastmileList(icon,lastmile_name){
            // console.log(icon,lastmile_name,'lastmile_namelastmile_name')
            let data={
                icon:icon,
                name:lastmile_name
            }
            this.$emit('childPost1',data)
        }
    },

    watch: {}

  }

</script>
<style lang='' scoped>
.text{
}
 .text>div:nth-child(1){
    width:250px;
 }
 .text>div:nth-child(1)>img{
    width:200px;
    height:60px;
 }
 .anim {
	      animation-fill-mode: both;
        -webkit-animation:fadeInLeft .5s linear;
        animation:fadeInLeft .5s linear;
    }
</style>
