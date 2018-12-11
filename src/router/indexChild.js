export default[
    // {
    //     path: '/HelloWorld',
    //     component: HelloWorld => require(['@/components/HelloWorld'], HelloWorld)   //例子
    //  }'
    {
      path: '/cargo',
      component: cargo => require(['@/components/cargo/index'], cargo),   //货物追踪
      children:[
        {
          path: '/cargo/expressTracking',
          name: 'expressTracking',
          component: expressTracking => require(['@/components/cargo/expressTracking/index'], expressTracking) 
        }
      ]
    }
]