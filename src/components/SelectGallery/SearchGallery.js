import React from 'react';
import {Sort} from './Sort'
import {Window} from './Window'
import {SearchOptions} from './SearchOptions'

export class SearchGallery extends React.Component {
    constructor(props) {
        super(props);

        this.APIparams = {
            sort: ['time', 'viral', 'top'],  // Optional, defaults to 'time'
            // 'rising' only available with 'user' section
            window: ['day', 'week', 'month', 'year', 'all'],  // Optional, defaults to 'day'
            // Change the date range of the request if the sort is 'top'.
        };

        this.sort = [
            {
                value: this.APIparams.sort[0],
                title: 'newest first'
            },
            {
                value: this.APIparams.sort[1],
                title: 'most relevant'
            },
            {
                value: this.APIparams.sort[2],
                title: 'highest scoring'
            },

        ];

        let init_state = {
            params: {
                sort: this.APIparams.sort[0],  // 'time'
                window: this.APIparams.window[4],  // 'all'
                page: 0,
                q: '',  // Query string (note: if advanced search parameters are set, this query string is ignored).
                        // This parameter also supports boolean operators (AND, OR, NOT)
                        // and indices (title: user: tag: ext: subreddit: album: meme:).
                        // An example compound query would be 'title: cats AND dogs ext: gif'
            },
        };

        this.state = {
            params: {
                ...init_state.params,
                ...this.props.params
            }
        };

        this.applySearch = this.applySearch.bind(this);
        this.setWindow = this.setWindow.bind(this);
        this.setSort = this.setSort.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            params: {
                ...this.state.params,
                ...nextProps.params
            }
        });
    }

    componentWillMount() {
        this.applySearch();
    }

    setSort(newSort) {
        let new_params = {...this.state.params, sort: newSort};
        this.setState({params: new_params},
            this.props.pushParams(new_params));
    }

    setWindow(newWindow) {
        let new_params = {...this.state.params, window: newWindow};
        this.setState({params: new_params},
            this.props.pushParams(new_params));
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
            <div className="sentence-sorting search-sentence">
                <div className="update-gallery">
                    <input type="button" value="Search" className="btn btn-sm btn-info"
                           title="Search on Imgur gallery" onClick={() => this.applySearch(true)}/>
                </div>

                <span className="sorting-text-align">Found <i>2,826</i> results for</span>
                <span className="search-term-text sorting-text-align">{this.state.params.q}</span>
                <span>, sorted by&nbsp;</span>

                <Sort setSort={this.setSort} curSort={this.state.params.sort}
                      action="search" sort={this.sort}/>

                {/* Only showing this section for Sort: 'highest scoring' ('top') && 'most relevant' ('viral') */}
                {(this.state.params.sort === 'top' || this.state.params.sort === 'viral') &&
                <Window setWindow={this.setWindow} curWindow={this.state.params.window}/>
                }

                <SearchOptions onClickAdvanced={this.props.toggleAdvComponent}/>

                <h1 id="user-gallery-message">Today's most popular posts.</h1>
            </div>
        );
    }
}