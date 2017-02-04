import {
    GET_POST_PENDING,
    GET_POST_SUCCESS,
    GET_POST_FAILURE,
    GET_DETAIL_POST_REQUEST,
    GET_DETAIL_POST_SUCCESS,
    GET_DETAIL_POST_FAILURE,
    SAVE_POST_REQUEST,
    SAVE_POST_SUCCESS,
    SAVE_POST_FAILURE
} from '../actions/PostActions';

const initalState = {
    status: 'IDLE',
    posts: [],
    detail_post: {},
    error: '',
    uploadedPost: {}
};

export default function postReducer(state = initalState, action) {
    switch (action.type) {
        case GET_POST_PENDING:
            return {
                ...state,
                status: 'PENDING'
            };
        case GET_POST_SUCCESS:
            return {
                ...state,
                status: 'DONE',
                posts: action.payload
            }
            break;
        case GET_POST_FAILURE:
            return {
                ...state,
                status: 'ERROR',
                error: action.payload
            }
        case GET_DETAIL_POST_REQUEST:
            return {
                ...state
            };
        case GET_DETAIL_POST_SUCCESS:
            return {
                ...state,
                detail_post: action.payload
            };
        case GET_DETAIL_POST_FAILURE:
            return {
                ...state,
                error: action.payload
            };
        case SAVE_POST_REQUEST:
            return {
                ...state
            };
        case SAVE_POST_SUCCESS:
            return {
                ...state,
                uploadedPost: action.payload
            };
        case SAVE_POST_FAILURE:
            return {
                ...state,
                error: action.payload
            };
        default:
            return state;
    }
}