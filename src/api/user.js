import instance from "@/util/request";

export function login(data){
    return instance({
        url:'/xiaomi/v2/ms/user/login',
        method:'POST',
        data
    })
}

export function register(data){
    return instance({
        url:'/xiaomi/v2/ms/user/register',
        method:'POST',
        data
    })
}