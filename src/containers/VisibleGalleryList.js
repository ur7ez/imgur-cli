import {connect} from 'react-redux';
import {VisibilityFilters} from '../actions/index';
import {GalleryList} from '../components/GalleryList';
import {postVote, postVoteFailure, postVoteSuccess} from "../actions/gallery";

/**
 * фильтрует state.gallery согласно state.visibilityFilter
 * @param topics - array of gallery topics
 * @param filter - string
 * @return {*}
 */
const getVisibleTopics = (topics, filter) => {
    switch (filter.filter) {
        case VisibilityFilters.SHOW_ALL:
            return topics;
        case VisibilityFilters.SHOW_ALBUMS:
            return topics.filter(t => (
                t.is_album
            ));
        case VisibilityFilters.SHOW_ANIMATED:
            return topics.filter(t => (
                t.animated || (t.cover &&
                    (t.images.find(x => x.id === t.cover) && t.images.find(x => x.id === t.cover).animated))
            ));
        case VisibilityFilters.SHOW_IMAGES:
            return topics.filter(t => (
                !t.is_album // && !(t.animated || (t.cover && t.images.find(x => x.id === t.cover).animated))
            ));
        case VisibilityFilters.SHOW_INCLUDES:
            let neadle = filter.search.toUpperCase();
            return topics.filter(t => {
                let img_description = '';
                if (t.images && t.cover) {
                    img_description = (undefined === t.images.find(x => x.id === t.cover)) ?
                        t.images[0].description : t.images.find(x => x.id === t.cover).description;
                }
                return (
                    t.title.toUpperCase().includes(neadle) ||
                    (t.description && t.description.toUpperCase().includes(neadle)) ||
                    (img_description && img_description.toUpperCase().includes(neadle))
                )
            });
        default:
            return topics;
    }
};

const mapStateToProps = (state, ownProps) => {
    let content = (state.gallery.search.is_rendered === false && ownProps.content === 'search') ?
        state.gallery.search.topics : state.gallery.gallery.topics;
    return {
        topics: getVisibleTopics(content, state.visibilityFilter),
        page: state.gallery.gallery.page,
        auth_status: state.account.status,
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        onGalleryVoting: (hash, vote) => {
            dispatch(postVote(hash, vote)).then((response) => {
                (!response.error) ?
                    dispatch(postVoteSuccess({hash, vote})) :
                    dispatch(postVoteFailure(response.payload.response.data.data.error));
            });
        }
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(GalleryList);