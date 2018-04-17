import React from "react";
import {authorizeUser} from "../actions/account";
import {connect} from "react-redux";
import modelAPI from "../actions/modelAPI";

class Auth extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            authUrl: modelAPI.getRequestOptions('authorization', 'authorize').url,
            authorized: undefined
        };
    }

    static extractToken(hash) {
        let params = {}, queryString = hash.substring(1), regex = /([^&=]+)=([^&]*)/g, m;
        while (m = regex.exec(queryString)) {
            params[decodeURIComponent(m[1])] = decodeURIComponent(m[2]);
        }
        return params;
    };

    redirectToMain() {
        setTimeout(() => {
            this.props.history.push('/');
        }, 3000);
    }

    componentWillMount() {
        // check if we should redirect to auth url here - otherwise this component was called as a callback from
        // auth url pushed from within other components
        if (!this.props.auth.access_token && this.state.authorized === undefined
            && !(localStorage.authStarted && JSON.parse(localStorage.authStarted))) {
            localStorage['authStarted'] = true;
            window.location = this.state.authUrl;
            return;
        }

        let token = Auth.extractToken(document.location.hash);
        let denied = Auth.extractToken(document.location.search);
        if (denied && denied.error) {   // in case access to our application was denied by user...
            localStorage.removeItem('authStarted');
            this.setState({authorized: false});
        } else if (token && Object.keys(token).length > 0 && localStorage.authStarted && JSON.parse(localStorage.authStarted)) {
            localStorage.removeItem('authStarted');
            this.props.authorizeUser(token);
            this.setState({authorized: true});
        }
    }

    render() {
        if (this.state.authorized === undefined) return <p> Location {JSON.stringify(this.props.location)} </p>; //null;
        return (
            <h2 className={`auth ${this.state.authorized ? 'success' : 'failure'}`}>
                {this.state.authorized ? 'Thank you for authorization!' : 'User denied authorization'}
                {this.redirectToMain()}
            </h2>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        auth: state.account.auth
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        authorizeUser: (token) => {
            localStorage['imgurUserToken'] = JSON.stringify(token);
            dispatch(authorizeUser(token));
        }
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Auth);