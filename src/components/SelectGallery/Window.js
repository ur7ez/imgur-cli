import React from 'react';

export class Window extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            openedClass: '',
            window: [
                {
                    value: 'day',
                    title: 'today'
                },
                {
                    value: 'week',
                    title: 'this week'
                },
                {
                    value: 'month',
                    title: 'this month'
                },
                {
                    value: 'year',
                    title: 'this year'
                },
                {
                    value: 'all',
                    title: 'all time'
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
        let current_selection = this.state.window.find(x => x.value === this.props.curWindow);

        return (
            <div className="end-text">&nbsp;of&nbsp;
                <div id="window" className={`sentence combobox${this.state.openedClass}`}
                     title="time frame" data-name="window"
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
                            {this.state.window.map((item) => {
                                    let nodisplay = (item.value === this.props.curWindow) ? ' nodisplay' : '';
                                    return (
                                        <li key={item.value} className={`item${nodisplay}`} data-value={item.value}>
                                            <a href="" className="name"
                                               onClick={(e) => {
                                                   e.preventDefault();
                                                   e.stopPropagation();
                                                   this.props.setWindow(item.value);
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
                    <input type="hidden" name="window" value={current_selection.value}/>
                </div>

                <div className="clear"></div>
            </div>
        );
    }
}