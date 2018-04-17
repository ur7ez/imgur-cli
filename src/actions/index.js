export const SET_VISIBILITY_FILTER = 'SET_VISIBILITY_FILTER';

/**
 * visibility constants
 */
export const VisibilityFilters = {
    SHOW_ALL: 'SHOW_ALL',
    SHOW_ALBUMS: 'SHOW_ALBUMS',
    SHOW_ANIMATED: 'SHOW_ANIMATED',
    SHOW_IMAGES: 'SHOW_IMAGES',
    SHOW_INCLUDES: 'SHOW_INCLUDES',
};

export const setVisibilityFilter = (filter, search = '') => {
    return {
        type: SET_VISIBILITY_FILTER,
        filter,
        search
    }
};