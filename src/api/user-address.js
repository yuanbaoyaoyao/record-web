import http from "../utils/http";

let resquest = "/clientIp/client/userAddress/"

export function listUserAddressAPI(params){
    return http.get(`${resquest}`+`list`,params)
}
export function createUserAddressAPI(params){
    return http.post(`${resquest}`+`create`,params)
}
export function deleteUserAddressAPI(params){
    return http.delete(`${resquest}`+`delete`,params)
}
export function updateUserAddressAPI(params){
    return http.put(`${resquest}`+`update`,params)
}
