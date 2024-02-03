import instance from '@/util/request'

export function banner(){
    return instance({
        url:'/xiaomi/v2/carousel',
        method:'GET',
        isToken:false
    })
}

export function hot(){
    return instance({
        url:'/xiaomi/v2/product/hot',
        method:'GET',
        isToken:false
    })
}