import 'whatwg-fetch'
import 'es6-promise'



export function obj2params(obj){
    var result = '';

    // for(let [key, value] of Object.entries(obj)){
    //     result+=`&${key}=${encodeURIComponent(value)}`;
    // }
    
    for(let item in obj) {
        result += '&' + item + '=' + encodeURIComponent(obj[item])
    }

    if(result) {
        result = result.slice(1);
    }

    return result;
}


export default function get(url, params, token) {
    if (params) {
        let stringifyParams = obj2params(params);
        var urlWithUrl = url + '?' + stringifyParams;
        // console.log(urlWithUrl);
    }
    // console.log('params', params);
    let proToken = 'Bearer ' + token;
    var result = fetch(urlWithUrl || url, {
        headers: {
            'Accept': 'application/json, text/plain, */*',
            'Authorization': proToken
        },
        mode: 'cors',
    })
    return result;
}