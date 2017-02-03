import * as API from '../../api/Backend';

export const GET_POST_PENDING = 'GET_POST_PENDING';
export const GET_POST_SUCCESS = 'GET_POST_SUCCESS';
export const GET_POST_FAILURE = 'GET_POST_FAILURE';

export const GET_DETAIL_POST_REQUEST = 'GET_DETAIL_POST_REQUEST';
export const GET_DETAIL_POST_SUCCESS = 'GET_DETAIL_POST_SUCCESS';
export const GET_DETAIL_POST_FAILURE = 'GET_DETAIL_POST_FAILURE';

export function getPostPending() {
    return {
        type: GET_POST_PENDING
    }
}

export function getPostSuccess(json) {
    return {
        type: GET_POST_SUCCESS,
        payload: json
    }
}

export function getPostFailure(error) {
    return {
        type: GET_POST_FAILURE,
        payload: error
    }
}

export function getPost(accessToken, limit) {
    return dispatch => {
        dispatch(getPostPending())
        return API.getPosts(accessToken, limit)
            .then((json) => {
                dispatch(getPostSuccess(json))
            })
            .catch((error) => {
                dispatch(getPostFailure(error))
            })
    }
}

