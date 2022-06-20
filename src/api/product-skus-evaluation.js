import http from "../utils/http";

let resquest = "/clientIp/productSkusEvaluationClient/"

export function listProductSkusEvaluationIPageAPI(params){
    return http.get(`${resquest}`+`listIPage`,params)
}
export function listProductSkusEvaluationAPI(params){
    return http.get(`${resquest}`+`list`,params)
}
export function createProductSkusEvaluationAPI(params){
    return http.post(`${resquest}`+`create`,params)
}
export function updateProductSkusEvaluationAPI(params){
    return http.put(`${resquest}`+`update`,params)
}
export function deleteProductSkusEvaluationAPI(params){
    return http.delete(`${resquest}`+`delete`,params)
}