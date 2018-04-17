import React from 'react';

export class AdvancedOptionsForm extends React.Component {
    constructor(props) {
        super(props);
        let init_state = {
            params: {
                // Advanced Search Query Parameters:
                q_all: '',	    // Search for all of these words (and)
                q_any: '',	    // Search for any of these words (or)
                q_exactly: '',	// Search for exactly this word or phrase
                q_not: '',	    // Exclude results matching this
                q_type: '',	    // Show results for any file type, jpg | png | gif | anigif (animated gif) | album
                q_size_px: '',  // Size ranges, small (500 pixels square or less) | med (500 to 2,000 pixels square)
                                // | big (2,000 to 5,000 pixels square) | lrg (5,000 to 10,000 pixels square) | huge (10,000 square pixels and above)
            },
        };

        this.state = {
            params: {
                ...init_state.params,
                ...this.props.params
            },
            openedClass: '',
            mpxSize: false,
        };
        this.documentClickHandler = this.documentClickHandler.bind(this);
        this.componentClickHandler = this.componentClickHandler.bind(this);
        this.applySearch = this.applySearch.bind(this);
    }

    componentDidMount() {
        document.addEventListener("click", this.documentClickHandler);
    }

    componentWillUnmount() {
        document.removeEventListener("click", this.documentClickHandler);
    }

    documentClickHandler() {
        this.setState({openedClass: ''});
    }

    componentClickHandler(e) {
        e.nativeEvent.stopImmediatePropagation();
        this.setState({openedClass: (this.state.openedClass) ? '' : ' opened'});
    }

    applySearch(forse_update = false) {
        if (JSON.stringify(this.state.params) === JSON.stringify(this.props.params)) {
            if (forse_update) {
                this.props.fetchSearchData(this.state.params);
            }
            return;
        }
        // this.props.pushParams(this.state.params);
        this.props.fetchSearchData(this.state.params);
    }

