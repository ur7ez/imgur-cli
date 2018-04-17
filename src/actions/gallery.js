import axios from 'axios';
import modelAPI from './modelAPI';

/**
 * action types
 */
export const PUSH_GALLERY_PARAMS = 'PUSH_GALLERY_PARAMS';
export const PUSH_SEARCH_PARAMS = 'PUSH_SEARCH_PARAMS';

export const FETCH_GALLERY = 'FETCH_GALLERY';
export const FETCH_GALLERY_SUCCESS = 'FETCH_GALLERY_SUCCESS';
export const FETCH_GALLERY_FAILURE = 'FETCH_GALLERY_FAILURE';

export const FETCH_SEARCH = 'FETCH_SEARCH';
export const FETCH_SEARCH_SUCCESS = 'FETCH_SEARCH_SUCCESS';
export const FETCH_SEARCH_FAILURE = 'FETCH_SEARCH_FAILURE';

export const FETCH_POST = 'FETCH_POST';
export const FETCH_POST_SUCCESS = 'FETCH_POST_SUCCESS';
export const FETCH_POST_FAILURE = 'FETCH_POST_FAILURE';

export const POST_VOTE = 'POST_VOTE';
export const POST_VOTE_SUCCESS = 'POST_VOTE_SUCCESS';
export const POST_VOTE_FAILURE = 'POST_VOTE_FAILURE';

/**
 * action creators
 */
export const fetchTopics = (params) => {
    const options = modelAPI.getRequestOptions('gallery', 'gallery', params);
    const request = axios(options);

    return {
        type: FETCH_GALLERY,
        payload: request,
    }
};

export const fetchTopicsSuccess = (data, params) => {
    return {
        type: FETCH_GALLERY_SUCCESS,
        url: modelAPI.getRequestOptions('gallery', 'gallery', params).url,
        page: (params && params.page) ? params.page : 0,
        payload: data,
    }
};

export const fetchTopicsFailure = (error) => {
    return {
        type: FETCH_GALLERY_FAILURE,
        payload: error
    }
};

export const fetchSearch = (paramsObj) => {
    const options = modelAPI.getRequestOptions('gallery', 'gallery search', paramsObj);
    const request = axios(options);
    return {
        type: FETCH_SEARCH,
        payload: request
    }
};

export const fetchSearchSuccess = (data, params) => {
    return {
        type: FETCH_SEARCH_SUCCESS,
        payload: data,
        found: 0,
        q: params.q,
        page: (params && params.page) ? params.page : 0,
    }
};

export const fetchSearchFailure = (error) => {
    return {
        type: FETCH_SEARCH_FAILURE,
        payload: error,
    }
};

export const fetchPost = (hash, is_album) => {
    const options = (is_album) ? modelAPI.getRequestOptions('gallery', 'gallery album', {galleryHash: hash})
        : modelAPI.getRequestOptions('gallery', 'gallery image', {galleryImageHash: hash});
    const request = axios(options);

    return {
        type: FETCH_POST,
        payload: request,
    }
};

export const fetchPostSuccess = (data) => {
    return {
        type: FETCH_POST_SUCCESS,
        payload: data,
    }
};

export const fetchPostFailure = (error) => {
    return {
        type: FETCH_POST_FAILURE,
        payload: error
    }
};

export const pushGalleryParams = (params) => {
    return {
        type: PUSH_GALLERY_PARAMS,
        params
    }
};

export const pushSearchParams = (params) => {
    return {
        type: PUSH_SEARCH_PARAMS,
        params
    }
};

export const postVote = (hash, vote) => {
    const options = modelAPI.getRequestOptions('gallery', 'album / image voting', {galleryHash: hash, vote});
    const request = axios(options);

    return {
        type: POST_VOTE,
        payload: request
    }
};

export const postVoteSuccess = (data) => {
    return {
        type: POST_VOTE_SUCCESS,
        payload: data,
    }
};

export const postVoteFailure = (error) => {
    return {
        type: POST_VOTE_FAILURE,
        payload: error
    }
};