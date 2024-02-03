<template>
  <div class="index-container">
    <!-- 轮播图区 -->
    <div class="banner-container">
        <div class="page-content">
            <el-carousel trigger="click" height="456px">
                <el-carousel-item v-for="item in banners" :key="item">
                    <div>
                        <img :src="item" alt="" class="w100 h100">
                    </div>
                </el-carousel-item>
            </el-carousel>
        </div>
    </div>
    <!-- 商品区 -->
    <div class="good-container">
        <div class="page-content">
            <!-- 手机 -->
            <div class="phone">
                <div class="up flex jc-between">
                    <span class="title">手机</span>
                    <div class="ops"></div>
                </div>
                <div class="down flex">
                    <div class="left h100"><img :src="phones.leftPic" alt="" class="w100 h100"></div>
                    <div class="right flex flex-wrap">
                        <card v-for="i in 7" :categoryId="1" :index="i"></card>
                        <card :categoryId="0"></card>
                    </div>
                </div>
            </div>
            <!-- 家电 -->
            <div class="household">
                <div class="up flex jc-between">
                    <span class="title">家电</span>
                    <div class="ops flex">
                        <div class="op" :class="{highlight:householdIndex==1?true:false}" @click="householdIndex=1">热门</div>
                        <div class="op" :class="{highlight:householdIndex==2?true:false}" @click="householdIndex=2">电视影音</div>
                    </div>
                </div>
                <div class="down flex flex-column jc-between">
                    <div class="down-one flex jc-between w100">
                        <div class="pic h100">
                            <img :src="households.householdPic1" class="w100 h100">
                        </div>
                        <card v-for="i in 4" :categoryId="2" :index="i"></card>
                    </div>
                    <div class="down-two flex jc-between w100">
                        <div class="pic h100">
                            <img :src="households.householdPic2" class="w100 h100">
                        </div>
                        <card v-for="i in 3" :categoryId="2" :index="i+4"></card>
                        <card :categoryId="0"></card>
                    </div>
                </div>
            </div>
            <!-- 配件 -->
            <div class="config">
                <div class="up flex jc-between">
                    <span class="title">配件</span>
                    <div class="ops flex">
                        <div class="op" :class="{highlight:configIndex==1?true:false}" @click="configIndex=1">热门</div>
                        <div class="op" :class="{highlight:configIndex==2?true:false}" @click="configIndex=2">保护套</div>
                        <div class="op" :class="{highlight:configIndex==3?true:false}" @click="configIndex=3">充电器</div>
                    </div>
                </div>
                <div class="down flex flex-column jc-between">
                    <div class="down-one flex jc-between w100">
                        <div class="pic h100">
                            <img :src="configs.configPic1" class="w100 h100">
                        </div>
                        <card v-for="i in 4" :categoryId="3" :index="i"></card>
                    </div>
                    <div class="down-two flex jc-between w100">
                        <div class="pic h100">
                            <img :src="configs.configPic2" class="w100 h100">
                        </div>
                        <card v-for="i in 3" :categoryId="3" :index="i+4"></card>
                        <card :categoryId="0"></card>
                    </div>
                </div>
            </div>
        </div>
        
    </div>
  </div>
</template>

<script>
import {banner,hot} from '@/api/common.js'
import '@/assets/public.css'
import Card from '@/components/Card.vue'
export default {
    components:{Card},
    data(){
        return{
            householdIndex:1,
            configIndex:1,
            banners:[],
            phones:{
                leftPic:undefined,
            },
            households:{
                householdPic1:undefined,
                householdPic2:undefined,
            },
            configs:{}
        }
    },
    methods:{
        getBanner(){
            banner().then(res=>{
                this.banners=res.data.map((i)=>process.env.VUE_APP_BASE_URL+i.url)
            })
        },
        getHot(){
            hot().then(res=>{
                this.phones.leftPic=process.env.VUE_APP_BASE_URL+res.rows[0].categoryPicture1;
                this.households.householdPic1=process.env.VUE_APP_BASE_URL+res.rows[1].categoryPicture1
                this.households.householdPic2=process.env.VUE_APP_BASE_URL+res.rows[1].categoryPicture2
                this.configs.configPic1=process.env.VUE_APP_BASE_URL+res.rows[2].categoryPicture1
                this.configs.configPic2=process.env.VUE_APP_BASE_URL+res.rows[2].categoryPicture2
            })
        }
    },
    created(){
        this.getBanner()
        this.getHot()
    }
}
</script>

<style lang="scss" scoped>
.index-container{
    padding-bottom: 32px;
    margin-bottom: 24px;
    background-color: #f5f5f5;
    .banner-container{
        padding-bottom: 32px;
        background-color: #fff;
    }
    .good-container{
        margin-top: 20px;
        .up{
            height: 42px;
            .title{
                font-size: 22px;
                color: #4b4b4b;
            }
        }
        .phone{
            .down{
                height: 614px;
                .left{
                    width: 232px;
                    margin-right: 10px;
                }
                .right{
                    flex:1;
                    gap: 10px;
                    align-content: space-between;
                }
            }
        }
        .household{
            margin-top: 24px;
            .ops{
                margin-top: 14px;
                gap:24px;
                height: fit-content;
                .op{
                    height: 100%;
                    width: fit-content;
                    cursor: pointer;
                }
            }
            .down{
                gap: 14px;
                &>div{
                    height: 300px;
                }
                .down-one,.down-two{
                    gap: 10px;
                    .pic{
                        width: 232px;
                    }
                }
            }
        }
        .config{
            margin-top: 24px;
            .ops{
                margin-top: 14px;
                gap:24px;
                height: fit-content;
                .op{
                    height: 100%;
                    width: fit-content;
                    cursor: pointer;
                }
            }
            .down{
                gap: 14px;
                &>div{
                    height: 300px;
                }
                .down-one,.down-two{
                    gap: 10px;
                    .pic{
                        width: 232px;
                    }
                }
            }
        }
    }
}
.highlight{
    color: #ff6700;
    border-bottom: 2px #ff6700 solid;
}
</style>