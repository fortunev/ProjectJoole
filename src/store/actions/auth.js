import axios from 'axios';

import * as actionTypes from './actionTypes';

export const authStart = () => {
    return {
        type: actionTypes.AUTH_START
    };
};

export const authSuccess = (token, userId) => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        idToken: token,
        userId: userId
    };
};

export const authFail = (error) => {
    return {
        type: actionTypes.AUTH_FAIL,
        error: error
    };
};

export const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('expirationDate');
    localStorage.removeItem('userId');
    localStorage.removeItem('itemId');
    localStorage.removeItem('item_type');
    return {
        type: actionTypes.AUTH_LOGOUT
    };
};

export const checkAuthTimeout = (expirationTime) => {
    return dispatch => {
        setTimeout(() => {
            dispatch(logout());
        }, expirationTime * 1000);
    };      
};

export const auth = (name, email, username, password, role, image, isSignup) => {
    return dispatch => {
        dispatch(authStart());
        const authData = {
            name: name,
            username: username,
            email: email,
            role: [role],
            password: password,
            image: image,
            returnSecureToken: true
        };
        console.log(authData);
        console.log(isSignup);
        let url = 'http://localhost:8080/api/auth/signup';
        if (!isSignup) {
            url = 'http://localhost:8080/api/auth/signin';
        }
        axios.post(url, authData)
            .then(response => {
                console.log(response);
                console.log(response.data.exp / 60 +" mins ");
                const expirationDate = new Date(new Date().getTime() + response.data.exp * 1000);
                localStorage.setItem('token', response.data.idToken);
                localStorage.setItem('expirationDate', expirationDate);
                localStorage.setItem('userId', response.data.localId); // back end doesnt send id
                
                localStorage.setItem('image', response.data.image.split("blob:").pop());
                localStorage.setItem('itemId', null);
                localStorage.setItem('item_type', null);
                dispatch(authSuccess(response.data.idToken, response.data.localId));
                dispatch(checkAuthTimeout(response.data.exp));
            })
            .catch(err => {
                dispatch(authFail(err));
            });
    };
};

export const setAuthRedirectPath = (path) => {
    return {
        type: actionTypes.SET_AUTH_REDIRECT_PATH,
        path: path
    };
};

export const authCheckState = () => {
    return dispatch => {
        const token = localStorage.getItem('token');
        if (!token) {
            dispatch(logout());
        } else {
            const expirationDate = new Date(localStorage.getItem('expirationDate'));              
            if (expirationDate <= new Date()) {                
                dispatch(logout());
            } else {
                const userId = localStorage.getItem('userId');
                dispatch(authSuccess(token, userId));
                dispatch(checkAuthTimeout((expirationDate.getTime() - new Date().getTime()) / 1000 ));
            }   
        }
    };
};