<template>
  <div class="stepBox">
        <div class="flexs j-between">
            <div class="mandatory">
                <div class="selectItemTitle">必选信息</div>
                <ul class="selectItemsBox flexs rows" id="mustSelect">
                    <li class="selectItems" v-for="(item,index) of must.select" :name="index" :key="item">{{item}}</li>
                    <li class="selectItems" v-for="(val,key) of must.checkbox" :name="key" :key="val" >{{val}}</li>
                </ul>
            </div>
            <div class="options">
                <div class="selectItemTitle">可选信息</div>
                <ul class="selectItemsBox flexs rows" id="optionSelect">
                    <li class="selectItems" v-for="(item,index) of option.select" :name="index" :key="item">{{item}}</li>
                    <li class="selectItems" v-for="(val,key) of option.checkbox" :name="key" :key="val">{{val}}</li>
                </ul>
            </div>
        </div>
        <div class="information-match">
            <h1 class="match-title">信息匹配</h1>
            <p class="match-tip">请您根据表格选择“必要信息”和“可选信息”跟您上传的订单列表相对应的栏目进行信息匹配</p>
        </div>
        <div class="match-table">
            <table class="resultTable" align="center" id="selectTable">
                <thead>
                    <tr class="selectHead">
                        <th v-for="(item,index) in excleLenth" :key="index" style="text-align:center; background: #2F9AC0; color:#fff;">
                            <el-select v-model="value1[index]" placeholder="请选择" @change="handleSelect($event,index)" style="min-width:150px; border:0;">
                                <el-option
                                v-for="(item,key) in optionkk"
                                :key="key+index"
                                :label="item"
                                :value="key">
                                </el-option>
                            </el-select>
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <tr :class="(index === 0) ? 'makeSureHead' : ''" v-for="(item,index) in excle.data" :key="index">
                        <td v-for="(val,kk) in item" :key="kk">{{val}}</td>
                    </tr>
                </tbody>
            </table>
        </div>
        <div class="upload-btn" style="margin-top:100px;">
            <i class="goBack">返回</i>
            <el-button type="primary" :loading="loading" @click.prevent="submitSelectData">完成</el-button>
            <span class="saveRecord" @click="dialogVisible = true; newDateName()">保存上传记录</span>
        </div>
        <el-dialog
        id="template2"
        title="保存上传记录模板"
        :visible.sync="dialogVisible"
        :show-close="true"
        :lock-scroll="false"
        :close-on-click-modal="false"
        @close='closeDialog'
        style="border-radius:20px;"
        center>
            <span>
                <el-input placeholder="请输入保存的文件的名称" v-model="saveTemplateName" clearable></el-input>
            </span>
            <span slot="footer" class="dialog-footer">
                <button class="cancleBtn" @click="dialogVisible = false; saveTemplateName = ''">取 消</button>
                <button class="sureBtn" type="primary" @click="saveFileTemplate()">确 定</button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
