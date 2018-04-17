import React from 'react';

export class Section extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            openedClass: '',
            section: [
                {
                    value: 'hot',
                    title: 'Hottest' // Imgur API has no explanation on the differences btw 'top' and 'hot' sect
                },
                {
                    value: 'top',
                    title: 'Most Viral'
                },
                {
                    value: 'user',
                    title: 'User Submitted'
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

        let current_selection = this.state.section.find(x => x.value === this.props.curSection);

        return (
            <div id="section"
                 onClick={this.componentClickHandler}
                 className={`combobox front-page-section sorting-text-align${this.state.openedClass}`}>
                <div className="selection">
                    <div data-value={current_selection.value}>
                        <span className="name">{current_selection.title}</span>
                    </div>
                </div>

                <div className="options nano">
                    <div className="js-galleries content">
                        <div className="combobox-header-current">current:
                            <div className="combobox-current green bold">
                                {current_selection.title}
                            </div>
                        </div>
                        <ul>
                            {this.state.section.map((item) => {
                                    let nodisplay = (item.value === this.props.curSection) ? ' nodisplay' : '';
                                    return (
                                        <li key={item.value} className={`bold item${nodisplay}`}
                                            data-value={item.value}>
                                            <a href="" className="name"
                                               onClick={(e) => {
                                                   e.preventDefault();
                                                   e.stopPropagation();
                                                   this.props.setSection(item.value);
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
                </div>
                <input type="hidden" name="section" value={current_selection.value}/>
            </div>
        );
    }
}