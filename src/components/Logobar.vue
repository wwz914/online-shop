<template>
  <div class="logobar-container">
    <div class="page-content flex jc-between ai-center">
      <div class="logo"><img src="@/assets/img/logo.png" alt=""></div>
      <div class="ops flex h100">
        <div class="op" :class="{highlight:$store.state.pageIndex==1?true:false}" @click="toIndex">首页</div>
        <div class="op" :class="{highlight:$store.state.pageIndex==2?true:false}" @click="toGood">全部商品</div>
        <div class="op" :class="{highlight:$store.state.pageIndex==3?true:false}" @click="toAbout">关于我们</div>
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
  },
  methods:{
    toIndex(){
      if(this.$store.state.pageIndex!=1){
        this.$router.push('/home/index')
      }
      this.$store.commit('changePage',1)
    },
    toGood(){
      if(this.$store.state.pageIndex!=2){
        this.$router.push('/home/good')
      }
      this.$store.commit('changePage',2)
    },
    toAbout(){}
  },
  created(){
    const locationIndex=location.href.split('/')[location.href.split('/').length-1]
    const pre_locationIndex=location.href.split('/')[location.href.split('/').length-2]
    if(locationIndex=='index'){
      this.$store.commit('changePage',1)
    }else if(locationIndex=='good'){
      this.$store.commit('changePage',2)
    }else if(locationIndex=='about'){
      this.$store.commit('changePage',3)
    }else if(typeof locationIndex*1==Number&&pre_locationIndex=='detail'){
      this.$store.commit('changePage',5)
    }else if(locationIndex=='cart'){
      this.$store.commit('changePage',6)
    }
  }
}
</script>

<style lang="scss" scoped>
.logobar-container{
  height: 61px;
  font-size: 14px;
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