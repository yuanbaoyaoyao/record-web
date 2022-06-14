import http from "../utils/http";

let resquest = "/clientIp/frontShowClient/"

export function listFrontShowRotationAPI(){
    return http.get(`${resquest}`+`listRotation`)
}
export function listFrontShowOldAPI(){
    return http.get(`${resquest}`+`listOld`)
}
export function listFrontShowNewAPI(){
    return http.get(`${resquest}`+`listNew`)
}