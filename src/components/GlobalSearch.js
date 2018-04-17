import React from 'react';
import {withRouter} from "react-router-dom";

class GlobalSearch extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            search: '',
            previousSearch: '',
            searchClass: 'closed'
        };

        this.onChange = this.onChange.bind(this);
        this.onSearchSubmit = this.onSearchSubmit.bind(this);
        this.documentClickHandler = this.documentClickHandler.bind(this);
        this.componentClickHandler = this.componentClickHandler.bind(this);
    }

    componentDidMount() {
        document.addEventListener("click", this.documentClickHandler);
    }

    componentWillUnmount() {
        document.removeEventListener("click", this.documentClickHandler);
    }

    documentClickHandler() {
        if (this.state.searchClass === /** @type {string} */ 'focused') {
            let curSearch = this.state.search;
            this.setState({searchClass: 'closed', search: '', previousSearch: curSearch});
        }
    }

    componentClickHandler(e) {
        e.nativeEvent.stopImmediatePropagation();
        if (this.state.searchClass === /** @type {string} */ 'focused'
            && (e.target.classList.contains('search-icon-container') || e.target.classList.contains('icon-search'))) {
            this.onSearchSubmit();
            return;
        }
        if (this.state.searchClass === /** @type {string} */ 'closed')
            this.setState({searchClass: 'focused', search: this.state.previousSearch}, this.searchInput.focus());
        this.searchInput.focus();
    }

    onChange(e) {
        this.setState({search: e.target.value});
    }

    onSearchSubmit(e) {
        if (e) e.preventDefault();
        let query = this.state.search.trim();
        if (query.length > 1) {
            this.setState({searchClass: 'closed', search: '', previousSearch: query},
                () => {
                    if (this.props.lastQueryStr !== query) this.props.pushParams({q: query})
                });
            this.props.history.push('/search');
        } else {
            this.searchInput.focus();
        }
    }

    render() {
        return (
            <div data-reactroot="" className={`search-container search-${this.state.searchClass}`}
                 onClick={this.componentClickHandler}>
                <form className="search-form" onSubmit={this.onSearchSubmit}>
                    <input type="search" className="search" name="q" autoComplete="off"
                           placeholder={this.state.searchClass === /** @type {string} */ 'focused' ?
                               'global search in Imgur' : ''}
                           title="type any keywords to search globally on Imgur"
                           value={this.state.search}
                           tabIndex="-1"
                           ref={(input) => {
                               this.searchInput = input;
                           }}
                           onChange={this.onChange}/>
                    <div className="search-icon-container">
                        <div className="icon-search"></div>
                    </div>
                </form>

                {/* ============ search helper ============ */}

                {(this.state.searchClass === /** @type {string} */ 'focused') &&
                <div className="global-search-autocomplete">
                    <div className="global-search-footer">
                        <div>
                            <div className="footer-label">search syntax</div>
                            <div className="footer-content">
                                <div className="keyword">title:</div>
                                <div className="keyword-desc">titles only</div>
                                <div className="keyword">tag:</div>
                                <div className="keyword-desc">images of a tag</div>
                                <div className="keyword nextline">user:</div>
                                <div className="keyword-desc">find a user</div>
                                <div className="keyword">ext:</div>
                                <div className="keyword-desc">image extension</div>
                            </div>
                        </div>
                    </div>
                </div>
                }
            </div>
        )
    }
}

export default withRouter(GlobalSearch);