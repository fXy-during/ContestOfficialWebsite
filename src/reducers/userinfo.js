import * as actionTypes from '../constants/user';

const initialState = {};

export default function userinfo(state = initialState, action){
    switch (action.type) {
        case actionTypes.USERINFO_LOGIN:
            return action.data

        case actionTypes.USERINFO_LOGOOF:
            return {}
        
        case actionTypes.USERINFO_MATCH:
            return Object.assign({}, state, action.data)
        default: 
            return state
    }
}