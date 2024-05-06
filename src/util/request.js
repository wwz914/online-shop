import store from '@/store'
import axios from 'axios'
import { Message, MessageBox } from 'element-ui'
import VueCookies from 'vue-cookies'

const instance=axios.create({
    baseURL:process.env.VUE_APP_BASE_URL
})

instance.interceptors.request.use(res=>{
    const {isToken=true}=res
    if(isToken)res.headers['Authorization']= VueCookies.get('xm-token')
    return res
})



instance.interceptors.response.use(res=>{
    unAccessToken(res)
    const {data}=res
    if(res.status!=200||data.code!= 200){
        if(data.code!=401&&res.status!=401){
            Message.error(data.msg)
            return Promise.reject(res)
        }
    }
    // 拆包
    return res.data
})





export default instance






function unAccessToken(instance){
    const {data,status}=instance
    if(data.code==401||status==401){
        MessageBox.alert('登录过期，请重新登录').then(()=>{
            //删除token
            VueCookies.remove('xm-token')
            store.commit('changeLogin',true)
        }).catch((err)=>{})
    }
}