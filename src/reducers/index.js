import {combineReducers} from 'redux';
import gallery from "./gallery";
import visibilityFilter from "./visibility";
import account from "./account";

const imgurReducers = combineReducers({visibilityFilter, gallery, account});
export default imgurReducers;