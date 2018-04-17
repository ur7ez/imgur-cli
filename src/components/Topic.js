import React from 'react';
import {Link, withRouter} from 'react-router-dom';

class Topic extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            init: {
                up: ['', 'icon-upvote-outline'],
                down: ['', 'icon-downvote-outline'],
            },
            voted: {
                up: ['green', 'icon-upvote-fill'],
                down: ['red', 'icon-downvote-fill'],
            },
            voted_type: this.props.vote, // should be one of this: null, 'up', 'down' or 'veto'.
        };
        this.clickVote = this.clickVote.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.vote !== this.state.voted_type) {
            this.setState({voted_type: nextProps.vote});
        }
    }

    clickVote(e, type) {
        e.stopPropagation();
        e.preventDefault();
        // Voting only possible for authorized users - so check it beforehand
        if (!(this.props.user_auth === 'authorized' || this.props.user_auth === 'storage')) {
            this.props.history.push('/oauthcallback');
            return;
        }

        if (this.state.voted_type === null || this.state.voted_type === 'veto' || this.state.voted_type !== type) {
            this.props.onVote(this.props.id, type);
            this.setState({voted_type: type});
        } else {
            this.props.onVote(this.props.id, 'veto');
            this.setState({voted_type: null});
        }
    }

    static formatNumber(n) {
        if (n > 1000) {
            let re = /(?=\B(?:\d{3})+(?!\d))/g;
            return (n / 1000).toFixed(3).toString().replace(re, ',').replace('.', ',');
        }
        return n;
    };

    render() {
        let tags = [], post_info;
        /**
         * @var {{tags:string}} this.props
         * @var {{display_name:string}} this.props.tags
         */
        this.props.tags.forEach(item => {
            tags.push(item.display_name);
        });
        tags = tags.toString();

        /**
         * @var {{ups:string, downs:string, views:string, is_album:boolean, cover:string, images:array}} this.props
         */
        if (this.props.is_album) {
            post_info = 'album · ';
        } else if (this.props.animated) {
            post_info = 'animated · ';
        } else {
            post_info = 'image · ';
        }
        let post_views = Topic.formatNumber(this.props.views);

        const coverImg = () => {
            let postMetaType, cover;
            if (this.props.cover || this.props.cover === /** @type {string} */ null) {
                if (this.props.cover === /** @type {string} */ null) {
                    cover = this.props.images[0].link;
                    postMetaType = this.props.images[0].type;
                } else {
                    cover = this.props.images.find(x => x.id === this.props.cover);
                    if (typeof cover === 'undefined') {
                        postMetaType = this.props.images[0].type;
                        cover = this.props.images[0].link;
                    } else {
                        postMetaType = cover.type;
                        cover = cover.link;
                    }
                }
            } else {
                cover = this.props.link;
                postMetaType = this.props.type;
            }

            let coverSrc = cover.match(/(.*:.*\/)(.+\..+)/i);
            return coverSrc[1] + coverSrc[2].substring(0, Math.min(coverSrc[2].indexOf('.'), 7)) + 'b.' +
                ((postMetaType.indexOf('video/') !== -1) ? 'jpg' : coverSrc[2].substring(coverSrc[2].indexOf('.') + 1));
        };

        let voteClass, likesClass, dislikesClass;
        let points_new;
        points_new = 0 + (this.state.voted_type === /** @type {string} */ 'up' && 1) - (this.state.voted_type === /** @type {string} */ 'down' && 1);
        let points = Topic.formatNumber(this.props.points + points_new);

        voteClass = (this.state.voted_type === null || this.state.voted_type === 'veto') ?
            this.state.init.up[0] : this.state.voted[this.state.voted_type][0];
        likesClass = (this.state.voted_type === /** @type {string} */ 'up') ?
            `${this.state.voted.up[0]} ${this.state.voted.up[1]}`
            : `${this.state.init.up[0]} ${this.state.init.up[1]}`;
        dislikesClass = (this.state.voted_type === /** @type {string} */ 'down') ?
            `${this.state.voted.down[0]} ${this.state.voted.down[1]}`
            : `${this.state.init.down[0]} ${this.state.init.down[1]}`;

        return (
            <div id={this.props.id} className={`post ${voteClass}`} data-tag1="" data-tag2="">
                <Link to={`/gallery/${this.props.id}`} className="image-list-link"
                      data-page={this.props.gallery_page.toString()}>
                    <img alt="" src={coverImg()}/>
                    <div className="point-info gradient-transparent-black transition" data-gallery-tags={tags}>
                        <div className="relative">
                            <div className="pa-bottom">
                                <div className="arrows">
                                    <div title="like" data-data={this.props.id} data-up={this.props.ups}
                                         className={`pointer arrow-up ${likesClass}`}
                                         onClick={(e) => this.clickVote(e, 'up')}>
                                    </div>
                                    <div title="dislike" data-data={this.props.id} data-downs={this.props.downs}
                                         className={`pointer arrow-down ${dislikesClass}`}
                                         onClick={(e) => this.clickVote(e, 'down')}>
                                    </div>
                                    <div className="clear"></div>
                                </div>
                                <div className="point-info-points" title="points">
                                    <span className={`points-${this.props.id}`}>{points}</span>
                                    <span className={`points-text-${this.props.id}`}> points</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </Link>
                <div className="hover">
                    <p>{this.props.title}</p>
                    <div className="post-info">{post_info}{post_views} views</div>
                </div>
            </div>
        );
    }
}

export default withRouter(Topic);