import http from "../utils/http";

let resquest = "/clientIp/userCollectClient/"

export function listUserCollectAPI(params){
    return http.get(`${resquest}`+`list`,params)
}
export function IsLikeUserCollectAPI(params){
    return http.get(`${resquest}`+`IsLike`,params)
}
export function createUserCollectAPI(params){
    return http.post(`${resquest}`+`create`,params)
}
export function deleteUserCollectAPI(params){
    return http.delete(`${resquest}`+`delete`,params)
}