<template>
  <div class="card-container">
    <div class="good" v-if="categoryId!=0&&Object.keys(this.data).length">
        <div class="pic"><img :src="data.productPicture" class="w100 h100"></div>
        <div class="name">{{data.productName}}</div>
        <div class="title">{{data.productTitle}}</div>
        <div class="price">
            <span class="sell">{{data.productSellingPrice}}元</span>
            <span class="old">{{data.productPrice}}元</span>
        </div>
    </div>
    <div class="more w100 h100" v-if="categoryId==0">
        <div>浏览更多&gt;&gt;</div>
    </div>
    <div v-if="!empty"></div>
  </div>
</template>

<script>
import {hot} from '@/api/common.js'
export default {
    props:['categoryId','index','empty'],
    data(){
        return{
            data:{}
        }
    },
    created(){
        hot().then(res=>{
            if(this.categoryId&&this.categoryId!=0){
                if(res.rows[this.categoryId-1].products[this.index-1]){
                    this.data=res.rows[this.categoryId-1].products[this.index-1]
                    this.data.productPicture=process.env.VUE_APP_BASE_URL+this.data.productPicture
                }
            }
        })
    }
}
</script>

<style lang="scss" scoped>
.card-container{
    overflow: hidden;
    width: 232px;
    height: 300px;
    background-color: #fff;
    .good{
        text-align: center;
        &>div{
            width: fit-content;
            margin: 0 auto;
        }
        .pic{
            margin-top: 14px !important;
            width: 160px;
            height: 160px;
            margin: 0 auto;
        }
        .name{
            font-size: 14px;
            margin-top: 24px;
        }
        .title{
            font-size: 12px;
            margin-top: 14px;
            color: #b0b0b0;
        }
        .price{
            margin-top: 12px;
            .sell{
                color: #ff6700;
                margin-right:10px;
            }
            .old{
                color: #b0b0b0;
                text-decoration: line-through;
            }
        }
        
    }
    
    .more{
        text-align: center;
        line-height: 300px;
        cursor: pointer;
    }
}
</style>