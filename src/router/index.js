import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  // 重定向
  {path:'/',redirect:'/home'},
  {path:'/home',redirect:'/home/index'},
  {
    path:'/home',
    name:'home',
    component:()=>import('@/views/Home.vue'),
    children:[
      {path:'index',name:'index',component:()=>import('@/views/pages/Index.vue')},
      {path:'detail/:productId',name:'detail',component:()=>import('@/views/pages/Detail.vue')},
      {path:'good',name:'good',component:()=>import('@/views/pages/Good.vue')},
      {path:'like',name:'like',component:()=>import('@/views/pages/Like.vue')},
      {path:'cart',name:'cart',component:()=>import('@/views/pages/Cart.vue')},
      {path:'order',name:'order',component:()=>import('@/views/pages/Order.vue')},
      {path:'check',name:'check',component:()=>import('@/views/pages/Check.vue')},
    ]
  },
]

const router = new VueRouter({
  routes
})

export default router
