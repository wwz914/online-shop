import instance from "@/util/request";

export function getOrder(){
    return instance({
        url:'/xiaomi/v2/orders',
        method:'GET'
    })
}

export function createOrder(){
    return instance({
        url:'/xiaomi/v2/orders/create',
        method:'POST'
    })
}