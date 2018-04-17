import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

import React, {Component} from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import {Hello} from './components/Hello';
import {User} from './containers/User';
import {Main} from './components/Main';
import Auth from './components/Auth';
import Gallery from './containers/Gallery';
import HeaderContainer from './containers/HeaderContainer';
import NotFound from './components/NotFound';
import {connect} from "react-redux";
import {meFromToken} from "./actions/account";

class App extends Component {
    componentWillMount() {
        this.props.loadUserFromToken();
    }

    render() {
        return (
            <Router>
                <div className="App">
                    {/*<HeaderContainer/>*/}
                    <Route path='/' component={HeaderContainer}/>
                    <Switch>
                        <Route exact path='/' component={Main}/>
                        <Route path='/search' render={() => <Main content="search"/>}/>
                        <Route path="/gallery/:id?" component={Gallery}/>
                        <Route path="/user/:section(\w+)?" component={User}/>
                        <Route path='/schedule' component={Hello}/>
                        <Route path='/oauthcallback' component={Auth}/>
                        <Route path='*' component={NotFound}/>
                    </Switch>
                </div>
            </Router>
        );
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        loadUserFromToken: () => {
            let token = localStorage.getItem('imgurUserToken');
            if (!token || token === '') {//if there is no token, dont bother
                return;
            }
            token = JSON.parse(token);
            if (!(token.access_token && token.access_token.length === 40 &&
                token.refresh_token && token.refresh_token.length === 40)) {
                return;
            }
            dispatch(meFromToken(token));
        }
    }
};

export default connect(null, mapDispatchToProps)(App);