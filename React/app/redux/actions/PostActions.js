import * as API from '../../api/Backend';

export const GET_POST_PENDING = 'GET_POST_PENDING';
export const GET_POST_SUCCESS = 'GET_POST_SUCCESS';
export const GET_POST_FAILURE = 'GET_POST_FAILURE';

export const GET_DETAIL_POST_REQUEST = 'GET_DETAIL_POST_REQUEST';
export const GET_DETAIL_POST_SUCCESS = 'GET_DETAIL_POST_SUCCESS';
export const GET_DETAIL_POST_FAILURE = 'GET_DETAIL_POST_FAILURE';

export const SAVE_POST_REQUEST = 'SAVE_POST_REQUEST';
export const SAVE_POST_SUCCESS = 'SAVE_POST_SUCCESS';
export const SAVE_POST_FAILURE = 'SAVE_POST_FAILURE';

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

export function getDetailPostRequest() {
    return {
        type: GET_DETAIL_POST_REQUEST
    }
}

export function getDetailPostSuccess(json) {
    return {
        type: GET_DETAIL_POST_SUCCESS,
        payload: json
    }
}

export function getDetailPostFailure(error) {
    return {
        type: GET_DETAIL_POST_FAILURE,
        payload: error
    }
}

export function getDetailPost(postId) {
    return dispatch => {
        dispatch(getDetailPostRequest())
        return API.getDetailPost(postId)
            .then((json) => {
                dispatch(getDetailPostSuccess(json))
            })
            .catch((error) => {
                dispatch(getDetailPostFailure(error))
            })
    }
}

export function savePostRequest() {
    return {
        type: SAVE_POST_REQUEST
    }
}

export function savePostSuccess(json) {
    return {
        type: SAVE_POST_REQUEST,
        payload: json
    }
}

export function savePostFailure(error) {
    return {
        type: SAVE_POST_FAILURE,
        payload: error
    }
}

export function savePost(data, accessToken) {
    return dispatch => {
        dispatch(savePostRequest())
        return API.savePost(data, accessToken)
            .then((json) => {
                dispatch(savePostSuccess(json))
            })
            .catch((error) => {
                dispatch(savePostFailure(error))
            })
    }
}

