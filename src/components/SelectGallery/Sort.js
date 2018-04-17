import React from 'react';
import PropTypes from "prop-types";

export class Sort extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            openedClass: '',
            sort: this.props.sort || [
                {
                    value: 'viral',
                    title: 'popularity'
                },
                {
                    value: 'top',
                    title: 'highest scoring'
                },
                {
                    value: 'time',
                    title: 'newest first'
                },
                {
                    value: 'rising',
                    title: 'rising'
                }
            ]
        };
        this.documentClickHandler = this.documentClickHandler.bind(this);
        this.componentClickHandler = this.componentClickHandler.bind(this);
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

    render() {
        let current_selection = this.state.sort.find(x => x.value === this.props.curSort);

        return (
            <div id="sort" className={`combobox${this.state.openedClass}`}
                 onClick={this.componentClickHandler}>
                <div className="selection">
                    {current_selection.title}
                </div>
                <div className="options sorting-text-align">
                    <div className="combobox-header-current">current:
                        <div className="combobox-current green bold">
                            {current_selection.title}
                        </div>
                    </div>
                    <ul>
                        {this.state.sort.map((item) => {

                                if (this.props.section &&
                                    ((item.value === 'rising' && this.props.section !== 'user') ||
                                        (item.value === 'top' && this.props.section === 'user'))) return null;

                                let nodisplay = (item.value === this.props.curSort) ? ' nodisplay' : '';
                                return (
                                    <li key={item.value} className={`item${nodisplay}`} data-value={item.value}>
                                        <a href="" className="name" onClick={(e) => {
                                            e.preventDefault();
                                            e.stopPropagation();
                                            this.props.setSort(item.value);
                                            this.setState({openedClass: ''});
                                        }}>
                                            {item.title}
                                        </a>
                                    </li>
                                )
                            }
                        )}
                    </ul>
                </div>
                <input type="hidden" name="sort" value={current_selection.value}/>
            </div>
        );
    }
}

Sort.propTypes = {
    curSort: PropTypes.string.isRequired,
};