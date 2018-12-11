<template>
  <div class="flexs columns map">
    <div class="popoBottom1">
      <el-row>
        <el-col :span="5"><div class="weight">SKU</div></el-col>
        <el-col :span="8"><div class="weight">货物描述</div></el-col>
        <el-col :span="4"><div class="weight">敏感类型</div></el-col>
        <el-col :span="7"><div class="weight">检查来源</div></el-col>
      </el-row>
    </div>
    <div class="popoBottom scrollbar">
      <el-row class="line"  v-for="(item,index) in postItems" :key="index">
        <el-col :span="5"><div class="w">{{item.item_sku}}</div></el-col>
        <el-col :span="8"><div class="w">{{item.item_description}}</div></el-col>
        <el-col :span="4"><div class="w" >{{item.item_sensitive_code || '通常'}}</div></el-col>
        <el-col :span="7"><div class="w">{{item.sensitive_source}}</div></el-col>
      </el-row>
      
    </div>
  </div>
</template>

<script>
export default {
  name: 'ksu',
  components: {
  },
  props: {
    postItems: {
      type: Array,
      default: function() {
        return []
      }
     }
  },
  data() {
    return {

    }
  },
  mounted() {
    // console.log(this.postItems, '000')
  },
  methods: {

  }
}
</script>

<style scoped>
     .map{
         width:100%;
         padding:0 10px 10px 10px;
     }
    .popoBottom{
        padding:10px;
        max-height: 300px;
        overflow-y: auto;
    }
    .popoBottom1{
        padding:10px;
    }
    .line{
      border-top:1px dashed #E0E0E0;
      padding:10px 0;
    }
    .cen{
      text-align:center;
    }
    .w{
      padding:0 10px 0 0;
    }
</style>
