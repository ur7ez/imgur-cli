import React from 'react';
import {NavLink} from 'react-router-dom';

export class UserLinks extends React.Component {

    render() {
        return (
            <li className="nav-item dropdown">
                <div className="btn-group">
                    <button className="btn btn-secondary">
                        <NavLink to="/user/gallery" className="user-nav">{this.props.user.url}</NavLink>
                    </button>
                    <button className="btn btn-secondary dropdown-toggle dropdown-toggle-split" data-toggle="dropdown"
                            aria-haspopup="true" aria-expanded="false">
                    </button>
                    <div className="dropdown-menu user-dropdown-container">
                        <ul className="user-dropdown">
                            <li><NavLink className="dropdown-item" to="/user/images">images</NavLink></li>
                            <li><NavLink className="dropdown-item" to="/user/albums">albums</NavLink></li>
                            <li><NavLink className="dropdown-item active" to="/user/gallery">gallery profile</NavLink>
                            </li>
                            <li><NavLink className="dropdown-item" to="/user/favorites">favorites</NavLink></li>
                            <li><NavLink className="dropdown-item" to="/user/messages">messages</NavLink></li>
                        </ul>
                        <div className="dropdown-footer">
                            <NavLink to="/user/settings">settings</NavLink>
                            <button className="log-out" onClick={this.props.logout}>sign out</button>
                        </div>
                    </div>
                </div>
            </li>
        )
    }
}