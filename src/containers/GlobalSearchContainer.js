import {connect} from 'react-redux';
import {pushSearchParams} from "../actions/gallery";
import GlobalSearch from '../components/GlobalSearch';

const mapStateToProps = (state) => {
    return {
        loading: state.gallery.search.loading,
        lastQueryStr: state.gallery.params.search.q,
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        pushParams: (params) => {
            dispatch(pushSearchParams(params));
        }
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(GlobalSearch);