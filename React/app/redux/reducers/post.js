import {
    GET_POST_PENDING,
    GET_POST_SUCCESS,
    GET_POST_FAILURE,
    GET_DETAIL_POST_REQUEST,
    GET_DETAIL_POST_SUCCESS,
    GET_DETAIL_POST_FAILURE
} from '../actions/PostActions';

const initalState = {
    status: 'IDLE',
    posts: [],
    detail_post: {},
    error: ''
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
        default:
            return state;
    }
}