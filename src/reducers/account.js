import {
    AUTHORIZE_USER,
    FETCH_ACC_FAILURE,
    FETCH_ACC_INFO,
    FETCH_ACC_SUCCESS,
    LOGOUT_USER,
    ME_FROM_TOKEN
} from "../actions/account";

const INITIAL_STATE = {user: {}, auth: {}, status: null, loading: false, error: null};

const account = (state = INITIAL_STATE, action) => {
    let error;
    switch (action.type) {
        case FETCH_ACC_INFO:
            return {...state, loading: true, error: null};
        case FETCH_ACC_SUCCESS:
            return {...state, user: action.payload, loading: false, error: null};
        case FETCH_ACC_FAILURE:
            error = action.payload || {message: action.payload.message};  //2nd one is network or server down errors
            return {...state, loading: false, error: error};

        case AUTHORIZE_USER:
            return {...state, status: 'authorized', auth: action.payload, error: null, loading: false};
        case ME_FROM_TOKEN:
            return {...state, status: 'storage', auth: action.payload, error: null, loading: false};
        case LOGOUT_USER:
            return {...state, auth: {}, status: 'logout', error: null, loading: false};
        default:
            return state;
    }
};

export default account;