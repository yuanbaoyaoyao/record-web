import http from "../utils/http";

let resquest = "/clientIp/announcementClient/"

export function listAnnouncementAPI() {
    return http.get(`${resquest}` + `list`)
}