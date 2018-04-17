import React from 'react';
import Topic from './Topic';

export class GalleryList extends React.Component {
    render() {
        return (
            <div className="posts br5">
                <div className="cards">
                    {this.props.topics.map((topic) => {
                            return (
                                <Topic key={topic.id}
                                       {...topic}
                                       gallery_page={this.props.page}
                                       user_auth={this.props.auth_status}
                                       onVote={this.props.onGalleryVoting}
                                />
                            )
                        }
                    )}
                </div>
                <div className="clear"></div>
            </div>
        );
    }
}