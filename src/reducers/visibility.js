import {SET_VISIBILITY_FILTER, VisibilityFilters} from "../actions/index";

const {SHOW_ALL, SHOW_INCLUDES} = VisibilityFilters;
const INITIAL_STATE = {filter: SHOW_ALL, search: ""};

const visibilityFilter = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case SET_VISIBILITY_FILTER:
            if (action.filter === SHOW_INCLUDES) {
                return {filter: action.filter, search: action.search}
            }
            return {filter: action.filter};
        default:
            return state;
    }
};

export default visibilityFilter;