<template>
  <div class="stepBox">
          <h2 class="box-title">请选择您所需要上传的订单文件格式</h2>
          <div class="shadow-box">
              <p class="template-title" v-for="(item,index) in spiderTemplate" :key="index">
                  <!-- <i class="iconfont icon-wo" style="color: #aaa;font-size: 18px"/> -->
                  <input type="radio" name="template" :alt="serviceType.spiderType" :title="item.type_id" :value="item.type_id" :id="item.type_id" @change="handeleSelect($event)">
                  <label :for="item.type_id">{{item.name}}</label>
              </p>
              <button class="download-template" @click="downloadFile()">下载模板</button>
              <a href="#" class="experience-template">体验模板</a>
          </div>
          <div class="shadow-box" style="margin-top: 60px;">
              <p class="template-title">使用平台订单格式</p>
              <ul>
                  <li class="template-title" v-for="(item,index) in otherTemplate" :key="index">
                        <input type="radio" name="template" :alt="serviceType.otherType" :title="item.type_id" :value="item.type_id" :id="item.type_id" @change="handeleSelect($event)">
                        <label :for="item.type_id">{{item.name}}</label>
                  </li>
              </ul>
          </div>
          <div class="shadow-box" style="margin-top: 60px;">
              <p class="template-title">使用上次上传格式</p>
              <ul>
                  <li class="template-title" v-for="(item,index) in userTemplate" :key="index" v-if="index<2">
                        <input type="radio" :placeholder="item.name" name="template" :alt="serviceType.userTpye" :title="item.type_id" :value="item.type_id+index" :id="item.id" @change="handeleSelect($event)">
                        <label :for="item.id">{{item.name}}</label>
                  </li>
              </ul>
          </div>
          <div class="shadow-box" style="margin-top: 60px;">
                <div class="diy-template">
                    <p class="template-title" style="margin-bottom: 10px;">
                        <!-- <i class="iconfont icon-wo" style="color: #aaa;font-size: 18px"/> -->
                        <input type="radio" name="template" :alt="serviceType.customType" :title="customerTemplate1.type_id" :value="customerTemplate1.type_id" :id="customerTemplate1.type_id" @change="handeleSelect($event)">
                        <label :for="customerTemplate1.type_id">自定义格式1</label>
                    </p>
                    <p class="explanation">一个包裹一行记录，包裹内含多种货物以多列数据方式记录</p>
                </div>
                <div class="demo-picture">
                    <img :src="baseURL+customerTemplate1.img" class="img-reponsive" alt="">
                </div>
          </div>
          <div class="shadow-box" style="margin-top: 60px;">
                <div class="diy-template">
                    <p class="template-title" style="margin-bottom: 10px;">
                        <!-- <i class="iconfont icon-wo" style="color: #aaa;font-size: 18px"/> -->
                        <input type="radio" name="template" :alt="serviceType.customType" :title="customerTemplate2.type_id" :value="customerTemplate2.type_id" :id="customerTemplate2.type_id" @change="handeleSelect($event)">
                        <label :for="customerTemplate2.type_id">自定义格式2</label>
                    </p>
                    <p class="explanation">一个货物一行记录，包裹内含多种货物以多行数据方式记录（货物在同一个包裹中，则包裹编号一样）</p>
                </div>
                <div class="demo-picture">
                    <img :src="baseURL+customerTemplate2.img" class="img-reponsive" alt="">
                </div>
          </div>
          <!-- 上传文件部分 -->
          <form class="upload-file flexs">
                <div class="sel-ori" style="width:500px;">
                    <label style="font-size: 16px;">选择发货国家</label>
                    <el-select v-model="defalutOri" filterable style="width: 345px; margin-left: 20px;">
                        <el-option
                        v-for="(item,index) in originList"
                        :label="item"
                        :value="index"
                        :key="index">
                        </el-option>
                    </el-select>
                </div>
                <div class="file-uploadbtn">
                    <p class="actionName">上传文件</p>
                    <span class="actionTip">支持文件扩展名：.xls,.xslx</span>
                    <input type="file" class="input-file" id="files" accept=".xls,.xlsx" title=" " @change="beforeUploading($event)">
                </div>
                <span class="successUploadeFileName">{{fileName}}</span>
              <!-- <upload-file/> -->
          </form>
          <div class="upload-btn">
              <el-button type="primary" :loading="loading" @click.native="onUploadFile($event)">开始上传</el-button>
              <!-- <button>上传</button> -->
          </div>
      </div>
</template>

