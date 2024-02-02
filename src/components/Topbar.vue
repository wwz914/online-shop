<template>
  <div class="topbar-container w100">
    <div class="page-content flex jc-end">
      <div class="ops flex h100 ai-center">
        <div class="op" @click="loginVisible=true">登录</div>|
        <div class="op" @click="signinVisible=true">注册</div>
        <div class="op">我的订单</div>
        <div class="op">我的收藏</div>
        <div class="op"><i class="el-icon-shopping-cart-2"></i>购物车(0)</div>
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
              <el-button type="primary" class="w100">登录</el-button>
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
              <el-button type="primary" class="w100">注册</el-button>
            </el-form-item>
         </el-form>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import '@/assets/public.css'
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
      loginVisible:false,
      signinVisible:false,
      loginForm:{},
      signinForm:{},
      rules:{
        username:[{required:true, message:'请输入账号', trigger:'blur'}],
        password:[{required:true, message:'请输入密码', trigger:'blur'}],
        confirmPwd:[{required:true, validator:validatePwd, message:'请再次输入密码', trigger:'blur'}],
      },
    }
  },
  methods:{
    loginHandleClose(){
      this.loginVisible=false,
      this.$refs['login'].resetFields()
    },
    signinHandleClose(){
      this.signinVisible=false,
      this.$refs['signin'].resetFields()
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