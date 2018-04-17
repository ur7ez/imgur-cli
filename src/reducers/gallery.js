import {
    FETCH_GALLERY,
    FETCH_GALLERY_FAILURE,
    FETCH_GALLERY_SUCCESS,
    FETCH_POST,
    FETCH_POST_FAILURE,
    FETCH_POST_SUCCESS,
    FETCH_SEARCH,
    FETCH_SEARCH_FAILURE,
    FETCH_SEARCH_SUCCESS,
    POST_VOTE,
    POST_VOTE_FAILURE,
    POST_VOTE_SUCCESS,
    PUSH_GALLERY_PARAMS,
    PUSH_SEARCH_PARAMS,
} from "../actions/gallery";

const INITIAL_STATE = {
    gallery: {topics: [], page: null, url: '', loading: false, error: null},
    search: {topics: [], q: '', page: null, is_rendered: null, loading: false, error: null, foundCnt: null},
    post: {topics: [], loading: false, error: null},
    votes: {voting: [], loading: false, error: null},
    params: {
        gallery: {},
        search: {sort: 'time', window: 'all'}   // in API search params are optional, except for query string 'q'
                                                // these values are used by default if none stated
    },
};

const gallery = (state = INITIAL_STATE, action) => {
    let error;
    switch (action.type) {
        case PUSH_GALLERY_PARAMS:
            return {...state, params: {...state.params, gallery: action.params}};
        case PUSH_SEARCH_PARAMS:
            return {
                ...state, params: {
                    ...state.params,
                    search: {...state.params.search, ...action.params}
                }
            };

        case POST_VOTE:
            return {...state, votes: {...state.votes, loading: true, error: null}};
        case POST_VOTE_SUCCESS:
            return {
                ...state,
                votes: {
                    ...state.votes,
                    voting: [...state.votes.voting, action.payload],
                    loading: false, error: null
                }
            };
        case POST_VOTE_FAILURE:
            return {...state, votes: {...state.votes, loading: false, error: action.payload}};

        case FETCH_GALLERY:
            return {...state, gallery: {...state.gallery, loading: true, error: null}};
        case FETCH_GALLERY_SUCCESS:
            return {
                ...state,
                gallery: {
                    ...state.gallery,
                    topics: action.payload,
                    loading: false,
                    url: action.url,
                    page: action.page
                }
            };
        case FETCH_GALLERY_FAILURE:
            error = action.payload || {message: action.payload.message};  //2nd one is network or server down errors
            return {...state, gallery: {...state.gallery, loading: false, error: error}};

        case FETCH_POST:
            return {...state, post: {...state.post, loading: true, error: null}};
        case FETCH_POST_SUCCESS:
            return {
                ...state,
                post: {
                    ...state.post,
                    topics: [...state.post.topics, action.payload],
                    loading: false
                }
            };
        case FETCH_POST_FAILURE:
            error = action.payload || {message: action.payload.message};  //2nd one is network or server down errors
            return {...state, post: {...state.post, loading: false, error: error}};

        case FETCH_SEARCH:
            return {
                ...state,
                search: {
                    ...state.search,
                    q: '',
                    foundCnt: null,
                    is_rendered: null,
                    loading: true, error: null
                }
            };
        case FETCH_SEARCH_SUCCESS:
            return {
                ...state,
                search: {
                    ...state.search,
                    topics: action.payload, // [...state.search.topics, ...action.payload],
                    q: action.q,
                    foundCnt: action.found,
                    page: action.page,
                    is_rendered: false,
                    loading: false,
                    error: null
                }
            };
        case FETCH_SEARCH_FAILURE:
            error = action.payload || {message: action.payload.message};  //2nd one is network or server down errors
            return {
                ...state,
                search: {
                    ...state.search,
                    // topics: [],
                    is_rendered: null,
                    loading: false, error: error
                }
            };

        default:
            return state;
    }
};

export default gallery;