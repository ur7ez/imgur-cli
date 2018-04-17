import React from 'react';
import {Section} from './Section'
import {Sort} from './Sort'
import {Window} from './Window'
import {SortOptions} from './SortOptions'

export class SelectGallery extends React.Component {
    constructor(props) {
        super(props);
        this.APIparams = {
            section: ['hot', 'top', 'user'],  // default is 'hot'
            sort: ['viral', 'top', 'time', 'rising'],  // defaults to 'viral'
            // 'rising' only available with 'user' section
            window: ['day', 'week', 'month', 'year', 'all'],  // defaults to 'day'
            // Change the date range of the request if the section is 'top'.
            // Accepted values are day | week | month | year | all.
        };
        let init_state = {
            params: {
                section: this.APIparams.section[0],  // 'hot'
                sort: this.APIparams.sort[0],  // 'viral'
                window: this.APIparams.window[0],  // 'day'
                showViral: false,
                showMature: true,
                albumPreviews: true,
                page: 0
            },
        };
        this.state = {
            params: {
                ...init_state.params,
                ...this.props.params,
            }
        };

        this.loadGallery = this.loadGallery.bind(this);
        this.setWindow = this.setWindow.bind(this);
        this.setSort = this.setSort.bind(this);
        this.setSection = this.setSection.bind(this);
        this.setShowHideViral = this.setShowHideViral.bind(this);
    }

    componentWillMount() {
        this.loadGallery();
    }

    setSection(newSection) {
        let curSort = this.state.params.sort;
        let sort = ((newSection === 'user' && curSort === 'top')
            || (newSection !== 'user' && curSort === 'rising')) ?
            this.APIparams.sort[0] : curSort;
        let new_params = {...this.state.params, section: newSection, sort};
        this.setState({params: new_params},
            this.props.pushParams(new_params));
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

    setShowHideViral() {
        let new_params = {...this.state.params, showViral: !this.state.params.showViral};
        this.setState({params: new_params},
            this.props.pushParams(new_params));
    }

    loadGallery(forse_update = false) {
        if (JSON.stringify(this.state.params) === JSON.stringify(this.props.params)) {
            if (forse_update) {
                this.props.fetchGalleryData(this.state.params);
            }
            return;
        }
        this.props.pushParams(this.state.params);
        this.props.fetchGalleryData(this.state.params);
    }

    render() {

        let selection_title = '';
        if (this.state.params.section === 'user') {
            selection_title = 'Brand new posts shared in real time.';
        } else if (this.state.params.sort !== 'top') {
            selection_title = 'Today\'s most popular posts.';
        }

        return (
            <div className="sentence-sorting">
                <div className="update-gallery">
                    <input type="button" value="Fetch It" className="btn btn-sm btn-info" title="Fetch gallery"
                           onClick={() => this.loadGallery(true)}/>
                </div>
                <span className="before-text">{(this.state.params.section !== 'user') ? 'The ' : ''}</span>

                <Section setSection={this.setSection} curSection={this.state.params.section}/>

                <span
                    className="middle-text">&nbsp;images{(this.state.params.section !== 'user') ? ' on the Internet' : ''}, sorted by&nbsp;</span>

                <Sort setSort={this.setSort} curSort={this.state.params.sort} section={this.state.params.section}/>

                {/* Only showing this section for Sort: 'highest scoring' ('top') */}
                {this.state.params.sort === 'top' &&
                <Window setWindow={this.setWindow} curWindow={this.state.params.window}/>
                }

                {/* Only showing this section for Sort: 'popularity' ('viral') and 'newest first' ('time') */}
                {(this.state.params.sort === 'viral' || this.state.params.sort === 'time') &&
                <SortOptions showViral={this.state.params.showViral} sort={this.state.params.sort}
                             section={this.state.params.section} setShowHideViral={this.setShowHideViral}/>
                }
                {/* Empty contents for Sort section: 'highest scoring' */}
                <h1 id="user-gallery-message">{selection_title}</h1>
            </div>
        );
    }
}