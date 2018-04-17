import React from 'react';
import {Filter} from './Filter';
import PageDivider from './PageDivider';
import GallerySearch from "../containers/GallerySearch";
import VisibleGalleryList from "../containers/VisibleGalleryList";
import '../styles/style.css';
import '../styles/gallery.css';
import {VisibilityFilters} from "../actions";
import GalleryParamsContainer from "../containers/GalleryParamsContainer";
import SearchParamsContainer from "../containers/SearchParamsContainer";
import AdvancedSearchContainer from '../containers/AdvancedSearchContainer'

export class Main extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            show_advanced_component: false
        };
        this.toggleAdvComponent = this.toggleAdvComponent.bind(this);
    }

    toggleAdvComponent(showAdv) {
        if (this.props.content === 'search') this.setState({show_advanced_component: showAdv});
    }

    render() {
        return (
            <main className="container-fluid pt-0 px-3 pb-1" role="main" id="top">
                <div id="content" className="outside main">

                    <div className="row flex-xl-nowrap">
                        <div className="gallery-filter">
                            <Filter/>
                            <GallerySearch filter={VisibilityFilters.SHOW_INCLUDES}/>
                        </div>

                        {(this.props.content === 'search') ?
                            <SearchParamsContainer toggleAdvComponent={this.toggleAdvComponent}/>
                            : <GalleryParamsContainer/>
                        }
                        <AdvancedSearchContainer show={this.state.show_advanced_component}/>
                    </div>

                    <div id="imagelist" className="home-gallery">
                        <VisibleGalleryList content={this.props.content}/>
                        <PageDivider/>
                    </div>

                </div>
            </main>
        )
    }
}