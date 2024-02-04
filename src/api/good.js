import instance from "@/util/request";

export function detail(productId){
    return instance({
        url:`/xiaomi/v2/product/${productId}`,
        method:'GET',
        productId,
        isToken:false
    })
}

export function category(){
    return  instance({
        url:'/xiaomi/v2/category',
        method:'GET',
        isToken:false
    })
}

export function goodList(params){
    return instance({
        url:'/xiaomi/v2/product',
        method:'GET',
        params,
        isToken:false
    })
}