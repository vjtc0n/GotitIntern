/**
 * Created by vjtc0n on 2/2/17.
 */
import * as API from '../../api/Backend';

export const SAVE_TOKEN_TO_SERVER_REQUEST = 'SAVE_TOKEN_TO_SERVER_REQUEST';
export const SAVE_TOKEN_TO_SERVER_SUCCESS = 'SAVE_TOKEN_TO_SERVER_SUCCESS';
export const SAVE_TOKEN_TO_SERVER_FAILURE = 'SAVE_TOKEN_TO_SERVER_FAILURE';

export const SAVE_PROFILE_TO_SERVER_REQUEST = 'SAVE_PROFILE_TO_SERVER_REQUEST';
export const SAVE_PROFILE_TO_SERVER_SUCCESS = 'SAVE_PROFILE_TO_SERVER_SUCCESS';
export const SAVE_PROFILE_TO_SERVER_FAILURE = 'SAVE_PROFILE_TO_SERVER_FAILURE';

export const INSERT_PROFILE_TO_SERVER_REQUEST = 'INSERT_PROFILE_TO_SERVER_REQUEST';
export const INSERT_PROFILE_TO_SERVER_SUCCESS = 'INSERT_PROFILE_TO_SERVER_SUCCESS';
export const INSERT_PROFILE_TO_SERVER_FAILURE = 'INSERT_PROFILE_TO_SERVER_FAILURE';

export const GET_PROFILE_FROM_STORAGE = 'GET_PROFILE_FROM_STORAGE';


export function saveTokenToServerRequest () {
    return {
        type: SAVE_TOKEN_TO_SERVER_REQUEST
    }
}

export function saveTokenToServerFailure (error) {
    return {
        type: SAVE_TOKEN_TO_SERVER_FAILURE,
        payload: error
    }
}

export function saveTokenToServerSuccess (json) {
    return {
        type: SAVE_TOKEN_TO_SERVER_SUCCESS,
        payload: json
    }
}

export function saveTokenToServer (data) {
    return dispatch => {
        dispatch(saveTokenToServerRequest())
        return API.setFacebookTokenToServer(data)
            .then((json) => {
                dispatch(saveTokenToServerSuccess(json))
            })
            .catch((error) => {
                dispatch(saveTokenToServerFailure(error))
            })
    }
}


export function saveProfileToServerRequest () {
    return {
        type: SAVE_PROFILE_TO_SERVER_REQUEST
    }
}

export function saveProfileToServerFailure (error) {
    return {
        type: SAVE_PROFILE_TO_SERVER_FAILURE,
        payload: error
    }
}

export function saveProfileToServerSuccess (json) {
    return {
        type: SAVE_PROFILE_TO_SERVER_SUCCESS,
        payload: json
    }
}

export function saveProfileToServer (userID, data, accessToken) {
    return dispatch => {
        dispatch(saveProfileToServerRequest())
        return API.saveProfileToServer(userID, data, accessToken)
            .then((json) => {
                dispatch(saveProfileToServerSuccess(json))
            })
            .catch((error) => {
                dispatch(saveProfileToServerFailure(error))
            })
    }
}

export function insertProfileToServerRequest () {
    return {
        type: INSERT_PROFILE_TO_SERVER_REQUEST
    }
}

export function insertProfileToServerFailure (error) {
    return {
        type: INSERT_PROFILE_TO_SERVER_FAILURE,
        payload: error
    }
}

export function insertProfileToServerSuccess (json) {
    return {
        type: INSERT_PROFILE_TO_SERVER_SUCCESS,
        payload: json
    }
}

export function insertProfileToServer (data) {
    return dispatch => {
        dispatch(insertProfileToServerRequest())
        return API.insertProfileToServer(data)
            .then((json) => {
                dispatch(insertProfileToServerSuccess(json))
            })
            .catch((error) => {
                dispatch(insertProfileToServerFailure(error))
            })
    }
}

export function getProfileFromStorageSuccess (json) {
    return {
        type: GET_PROFILE_FROM_STORAGE,
        payload: json
    }
}

export function getProfileFromStorage (data) {
    return dispatch => {
        dispatch(getProfileFromStorageSuccess(data))
    }
}