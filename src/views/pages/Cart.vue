<template>
  <div class="cart-container">
    <div class="upline">
        <div class="page-content flex ai-center jc-start" style="font-size: 28px;">
            <i class="el-icon-shopping-cart-2" style="color:#FF6700;"></i>
            <span class="title" style="margin-left:16px;">我的购物车</span>
            <span class="tip">温馨提示：商品是否购买成功，以最终下单为准哦，请尽快结算</span>
        </div>
    </div>
    <div class="content">
        <div class="page-content">
            <div class="empty flex" v-if="cartList.length==0">
                <div class="pic">
                    <img src="@/assets/img/Frame.png" class="w100 h100">
                </div>
                <div class="tip">
                    <div class="txt1">您的购物车还是空的!</div>
                    <div class="txt2">快去购物吧!</div>
                </div>
            </div>
            <div class="carts" v-else>
                <el-table ref="cartTable" 
                        :data="cartList" 
                        tooltip-effect="dark" 
                        class="cartTable" 
                        @selection-change="selectionChange">
                    <el-table-column type="selection" width="100"></el-table-column>
                    <el-table-column label="" width="100">
                        <template slot-scope="scope">
                            <div class="pic">
                                <img :src="base+scope.row.productPicture" alt="">
                            </div>
                        </template>
                    </el-table-column>
                    <el-table-column label="商品名称" width="460">
                        <template slot-scope="scope">
                            {{scope.row.productName}}
                        </template>
                    </el-table-column>
                    <el-table-column label="单价" width="100">
                        <template slot-scope="scope">
                        {{scope.row.productSellingPrice}}元
                        </template>
                    </el-table-column>
                    <el-table-column label="数量" width="200" align="center" header-align="center">
                        <template slot-scope="scope">
                            <el-input-number v-model="scope.row.num" @change="handleChange" :min="1" :disabled="idDis(scope)" size="small"></el-input-number>
                        </template>
                    </el-table-column>
                    <el-table-column label="小计" width="150" align="center" header-align="center" class-name="lil-sum">
                        <template slot-scope="scope">{{scope.row.productSellingPrice*scope.row.num}}元</template>
                    </el-table-column>
                    <el-table-column label="操作" align="center" header-align="center">
                        <template slot-scope="scope">
                            <i class="el-icon-error" @click="deleteU(scope.row.productId,scope.row.shoppingCartId)"></i>
                        </template>
                    </el-table-column>
                </el-table>
                <div class="downline flex">
                    <div class="summary flex jc-between ai-center">
                        <div class="left flex">
                            <div class="continue" @click="goAhead">继续购物</div>|
                            <div class="now">共 <span>{{all}}</span> 件商品，已选择 <span>{{selected}}</span> 件</div>
                        </div>
                        <div class="right">
                            <span>合计:</span>
                            <span class="allPrice">{{allPrice}}元</span>
                        </div>
                    </div>
                    <div class="check" @click="goCheck">去结算</div>
                </div>
            </div>
        </div>
    </div>
  </div>
</template>

<script>
import {cart,deleteCart} from '@/api/cart.js'
import '@/assets/public.css'
import { Message } from 'element-ui'
export default {
    data(){
        return{
            all:0,
            selected:0,
            selectedRows:[],
            allPrice:0,
            cartList:[]   
        }
    },
    computed:{
        base(){
            return process.env.VUE_APP_BASE_URL
        },
        idDis(){
           
            return (scope)=>{
                return this.selectedRows.some((i)=>i==scope.row.productId)
            }
        }
    },
    methods:{
        selectionChange(val){
            this.selected=val.length
            if(val.length>0){
                this.allPrice=0
                this.selectedRows=[]
                val.forEach(e => {
                    this.allPrice+=e.productSellingPrice*e.num
                    this.selectedRows.push(e.productId)
                });
            }else{
                this.allPrice=0
                this.selectedRows=[]
            }
        },
        handleChange(val){},
        goCheck(){},
        goAhead(){
            this.$router.push('index')
            this.$store.commit('changePage',1)
        },
        deleteU(id,shoppingCartId){
            this.cartList=this.cartList.filter(i=>i.productId!=id)
            deleteCart(shoppingCartId).then(res=>{
                console.log(res);
                Message.success(res.msg)
            })
        }
    },
    created(){
        cart().then(res=>{
            this.cartList=res.data
            this.all=this.cartList.length
        })
    }
}
</script>

<style lang="scss" scoped>
.a{
    color: #FF6700;
}
.cart-container{
    .upline{
        height: 81px;
        border-bottom: 1px solid #FF6700;
        .tip{
            font-size: 12px;
            color: #606266;
            margin-left:16px;
            margin-top: 12px;
        }
    }
    .content{
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
        .carts{
            padding-top: 47px;
            padding: 20px 0;
            .cartTable{
                .pic{
                    width: 80px;
                    height: 80px;
                    img{
                        width: 100%;
                        height: 100%;
                    }
                }
                i{
                    cursor: pointer;
                }
            }
            .downline{
                margin-top: 24px;
                height: 48px;
                background-color: #fff;
                .summary{
                    flex: 1;
                    .left{
                        margin-left: 8px;
                        div{
                            padding: 0 22px;
                        }
                        .continue{
                            cursor: pointer;
                        }
                        .now{
                            span{
                                color: #FF6700;
                            }
                        }
                    }
                    .right{
                        color: #FF6700;
                        font-size: 14px;
                        margin-right: 44px;
                        .allPrice{
                            margin-left: 8px;
                            font-size: 32px;
                        }
                    }
                }
                .check{
                    width: 200px;
                    font-size: 20px;
                    color:#909399;
                    cursor: pointer;
                    text-align: center;
                    line-height: 48px;
                    background-color: #E0E0E0;
                }
            }
        }
    }
}
::v-deep{
    .el-table__header .el-table-column--selection .cell .el-checkbox:after{
        color: #909399;
        content: "全选";
        font-size: 14px;
        margin-left: 10px;
        font-weight: bold;
    }  
    .el-table__row{
        .lil-sum{
            color: #909399;
            .cell{
                color: #FF6700;
            }
        }
    }
}
</style>