import {connect} from "react-redux";
import {SelectGallery} from "../components/SelectGallery/SelectGallery";
import {fetchTopics, fetchTopicsFailure, fetchTopicsSuccess, pushGalleryParams} from "../actions/gallery";

const mapStateToProps = (state) => {
    return {
        params: state.gallery.params.gallery
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        fetchGalleryData: (params) => {
            dispatch(fetchTopics(params)).then((response) => {
                !response.error ?
                    dispatch(fetchTopicsSuccess(response.payload.data.data, params)) :
                    dispatch(fetchTopicsFailure(response.payload.response.data.data.error));
            });
        },
        pushParams: (params) => {
            dispatch(pushGalleryParams(params));
        }
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(SelectGallery);