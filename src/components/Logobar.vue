<template>
  <div class="logobar-container">
    <div class="page-content flex jc-between ai-center">
      <div class="logo"><img src="@/assets/img/logo.png" alt=""></div>
      <div class="ops flex h100">
        <div class="op" :class="{highlight:pageIndex==1?true:false}" @click="pageIndex=1">首页</div>
        <div class="op" :class="{highlight:pageIndex==2?true:false}" @click="pageIndex=2">全部商品</div>
        <div class="op" :class="{highlight:pageIndex==3?true:false}" @click="pageIndex=3">关于我们</div>
      </div>
      <div class="search-place">
        <el-input placeholder="请输入搜索内容">
          <el-button slot="append" icon="el-icon-search"></el-button>
        </el-input>
      </div>
    </div>
  </div>
</template>

<script>
import "@/assets/public.css"
export default {
  data(){
    return{
      pageIndex:1,
    }
  }
}
</script>

<style lang="scss" scoped>
.logobar-container{
  height: 61px;
  font-size: 14px;
  margin-bottom: 24px;
  .page-content{
    border-bottom: 1px #e6e6e6 solid;
    .ops{
      gap:5px;
      margin-right: 372px;
      .op{
        height: 100%;
        width: 70px;
        cursor: pointer;
        text-align: center;
        line-height: 61px;
        &:hover{
          color: #409eff;
          border-bottom: 2px #409eff solid;
        }
      }
    }
  }
}
.highlight{
  color: #409eff;
  border-bottom: 2px #409eff solid;
}
</style>