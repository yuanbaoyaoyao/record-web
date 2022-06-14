import http from "../utils/http"
import md5 from "js-md5"

let resquest = "/shiroIp/auth/"

export function loginByUsername(username, password) {
    password = md5(password + 'ILoveYuanbao')
    const data = {
        username,
        password,
    }
    return http.post(`${resquest}` + `client/login`, data)
}
export function logout() {
    return http.post(`${resquest}` + `client/logout`)
}
export function getUserInfo() {
    return http.get(`${resquest}` + `client/info`)
}
