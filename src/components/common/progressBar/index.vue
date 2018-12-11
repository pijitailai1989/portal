<template>
    <div class="progressBox" :style="{width:width}">
        <div class="progressContainer">
            <div class="progress" :style="{ width:progress + '%' ,backgroundColor: bgcolor }"></div>
        </div>
        <b class="progressValue">{{ progress }}%</b>
    </div>
</template>

<script>
    export default {
        props: {
            width: {
                type: String,
                default: '80%'
            },
            bgcolor: {
                type: String,
                default: '#2F9AC0'
            },
            progress: {
                type: Number,
                default: 30
            }
        },
        data() { 
            return {
                
            }
        },
        methods: {}
    }
</script>

<style scoped>
    .progressBox{
        width: 90%;
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
    div.progressContainer {  
        height: 4px;    
        width: 80%;    
        border-radius: 10px;   
        background-color: #EAEAEA;    
        margin-left: 2%;    
    }
       
    div.progress {    
        display: inline-block;
        border-radius: 10px;    
        height: 4px;    
        line-height: 4px;    
    }
    
    b.progressValue {    
        margin-left: 10px;
        color: #2F9AC0;    
        font-weight: 100;    
        font-size: 14px;   
    }
</style>