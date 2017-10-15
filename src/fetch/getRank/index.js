import get from '../get';




export default function getRank(params='', token='') {
    const url = '/dataCastle/match/rankList';
    const result = get(url, params, token);
    return result;
}



