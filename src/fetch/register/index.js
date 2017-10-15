import post from '../post';




export default function register(body='', captcha='', token='') {
    const url = '/dataCastle/user/signUp';
    const result = post(url, body, token, captcha );
    return result;
}



