<template>
    <el-upload
        id="upload-excel"
        action="upload"
        drag
        :multiple="false"
        :limit= "1"
        style="width:100%;">
        <i class="el-icon-upload"></i>
        <div class="el-upload__text">点击或将文件拖拽到这里上传
            <p>支持扩展名：xslx</p>
        </div>
        <!-- <div class="el-upload__tip" slot="tip">，且不超过500kb</div> -->
    </el-upload>
</template>

<script>
export default {
  data() {
    return {
       
    }
  },

  components: {},

  methods: {}
}

</script>
<style scoped>
</style>