<script>
export default {
    props: {
        status: {
            type: Number,
            default: 1
        }
    },
    data() {
        return {
            loading: false,
            defalutOri: '',
            fileName: '',
            files: '',
            spiderTemplate: [],
            customerTemplate1: {},
            customerTemplate2: {},
            userTemplate: [],
            otherTemplate: [],
            sampleUrl: '',
            originList: {},
            serviceType: {
                spiderType: '',
                otherType: '',
                userTpye: '',
                customType: ''
            },
            okeyType: '',
            okeyTypeId: '',
            logId: '',
            currentData: this.status,
            userTemName: ''
        }
    },

    mounted() {
        this.getTemplateData()
        this.getOrigin()
        console.log(this.status, '999')
    },
    methods: {
        getTemplateData() {
            this.$http.get('/multiple-quote/on-quote').then((res) => {
              console.log(res.data,'看看结果')
                if(res.status === 200){
                    const data = res.data
                    this.serviceType.spiderType = Object.keys(res.data)[0]
                    this.serviceType.otherType = Object.keys(res.data)[1]
                    this.serviceType.customType = Object.keys(res.data)[2]
                    this.serviceType.userTpye = Object.keys(res.data)[3]
                    this.spiderTemplate = data.spider
                    this.customerTemplate1 = data.custom[0]
                    this.customerTemplate2 = data.custom[1]
                    this.userTemplate = data.user
                    this.otherTemplate = data.other
                    this.sampleUrl = data.spider[0].template
                }
            })
        },
        downloadFile() {
            let _Url = process.env.BASE_API
            _Url += this.sampleUrl
            window.location.href = _Url
        },
        getOrigin() {
            this.$http.get('/address/support-address').then((res) => {
                    if(res.status === 200){
                        // console.log(res.data, '获取发货国信息')
                        const originData = res.data
                        this.originList = originData.origin
                    }
            })
        },
        handeleSelect(e) {
            this.logId = e.target.id
            this.okeyType = e.target.alt
            this.okeyTypeId = e.target.title
            this.userTemName = e.target.placeholder
            // console.log(e.target.placeholder, '选择的name')
        },
        beforeUploading(event) {
            const file=document.getElementById("files").value;
            const ext = file.slice(file.lastIndexOf(".")+1).toLowerCase()
            if (ext != "xls" && ext != "xlsx") {
                this.fileName = ''
                this.$message.error("只支持文件扩展名为：.xls,.xslx，请重新上传！")
                return false;
            }else{
                this.$message({
                    message: '文件上传成功！',
                    type: 'success'
                });
                this.fileName = event.target.files[0].name
                this.files = event.target.files[0]
            }
        },
        onUploadFile(event,status) {
            event.preventDefault();
            let formData = new FormData()
            formData.append('file', this.files)
            formData.append('origin',this.defalutOri)
            formData.append('type',this.okeyType)
            formData.append('type_id',this.okeyTypeId)
            // 如果没有选择模板格式或者没有上传文件的不给提交，提示上传excle文件
            let sessionData = {
                    'origin' : this.defalutOri,
                    'type' : this.okeyType,
                    'type_id' : this.okeyTypeId,
                    'id' : this.logId,
                    'name': this.userTemName
                }
            if(!this.okeyType){
                this.$message.error('还没选择上传模板，请选择！');
                return false;
            }
            if(!this.defalutOri){
                this.$message.error('还没选择发货国，请选择！');
                return false;
            }
            if(!this.files){
                this.$message.error('没有上传excle文件，请上传！');
                return false;
            }
            this.loading = true
            // 提交成功发送请求
            switch(this.okeyType) {
                case 'user':
                formData.append('id',this.logId)
                // console.log(sessionData, '上传之前看看数据')
                sessionStorage.setItem("sessionData",JSON.stringify(sessionData));
                this.$http.post('/multiple-quote/custom-excel', formData).then(res => {
                    if(res.status === 200){
                        this.loading = false
                        this.changeFn (2)
                        console.log(res.data, '上次上传格式')
                        sessionStorage.setItem("uploadFile",JSON.stringify(res.data));
                    }
                }).catch(error=>{
                    switch(error.response.data.response_code) {
                        case 400003:
                        this.$message.error(error.response.data.message)
                        break;
                        case 400004:
                        this.errorContent = error.response.data.message
                        break;
                    }
                    this.loading = false
                })
                break;
                case 'custom':
                delete sessionData.id
                sessionStorage.setItem("sessionData",JSON.stringify(sessionData));
                this.$http.post('/multiple-quote/custom-excel', formData).then(res => {
                    if(res.status === 200){
                        this.loading = false
                        this.changeFn (2)
                        console.log(res.data, '自定义格式')
                        sessionStorage.setItem("uploadFile",JSON.stringify(res.data));
                    }
                }).catch(error=>{
                    switch(error.response.data.response_code) {
                        case 400003:
                        this.$message.error(error.response.data.message);
                        break;
                        case 400004:
                        this.errorContent = error.response.data.message
                        break;
                    }
                    this.loading = false
                })
                break;
                default:
                this.$http.post('/multiple-quote/product', formData).then(res => {
                    if(res.status === 200){
                        this.loading = false
                        this.changeFn (3)
                        console.log(res.data, '固定模板')
                    }
                }).catch(error=>{
                	console.log(error.response.data,'错误信息')
                    switch(error.response.data.response_code) {
                        case 400003:
                        this.$message.error(error.response.data.message);
                        break;
                        case 400004:
                        this.$message.error(String(error.response.data.message));
                        break;
                    }
                    this.loading = false
                })
            }

        }
        ,changeFn (type) {
            this.currentData = type
            this.$emit('change-type', type) // 用来触发父组件定义的@change-type
       }
    }
}

