import get from '../get';




export default function getTeamInfo(params='', token='', teamId) {
    const url = '/dataCastle/match/teamInfo';
    const result = get(url, params, token, teamId);
    return result;
}



