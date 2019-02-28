<template>
  <div id="header" class="header navbar-transparent small-header">
    <div class="top-bar">
        <div class="container">
            <div class="header-nav">
                <nav class="navbar">
                    <div class="navbar-header">
                        <div class="mobile-navigation">
                            <div id="sub-box">
                                <button class="close-btn icon iconfont icon-cha" @click="close"></button>
                                <ul class="navigation">
                                    <li><router-link to="/">{{nav.home}}</router-link></li>
                                    <li><router-link to="/">{{nav.service}}</router-link></li>
                                    <li><router-link to="/cargo">{{nav.cargoTracking}}</router-link></li>
                                    <li><router-link to="/menu/personalCenter">{{nav.personalCenter}}</router-link></li>
                                    <li><router-link to="/menu/orderCreate">{{nav.createOrder}}</router-link></li>
                                    <li><router-link to="/menu/personalCenter">{{nav.myOrder}}</router-link></li>
                                </ul>
                                <div class="login-register">
                                    <a href="#" class="login">{{nav.login}}</a>
                                    <a href="#" class="register">{{nav.register}}</a>
                                </div>
                            </div>
                        </div>
                        <button type="button" @click="open" class="navbar-toggle collapsed">
                            <span class="sr-only">Toggle navigation</span>
                            <span class="icon-bar"></span>
                            <span class="icon-bar"></span>
                            <span class="icon-bar"></span>
                        </button>
                        <h1 class="logo-title">
                            <a class="logo" href="/">
                              <img v-if="!isDefult && isIndexPage" src="@/assets/img/logo.png" alt="logo">
                              <img v-else src="@/assets/img/logo-blue.png" alt="logo">
                              <span>{{nav.logoName}}</span>
                            </a>
                        </h1>
                    </div>
                    <div class="collapse navbar-collapse nav-wil" id="navbar-collapse">
                        <ul class="nav navbar-nav navbar-left">
                            <!-- <li><router-link to="/" :class="{'active' : $router.history.current.path === '/'}">{{nav.home}}</router-link></li> -->
                            <!-- <li><router-link to="/" class="routerTag">{{nav.service}}</router-link></li> -->
                            <!-- <li class="mine-order">
                              <a :class="{'active' : $router.history.current.path === '/cargo'}"  exact>{{nav.service}}</a>
                              <ol class="dropdown-submenu" style="left: 50%; margin-left: -60px;">
                                 <li><router-link to="/cargo">{{nav.cargoTracking}}</router-link></li>
                                 <li><router-link to="/freightContrast">{{nav.freightContrast}}</router-link></li>
                                 <li><router-link to="/menu/logisticsService#calculator">{{nav.freightCalculator}}</router-link></li>
                              </ol>
                            </li> -->
                            <!-- <li><router-link to="/cargo" class="routerTag">货物追踪</router-link></li> -->
                            <!-- <li><router-link to="/cargo" :class="{'active' : $router.history.current.path === '/cargo'}">{{nav.cargoTracking}}</router-link></li> -->

                            <!-- <li><router-link to="/menu/personalCenter"  :class="{'active' : $router.history.current.path === '/menu/personalCenter'}">个人中心</router-link></li> -->
                            <li @click="clickTo('hz')"><router-link to="/" class="routerTag">{{news.HZ}}</router-link></li>
                            <li @click="clickTo('fg')"><router-link to="/" class="routerTag">{{news.FG}}</router-link></li>
                            <li @click="clickTo('pt')"><router-link to="/" class="routerTag">{{news.PL}}</router-link></li>
                            <!--<li><router-link to="/menu/logisticsService#calculator" class="routerTag">运费计算器</router-link></li>-->
                            <li><router-link to="/freightContrast" class="routerTag">{{news.YF}}</router-link></li>
                            <li><a href="https://blog.spiderlocker.com" target="blog" class="routerTag">{{news.BK}}</a></li>
                            <li><a href="https://developer.spiderparcel.com" target="blog" class="routerTag">API</a></li>
                            <!-- <li><router-link to="/" class="routerTag">关于我们</router-link></li> -->
                        </ul>
                        <ul class="nav navbar-nav navbar-right">
                        <!--
                            <li><router-link to="/menu/orderCreate" :class="{'active' : $router.history.current.path === '/menu/orderCreate'}">{{nav.createOrder}}</router-link></li>
                            <li class="mine-order">
                              <router-link to="/" class="routerTag">{{nav.myOrder}}</router-link>
                              <ol class="dropdown-submenu">
                                <li><router-link to="/">{{nav.incomingOrder}}</router-link></li>
                                <li><router-link to="/">{{nav.pendingOrder}}</router-link></li>
                                <li><router-link to="/">{{nav.receivingOrder}}</router-link></li>
                                <li><router-link to="/">{{nav.abnormalOrder}}</router-link></li>
                              </ol>
                            </li>
                            <li v-if="!$store.state.home.isLogin"><a @click="getUserInfor()" :href="baseURL+'/login'">{{nav.login}}</a></li>
                            <li v-if="!$store.state.home.isLogin"><a :href="baseURL+'/register'"><span class="register">{{nav.register}}</span></a></li>
                            <li v-if="$store.state.home.isLogin" class="mine-order">
                              <a class="routerTag"><span class="show-username">{{$store.state.home.userProfile.name}}</span></a>
                              <ol class="dropdown-submenu userName">
                                <li><router-link to="/">{{nav.myBalance}}</router-link></li>
                                <li><a :href="baseURL+'/logout'">{{nav.logout}}</a></li>
                              </ol>
                            </li>
                         -->
                            <li>
                              <a>
                                 <span @click="toggleLang('en')" :style="{color:$i18n.locale == 'en'?'#F4B33D':''}" :class="[$i18n.locale == 'en'?'active':'']">English</span>
                                  |  
                                 <span @click="toggleLang('zh')" :style="{color:$i18n.locale == 'zh'?'#F4B33D':''}" :class="[$i18n.locale == 'zh'?'active':'']">繁体中文</span> 
                              </a>
                            </li>
                        </ul>
                    </div>
                </nav>
            </div>
        </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  props:{
    isIndexPage:Boolean
  },

  data () {
    return {
      isDefult: false,
      isLogin: false,
      threezerotwo: false,
      loginList: {}
    }
  },
  computed:{
     nav(){
       return this.$t('nav')
     },
     news(){
       return this.$t('news')
      },
  },
  mounted() {
    this.getUserInfor()
    window.addEventListener('scroll', this.scrollBody)
    this.addBgcolor()
  },
  methods: {
    clickTo(str){
      this.$emit('postFn',str)
    },
    toggleLang(lang) {
      let en = this.$i18n.locale;
      if(en != lang){
           if(lang == 'zh'){
               sessionStorage.setItem('locale', 'zh')
               this.$i18n.locale = sessionStorage.getItem('locale')
               this.switchLangUrl(this.$i18n.locale)
               location.reload();
               
             } else if (lang == 'en') {
               sessionStorage.setItem('locale', 'en')
               this.$i18n.locale = sessionStorage.getItem('locale')
               this.switchLangUrl(this.$i18n.locale)
               location.reload();
            }
      }
      
     
    },
    scrollBody() {
      let scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
      if(scrollTop > 0){
        $(".header").addClass("scorll-header")
        $(".header").removeClass("navbar-transparent")
        $("#navbar-collapse").collapse('hide');
        this.isDefult = true
      }else{
        $(".header").removeClass("scorll-header")
        $(".header").addClass("navbar-transparent")
        $("#navbar-collapse").collapse('hide');
        this.isDefult = false
      }
    },
    addBgcolor() {
      if(!this.isIndexPage){
        $("#header").addClass('sub-header')
      }else{
        $("#header").removeClass('sub-header')
      }
    },
    open() {
        $("#sub-box").show();
        this.stop();
    },
    close() {
        $("#sub-box").hide();
        this.move();
    },
    stop(){
      let mo=function(e){e.preventDefault();};
      document.body.style.overflow='hidden';
      document.addEventListener("touchmove",mo,false);//禁止页面滑动
    },
    move(){
      let mo=function(e){e.preventDefault();};
      document.body.style.overflow='';//出现滚动条
      document.removeEventListener("touchmove",mo,false);
    },
    getUserInfor() {
      this.$http.get('/user/profile').then(res => {
        // console.log(res.data, '获取用户信息')
        if(res.data.status){
          this.$store.state.home.isLogin = res.data.status;
          this.$store.state.home.userProfile = res.data.data
        }else{
          this.$store.state.home.isLogin = res.data.status
          this.$store.state.home.userProfile = null
        }
      })
    },
    switchLangUrl(lang) {
      this.$http.get('/set-locale/'+lang).then(res => {
        if(res.status === 200){
          // this.$router.go(0)
          // console.log(res.data)
        }
      })
    }
  }
}