export default {
    data() {
        return {
            dialogVisible: false,
            loading: false,
            checked: true,
            excleData: {},
            excleLenth: null,
            value1: [],
            paramsData: {},
            processID: '',
            saveTemplateName: '',
            selectResult: ''
        }
    },

    created() {
        this.excleData = JSON.parse(sessionStorage.getItem('uploadFile'));
        this.excleLenth = this.excleData.excel.head_count
    },
    mounted() {
        this.paramsData = JSON.parse(sessionStorage.getItem('sessionData'))
        this.saveTemplateName = this.paramsData.name
        this.value1 = this.excleData.excel.head
        // console.log(this.excleData, '第二步的数据')
        //
	    console.log([this.excleData.must.select],'呵呵哒')
        //
        // console.log(this.optionkk, '我是生成 的')

    },
    computed:{
        // excle上传过来的数据
        excle() {
            return this.excleData.excel
        },
        // 这里的是必须选择的项目
        must() {
            return this.excleData.must
        },
        // 这里是可选的项目
        option() {
            return this.excleData.option
        },
        // 这里是表头的下拉框的option的
	    mustCopy() {
        	return Object.keys({...this.excleData.must.select,...this.excleData.must.checkbox})
        },
        optionCopy() {
	        return Object.keys({...this.excleData.option.select,...this.excleData.option.checkbox})
        },
        optionkk() {
            const musts = this.excleData.must.select
            const mustc = this.excleData.must.checkbox
            const options = this.excleData.option.select
            const optionc = this.excleData.option.checkbox
            return {...musts,...mustc,...options,...optionc}
        },
        // 初始化一个占位数组
        resultArray() {
            let arr = []
            for(let i=0; i<this.excleLenth; i++){
                arr.push('')
            }
            return arr
        }
    },
    methods: {
        handleSelect(val,key) {
            for(let k=0; k<this.resultArray.length; k++){
                this.resultArray[key] = val
            }
            this.selectResult = val
            if(this.must.select[val]){
                console.log('必选项中的单选')
	            if(this.countOccurences(this.value1,val)>1){
		            this.$message.error(`“${this.must.select[val]}”已经存在，请重新选择！`);
		            return false;
	            }
                // delete this.optionkk[val]
            } else if(this.must.checkbox[val]) {
                console.log('必选项中的多选')

            } else if(this.option.select[val]) {
                console.log('可选项中的单选')
	            if(this.countOccurences(this.value1,val)>1){
		            this.$message.error(`“${this.option.select[val]}”已经存在，请重新选择！`);
		            return false;
	            }
                // delete this.optionkk[val]
            } else if(this.option.checkbox[val]) {
                console.log('可选项中的多选')
            }
        },
        submitSelectData() {
            let tableHeaderData = {
                'type' : this.paramsData.type,
                'origin' : this.paramsData.origin,
                'type_id' : this.paramsData.type_id,
                'file_name' : this.excleData.file_name,
                'head' : this.resultArray
            }
            if(this.paramsData.type === 'user'){
                tableHeaderData.id = this.paramsData.id
	            tableHeaderData.head = this.value1
            }
            console.log(tableHeaderData, '最后得到的参数')
            this.$http.post('/multiple-quote/product', this.$qs.stringify(tableHeaderData)).then(res => {
                console.log(res.data, '获取商品数据')
                this.processID = res.data
            })
        },
        saveFileTemplate() {
            if (!this.saveTemplateName) {
                this.dialogVisible = true
                this.$message.error('请填写完整保存的文件的名称！');
                return false;
            }
            this.dialogVisible = false
            let tableHeaderData = {
                'type_id' : this.paramsData.type_id,
                'id' : this.paramsData.id,
                'head' : this.resultArray,
                'name': this.saveTemplateName
            }
	        if(this.paramsData.type === 'user'){
		        tableHeaderData.head = this.value1
	        }
            this.$http.post('/multiple-quote/custom-save', this.$qs.stringify(tableHeaderData)).then(res => {
                console.log(res, '保存后的结果')
                if(res.status === 200){
                    this.$message({
                        message: '模板保存成功！',
                        type: 'success'
                    });
                }
            })
        },
	    countOccurences(array, value) {
		    return array.reduce((arr, val) => val === value ? arr + 1 : arr + 0, 0)
        },
        newDateName() {
        	// console.log(this.saveTemplateName,'你是呵呵呵')
	        if (!this.saveTemplateName) {
		        const date = new Date()
		        const years = date.getFullYear()
		        const month = (date.getMonth() + 1) <10 ? '0'+(date.getMonth() + 1) : (date.getMonth() + 1)
		        const dates = (date.getDate()) <10 ? '0'+date.getDate() : date.getDate()
		        const hours = (date.getHours()) <10 ? '0'+date.getHours() : date.getHours()
		        const minutes = (date.getMinutes()) <10 ? '0'+date.getMinutes() : date.getMinutes()
		        const seconds = (date.getSeconds()) <10 ? '0'+date.getSeconds() : date.getSeconds()
		        this.saveTemplateName = years + '-' + month + '-' + dates + ' ' + hours + ':' + minutes + ':' + seconds
	        }
        },
	    closeDialog() {
		    this.saveTemplateName = ''
        },
	    // blueSelect(e) {
        //     e.target.classList.add("selectedItems");
        // }
    }
}

</script>

<style scoped>
    .stepBox{
        width: 100%;
        padding: 40px 0;
    }
    /* 第二步 */
    .mandatory, .options{
        width: 540px;
        min-height: 276px;
        padding: 20px;
        background-color: #FCFCFC;
    }
    .options{
        width: 360px;
    }
    .selectItemTitle{
        font-size: 16px;
        color: #333333;
        font-weight: bold;
    }
    .selectItems{
        padding: 8px 16px;
        margin: 30px 15px 0 0;
        font-size: 14px;
        color: #333333;
        background:rgba(243,243,243,1);
        box-shadow:0px 2px 4px 0px rgba(255,255,255,0.5);
        border-radius:18px;
        border: 1px solid transparent;
    }
    .information-match{
        margin-top: 70px;
    }
    .match-title{
        margin-bottom: 17px;
        font-size: 18px;
        color: #999999;
        font-weight: bold;
    }
    .match-tip{
        margin-bottom: 40px;
        font-size: 14px;
        color: #999999;
    }
    .match-table{
        width:990px;
        background:rgba(255,255,255,1);
        box-shadow:0px 6px 12px 0px rgba(230,230,230,0.5);
        border-radius:10px;
        overflow: auto;
    }
    .resultTable{
        text-align: center;
        empty-cells:show;
        border-collapse: collapse;
        margin:0 auto;
    }
    .selectHead th{
        width: 150px;
        height: 60px;
        background-color: #2F9AC0;
        padding: 5px 0;
        white-space: nowrap;
    }
    .selectHead th:first-child{
        border-top-left-radius: 10px;
    }

     .selectHead th:last-child{
        border-top-right-radius: 10px;
     }
     .resultTable tr td{
        padding: 5px;
        color: #333333;
        white-space: nowrap;
     }
     .resultTable tr{
        height: 60px;
        border-bottom: 1px solid #efefef;
     }
     .resultTable .makeSureHead td{
        height: 60px;
        font-size: 14px;
        color: #aaaaaa;
     }
     .goBack{
        margin-right: 40px;
        font-size: 20px;
        color: #F4B33D;
     }
     .saveRecord{
        margin-left: 40px;
        color: #2F9AC0;
        font-size: 18px;
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
    .selectedItems{
        border: 1px solid #2F9AC0;
        box-sizing: border-box;
        color: #2F9AC0;
    }

    .sureBtn, .cancleBtn{
        padding: 10px 25px;
        margin: 0 8px;
        font-size: 16px;
        color: #ffffff;
        border: 1px solid #2F9AC0;
        outline: none;
        border-radius: 8px;
        background: #2F9AC0;
    }
    .cancleBtn{
        background-color: #efefef;
        border: 1px solid #dddddd;
        color: #999999;
    }
</style>
