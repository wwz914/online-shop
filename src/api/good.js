import instance from "@/util/request";

export function detail(productId){
    return instance({
        url:`/xiaomi/v2/product/${productId}`,
        method:'GET',
        productId,
        isToken:false
    })
}