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
          <span>收货地址</span>
          <div class="adds flex flex-wrap">
            <div class="add" v-for="(i,index) in address" :key="index" :class="{addGolden:selected.addressId==i.addressId}" @click="chooseAddress(i)">
              <div style="fontSize:18px;color:black;">{{i.name}}</div>
              <div style="margin-top:18px;">{{i.phone}}</div>
              <div style="margin-top:12px;">{{toArea(i.area)}}</div>
              <div style="margin-top:10px;">{{i.addressDtl}}</div>
              <i class="el-icon-close" @click="deleteAddress(i)"></i>
            </div>
            <div class="add1" @click="addAddress"><i class="el-icon-circle-plus-outline"></i></div>
          </div>
        </div>
        <div class="item">
          <span>商品及优惠券</span>
          <el-divider></el-divider>
          <div class="good flex jc-between ai-center" v-for="i in data" :key="i.productId">
            <div class="left flex ai-center">
              <div class="pic"><img :src="base+i.productPicture" class="w100 h100"></div>
              <span>{{i.productName}}</span>
            </div>
            <div class="right" style="color:#FF6700;">{{i.productSellingPrice*i.num}}元</div>
          </div>
        </div>
        <el-divider></el-divider>
        <div class="item">
          <span>配送方式</span>
          <span class="post">包邮</span>
        </div>
        <el-divider></el-divider>
        <div class="item flex" style="gap:114px">
          <span>发票</span>
          <div class="billInfo flex jc-between">
            <div>电子发票</div>
            <div>个人</div>
            <div>商品明细</div>
          </div>
        </div>
        <el-divider></el-divider>
        <div class="flex jc-end">
          <div class="right">
            <div class="flex jc-end">
              <div class="bill">
                <div class="flex">
                  <span class="key" style="width:86px">商品件数:</span>
                  <span class="value" style="flex:1;">{{data.reduce((pre,cur)=>pre+cur.num,0)}}件</span>
                </div>
                <div class="flex">
                  <span class="key" style="width:86px">商品总价:</span>
                  <span class="value" style="flex:1;">{{data.reduce((pre,cur)=>pre+cur.num*cur.productSellingPrice,0)}}元</span>
                </div>
                <div class="flex">
                  <span class="key" style="width:86px">活动优惠:</span>
                  <span class="value" style="flex:1;">-0元</span>
                </div>
                <div class="flex">
                  <span class="key" style="width:86px">优惠券折扣:</span>
                  <span class="value" style="flex:1;">-0元</span>
                </div>
                <div class="flex">
                  <span class="key" style="width:86px">运费:</span>
                  <span class="value" style="flex:1;">0元</span>
                </div>
                <div class="flex">
                  <span class="key" style="width:86px">应付总额:</span>
                  <span class="value" style="flex:1;">{{data.reduce((pre,cur)=>pre+cur.num*cur.productSellingPrice,0)}}元</span>
                </div>
              </div>
            </div>
            <div class="btns">
              <el-button class="backToCart" @click="backToCart">返回购物车</el-button>
              <el-button class="check" @click="finalCheck">结算</el-button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <el-dialog
      title="添加收货地址"
      :visible.sync="dialogVisible"
      width="660px"
      :before-close="handleClose">
      <div class="dialog-content">
        <el-form ref="addressRef" :model="addressForm" :rules="rules">
          <el-form-item required>
            <el-col :span="11">
              <el-form-item prop="name">
                <el-input v-model="addressForm.name" placeholder="姓名"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="2">&nbsp;</el-col>
            <el-col :span="11">
              <el-form-item prop="phone">
                <el-input v-model="addressForm.phone" placeholder="手机号"></el-input>
              </el-form-item>
            </el-col>
          </el-form-item>
          <el-form-item prop="area">
            <el-cascader
              v-model="addressForm.area"
              :props="props"
              placeholder="选择省/市/区/街道"
              style="width:100%;"
              @change="handleChange">
            </el-cascader>
          </el-form-item>
          <el-form-item prop="addressDtl">
              <el-input
                type="textarea"
                :rows="3"
                placeholder="详细地址"
                style="fontSize:14px;"
                v-model="addressForm.addressDtl">
              </el-input>
          </el-form-item prop="addressTags">
          <el-form-item>
              <el-input v-model="addressForm.addressTags" placeholder="地址标签"></el-input>
          </el-form-item>
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button class="cancel" @click="closeDialog">取 消</el-button>
        <el-button class="confirm" @click="addConfirm">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import {addAddress,getAddress,removeAddress,createOrder} from '@/api/order.js'
