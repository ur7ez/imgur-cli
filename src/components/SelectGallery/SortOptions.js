import React from 'react';
import {Link} from 'react-router-dom';

export class SortOptions extends React.Component {
    constructor(props) {
        super(props);
        this.toggleShowViral = this.toggleShowViral.bind(this);
    }

    toggleShowViral(e) {
        e.preventDefault();
        this.props.setShowHideViral();
    }

    render() {
        return (
            <div className="sort-options">
                {/* Only showing this for Sort: 'popularity' + Section: 'user' */}
                {this.props.sort === 'viral' && this.props.section === 'user' &&
                <ul className="toggle-options">
                    <li>
                        <a href="" id="showviral" className={`title-n${(this.props.showViral) ? ' showing' : ''}`}
                           title="images that are also in the viral section"
                           onClick={(e) => this.toggleShowViral(e)}>
                            <span>{(this.props.showViral) ? 'showing viral' : 'hiding viral'}</span>
                        </a>
                    </li>
                </ul>
                }
                {/* Only showing this for Section: 'most viral' */}
                {(this.props.section === 'top' || this.props.section === 'hot') &&
                <ul>
                    <li>
                        <Link to="/gallery/random" id="random-button" className="title-n"
                              title="random mode"><span></span>
                        </Link>
                    </li>
                    <li>
                        <Link to="/gallery/window" id="past-link" className="title-n"
                              title="past images"><span></span>
                        </Link>
                    </li>
                </ul>
                }
            </div>
        );
    }
}