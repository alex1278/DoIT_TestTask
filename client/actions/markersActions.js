import Request from 'superagent';

export function saveMarkersRequest(userId, markers) {
    return dispatch => {
        return Request
            .post('/markers/savemarkers')
            .send({ userId: userId, markers: markers })
            .end()
    }
}

export function showMarkersRequest(userId) {
    return dispatch => {
        return Request
            .post('/markers/showmarkers')
            .send({ userId: userId })
    }
}