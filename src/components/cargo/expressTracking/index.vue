<template>
  <div style="margin-top: 100px;">
      <div class="input-codebox">
          <h1 class="title-letter" style="margin-bottom: 25px;">查件&nbsp;<i class="icon iconfont icon-fangdajing"></i></h1>
          <textarea class="order-code" placeholder="请输入您的物流单号"></textarea>
          <span class="search-btn">查询</span>
      </div>
      <h1 class="title-letter">物流运输流程</h1>
      <div class="flow-chart-container">
          <div class="flow-chart-line">
              <div class="progress-line"></div>
          </div>
          <ul class="flow-char-box flexs a-center j-between">
              <li class="flow-items done">
                  <div class="items-icons"><img src="@/assets/img/delivery-high.png" alt=""></div>
                  <div class="items-steps">1</div>
                  <div class="items-status">卖家发货</div>
              </li>
              <li class="flow-items done">
                  <div class="items-icons"><img src="@/assets/img/warehouse-high.png" alt=""></div>
                  <div class="items-steps">2</div>
                  <div class="items-status">到达搜派仓库</div>
              </li>
              <li class="flow-items">
                  <div class="items-icons"><img src="@/assets/img/coordinate-blur.png" alt=""></div>
                  <div class="items-steps">3</div>
                  <div class="items-status">到达目的国</div>
              </li>
              <li class="flow-items">
                  <div class="items-icons"><img src="@/assets/img/shippin-blur.png" alt=""></div>
                  <div class="items-steps">4</div>
                  <div class="items-status">派送完成</div>
              </li>
          </ul>
      </div>
      <div class="tracking-status flexs a-center j-between">
        <h1 class="tracking-number">物流单号：78103432423432432</h1>
        <span class="status">运输中</span>
        <div id="timezone">
            <el-radio v-model="radio" label="1">发货国时区</el-radio>
            <el-radio v-model="radio" label="2">目的国时区</el-radio>
        </div>
      </div>
      <div class="phase-node">
        <ul>
            <li class="status flexs" v-for="(item,index) in statusArr" :key="index">
                <div class="b flexs j-center">
                    <span v-show="index+1!=statusArr.length"></span>
                    <i v-if="index==0" class="latest">最新</i>
                    <i v-else class="yuan"></i>
                </div>
                <div class="c">
                    <p :class="index==0?'active':''"><span>【{{item.site}}】</span>{{item.text}}，{{item.msg}}如有疑问请电联：<a href="tel" class="tel-call">（{{item.phone}}）</a></p>
                    <div class="a">{{item.date}}</div>
                </div>
            </li>
        </ul>
      </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
        radio: '1',
        statusArr:[
             {date:'2018-09-30 19:09:56',site:'深圳市',text:'已签收',msg:'包裹已经被签收，如有问题请电联顺丰物流',phone:'0734-8978-288'},
             {date:'2018-09-30 19:09:56',site:'广州市',text:'派送中',msg:'包裹已经被签收，如有问题请电联顺丰物流',phone:'0734-8978-288'},
             {date:'2018-09-30 19:09:56',site:'三亚市',text:'运输中',msg:'包裹已经被签收，如有问题请电联顺丰物流',phone:'0734-8978-288'},
             {date:'2018-09-30 19:09:56',site:'三沙市',text:'已入库',msg:'包裹已经被签收，如有问题请电联顺丰物流',phone:'0734-8978-288'}
         ]
    }
  },

  components: {},

  methods: {}
}

</script>

<style scoped>
    .title-letter, .tracking-number{
        font-size:20px;
        color:rgba(51,51,51,1);
        line-height:27px;
        margin-bottom: 45px;
    }
    .flow-chart-container{
        position: relative;
        width: 95%;
        margin: 0 auto;
    }
    .flow-chart-line{
        position: absolute;
        top: 75%;
        left: 0;
        width: 100%;
        height: 2px;
        background-color: #F0F0F0;
    }
    .progress-line{
        position: relative;
        width: 50%;
        height: 3px;
        background-color: #2F9AC0;
    }
    .progress-line::after{
        display: block;
        content: '';
        position: absolute;
        top: -7px;
        right: -10px;
        width:0;
        height:0;
        border-width:9px 0 9px 12px;
        border-style:solid;
        border-color:transparent transparent transparent #2F9AC0;/*透明 灰 透明 透明 */
    }
    .flow-items{
        height: 100px;
        text-align: center;
    }
    .items-steps{
        margin-top: 10px;
    }
    .items-status{
        margin-top: 20px;
    }
    .done > *{
        color: #2F9AC0;
        font-size: 16px;
    }

    .tracking-number{
        margin: 0;
    }
    .tracking-status{
        margin: 100px 0 60px 0;
        padding: 25px 0;
        border-bottom: 1px solid #F9F9F9;
    }
    .status{
        font-size:20px;
        color:rgba(47,154,192,1);
        line-height:27px;
    }

    /*  */

    .status>.a{
      width:auto;
      height:80px;
      color:#C4C4C4;
      font-size:14px;
   }
   .status>.b{
      width:30px;
      height:80px;
      position: relative;
   }
   .status>.b>i{
      position: absolute;
      z-index:2;
      top:7px;
   }
   .status>.b>span{
      width:1px;
      height:80px;
      background: #F0F0F0;
      position: absolute;
      z-index:1;
      top:10px;
   }
   .status>.b>span:last-child{
       width:0;
   }

   .status>.c{
      flex:1;
      height:80px;
   }
   .status>.c>p{
       color:#333333;
       font-size:14px;
   }
   .status>.c>p.active{
       color:#2F9AC0;
   }
   .status>.c>span{
       color:#aaaaaa;
       font-size:14px;
   }
   .yuan{
       border:1px solid #D6D6D6;
       border-radius: 50%;
       background: #D8D8D8;
       width:12px;
       height:12px;
   }

   .tel-call{
       color: #EC9E9E;
   }
   .latest{
        color: rgb(255, 255, 255);
        font-size: 12px;
        background-color: rgb(47, 154, 192);
        width: 30px;
        height: 20px;
        line-height: 20px;
        text-align: center;
        left: 0px;
   }

   .order-code{
        width:950px;
        height:100px;
        padding:20px 15px 15px 15px;
        background:rgba(255,255,255,1);
        box-shadow:0px 6px 14px 0px rgba(232,232,232,0.5);
        outline: none;
        border: none;
        border-radius:13px;
        resize: none;
        color: #333333;
        font-size: 14px;
   }
   .input-codebox{
       margin-bottom: 120px;
   }
   .search-btn{
        display: inline-block;
        width:160px;
        line-height:40px;
        text-align: center;
        margin-top: 30px;
        color: #ffffff;
        font-size: 18px;
        background:rgba(47,154,192,1) linear-gradient(138deg,rgba(47,183,192,1) 0%,rgba(47,154,192,1) 100%);
        border-radius:30px;
        cursor: pointer;
   }
</style>