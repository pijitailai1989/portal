<template>
  <div>
      <div>
        <pocess-state :postNum="statusNum" :statusArr="statusArr" @postStatus="getStatus"/>
      </div>

      <!-- 第一步 -->
      <div v-if="statusNum===1">
          <UploadFile :status="statusNum" @change-type="onChangeType"></UploadFile>
      </div>
      <!-- 第二步 -->
      <div v-if="statusNum===2">
          <matchFile></matchFile>
      </div>
      <!-- 第三步 -->
      <div v-if="statusNum===3">
          <!-- <SelectLogistics @posttoparent="getChild"></SelectLogistics> -->
       </div>  
       <el-dialog
        :visible.sync="centerDialogVisible"
        :show-close="false"
        :lock-scroll="false"
        :close-on-click-modal="false"
        width="30%"
        style="border-radius:20px;"
        top="40vh"
        center>
        <div class="mainContent flexs a-center j-center"><i class="iconfont icon-chenggong2" style="color: #2F9AC0;font-size: 30px;margin-right:10px;"/>{{menu.Order_successfully}}</div>
        <span slot="footer" class="dialog-footer">
            <button class="confrimDialog" @click="submitOk()">{{menu.determine}}</button>
        </span>
    </el-dialog>     
  </div>
</template>

<script>
import PocessState from '@/components/menu/component/processState'
import UploadFile from './uploadFile'
// import SelectLogistics from './selectLogistics'
import matchFile from './matchFile'
export default {
  data() {
    return {
        statusNum:3,
        statusArr:[
             {name:'uploadOrder',status:1,color:false},
             {name:'informationMatching',status:2,color:false},
             {name:'selectLogisticsServices',status:3,color:false},
             {name:'orderSubmitted',status:4,color:false}
         ],
         centerDialogVisible:false
    }
  },
  computed:{
      menu(){
          return this.$t('menu')
          }
  },
  components: {
      PocessState,
      UploadFile,
      matchFile
  },

  methods: {
    getStatus(val){
        this.statusNum=val
    }
    ,onChangeType (type) { // type是子组件$emit传递的参数
        this.statusNum = type
    },
    getChild(val){
        this.statusNum=val
        if(val==4){
            this.centerDialogVisible = true
        }
    },
    submitOk(){
        this.centerDialogVisible = false
        this.statusNum=1
    },
  }
}

</script>

<style scoped>
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
