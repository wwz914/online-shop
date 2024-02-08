import instance from "@/util/request";

export function getOrder(){
    return instance({
        url:'/xiaomi/v2/orders',
        method:'GET'
    })
}

export function createOrder(params){
    return instance({
        url:'/xiaomi/v2/orders/create',
        method:'POST',
        params
    })
}

export function addAddress(data){
    return instance({
        url:'/xiaomi/v2/address',
        method:'POST',
        data
    })
}

export function getAddress(){
    return instance({
        url:'/xiaomi/v2/address/list',
        method:'GET'
    })
}

export function removeAddress(addressId){
    return instance({
        url:`/xiaomi/v2/address/${addressId}`,
        method:'DELETE'
    })
}