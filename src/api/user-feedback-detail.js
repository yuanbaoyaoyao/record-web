import http from "../utils/http";

let resquest = "/clientIp/userFeedbackDetailClient/"

export function listUserFeedbackDetailAPI(params){
    return http.get(`${resquest}`+`list`,params)
}

export function createUserFeedbackDetailAPI(params){
    return http.post(`${resquest}`+`create`,params)
}
