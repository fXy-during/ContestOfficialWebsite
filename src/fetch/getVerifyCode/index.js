import get from '../get';



export default function getVerifyCode() {
    let url = '/dataCastle/user/verifyCode';

    const result = get(url);
    return result;
}



