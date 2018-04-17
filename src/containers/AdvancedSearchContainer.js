import {connect} from "react-redux";
import {AdvancedOptionsForm} from "../components/AdvancedOptionsForm";
import {fetchSearch, fetchSearchFailure, fetchSearchSuccess, pushSearchParams} from "../actions/gallery";

const mapStateToProps = (state) => {
    return {
        params: state.gallery.params.search,
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        fetchSearchData: (paramsObj) => {
            dispatch(fetchSearch(paramsObj)).then((response) => {
                !response.error ?
                    dispatch(fetchSearchSuccess(response.payload.data.data, paramsObj))
                    : dispatch(fetchSearchFailure(response.payload.response.data.data.error));
            });
        },
        pushParams: (params) => {
            dispatch(pushSearchParams(params));
        }
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(AdvancedOptionsForm);