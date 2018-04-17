import React from "react";
import {connect} from "react-redux";
import {fetchPost, fetchPostFailure, fetchPostSuccess} from "../actions/gallery";

class Gallery extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            id: (this.props.match.params.id || this.props.post.id),
        };
    }

    componentWillMount() {
        if (this.props.post === undefined) {
            let is_album = (this.props.topic) ? this.props.topic.is_album : (this.state.id.length <= 5);
            this.props.fetchPostData(this.state.id, is_album);
        }
    }

    render() {
        let gallery_all = JSON.stringify(this.props.post);
        return (
            <div>
                <h2>Gallery {this.state.id} page</h2>
                <div style={{width: "70%"}}>
                    <code>
                        {gallery_all}
                    </code>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        topic: state.gallery.gallery.topics.filter(t => (
            t.id === ownProps.match.params.id
        ))[0],
        post: state.gallery.post.topics.filter(t => (
            t.id === ownProps.match.params.id
        ))[0]
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        fetchPostData: (hash, is_album) => {
            dispatch(fetchPost(hash, is_album)).then((response) => {
                !response.error ? dispatch(fetchPostSuccess(response.payload.data.data))
                    : dispatch(fetchPostFailure(response.payload.response.data.data.error));
            });
        }
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Gallery);