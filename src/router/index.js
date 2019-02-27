import Vue from 'vue'
import Router from 'vue-router'
// import home from '@/components/home'
import indexChild from './indexChild';

Vue.use(Router)

export default new Router({
  routes: [
    ...indexChild,
    {
      path: '/',
      component: home => require(['@/components/home/index'], home)   //首页
    },
    {
      path: '/mapDetail',
      component: mapDetail => require(['@/components/menu/mapDetail'], mapDetail)   //地图详情
    },
    {
      path: '/menu',
      component: menu => require(['@/components/menu/index'], menu),   //菜单
      children: [
        {
          path: '/menu/orderCenter',
          name: 'orderCenter',
          component: orderCenter => require(['@/components/menu/orderCenter/index'], orderCenter)  //订单中心
        },
        {
          path: '/menu/orderCenter/orderDetail',
          name: 'orderDetail',
          component: orderDetail => require(['@/components/menu/orderCenter/orderDetail'], orderDetail)  //订单详情
        },
        {
          path: '/menu/orderCreate',
          name: 'singleOrder',
          component: singleOrder => require(['@/components/menu/orderCreate/singleOrder'], singleOrder)  //单个订单
        },
        {
          path: '/menu/orderCreate/offlineOrder',
          name: 'offlineOrder',
          component: offlineOrder => require(['@/components/menu/orderCreate/offlineOrder/index'], offlineOrder)  //线下订单
        },
        {
          path: '/menu/orderCreate/platformOrder',
          name: 'platformOrder',
          component: platformOrder => require(['@/components/menu/orderCreate/platformOrders'], platformOrder)  //平台订单
        },
        {
          path: '/menu/personalCenter',
          name: 'personalCenter',
          component: personalCenter => require(['@/components/menu/personalCenter/index'], personalCenter)  //个人中心
        },
        {
          path: '/menu/logisticsService',
          name: 'logisticsService',
          component: logisticsService => require(['@/components/menu/logisticsService/index'], logisticsService)  //物流服务
        },
        {
          path: '/menu/AccountSettings/AddressManagement',
          name: 'AddressManagement',
          component: AddressManagement => require(['@/components/menu/AccountSettings/AddressManagement'], AddressManagement)  //物流服务
        },
        {
          path: '/menu/logisticsService/aA',
          name: 'aA',
          component: aA => require(['@/components/menu/logisticsService/aA'], aA)  //物流服务
        }
      ],
    },
    {
      path: '/freightContrast',
      redirect: '/freightContrast/index',
      component: freightContrast => require(['@/components/freightContrast/index'], freightContrast),  //运费对比
      children:[
        {
          path: '/freightContrast/index',
          name: 'index',
          component: index => require(['@/components/freightContrast/component/freightContrast'], index) 
        },
        {
          path: '/freightContrast/contrastResult',
          name: 'contrastResult',
          component: contrastResult => require(['@/components/freightContrast/contrastResult'], contrastResult) 
        }
      ]
    }
  ]
})
