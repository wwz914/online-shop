import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  // 重定向
  {path:'/',redirect:'/home'},
  {path:'/home',name:'home',component:()=>import('@/views/Home.vue')},
]

const router = new VueRouter({
  routes
})

export default router
