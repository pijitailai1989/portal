<template>
  <div>
      <div class="main-content">
          <h1 class="compare-fee">{{news.YF}}</h1>
          <!--<div class="select-origan">-->
              <!--<label style="font-size: 16px;">发货国</label>-->
              <!--<el-select v-model="defalutOri" filterable style="width: 500px; margin-left: 20px;">-->
                <!--<el-option-->
                  <!--v-for="(item,index) in originList"-->
                  <!--:label="item"-->
                  <!--:value="index"-->
                  <!--:key="index"-->
                  <!--&gt;-->
                <!--</el-option>-->
              <!--</el-select>-->
          <!--</div>-->
          <div class="download-part">
                <a class="download-template" @click="downloadFile()">{{news.XZMB}}</a>
                <span class="expresive-template" @click="expreienceTemplate()">{{news.DYYB}}</span>
          </div>
          <div class="upload-box flexs columns">
              <p class="file-name" v-show="fileName">{{fileName}}</p>
              <el-upload
                  id="upload-excel"
                  action="upload"
                  drag
                  :multiple="false"
                  :limit= "1"
                  :on-change="beforeUpload"
                  style="width:100%;">
                  <i class="el-icon-upload" v-show="!fileName"></i>
                  <div class="el-upload__text" v-show="!fileName">{{news.DJHJ}}
                      <p>{{news.ZZC}}：xls、xlsx</p>
                  </div>
                  <div style="font-weight:600;font-size:16px;" v-show="fileName">
                      <a style="text-decoration:underline;">{{news.ChangeTheFile}}</a>
                  </div>
              </el-upload>
              
          </div>
          <div class="submit-btn">
              <el-button type="primary" :loading="loading" @click="newImport()">{{news.KSDB}}</el-button>
          </div>
      </div>
      <el-dialog
      id="errorTemplate"
      :title="news.XXPB"
      :visible.sync="centerDialogVisible"
      :show-close="true"
      :lock-scroll="false"
      :close-on-click-modal="false"
      style="border-radius:20px;"
      center>
        <ul class="errorItemList">
            <li v-for="(item,index) in errorContent" :key="index">（{{index+1}}）{{item}}</li>
        </ul>
      </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
        centerDialogVisible: false,
        loading: false,
        originList: [],
        defalutOri: '',
        sampleUrl: '/sample/Spider Last Mile Compare Template.xlsx',
        fileParms: '',
        fileName: '',
        errorContent: []
    }
  },
  computed:{
    
    materialBenefits(){
        return this.$t('homeMaterialBenefits')
    },
    nav(){
       return this.$t('nav')
     },
     news(){
       return this.$t('news')
     }
  },
  mounted() {
      // this.getOrigin()
  },
  methods: {
      // getOrigin() {
      //     this.$http.get('/spider-product/on-search-products').then(res => {
      //       this.originList = res.data.ori
      //       this.defalutOri = Object.keys(res.data.ori)[0]
      //     })
      // },
      downloadFile() {
        let _Url = process.env.BASE_API
        _Url += this.sampleUrl
        window.location.href = _Url
      },
      beforeUpload (file) {
          var fileName=new Array()
          fileName =file.name.split('.');
          const extension = fileName[fileName.length-1] === 'xls'
          const extension2 =  fileName[fileName.length-1]=== 'xlsx'
          const isLt2M = file.size / 1024 / 1024 < 10
          if (!extension && !extension2) {
              this.$message({
                  message: '上传模板只能是xls、xlsx格式!',
                  type: 'warning'
              });
          }
          if (extension || extension2) {
            //   console.log(file.raw)
              this.fileName = file.raw.name
              let fd = new FormData()
              // fd.append('origin', this.defalutOri)//随文件上传的其他参数
              fd.append('file', file.raw)
              this.fileParms = fd
              this.$message({
                    showClose: true,
                    message: '文件上传成功！',
                    type: 'success'
              });
              return true
          }
          return extension || extension2
        },
        newImport () {
            if(this.fileParms === ''){
                this.$message.error('文件不能为空，请上传文件');
                return false;
            }
            // console.log(this.fileParms)
            this.loading = true
            this.$http.post('/seller-tools/compare-file-upload', this.fileParms).then(res => {
                let processID = res.data.message;
                if(res.status == 200){
                    this.$router.push({
                      path: '/freightContrast/contrastResult',
                      name: 'contrastResult',
                      query: {
                          data: processID
                      }
                    })
                    this.loading = false
                }
            }).catch(error=>{
                switch(error.response.data.response_code) {
                    case 400003:
                    this.$message.error(error.response.data.message)
                    break;
                    case 400004:
                    this.centerDialogVisible = true;
                    this.errorContent = error.response.data.message
                    break;
	                case 400005:
                    this.$message.error(error.response.data.message)
                    break;
                }
                this.loading = false
            })
        },
        expreienceTemplate() {
            this.$http.get('/seller-tools/compare-file-sample').then(res => {
                // console.log(res.data, 'hahhah')
                let processID = res.data.message;
                if(res.status == 200){
                    this.$router.push({
                      path: '/freightContrast/contrastResult',
                      name: 'contrastResult',
                      query: {
                          data: processID
                      }
                    })
                }
            })
        }
      },
      
}

</script>

<style scoped>
    .main-content{
      width: 950px;
      margin: 50px auto;
    }
    .compare-fee{
      line-height:24px;
      margin-bottom: 30px;
      text-align: center;
      font-size:18px;
      font-weight: bold;
      color: #333333;
    }
    .select-origan, .download-part{
      /*text-align: center;*/
      margin-top: 80px;
    }
    .download-template{
      display: inline-block;
      padding:5px 20px;
      line-height: 36px;
      text-align: center;
      background: #2F9AC0;
      border-radius: 10px;
      font-size: 16px;
      color: #ffffff;
      outline: none;
      border: none;
      cursor: pointer;
    }
    .expresive-template{
      font-size:16px;
      color: #2F9AC0;
      line-height:21px;
      margin-left: 15px;
      cursor: pointer;
    }
    .upload-box{
      margin-top: 20px;
      min-height: 246px;
      background-color: #FCFCFC;
      position: relative;
    }
    .submit-btn{
      text-align: center;
    }
    .submit-btn button{
      display: inline-block;
      width:300px;
      height:50px;
      margin-top: 70px;
      background:rgba(47,154,192,1) linear-gradient(138deg,rgba(47,183,192,1) 0%,rgba(47,154,192,1) 100%);
      border-radius:30px;
      color: #ffffff;
      font-size: 20px;
      outline: none;
      border: none;
    }
    .file-name{
        text-align:center;
        margin:80px auto;
        font-size: 25px;
        padding: 0 20px;
        color:#333;
        font-weight:600;
    }
    .errorItemList{
        margin: 0 auto;
        max-height: 380px;
        padding-left: 20px;
        overflow-y: auto;
    }
    .errorItemList>li{
        padding: 5px 0;
        font-size: 14px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    }
</style>
