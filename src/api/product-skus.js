import http from "../utils/http";

let resquest = "/clientIp/productSkusClient/"

export function listProductSkusSearchIPageAPI(params){
    return http.get(`${resquest}`+`listSearchIPage`,params)
}
export function listProductSkusSearchAPI(params){
    return http.get(`${resquest}`+`listSearch`,params)
}
export function listProductSkusLimitAPI(params){
    return http.get(`${resquest}`+`listLimit`,params)
}
export function listProductSkusLimitByNumberAPI(params){
    return http.get(`${resquest}`+`listLimitByNumber`,params)
}
export function updateProductSkusAPI(params){
    return http.put(`${resquest}`+`update`,params)
}
