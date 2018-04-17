import React from 'react';
import {DebounceInput} from 'react-debounce-input';
import {setVisibilityFilter, VisibilityFilters} from "../actions/index";
import {connect} from 'react-redux';

class GallerySearch extends React.Component {
    constructor(props) {
        super(props);
        this.state = {search: ""};
        this.onChange = this.onChange.bind(this);
    }

    onChange(e) {
        let val = e.target.value;
        this.setState({search: val});
        if (val.trim() === '' || typeof(val) === 'undefined') {
            this.props.dispatch(setVisibilityFilter(VisibilityFilters.SHOW_ALL));
        } else {
            this.props.dispatch(setVisibilityFilter(this.props.filter, val));
        }
    }

    render() {
        return (
            <form className="form-inline my-2" onSubmit={(e) => e.preventDefault()}>
                <label htmlFor="search-gallery" className="sr-only">Search in current Gallery</label>
                <DebounceInput minLength={2} debounceTimeout={500}
                               className="form-control" id="search-gallery" type="search"
                               placeholder="search in topics"
                               title="type keywords to search in currently loaded topics"
                               aria-label="Search"
                               value={this.state.search}
                               onChange={this.onChange} onFocus={(e) => e.target.select()}/>
            </form>
        )
    }
}

export default GallerySearch = connect()(GallerySearch);