</script>

<style scoped>
  .header{
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    min-height: 96px;
    background-color: #FCFCFC;
    z-index: 10;
    -webkit-transition: background-color .2s ease;
    transition: background-color .2s ease;
    -webkit-box-shadow: 0 6px 24px rgba(0,0,0,.19);
    box-shadow: 0 3px 10px rgba(0,0,0,.19);
  }
  .navbar-transparent {
    background-color: hsla(0,0%,100%,0);
    -webkit-box-shadow: none;
    box-shadow: none;
  }

  .bgcolor{
    background: -webkit-linear-gradient(left, #6EDFFC , #2B97BE);
    background: -o-linear-gradient(right, #6EDFFC, #2B97BE);
    background: -moz-linear-gradient(right, #6EDFFC, #2B97BE);
    background: linear-gradient(to right, #6EDFFC , #2B97BE);
  }

  .scorll-header{
     background-color: #FCFCFC !important;
  }

  .scorll-header .navbar-nav > li > a{
    color: #999999;
  }

  .scorll-header .logo-title span{
    color: #2F9AC0;
  }

  .scorll-header nav li a.active{
    color: #2F9AC0;
  }

  .scorll-header nav li a.active::after{
    background-color: #2F9AC0;
  }

  .sub-header{
    background-color: #FCFCFC;
    
  }
  .sub-header .navbar-nav > li > a{
    color: #999999;
  }
  .sub-header .navbar-nav > li > a.active{
    color: #2F9AC0;
  }
  .sub-header .navbar-nav > li > a.active::after{
    background-color: #2F9AC0;
  }
  .sub-header .logo-title span{
    color: #2F9AC0;
  }

  .sub-header nav>li a.active{
    color: #2F9AC0;
  }

  .sub-header nav>li a.active::after{
    background-color: #2F9AC0;
  }
  .navbar-nav > li > a{
    position: relative;
    color: #ffffff;
  }

  .navbar-nav > li > a span{
    font-size: 16px;
    cursor: pointer;
  }
  .navbar-nav > li > a span.active{
    cursor: not-allowed;
  }
  .logo-title span{
    font-size: 30px;
    color: #ffffff;
    vertical-align: middle;
  }

  .navbar{
    margin-bottom: 0;
  }

  .navbar-nav > li > a{
    font-size: 16px;
  }
  
  nav>li a.active{
    font-size: 18px;
    /* font-weight: 900; */
  }

  .navbar-toggle{
    margin-top: 30px;
    background-color: #ffffff;
    border: 1px solid #dddddd;
  }

  .navbar-toggle .icon-bar{
    border: 1px solid #2B97BE;
  }
  @media (max-width: 768px) {
    .small-header{
      min-height: 80px;
    }
    .small-header .logo-title{
      margin-top: 10px;
    }

    .small-header .navbar-toggle{
      margin-top: 25px;
    }
  }
  
  @media (min-width: 768px) {
    .small-header{
      min-height: 80px;
    }
    .small-header .logo-title{
      margin-top: 10px;
    }

    .small-header .navbar-toggle{
      margin-top: 25px;
    }
    .container {
      width: 750px;
    }

    .navbar-nav > li > a {
      padding: 15px 5px;
    }

    nav li a.active::after{
      display: none;
    }

    nav li a:hover, a:focus{
      background-color: transparent;
    }

    .register{
      background-color: transparent;
      border-radius: 0;
    }
  }
  /* @media (min-width: 768px) {
    .container {
      width: 750px;
    }
    .navbar-nav > li > a{
      padding: 38px 8px;
      font-size: 15px;
    }
    .logo-title{
      margin-right: 15px;
      font-size: 22px;
      margin-top: 38px;
    }
    .logo-title img{
      width: 56px
    }
    nav li a.active::after{
      display: block;
      content: '';
      position: absolute;
      top: 70px;
      left: 50%;
      width: 60%;
      height: 2px;
      margin-left: -30%;
      background-color: #ffffff;
    }
    nav li a:hover, a:focus{
      background-color: transparent !important;
    }
  } */

  @media (min-width: 992px) {
    .header .logo-title{
      margin-top: 20px;
    }

    .container {
      width: 1020px;
    }

    .navbar-toggle {
        height: 0;
        
    }

    .navbar-nav > li > a {
      padding: 38px 6px;
    }

    nav li a.active::after{
      display: block;
      content: '';
      position: absolute;
      top: 70px;
      left: 50%;
      width: 60%;
      height: 2px;
      margin-left: -30%;
      background-color: #ffffff;
    }

    .register{
      padding: 5px 10px;
      background-color: #ffffff;
      border-radius: 15px;
      color: #2B97BE;
    }
  }

  @media (min-width: 1200px) {
    .header .logo-title{
      margin-top: 20px;
      margin-right: 42px;
    }
    .container {
      width: 1200px;
    }

    .navbar-nav > li > a {
      padding: 38px 10px;
    }

    nav li a.active::after{
      display: block;
      content: '';
      position: absolute;
      top: 70px;
      left: 50%;
      width: 20px;
      height: 2px;
      margin-left: -10px;
      background-color: #ffffff;
    }

    nav li a:hover, a:focus{
      background-color: transparent !important;
    }

    .register{
      padding: 5px 10px;
      background-color: #ffffff;
      border-radius: 15px;
      color: #2B97BE;
    }
  }

  #sub-box{
        z-index: 20;
        position: fixed;
        top: 10px;
        right: 10px;
        width: 350px;
        padding: 20px;
        max-width: calc(100% - 20px);
        max-height: calc(100vh - 20px);
        display: none;
        border-radius: 10px;
        background: #fff;
        border: #dddddd;
        -webkit-box-shadow: 0 6px 24px rgba(0,0,0,.19);
        box-shadow: 0 6px 24px rgba(0,0,0,.19);
        overflow: hidden;
        padding-bottom: 70px;
    }
    .close-btn{
        position: absolute;
        top: 0;
        right: 0;
        color: #2F9AC0;
        background: none;
        border: none;
        padding: 20px;
        font-size: 20px;
        font-weight: bold;
        z-index: 100;
    }

    .navigation{
        margin-top: 25px;
    }

    .navigation li a{
        display: block;
        padding: 15px;
        font-size: 16px;
        font-weight: bold;
        color: #999999;
    }

    .navigation li a:hover{
        background: #f7f7f7;
        color: #2F9AC0;
        font-weight: bolder;
    }

    .login-register{
        position: absolute;
        bottom: 0;
        left: 0;
        right: 0;
        background: #f2f2f2;
    }
    .login-register::after{
        display: block;
        content: '';
        clear: both;
        visibility: hidden;
    }
    .login-register a{
        padding: 0 20px;
        line-height: 60px;
        text-transform: uppercase;
        float: left;
        font-size: 16px;
        font-weight: 900;
        color: #2F9AC0;
    }
    .login-register a.register{
        float: right;
    }
    .routerTag{
      position: relative;
    }
    .dropdown-submenu{
      position: absolute;
      top: 65px;
      left: -10px;
      width:120px;
      background:rgba(255,255,255,1);
      border-radius:7px;
      font-size: 16px;
      box-shadow: 0px 0px 6px #dddddd;
      display: none;
      z-index: 10;
    }
    .dropdown-submenu>li{
      padding: 10px 5px;
      text-align: center;
      color: rgb(102, 102, 102);
    }
    .dropdown-submenu>li>a{
      display: inline-block;
      width: 100%;
      height: 100%;
    }

    .dropdown-submenu>li:hover{
      color: #2B97BE;
      /* cursor: pointer; */
      background-color: #FCFCFC;
      border-radius:7px;
    }

    .mine-order:hover > .dropdown-submenu{
      display: block;
      
    }

    .userName{
      left: 50%;
      margin-left: -60px;
    }

    .show-username{
      display: inline-block;
      max-width: 90px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
</style>
