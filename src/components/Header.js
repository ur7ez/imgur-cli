import React from 'react';
import {NavLink} from 'react-router-dom';
import GlobalSearchContainer from '../containers/GlobalSearchContainer'
import {UserLinks} from './UserLinks'
import '../styles/navbar.css';
import {NewPost} from "./NewPost";
import modelAPI from "../actions/modelAPI";

export default class Header extends React.Component {
    constructor(props) {
        super(props);
        this.state = {account_fetch_status: undefined};
        this.fetchUser = this.fetchUser.bind(this);
    }

    componentWillMount() {
        this.fetchUser();
    }

    componentWillReceiveProps() {
        this.fetchUser();
    }

    fetchUser() {
        if (this.props.auth.access_token &&
            Object.keys(this.props.user).length === 0 &&
            this.state.account_fetch_status === undefined) {
            this.setState({account_fetch_status: 'started'}, this.props.fetchAccData());
        }
    }

    render() {
        const authUrl = modelAPI.getRequestOptions('authorization', 'authorize').url;

        return (
            <header id="topbar" className="navbar navbar-expand navbar-dark bg-dark flex-column flex-md-row bd-navbar py-1">
                <a href="https://imgur.com" className="topbar-icon logo navbar-brand"
                   title="go to the native Imgur app">
                    <div className="logo-icon"></div>
                </a>
                <div>
                    <ul className="nav nav-pills nav-fill">
                        <li className='nav-item'><NavLink exact to='/' className="nav-link"
                                                          activeClassName="active">Home</NavLink></li>
                        <li className='nav-item'><NavLink to='/roster' className="nav-link"
                                                          activeClassName="active">Roster</NavLink></li>
                        <NewPost/>
                    </ul>
                </div>
                <ul className="navbar-nav flex-row ml-md-auto d-none d-md-flex">

                    <li id="global-search-container"><GlobalSearchContainer/></li>

                    {(this.props.auth.access_token && Object.keys(this.props.user).length > 1) ?
                        <UserLinks user={this.props.user} logout={this.props.logout}/> :
                        <li className='nav-item'>
                            <a href={authUrl} onClick={() => {
                                localStorage['authStarted'] = true;
                            }}
                               className="nav-link" title="Authorize & Sign In">
                                Sign In
                            </a>
                        </li>
                    }
                    <li className="nav-item">
                        <NavLink className="nav-link p-2" to="https://github.com/ur7ez" target="_blank"
                                 rel="noopener" aria-label="GitHub">
                            <svg className="navbar-nav-svg" xmlns="http://www.w3.org/2000/svg" version="1.1"
                                 viewBox="0 0 512 499.36" focusable="false">
                                <title>GitHub</title>
                                <path
                                    d="M256 0C114.64 0 0 114.61 0 256c0 113.09 73.34 209 175.08 242.9 12.8 2.35 17.47-5.56 17.47-12.34 0-6.08-.22-22.18-.35-43.54-71.2 15.49-86.2-34.34-86.2-34.34-11.64-29.57-28.42-37.45-28.42-37.45-23.27-15.84 1.73-15.55 1.73-15.55 25.69 1.81 39.21 26.38 39.21 26.38 22.84 39.12 59.92 27.82 74.5 21.27 2.33-16.54 8.94-27.82 16.25-34.22-56.84-6.43-116.6-28.43-116.6-126.49 0-27.95 10-50.8 26.35-68.69-2.63-6.48-11.42-32.5 2.51-67.75 0 0 21.49-6.88 70.4 26.24a242.65 242.65 0 0 1 128.18 0c48.87-33.13 70.33-26.24 70.33-26.24 14 35.25 5.18 61.27 2.55 67.75 16.41 17.9 26.31 40.75 26.31 68.69 0 98.35-59.85 120-116.88 126.32 9.19 7.9 17.38 23.53 17.38 47.41 0 34.22-.31 61.83-.31 70.23 0 6.85 4.61 14.81 17.6 12.31C438.72 464.97 512 369.08 512 256.02 512 114.62 397.37 0 256 0z"
                                    fill="currentColor" fillRule="evenodd">
                                </path>
                            </svg>
                        </NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink className="nav-link p-2" to="https://16-08-fstk.slack.com" target="_blank"
                                 rel="noopener" aria-label="Slack">
                            <svg className="navbar-nav-svg" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"
                                 focusable="false">
                                <title>Slack</title>
                                <path fill="currentColor" d="M210.787 234.832l68.31-22.883 22.1 65.977-68.309 22.882z">
                                </path>
                                <path
                                    d="M490.54 185.6C437.7 9.59 361.6-31.34 185.6 21.46S-31.3 150.4 21.46 326.4 150.4 543.3 326.4 490.54 543.34 361.6 490.54 185.6zM401.7 299.8l-33.15 11.05 11.46 34.38c4.5 13.92-2.87 29.06-16.78 33.56-2.87.82-6.14 1.64-9 1.23a27.32 27.32 0 0 1-24.56-18l-11.46-34.38-68.36 22.92 11.46 34.38c4.5 13.92-2.87 29.06-16.78 33.56-2.87.82-6.14 1.64-9 1.23a27.32 27.32 0 0 1-24.56-18l-11.46-34.43-33.15 11.05c-2.87.82-6.14 1.64-9 1.23a27.32 27.32 0 0 1-24.56-18c-4.5-13.92 2.87-29.06 16.78-33.56l33.12-11.03-22.1-65.9-33.15 11.05c-2.87.82-6.14 1.64-9 1.23a27.32 27.32 0 0 1-24.56-18c-4.48-13.93 2.89-29.07 16.81-33.58l33.15-11.05-11.46-34.38c-4.5-13.92 2.87-29.06 16.78-33.56s29.06 2.87 33.56 16.78l11.46 34.38 68.36-22.92-11.46-34.38c-4.5-13.92 2.87-29.06 16.78-33.56s29.06 2.87 33.56 16.78l11.47 34.42 33.15-11.05c13.92-4.5 29.06 2.87 33.56 16.78s-2.87 29.06-16.78 33.56L329.7 194.6l22.1 65.9 33.15-11.05c13.92-4.5 29.06 2.87 33.56 16.78s-2.88 29.07-16.81 33.57z"
                                    fill="currentColor">
                                </path>
                            </svg>
                        </NavLink>
                    </li>
                </ul>
                <NavLink className="btn btn-bd-download d-none d-lg-inline-block mb-3 mb-md-0 ml-md-3"
                         to="https://github.com/ur7ez/" target="_blank">Download</NavLink>
            </header>
        )
    }
}