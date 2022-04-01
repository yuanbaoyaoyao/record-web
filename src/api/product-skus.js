import http from "../utils/http";

let resquest = "/clientIp/productSkusClient/"

export function listProductSkusSearchAPI(params){
    return http.get(`${resquest}`+`listSearch`,params)
}
export function listProductSkusLimitAPI(params){
    return http.get(`${resquest}`+`listLimit`,params)
}
export function updateProductSkusAPI(params){
    return http.post(`${resquest}`+`update`,params)
}
