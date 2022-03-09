import http from "../utils/http";

let resquest = "/shiroIp/auth/"

export function loginByUsername(username, password, code) {
    const data = {
        username,
        password,
        code
    }
    return http.post(`${resquest}` + `client/login`, data)
}
export function logout() {
    return http.post(`${resquest}` + `client/logout`)
}
export function getUserInfo(token) {
    return http.get(`${resquest}` + `client/info`, token)
}
