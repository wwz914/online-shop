<template>
  <div class="check-container">
    <div class="upline">
        <div class="page-content flex ai-center jc-start" style="font-size: 28px;">
            <i class="el-icon-s-order" style="color:#FF6700;"></i>
            <span class="title" style="margin-left:16px;">我的订单</span>
        </div>
    </div>
    <div class="content">
      <div class="page-content">
        <div class="item">
          <span style="margin-bottom:20px">收货地址</span>
          <div class="adds" style="margin-bottom:36px;">
            <div class="add" v-for="i in address">
              <div>name</div>
              <div>123456789</div>
              <div>address</div>
              <div>school</div>
            </div>
            <div class="add"><i class="el-icon-circle-plus-outline"></i></div>
          </div>
        </div>
        <div class="item">
          <span>商品及优惠券</span>
          <el-divider></el-divider>
          
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data(){
    return{
      address:[]
    }
  }
}
</script>

<style lang="scss" scoped>
.check-container{
  .upline{
        height: 81px;
        border-bottom: 1px solid #FF6700;
  }
  .content{
    padding: 20px 0;
    background-color: #F5F5F5;
    .page-content{
      padding: 56px 80px;
      text-align: left;
      background-color: #fff;
      .item{
        font-size: 18px;
      }
    }
  }
}
</style>