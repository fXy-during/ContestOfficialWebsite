import post from '../post';




export default function createTeam(body='', captcha='', token='', mail='', ) {
    const url = '/dataCastle/match/team';
    const result = post(url, body, token, captcha, mail);
    return result;
}



