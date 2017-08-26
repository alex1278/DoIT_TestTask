import Request from 'superagent';

export function userSignupRequest(email, password, passwordСonfirmation) {
    return dispatch => {
        return Request
            .post('/users/register')
            .send({ email: email, password: password, passwordСonfirmation: passwordСonfirmation })
    }
}

export function loginRequest(email, password) {
    return dispatch => {
        return Request
            .post('/users/login')
            .send({ email: email, password: password })
    }
}

export function setCurrentUser(userData) {
    return {
        type: 'SET_CURRENT_USER',
        payload: userData
    }      
}

export function logout() {
    return dispatch => {
        localStorage.removeItem('jwtToken');
        dispatch(setCurrentUser({}));
    }
}
