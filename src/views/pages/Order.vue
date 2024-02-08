<template>
  <div class="order-container">
    <div class="upline">
        <div class="page-content flex ai-center jc-start" style="font-size: 28px;">
            <i class="el-icon-s-order" style="color:#FF6700;"></i>
            <span class="title" style="margin-left:16px;">我的订单</span>
        </div>
    </div>
    <div class="content">
        <div class="page-content">
            <div class="empty flex" v-if="orderList.length==0">
                <div class="pic">
                    <img src="@/assets/img/Frame.png" class="w100 h100">
                </div>
                <div class="tip">
                    <div class="txt1">您的购物车还是空的!</div>
                    <div class="txt2">快去购物吧!</div>
                </div>
            </div>
            <div class="orders" v-else>
                <div class="order" v-for="i in orderList">
                    <div class="up-part flex jc-between ai-center">
                        <div class="left" style="color:#FF6700;">订单编号:{{i.orderId}}</div>
                        <div class="right">订单时间:{{i.orderTime}}</div>
                    </div>
                    <div class="mid-part">
                        <div class="items flex">
                            <div class="item" style="width:200px;"></div>
                            <div class="item" style="width:420px;text-align:left;">商品名称</div>
                            <div class="item" style="width:200px;">单价</div>
                            <div class="item" style="width:100px;">数量</div>
                            <div class="item" style="flex:1;">小计</div>
                        </div>
                        <el-divider></el-divider>
                        <div class="good flex" v-for="e in i.products">
                            <div class="item" style="width:200px;"><div class="pic"><img :src="base+e.productPicture" class="w100 h100"></div></div>
                            <div class="item" style="width:420px;text-align:left;">{{e.productName}}</div>
                            <div class="item" style="width:200px;">{{e.productSellingPrice}}元</div>
                            <div class="item" style="width:100px;">{{e.num}}</div>
                            <div class="item" style="flex:1;color:#FF6700;">{{e.productSellingPrice*e.num}}元</div>    
                        </div>
                    </div>
                    <div class="down-part flex jc-between ai-center">
                        <div class="left">共<span style="color:#FF6700">{{i.products.length}}</span>件商品</div>
                        <div class="right" style="color:#FF6700;">
                            <span>合计:</span>
                            <span class="allPrice">{{i.products.reduce((pre,cur)=>pre+cur.productSellingPrice*cur.num,0)}}元</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
  </div>
</template>

<script>
import '@/assets/public.css'
import {getOrder} from '@/api/order.js'
export default {
    data(){
        return{
            orderList:[
                {
                    addressDtl: "xxxxxx",
                    addressTags: "北京",
                    addressee: "wwz",
                    addresseeArea: "北京市,西城区",
                    addresseePhone: "15960855602",
                    orderId: 3706,
                    orderNum: "d7f711772908433a9d0f625c5e90c329",
                    orderTime: "2024-02-08 21:16:32",
                    products: [],
                }
            ]
        }
    },
    computed:{
        base(){
            return process.env.VUE_APP_BASE_URL
        }
    },
    created(){
        getOrder().then(res=>{
            this.orderList=res.data
        })
    }
}
</script>

<style lang="scss" scoped>
.order-container{
    .upline{
        height: 81px;
        border-bottom: 1px solid #FF6700;
    }
    .content{
        margin-bottom: 24px;
        background-color: #F5F5F5;
        .empty{
            height: 598px;
            .pic{
                width: 362px;
                height: 362px;
                margin-top: 46px;
                margin-left: 70px;
                img{
                    width: 100%;
                    height: 100%;
                }
            }
            .tip{
                width: 324px;
                height: 78px;
                color: #B0B0B0;
                text-align: left;
                margin-left: 80px;
                margin-top: 160px;
                .txt1{
                    font-size: 36px;
                    margin-bottom: 24px;
                }
                .txt2{
                    font-size: 18px;
                }
            }
        }
        .orders{
            padding-top: 24px;
            .order{
                background-color: #fff;
                margin-bottom: 40px;
                .up-part{
                    height: 60px;
                    padding: 0 28px;
                    border-bottom: 1px solid #FF6700;
                }
                .mid-part{
                    .items,.good{
                        height: 100px;
                        line-height: 100px;
                        .pic{
                            margin-top: 5px;
                            width: 90px;
                            height: 90px;
                            margin-left: 80px;
                        }
                    }
                    .el-divider{
                        margin: 0;
                    }
                }
                .down-part{
                    border-top: 1px solid #FF6700;
                    padding: 0 20px;
                    height: 50px;
                }
            }
        }
    }
}
</style>