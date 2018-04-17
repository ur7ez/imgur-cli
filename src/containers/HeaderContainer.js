import {connect} from "react-redux";
import Header from "../components/Header";
import {fetchAccFailure, fetchAccInfo, fetchAccSuccess, logoutUser} from "../actions/account";

const mapStateToProps = (state) => {
    return {
        user: state.account.user,
        auth: state.account.auth,
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        fetchAccData: () => {
            dispatch(fetchAccInfo()).then((response) => {
                !response.error ?
                    dispatch(fetchAccSuccess(response.payload.data.data)) :
                    dispatch(fetchAccFailure(response.payload.response.data.data.error));
            });
        },
        logout: () => {
            localStorage.removeItem('imgurUserToken');
            dispatch(logoutUser());
        }
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);