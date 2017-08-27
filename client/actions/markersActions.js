import Request from 'superagent';

export function saveMarkersRequest(userId, markers) {
    return dispatch => {
        return Request
            .post('/markers/savemarkers')
            .send({ userId: userId, markers: markers })
    }
}