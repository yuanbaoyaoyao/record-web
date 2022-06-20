import http from "../utils/http";

let resquest = "/clientIp/client/user/"

export function updateUserAvatarAPI(params) {
    return http.put(`${resquest}` + `updateAvatar`, params)
}
