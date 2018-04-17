import React from 'react';
import PropTypes from "prop-types";

export class SearchOptions extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showAdvSearch: false,
            render_type: 'thumbs'   // ['thumbs', 'cards']
        };
        this.toggleAdvSearch = this.toggleAdvSearch.bind(this);
        this.toggleRenderType = this.toggleRenderType.bind(this);
    }

    toggleAdvSearch(e) {
        e.preventDefault();
        let toggle = !this.state.showAdvSearch;
        this.setState({showAdvSearch: toggle}, this.props.onClickAdvanced(toggle));
    }

    toggleRenderType(e, type) {
        e.preventDefault();
        this.setState({render_type: type});
    }

    render() {
        return (
            <div className="sort-options">

                <ul id="search_header_ul">
                    <li className={`${(this.state.render_type === 'thumbs') ? 'active' : ''}`}>
                        <a href="" className="title-n" id="search-as-thumbs-icon"
                           title="show results as thumbnails"
                           onClick={(e) => this.toggleRenderType(e, 'thumns')}>
                            <span className="small-square">&nbsp;</span>
                            <span className="small-square">&nbsp;</span>
                            <span className="small-square">&nbsp;</span>
                            <span className="small-square">&nbsp;</span>
                            <span className="small-square">&nbsp;</span>
                            <span className="small-square">&nbsp;</span>
                            <span className="small-square">&nbsp;</span>
                            <span className="small-square">&nbsp;</span>
                            <span className="small-square">&nbsp;</span>
                        </a>
                    </li>
                    <li className={`${(this.state.render_type === /** @type {string} */ 'cards') ? 'active' : ''}`}>
                        <a href="" id="search-as-list-icon" className="title-n"
                           title="show results as cards"
                           onClick={(e) => this.toggleRenderType(e, 'cards')}>
                            <span className="square"></span>
                            <span className="stripes">
                                <span className="stripe">&nbsp;</span>
                                <span className="stripe">&nbsp;</span>
                                <span className="stripe">&nbsp;</span>
                                <span className="stripe">&nbsp;</span>
                            </span>
                        </a>
                    </li>
                    <li className={`${(this.state.showAdvSearch) ? 'active' : ''}`}>
                        <a href="" id="search_adv_toggle" onClick={this.toggleAdvSearch}>
                            advanced search</a>
                    </li>
                </ul>

            </div>
        );
    }
}

SearchOptions.propTypes = {
    onClickAdvanced: PropTypes.func.isRequired
};