</script>

<style scoped>
    .stepBox{
        width: 100%;
        padding: 40px 0;
    }
    .box-title{
        font-size:18px;
        font-weight: 600;
        color: #999999;
        margin-bottom: 30px;
    }
    .shadow-box{
        width: 100%;
        min-height: 154px;
        padding: 25px 20px;
        background: rgba(255,255,255,1);
        -webkit-box-shadow: 0px 6px 16px 0px rgba(225,225,225,0.5);
        box-shadow: 0px 6px 16px 0px rgba(225,225,225,0.5);
        border-radius: 7px;
    }
    .template-title{
        font-size: 16px;
        color: #999999;
        font-weight: bold;
        margin-bottom: 30px;
    }
    .template-title>label{
        font-size: 16px;
        color: #999999;
        font-weight: bold;
        vertical-align: middle;
    }
    .download-template{
        width: 120px;
        height: 36px;
        background: #2F9AC0;
        border-radius: 20px;
        outline: none;
        border: none;
        color: #ffffff;
        font-size: 16px;
    }
    .experience-template{
        padding: 0 15px;
        font-size: 16px;
        color: #2F9AC0;
    }

    input[type='radio']:checked {
        outline: none;
    }
    input[type='radio'] {
        position:relative;
        width:18px;
        height:18px;
        background-color:#ffffff;
        border:solid 1px #2F9AC0;
        -webkit-border-radius:50%;
        border-radius:50%;
        font-size:0.8rem;
        margin:0;
        padding:0;
        display:inline-block;
        vertical-align:middle;
        cursor:default;
        -webkit-appearance:none;
        -webkit-user-select:none;
        user-select:none;
        outline: none;
        -webkit-transition:background-color ease 0.1s;
        transition:background-color ease 0.1s;
    }
    input[type='radio']:checked::after {
        position:absolute;
        content:'';
        top:2px;
        left:2px;
        background:#2F9AC0;
        height:12px;
        width:12px;
        border-radius: 50%;
    }
    .explanation{
        font-size:14px;
        color: #aaaaaa;
        line-height:19px;
    }
    .diy-template{
        padding-bottom: 20px;
        /* border-bottom: 1px dotted #E9E9E9; */
    }
    .upload-file{
        width: 990px;
        margin-top: 60px;
        /* min-height: 267px; */
        /* background-color: #FCFCFC; */
    }
    .sel-ori{
        height: 52px;
        line-height: 50px;
        border:1px solid #2F9AC0;
        border-radius: 10px;
        padding: 0 15px;
        background-color: #FCFCFC;
    }
    .file-uploadbtn{
        position: relative;
        margin-left: 30px;
        padding-left: 50px;
    }
    .actionName{
        padding: 5px 0;
        font-size: 16px;
        color: #333333;
        font-weight: bold;
    }
    .file-uploadbtn::before{
        display: block;
        content: '';
        width: 45px;
        height: 39px;
        position: absolute;
        top: 7px;
        left: 0;
        background: url(../../../../assets/img/shangchuanwenjian.png) no-repeat center center;
    }
    .input-file{
        position: absolute;
        top: 0;
        left: 0;
        height: 52px;
        width: 214px;
        -webkit-opacity: 0;
        -moz-opacity: 0;
        -khtml-opacity: 0;
        opacity: 0;
        filter:alpha(opacity=50);
        -ms-filter:"progid:DXImageTransform.Microsoft.Alpha(Opacity=50)";
        filter:progid:DXImageTransform.Microsoft.Alpha(Opacity=50);
        cursor: pointer;
    }
    .upload-btn{
        margin-top: 60px;
        text-align: center;
    }
    .upload-btn>button{
        display: inline-block;
        width:300px;
        height:50px;
        background:rgba(47,154,192,1) linear-gradient(138deg,rgba(47,183,192,1) 0%,rgba(47,154,192,1) 100%);
        border-radius:30px;
        color: #ffffff;
        font-size: 20px;
        border: none;
        outline: none;
    }
    .successUploadeFileName{
        display: inline-block;
        width: 230px;
        margin-left: 15px;
        line-height: 52px;
        text-align: right;
        color: #2F9AC0;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    }
</style>
