<template>
  <div style="padding:0 20px;height:100%;" class="flexs columns j-around infot">
      <p class="flexs j-around a-center">
         <i v-if="postCode[0]=='battery'" class="iconfont icon-icon" style="color: #2F9AC0;font-size: 18px"  @click="selectType('battery',-1,postIndex)" />
         <i v-else-if="postCode[1]=='battery'" class="iconfont icon-icon" style="color: #2F9AC0;font-size: 18px"  @click="selectType('battery',-1,postIndex)"/>
         <i v-else-if="postCode[2]=='battery'" class="iconfont icon-icon" style="color: #2F9AC0;font-size: 18px"  @click="selectType('battery',-1,postIndex)"/>
         <i v-else class="iconfont icon-wo" style="color: #DCDCDC;font-size: 18px"  @click="selectType('battery',1,postIndex)"/>
         <a>带电</a>
      </p>
      <p class="flexs j-around a-center">
         <i v-if="postCode[0]=='powder'" class="iconfont icon-icon" style="color: #2F9AC0;font-size: 18px"  @click="selectType('powder',-1,postIndex)"/>
         <i v-else-if="postCode[1]=='powder'" class="iconfont icon-icon" style="color: #2F9AC0;font-size: 18px"  @click="selectType('powder',-1,postIndex)"/>
         <i v-else-if="postCode[2]=='powder'" class="iconfont icon-icon" style="color: #2F9AC0;font-size: 18px" @click="selectType('powder',-1,postIndex)"/>
         <i v-else class="iconfont icon-wo" style="color: #DCDCDC;font-size: 18px" @click="selectType('powder',1,postIndex)"/>
         <a>粉末</a>
      </p>
      <p class="flexs j-around a-center">
         <i v-if="postCode[0]=='liquid'" class="iconfont icon-icon" style="color: #2F9AC0;font-size: 18px" @click="selectType('liquid',-1,postIndex)"/>
         <i v-else-if="postCode[1]=='liquid'" class="iconfont icon-icon" style="color: #2F9AC0;font-size: 18px" @click="selectType('liquid',-1,postIndex)"/>
         <i v-else-if="postCode[2]=='liquid'" class="iconfont icon-icon" style="color: #2F9AC0;font-size: 18px" @click="selectType('liquid',-1,postIndex)"/>
         <i v-else class="iconfont icon-wo" style="color: #DCDCDC;font-size: 18px" @click="selectType('liquid',1,postIndex)"/>
         <a>液体</a>
      </p>
      <p class="flexs j-center" style="height:15px;">
        <el-popover
        placement="bottom"
        width="640"
        title="搜派数据检测结果"
        trigger="hover">
         <PopoverSKU :post-items="postItem.items"/>
         <i slot="reference" class="iconfont icon-101" style="color: #2F9AC0;font-size: 16px"/>
       </el-popover>
      </p>
  </div>
</template>

<script>
  import {mapState,mapGetters,mapActions,mapMutations} from 'vuex'
  import PopoverSKU from './popoverSKU'
  export default {
    name:'sensitiveType',
    props:{
      postItem: {
      type: Object,
      default: function() {
        return {}
      }
      },
      postCode: {
      type: Array,
      default: function() {
        return []
      }
      },
      postIndex:{
        type: Number,
        default: 0
      }
    },
    data () {
      return {

      };
    },

    components: {
      PopoverSKU
    },

    computed: {
      ...mapState('menu',[
                        ]),
    },

    beforeMount() {},

    mounted() {
      // console.log(this.postCode,'postItem')
    },

    methods: {
      ...mapActions('menu', [
                           'ajaxReselectProduct'
                           ]),
      selectType(type,i,index){
        // const _this=this
          //  console.log(type,i,index)
           let data={
             type:type,
             i:i,
             index:index,
           }
           this.$emit('posttoparent',data)
        // let data={
        //   ori:this.data.result.origin,
        //   dst:this.postItem.consignee_country_key,
        //   city:this.postItem.consignee_city,
        //   weight:this.postItem.weight,
        //   sitem:['powder'],
        //   parcel_value:this.postItem.parcel_value,
        //   currency:this.postItem.currency
        // }
        //   console.log(_this.$qs.stringify(data))
        // let res = await this.ajaxReselectProduct( _this.$qs.stringify(data) )
        // if(res.status===200){
            
        // }

        // return res

      }
    },

    watch: {}

  }

</script>
<style lang='' scoped>
   a{
     color:#333;
     font-size:14px;
   }
   i{
     cursor:pointer;
   }
</style>