import instance from "@/util/request";

export function area(pid){
    return instance({
        url:`/xiaomi/v2/area/${pid}`,
        method:'GET'
    })
}