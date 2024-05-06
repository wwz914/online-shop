<template>
  <div class="detail-container">
    <div class="up-line">
      <div class="page-content flex jc-between ai-center">
        <div class="name">{{data.productName}}</div>
        <div class="ops flex">
          <div class="op">概述</div>
          <div class="op">参数</div>
          <div class="op">用户评价</div>
        </div>
      </div>
    </div>
    <div class="content">
      <div class="page-content flex jc-between">
        <div class="left">
          <el-carousel indicator-position="outside" height="518px">
            <el-carousel-item v-for="i in data.pictures">
              <div class="pic">
                <img :src="i.productPicture" alt="" class="w100 h100">
              </div>
            </el-carousel-item>
          </el-carousel>
        </div>
        <div class="right">
          <div class="name">{{data.productName}}</div>
          <div class="intro">{{data.productIntro}}</div>
          <div class="self">小米自营</div>
          <div class="price">
            <span class="sell">{{data.productSellingPrice}}元</span>
            <span class="old">{{data.productPrice}}元</span>
          </div>
          <el-divider></el-divider>
          <div class="sum">
            <div class="sum-content w100 h100">
              <div class="up flex jc-between">
                <div class="sum-name">{{data.productName}}</div>
                <div class="sum-price">
                  <span class="sell">{{data.productSellingPrice}}元</span>&nbsp;
                  <span class="old">{{data.productPrice}}元</span>
                </div>
              </div>
              <div class="down">
                <div class="res">总计:{{data.productSellingPrice}}元</div>
              </div>
            </div>
          </div>
          <div class="btns flex jc-between">
            <el-button class="add" @click="addU">加入购物车</el-button>
            <el-button class="like" @click="loveU">喜欢</el-button>
          </div>
          <div class="items flex">
            <div class="item"><img src="@/assets/img/ok.png">小米自营</div>
            <div class="item"><img src="@/assets/img/ok.png">小米发货</div>
            <div class="item"><img src="@/assets/img/ok.png">7天无理由退货</div>
            <div class="item"><img src="@/assets/img/ok.png">7天价格保护</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {detail} from '@/api/good.js'
import {like} from '@/api/like.js'
import {addToCart} from '@/api/cart.js'
import VueCookies from 'vue-cookies'
import '@/assets/public.css'
import { Message } from 'element-ui'
export default {
  data(){
    return{
      data:{}
    }
  },
  methods:{
    loveU(){
      if(!VueCookies.isKey('xm-token')){
        this.$store.commit('changeLogin',true)
      }else{
        like(this.data.productId).then(res=>{
          Message.success(res.msg)
        }).catch(()=>{})
      }
    },
    addU(){
      if(!VueCookies.isKey('xm-token')){
        this.$store.commit('changeLogin',true)
      }else{
        addToCart({productId:this.data.productId}).then(res=>{
          console.log(res);
          Message.success(res.msg)
        }).catch(()=>{})
      }
    }
  },
  created(){
    const id=location.href.split('/')[location.href.split('/').length-1]*1
    detail(id).then(res=>{
      this.data=res.data
      this.data.pictures.forEach(i => i.productPicture=process.env.VUE_APP_BASE_URL+i.productPicture);
    }).catch(()=>{})
  }
}
</script>

<style lang="scss" scoped>
.detail-container{
  .up-line{
    height: 62px;
    box-shadow: 0px 7px 7px rgb(226, 225, 225);
    .name{
      font-size: 18px;
    }
    .ops{
      gap: 10px;
      color: #606266;
      font-size: 14px;
    }
  }
  .content{
    .left{
      margin-top: 42px;
      margin-bottom: 27px;
      .el-carousel{
        width: 520px;
        .pic{
          width: 520px;
          height: 518px;
        }
      }
    }
    .right{
      width: 642px;
      height: 521px;
      margin-top: 34px;
      text-align: left;
      .name{
        font-size: 29px;
        margin-bottom: 12px;
      }
      .intro{
        color: #B0B0B0;
        margin-bottom: 12px;
      }
      .self{
        color: #FF6700;
        margin-bottom: 26px;
      }
      .price{
        margin-bottom: 28px;
        .sell{
          font-size: 18px;
          color: #FF6700;
          margin-right: 10px;
        }
        .old{
          font-size: 14px;
          color: #B0B0B0;
          text-decoration: line-through;
        }
      }
      .el-divider{
        margin: 0;
      }
      .sum{
        margin-top: 50px;
        padding: 0 60px;
        width: 642px;
        height: 136px;
        background-color: #F9F9FA;
        .sum-content{
          padding-top: 34px;
          font-size: 16px;
          color: #606266;
          .up{
            margin-bottom: 30px;
            .sum-price{
              .old{
                text-decoration: line-through;
              }
            }
          }
          .down{
            .res{
              color: #FF6700;
              font-size: 24px;
            }
          }
        }
      }
      .btns{
        margin-top: 54px;
        .add{
          color: #fff;
          width: 340px;
          height: 56px;
          background-color: #FF6700;
          &:hover{
            background-color: #E75D00;
          }
        }
        .like{
          color: #fff;
          background-color: #C0C4CC;
          width: 260px;
          height: 56px;
          &:hover{
            background-color: #B0B0B0;
          }
        }
      }
      .items{
        gap: 22px;
        margin-top: 22px;
        color: #B0B0B0;
      }
    }
  }
}
</style>