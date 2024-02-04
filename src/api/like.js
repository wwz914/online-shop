import instance from "@/util/request";

export function likeList(){
    return instance({
        url:'/xiaomi/v2/collect',
        method:'GET',
    })
}

export function like(productId){
    return instance({
        url:`/xiaomi/v2/collect/${productId}`,
        method:'POST'
    })
}