import http from "../utils/http";

let resquest = "/clientIp/userFeedbackClient/"

export function listUserFeedbackAPI(params){
    return http.get(`${resquest}`+`list`,params)
}

export function createUserFeedbackAPI(params){
    return http.post(`${resquest}`+`create`,params)
}

export function updateUserFeedbackFinishedAPI(params){
    return http.put(`${resquest}`+`updateFinished`,params)
}
