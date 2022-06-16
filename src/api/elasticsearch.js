import http from "../utils/http";

let resquest = "/searchIp/esProduct/"

export function elasticsearchAPI(params){
    return http.get(`${resquest}`+`search`,params)
}