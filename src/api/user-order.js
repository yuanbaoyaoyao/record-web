import http from "../utils/http";

let resquest = "/clientIp/client/userOrder/"

export function listUserOrderAPI(params){
    return http.get(`${resquest}`+`list`,params)
}
export function createUserOrderAPI(params){
    return http.post(`${resquest}`+`create`,params)
}
export function deleteUserOrderAPI(params){
    return http.delete(`${resquest}`+`delete`,params)
}
// export function updateProductSkusAPI(params){
//     return http.post(`${resquest}`+`update`,params)
// }
