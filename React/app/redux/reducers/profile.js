/**
 * Created by vjtc0n on 2/2/17.
 */
import
{
    SAVE_TOKEN_TO_SERVER_REQUEST,
    SAVE_TOKEN_TO_SERVER_SUCCESS,
    SAVE_TOKEN_TO_SERVER_FAILURE,
    SAVE_PROFILE_TO_SERVER_REQUEST,
    SAVE_PROFILE_TO_SERVER_SUCCESS,
    SAVE_PROFILE_TO_SERVER_FAILURE,
    INSERT_PROFILE_TO_SERVER_REQUEST,
    INSERT_PROFILE_TO_SERVER_SUCCESS,
    INSERT_PROFILE_TO_SERVER_FAILURE,
    GET_PROFILE_FROM_STORAGE
}
    from '../actions/LoginAction';

const initalState = {
    accessToken: {
        id: '',
        ttl: 0,
        userId: ''
    },
    user: {
        username: '',
        email: '',
        userId: ''
    },
    error: ''
};

export default function profileReducer(state = initalState, action) {
    switch (action.type) {
        case SAVE_TOKEN_TO_SERVER_REQUEST:
            return {
                ...state
            };
        case SAVE_TOKEN_TO_SERVER_SUCCESS:
            return {
                ...state,
                accessToken: action.payload.result
            };
        case SAVE_TOKEN_TO_SERVER_FAILURE:
            return {
                ...state,
                error: action.payload
            };
        case SAVE_PROFILE_TO_SERVER_REQUEST:
            return {
                ...state
            };
        case SAVE_PROFILE_TO_SERVER_SUCCESS:
            return {
                ...state,
                user: action.payload
            };
        case SAVE_PROFILE_TO_SERVER_FAILURE:
            return {
                ...state,
                error: action.payload
            };
        case INSERT_PROFILE_TO_SERVER_REQUEST:
            return {
                ...state
            };
        case INSERT_PROFILE_TO_SERVER_SUCCESS:
            return {
                ...state,
                user: action.payload
            };
        case INSERT_PROFILE_TO_SERVER_FAILURE:
            return {
                ...state,
                error: action.payload
            };
        case GET_PROFILE_FROM_STORAGE:
            return {
                ...state,
                user: action.payload.user,
                accessToken: action.payload.accessToken
            };
        default:
            return state;
    }
}
