<template>
  <div class="bottombar-container">
    <div class="page-content">
      <div class="items flex jc-between">
        <div class="item flex ai-center"><img src="@/assets/img/shield.png" alt="">7天无理由退换货</div>
        <div class="item flex ai-center"><img src="@/assets/img/shield.png" alt="">满99天全场包邮</div>
        <div class="item flex ai-center"><img src="@/assets/img/shield.png" alt="">100%品质保证</div>
      </div>
      <div class="github">
        <img src="@/assets/img/github.png" alt="">
      </div>
      <div class="ops flex">
        <div class="op">首页</div>|
        <div class="op">全部商品</div>|
        <div class="op">关于我们</div>
      </div>
      <div class="copyright">
        <span>商城版权所有 © 2012-2021 </span>
      </div>
    </div>
  </div>
</template>

<script>
export default {

}
</script>

<style lang="scss" scoped>
.bottombar-container{
  overflow: hidden;
  height: 336px;
  color: #ffffff;
  background-color: #2f2f2f;
  .items{
    width: fit-content;
    font-size: 20px;
    gap: 200px;
    margin: 54px auto;
  }
  .github{
    margin-top: 74px;
  }
  .ops{
    width: fit-content;
    margin: 12px auto;
    color: #888888;
    .op{
      padding: 0 12px;
    }
  }
  .copyright{
    color: #888888;
    margin: 13px auto;
  }
}
</style>