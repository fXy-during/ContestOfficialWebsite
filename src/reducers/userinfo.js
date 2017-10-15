import * as actionTypes from '../constants/user';

const initialState = {};

export default function userinfo(state = initialState, action){

    switch (action.type) {
        case actionTypes.USERINFO_LOGIN:
            return action.data

        case actionTypes.USERINFO_LOGOOF:
            return {}
            
        default: 
            return state
    }
}