<template>
  <div class="like-container">
    <div class="upline">
        <div class="page-content flex ai-center jc-start" style="font-size: 28px;">
            <i class="el-icon-collection-tag" style="color:#FF6700;"></i><span class="title" style="margin-left:16px;">我的收藏</span>
        </div>
    </div>
    <div class="content">
        <div class="page-content">
            <div class="empty flex" v-if="likesList.length==0">
                <div class="pic">
                    <img src="@/assets/img/Frame.png" alt="">
                </div>
                <div class="tip">
                    <div class="txt1">您的收藏还是空的!</div>
                    <div class="txt2">快去购物吧!</div>
                </div>
            </div>
            <div class="likes" v-else>
                <div class="page-content flex flex-wrap">
                    <card v-for="i in likesList" :like="i" :find-by-like="true"></card>
                </div>
            </div>
        </div>
    </div>
  </div>
</template>

<script>
import {likeList} from '@/api/like.js'
import Card from '@/components/Card.vue'
export default {
    components: { Card },
    data(){
        return{
            likesList:[]
        }
    },
    created(){
        likeList().then(res=>{
            console.log(res);
            this.likesList=res.data
        }).catch(()=>{})
    }
}
</script>

<style lang="scss" scoped>
.like-container{
    .upline{
        height: 81px;
        border-bottom: 1px solid #FF6700;
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
        .likes{
            padding: 20px 0;
        }
    }
}
</style>