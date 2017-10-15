import post from '../post';




export default function login( body='', captcha='', token='') {
    const url = '/dataCastle/user/signIn';
    const result = post(url, body, token, captcha );
    return result;
}



