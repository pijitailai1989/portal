<!--  -->
<template>
<div>
    <el-button @click="centerDialogVisible = true">点击打开 Dialog</el-button>

    <el-dialog
    :visible.sync="centerDialogVisible"
    :show-close="false"
    :lock-scroll="false"
    :close-on-click-modal="false"
    width="30%"
    style="border-radius:20px;"
    center>
        <div class="mainContent "><i class="iconfont icon-chenggong2" style="color: #2F9AC0;font-size: 30px;margin-right:10px;"/>订单提交成功</div>
        <span slot="footer" class="dialog-footer">
            <button class="confrimDialog" @click="centerDialogVisible = false">确 定</button>
        </span>
    </el-dialog>
    <div>
        <logistics-information/>
    </div>
</div>
</template>

<script>
import LogisticsInformation from '@/components/menu/component/logisticsInformation'
export default {
  data() {
    return {
        centerDialogVisible: false
    }
  },

  components: {
      LogisticsInformation
  },

  methods: {
      
  }
}

</script>
<style scoped>
    .success-icon{
        padding: 12px;
        color: #ffffff;
        border-radius: 50%;
        margin-right: 15px;
        background:rgba(47,154,192,1);
    }
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
</style>