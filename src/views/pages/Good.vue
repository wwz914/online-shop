<template>
  <div class="good-container">
    <div class="up-line">
        <div class="page-content">
            <el-breadcrumb separator-class="el-icon-arrow-right" style="margin-bottom:27px;">
                <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
                <el-breadcrumb-item>全部商品</el-breadcrumb-item>
                <el-breadcrumb-item>分类</el-breadcrumb-item>
            </el-breadcrumb>
            <div class="cata flex ai-center">
                <div class="left">分类</div>
                <div class="right flex jc-between">
                    <ul class="flex">
                        <li :class="{heightlight:cur==0}" @click="selectCatagory(0)">全部</li>
                        <li v-for="i in Catas" :key="i.categoryId" :class="{heightlight:cur==i.categoryId}" @click="selectCatagory(i.categoryId)">{{i.categoryName}}</li>
                    </ul>
                    <div class="empty"></div>
                </div>
            </div>
        </div>
    </div>
    <div class="content">
        <div class="page-content flex flex-wrap">
            <card v-for="i in res.rows" :categoryId="i.categoryId" :index="i.productId" :findByCate="true" :key="i.productId"></card>
        </div>
        <el-pagination
            background
            layout="prev, pager, next"
            :total="res.total"
            :current-page.sync="query.pageNum"
            @current-change="curChangeHandler"
            @prev-click="preClickHandler"
            @next-click="nextClickHandler">
        </el-pagination>
    </div>
  </div>
</template>

<script>
import {category,goodList} from '@/api/good.js'
import Card from '@/components/Card.vue'
export default {
    components: { Card },
    data(){
        return{
            cur:0,
            Catas:[],
            query:{
                pageNum:1,
                pageSize:15,
                categoryId:undefined
            },
            res:{
                resLen:undefined
            }
        }
    },
    methods:{
        getCategory(){
            category().then(res=>{
                this.Catas=res.data
            }).catch(()=>{})
        },
        getGoodList(){
            goodList(this.query).then(res=>{
                res.total=Math.ceil(res.total/this.query.pageSize)*10
                res.resLen=res.rows.length
                this.res=res
            }).catch(()=>{})
        },
        selectCatagory(id){
            this.cur=id
            this.query.pageNum=1
            this.query.pageSize=15
            this.query.categoryId=undefined
            if(id!=0){
                this.query.categoryId=id
            }
            this.getGoodList()
        },
        curChangeHandler(cur){
            this.getGoodList()
        },
        preClickHandler(cur){
            this.query.pageNum--
            this.getGoodList()
        },
        nextClickHandler(cur){
            this.query.pageNum++
            this.getGoodList()
        }
    },
    created(){
        this.getCategory()
        this.selectCatagory(0)
    }
}
</script>

<style lang="scss" scoped>
.good-container{
    margin-bottom: 24px;
    .up-line{
        padding-top: 24px;
        background-color: #fff;
        .page-content{
            .cata{
                margin-bottom: -1px;
                .left{
                    height: 42px;
                    line-height: 42px;
                    padding-right: 13px;
                    border-bottom: 1px solid #DCDFE6;
                }
                .right{
                    flex: 1;
                    ul{
                        font-size: 14px;
                        list-style: none;
                        border: -1px solid #DCDFE6;
                        li{
                            cursor: pointer;
                            width: 78px;
                            height: 42px;
                            line-height: 42px;
                            text-align: center;
                            box-sizing: content-box;
                            border: 1px solid #DCDFE6;
                            border-top: 1.5px solid #DCDFE6;
                            &:nth-child(1){
                                border-top-left-radius: 5px;
                            }
                            &:nth-child(9){
                                border-top-right-radius: 5px;
                            }
                            &:hover{
                                color: #409EFF;
                            }
                        }
                    }
                    .empty{
                        display: flex;
                        flex: 1;
                        border-bottom: 1px solid #DCDFE6;
                    }
                }
            }
        }
    }
    .content{
        padding-top: 14px;
        padding-bottom: 18px;
        background-color: #F5F5F5;
        .page-content{
            gap: 10px;
            padding-bottom: 20px;
        }
    }
}
.heightlight{
    color: #409EFF;
    border-bottom: 1px #fff solid !important;
}
</style>