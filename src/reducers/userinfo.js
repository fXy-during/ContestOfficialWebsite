import * as actionTypes from '../constants/user';
import { setItem } from '../util/storeUser';
const initialState = {};

export default function userinfo(state = initialState, action){
    switch (action.type) {
        case actionTypes.USERINFO_LOGIN:{
            console.log('action.data', action.data);
            // 保存登录信息
            setItemMac(action.data);
            return action.data
        }

        case actionTypes.USERINFO_LOGOOF:{
            // 注銷
            setItemMac({})
            return {}
        }

        case actionTypes.USERINFO_ADDTEAMINFO:{
            return Object.assign({}, state, { teamInfo: action.data})
        }

        case actionTypes.USERINFO_MATCH:{
            setItem(Object.assign({}, state, action.data));
            return Object.assign({}, state, action.data)
        }
        default: 
            return state
    }
}
function setItemMac({username, teamId, token, matched}) {
    setItem('bigDataMonth_token', token);
    setItem('bigDataMonth_username', username);
    setItem('bigDataMonth_teamId', !!teamId?teamId: '');
    setItem('bigDataMonth_matched', matched);
}