    render() {
        return (
            <div id="search_advanced" className={`br5${this.props.show ? '': ' nodisplay'}`}>
                <form name="advanced-search" id="advanced_search" onSubmit={this.applySearch}>


                    <div id="search_advanced_left">
                        <div className="search-option-row">
                            <input type="hidden" value="thumbs" name="qs"/>
                            <div className="search-label"><label htmlFor="q_all">All of</label></div>
                            <div className="search-input">
                                <input type="text" className="placeholder"
                                       placeholder="Search for all of these words (and)..."
                                       id="q_all" data-name="q_all" value=""/>
                            </div>
                        </div>
                        <div className="search-option-row">
                            <div className="search-label"><label htmlFor="q_any">Any of</label></div>
                            <div className="search-input">
                                <input type="text" className="placeholder"
                                       placeholder="Search for any of these words (or)..."
                                       id="q_any" data-name="q_any" value=""/>
                            </div>
                        </div>
                        <div className="search-option-row">
                            <div className="search-label"><label htmlFor="q_exactly">Exactly</label></div>
                            <div className="search-input">
                                <input type="text" className="placeholder"
                                       placeholder="Search for exactly this word or phrase..."
                                       id="q_exactly" data-name="q_exactly" value=""/>
                            </div>
                        </div>
                        <div className="search-option-row">
                            <div className="search-label"><label htmlFor="q_not">Not</label></div>
                            <div className="search-input">
                                <input type="text" className="placeholder"
                                       placeholder="Exclude results matching this..."
                                       id="q_not" data-name="q_not" value=""/>
                            </div>
                        </div>
                    </div>


                    <div id="search_advanced_right">
                        <div className="search-option-row">
                            <div className="search-label">
                                <label htmlFor="q_tags">In these tags</label>
                            </div>
                            <div className="search-input">
                                <input type="text" className="placeholder"
                                       placeholder="Comma delimited list of tags"
                                       id="q_tags" data-name="q_tags" value=""/>
                            </div>
                        </div>
                        <div className="search-option-row margin-bottom">
                            <div className="search-label">
                                <label htmlFor="q_type">File type</label>
                            </div>
                            <div className="search-input">
                                <div id="q_type" className="combobox" data-name="q_type">
                                    <div className="selection">Show results for any file type...</div>
                                    <div className="triangle"></div>
                                    <div className="options">
                                        <div className="item selected" data-value="any">
                                            Show results for any file type...
                                        </div>
                                        <div className="item" data-value="jpg">
                                            Only show results for JPG files...
                                        </div>
                                        <div className="item" data-value="png">
                                            Only show results for PNG files...
                                        </div>
                                        <div className="item" data-value="gif">
                                            Only show results for GIF files...
                                        </div>
                                        <div className="item" data-value="anigif">
                                            Only show results for animated GIF files...
                                        </div>
                                        <div className="item" data-value="album">
                                            Only show results for Albums...
                                        </div>
                                    </div>
                                    <input type="hidden" name="q_type" value="any" data-default="any"/>
                                </div>
                            </div>
                        </div>
                        <div className="search-option-row margin-bottom" id="size_types">
                            <span className="toggle">
                                <input type="checkbox" id="q_size_is_mpx" name="q_size_is_mpx"
                                       onChange={() => {this.setState({mpxSize: !this.state.mpxSize})}}/>
                                <label htmlFor="q_size_is_mpx">
                                    <span className="text-on">switch images size to pixels</span>
                                    <span className="text-off">switch image size to megapixels</span>
                                    <span className="circle"></span>
                                </label>
                            </span>
                            <div className={`${this.state.mpxSize? 'nodisplay': ''}`} id="size_in_px">
                                <div className="search-label"><label htmlFor="q_size_px">Image size</label></div>
                                <div className="search-input">
                                    <div id="q_size_px" data-name="q_size_px" className={`combobox${this.state.openedClass}`} onClick={this.componentClickHandler}>
                                        <div className="selection">Any size in pixels...</div>
                                        <div className="triangle"></div>
                                        <div className="options">
                                            <div className="item selected" data-value="any">
                                                Any size in pixels...
                                            </div>
                                            <div className="item" data-value="small">
                                                Small (about 500 pixels square or less)
                                            </div>
                                            <div className="item" data-value="med">
                                                Medium (about 500 to 2,000 pixels square)
                                            </div>
                                            <div className="item" data-value="big">
                                                Big (about 2,000 to 5,000 pixels square)
                                            </div>
                                            <div className="item" data-value="lrg">
                                                Large (about 5,000 to 10,000 pixels square)
                                            </div>
                                            <div className="item" data-value="huge">
                                                Huge (about 10,000 square and above)
                                            </div>
                                        </div>
                                        <input type="hidden" name="q_size_px" value="any" data-default="any"/>
                                    </div>
                                </div>
                            </div>
                            <div className={`${this.state.mpxSize? '': 'nodisplay'}`} id="size_in_mpx">
                                <div className="search-label"><label htmlFor="q_size_mpx">Image size</label></div>
                                <div className="search-input">
                                    <div id="q_size_mpx" className="combobox" data-name="q_size_mpx">
                                        <div className="selection">Any size in megapixels...</div>
                                        <div className="triangle"></div>
                                        <div className="options">
                                            <div className="item selected" data-value="any">
                                                Any size in megapixels...
                                            </div>
                                            <div className="item" data-value="small">
                                                Small (less than .5 megapixels)
                                            </div>
                                            <div className="item" data-value="med">
                                                Medium (.5 to 2 megapixels)
                                            </div>
                                            <div className="item" data-value="big">
                                                Big (2 to 5 megapixels)
                                            </div>
                                            <div className="item" data-value="lrg">
                                                Large (5 to 10 megapixels)
                                            </div>
                                            <div className="item" data-value="huge">
                                                Huge (10 megapixels and above)
                                            </div>
                                        </div>
                                        <input type="hidden" name="q_size_mpx" value="any" data-default="any"/>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="search-option-row search-option-submit">
                            <input type="submit" value="Submit" className="btn btn-action"/>
                        </div>
                    </div>
                </form>

                <div className="clear"></div>
            </div>
        );
    }
}