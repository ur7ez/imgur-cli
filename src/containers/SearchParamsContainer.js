import {connect} from "react-redux";
import {SearchGallery} from "../components/SelectGallery/SearchGallery";
import {fetchSearch, fetchSearchFailure, fetchSearchSuccess, pushSearchParams} from "../actions/gallery";

const mapStateToProps = (state) => {
    return {
        loading: state.gallery.search.loading,
        params: state.gallery.params.search,
        searchFound: state.gallery.search.foundCnt
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

export default connect(mapStateToProps, mapDispatchToProps)(SearchGallery);