import {area} from '@/api/area.js'
import '@/assets/public.css'
import { Message, MessageBox } from 'element-ui'
export default {
  data(){
    return{
      cart:undefined,
      selected:{},
      dialogVisible:false,
      address:[],
      props:{
        lazy:true,
        lazyLoad(node,resolve){
          const {value}=node
          area(value?value:1).then(res=>{
            const nodes=res.data.map(i=>({
              value:i.id,
              label:i.name,
            }))
            resolve(nodes)
          })
        }
      },
      addressForm:{
        addressDtl:undefined,
        addressTags:undefined,
        area:undefined,
        name:undefined,
        phone:undefined
      },
      data:[],
      rules:{
        name:[
          {required:true,message:'请输入姓名',trigger:'blur'}
        ],
        phone:[
          {required:true,message:'请输入手机号',trigger:'blur'},
          {pattern:/^1(3[0-9]|4[01456879]|5[0-35-9]|6[2567]|7[0-8]|8[0-9]|9[0-35-9])\d{8}$/,message:'请输入格式正确的手机号',trigger:'blur'}
        ],
        area:[
          {required:true,message:'请输入区域',trigger:'blur'}
        ],
        addressDtl:[
          {required:true,message:'请输入详细地址',trigger:'blur'}
        ],
        addressTags:[
          {required:true,message:'请输入地址标签',trigger:'blur'}
        ],
      }
    }
  },
  computed:{
    base(){
      return process.env.VUE_APP_BASE_URL
    },
    toArea(){
      return (str)=>{
        return str.split(',').join(' ')
      }
    }
  },
  methods:{
    addAddress(){
      this.dialogVisible=true
    },
    handleClose(){
      this.dialogVisible=false
      this.$refs['addressRef'].resetFields()
    },
    handleChange(){},
    addConfirm(){
      this.dialogVisible=false
      let newArr=[]
      let arr=this.addressForm.area
      this.fn(arr[0],0,arr,newArr)
    },
    fn(id,num,arr,newArr){
      let areaId=1
      if(num==arr.length)return
      if(num!=0)areaId=arr[num-1]
      area(areaId).then(res=>{
        newArr[num]=res.data.find(e=>e.id==id).name
        num++
        if(num==arr.length){
          this.addressForm.area=newArr.toString()
          this.finalAdd(this.addressForm)
        }else{
          this.fn(arr[num],num,arr,newArr)
        }
      })
    },
    finalAdd(data){
      addAddress(data).then(res=>{
        Message.success(res.msg)
        this.$refs['addressRef'].resetFields()
        getAddress().then(res=>{
            this.address=res.data
        })
      })
    },
    chooseAddress(obj){
      this.selected=obj
    },
    deleteAddress(obj){
      removeAddress(obj.addressId).then(res=>{
        Message.success(res.msg)
        this.address=this.address.filter(i=>i.addressId!=obj.addressId)
      })
    },
    finalCheck(){
      if(!this.selected.addressId){
        MessageBox.alert('下单前请先选择配送地址~').then(res=>{})
        return
      }
      const obj={
        addressId:this.selected.addressId,
        shoppingCartIds:this.cart.join(',')
      }
      createOrder(obj).then(res=>{
        Message.success(res.msg)
        this.$router.push('order')
      })
    },
    backToCart(){
      this.$router.back()
    },
    closeDialog(){
      this.dialogVisible=false
      this.$refs['addressRef'].resetFields()
    }
  },
  created(){
    getAddress().then(res=>{
      this.address=res.data
    })
    let orderDatas=JSON.parse(sessionStorage.getItem('carts'))
    if(orderDatas){
      this.data=orderDatas
      this.cart=orderDatas.map(i=>i.shoppingCartId)
    }
  }
}
</script>

<style lang="scss" scoped>
.addGolden{
  border: 2px solid #FF6700 !important;
}
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
        .adds{
          gap: 32px;
          margin-bottom:36px;
          margin-top:20px;
          .add{
            position: relative;
            color:#606266;
            font-size:14px;
            width: 270px;
            height: 194px;
            padding: 20px 24px;
            border: 1px solid #B0B0B0;
            &:hover{
              border: 2px solid #FF6700;
            }
            i{
              position: absolute;
              top: 10px;
              right: 10px;
              cursor: pointer;
              &:hover{
                color: #FF6700;
              }
            }
          }
        }
        .add1{
          width: 270px;
          height: 194px;
          font-size: 34px;
          line-height:194px;
          text-align:center;
          border: 1px solid #B0B0B0;
          &:hover{
            color: #FF6700;
            border: 2px solid #FF6700;
          }
        }
        .good{
          font-size:16px;
          .left{
            gap: 6px;
            .pic{
              width: 36px;
              height: 36px;
            }
          }
          
        }
        .billInfo{
          gap: 20px;
          font-size:16px;
          color:#FF6700;
        }
        .post{
          color:#FF6700;
          font-size:16px;
          margin-left: 78px;
        }
      }
      .bill{
        width: 208px;
        // height: 184px;
        margin-bottom: 46px;
        text-align: right;
        .flex{
          margin-bottom: 14px;
          .value{
            color: #FF6700;
          }
        }
      }
      .el-button{
        width: 160px;
        height: 38px;
        border-radius: 0;
      }
      .backToCart{
        color: #B0B0B0;
        font-size: 14px;
        margin-right: 24px;
      }
      .check{
        color: #fff;
        margin: 0;
        background-color: #FF6700;
        font-size: 14px;
      }
    }
  }
}
.dialog-content{
  }
.cancel{
  color: #fff;
  width: 160px;
  height: 42px;
  border-radius: 0;
  background-color: #FF6700;
}
.confirm{
  color: #fff;
  width: 160px;
  height: 42px;
  border-radius: 0;
  background-color: #B0B0B0;
}
::v-deep{
  .el-dialog__body{
    padding-bottom: 0;
  }
  .el-dialog__footer{
    text-align: center;
  }
}
</style>