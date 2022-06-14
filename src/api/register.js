import http from "../utils/http"
import md5 from "js-md5"

let resquest = "/clientIp/client/user"

export function getEmailCode(email) {
    return http.post(`${resquest}` + `/sendEmailCode?email=` + email)
}

export function register(data) {
    data.password = md5(data.password + 'ILoveYuanbao')
    return http.post(`${resquest}` + `/register`, data)
}

export function forget(data){
    data.password = md5(data.password + 'ILoveYuanbao')
    return http.post(`${resquest}` + `/forget`, data)
}