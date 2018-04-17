import modelAPI from "./modelAPI";
import axios from "axios/index";

/**
 * action types
 */
export const FETCH_ACC_INFO = 'FETCH_ACC_INFO';
export const FETCH_ACC_SUCCESS = 'FETCH_ACC_SUCCESS';
export const FETCH_ACC_FAILURE = 'FETCH_ACC_FAILURE';
export const AUTHORIZE_USER = 'AUTHORIZE_USER';
export const ME_FROM_TOKEN = 'ME_FROM_TOKEN';
export const LOGOUT_USER = 'LOGOUT_USER';

export const authorizeUser = (token) => {
    modelAPI.user_Auth = token;  // setting user auth data to modelAPI user_auth property object
    return {
        type: AUTHORIZE_USER,
        payload: token
    }
};

export const meFromToken = (tokenFromStorage) => {
    modelAPI.user_Auth = tokenFromStorage;  // setting user auth data to modelAPI user_auth property object
    return {
        type: ME_FROM_TOKEN,
        payload: tokenFromStorage
    }
};

export const fetchAccInfo = () => {
    const options = modelAPI.getRequestOptions('account', 'account base');
    const request = axios(options);

    return {
        type: FETCH_ACC_INFO,
        payload: request
    }
};

export const fetchAccSuccess = (data) => {
    return {
        type: FETCH_ACC_SUCCESS,
        payload: data,
    }
};

export const fetchAccFailure = (error) => {
    return {
        type: FETCH_ACC_FAILURE,
        payload: error
    }
};

export function logoutUser() {
    return {
        type: LOGOUT_USER
    };
}