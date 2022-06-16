import http from "../utils/http";

let resquest = "/clientIp/userReminderClient/"

export function listUserReminderAPI(params) {
    return http.get(`${resquest}` + `list`, params)
}

export function updateUserReminderAPI(params) {
    return http.put(`${resquest}` + `update`, params)
}

export function updateUserReminderListAPI(params) {
    return http.put(`${resquest}` + `updateByIds`, params)
}

export function deleteUserReminderAPI(params) {
    return http.delete(`${resquest}` + `delete`, params)
}

export function deleteUserReminderListAPI(params) {
    return http.delete(`${resquest}` + `deleteByIds`, params)
}