import instance from "@/util/request";

export function addToCart(data){
    return instance({
        url:'/xiaomi/v2/shoppingCart',
        method:'POST',
        data
    })
}


export function cart(){
    return instance({
        url:'/xiaomi/v2/shoppingCart',
        method:'GET'
    })
}

export function deleteCart(shoppingCartId){
    return instance({
        url:`/xiaomi/v2/shoppingCart/${shoppingCartId}`,
        method:'DELETE'
    })
}