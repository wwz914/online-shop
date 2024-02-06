<template>
  <div class="topbar-container">
    <div class="page-content flex jc-end">
      <div class="ops flex h100 ai-center">
        <div class="op" @click="$store.commit('changeLogin',true)">登录</div>|
        <div class="op" @click="$store.commit('changeRegister',true)">注册</div>
        <div class="op" @click="toOrder">我的订单</div>
        <div class="op" @click="toLike">我的收藏</div>
        <div class="op" @click="toCart"><i class="el-icon-shopping-cart-2"></i>购物车({{cart}})</div>
      </div>
      <el-dialog title="登录" :visible.sync="loginVisible" width="306px" :before-close="loginHandleClose">
         <el-form ref="login" :model="loginForm" :rules="rules">
            <el-form-item prop="username">
              <el-input v-model="loginForm.username" placeholder="请输入账号" prefix-icon="el-icon-user-solid"></el-input>
            </el-form-item>
            <el-form-item prop="password">
              <el-input v-model="loginForm.password" placeholder="请输入密码" prefix-icon="el-icon-view"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" class="w100" @click="toLogin">登录</el-button>
            </el-form-item>
         </el-form>
      </el-dialog>
      <el-dialog title="注册" :visible.sync="signinVisible" width="306px" :before-close="signinHandleClose">
         <el-form ref="signin" :model="signinForm" :rules="rules">
            <el-form-item prop="username">
              <el-input v-model="signinForm.username" placeholder="请输入账号" prefix-icon="el-icon-user-solid"></el-input>
            </el-form-item>
            <el-form-item prop="password">
              <el-input v-model="signinForm.password" placeholder="请输入密码" prefix-icon="el-icon-view"></el-input>
            </el-form-item>
            <el-form-item prop="confirmPwd">
              <el-input v-model="signinForm.confirmPwd" placeholder="请再次输入密码" prefix-icon="el-icon-view"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" class="w100" @click="toRegister">注册</el-button>
            </el-form-item>
         </el-form>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import {login,register} from '@/api/user.js'
import {cartCount} from '@/api/cart.js'
import '@/assets/public.css'
import { Message } from 'element-ui'
export default {
  data(){
    const validatePwd=(rule,value,cb)=>{
      if(!value){
        cb(new Error('请输入密码'))
      }else if(this.signinForm.password!=value){
        cb(new Error('两次输入密码不一致!'))
      }else{
        cb()
      }
    }
    return{
      loginForm:{},
      signinForm:{},
      rules:{
        username:[{required:true, message:'请输入账号', trigger:'blur'}],
        password:[{required:true, message:'请输入密码', trigger:'blur'}],
        confirmPwd:[{required:true, validator:validatePwd, message:'请再次输入密码', trigger:'blur'}],
      },
      cart:0
    }
  },
  computed:{
    loginVisible(){
      return this.$store.state.isLoginVisisble
    },
    signinVisible(){
      return this.$store.state.isSigninVisisble
    }
  },
  methods:{
    loginHandleClose(){
      this.$store.commit('changeLogin',false)
      this.$refs['login'].resetFields()
    },
    signinHandleClose(){
      this.$store.commit('changeRegister',false)
      this.$refs['signin'].resetFields()
    },
    toLike(){
      this.$router.push('like')
      this.$store.commit('changePage',4)
    },
    toLogin(){
      login(this.loginForm).then(res=>{
        console.log(res);
        this.$cookies.set('xm-token',res.data,'2d')
        Message.success(res.msg)
        this.$store.commit('changeLogin',false)
      })
    },
    toRegister(){
      register(this.signinForm).then(res=>{
        Message.success(res.msg)
        this.$store.commit('changeRegister',false)
      })
    },
    toCart(){
      this.$router.push('cart')
      this.$store.commit('changePage',6)
    },
    toOrder(){
      this.$router.push('order')
      this.$store.commit('changePage',7)
    }
  },
  created(){
    cartCount().then(res=>{
      this.cart=res.data
    })
    const locationIndex=location.href.split('/')[location.href.split('/').length-1]
    if(locationIndex=='like'){
      this.$store.commit('changePage',4)
    }else if(locationIndex=='cart'){
      this.$store.commit('changePage',6)
    }else if(locationIndex=='order'){
      this.$store.commit('changePage',7)
    }else if(locationIndex=='check'){
      this.$store.commit('changePage',8)
    }
  }
}
</script>

<style lang="scss" scoped>
.topbar-container{
  height: 42px;
  font-size: 14px;
  margin-bottom: 20px;
  color: #bdc1c3;
  background-color: #3d3d3d;
  .op{
    padding: 0 10px;
    height: 100%;
    line-height: 42px;
    cursor: pointer;
    &:hover{
      color: #ffffff;
      background-color: #424242;
    }
  }
}
</style>