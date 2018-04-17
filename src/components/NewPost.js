import React from "react";
import {Link} from 'react-router-dom';

export class NewPost extends React.Component {
    constructor(props) {
        super(props);
        this.state = {dropdownClass: ''};
        this.toggleIcon = this.toggleIcon.bind(this);
    }

    toggleIcon(e) {
        e.preventDefault();
        e.stopPropagation();
        this.setState({dropdownClass: (this.state.dropdownClass === '') ? 'create-dropdown-opened' : ''});
    }

    render() {
        return (
            <li className="upload-button-container" onBlur={() => this.setState({dropdownClass: ''})}>
                <div id="createDropdown" className={`options ${this.state.dropdownClass}`}>
                    <ul>
                        <li className="item"><Link to="/upload">Upload Images</Link></li>
                        <li className="item"><Link to="/vidgif">Video to GIF</Link></li>
                        <li className="item"><Link to="/memegen">Make a Meme</Link></li>
                    </ul>
                </div>
                <Link to="/upload" className="upload-button nav-link">
                    <span className="icon-upload"></span>
                    <span className="upload-btn-text">New post</span>
                    <span id="create-dropdown-button" className="selection icon icon-arrow-down"
                          onClick={(e) => this.toggleIcon(e)}></span>
                </Link>
            </li>
        );
    }
}