import http from "../utils/http";

let resquest = "/clientIp/cartClient/"

export function listCartAPI(params){
    return http.get(`${resquest}`+`list`,params)
}
export function listOneCartAPI(params){
    return http.get(`${resquest}`+`listOne`,params)
}
export function createCartAPI(params){
    return http.post(`${resquest}`+`create`,params)
}
export function updateCartAPI(params){
    return http.put(`${resquest}`+`update`,params)
}
export function deleteCartAPI(params){
    return http.delete(`${resquest}`+`delete`,params)
}