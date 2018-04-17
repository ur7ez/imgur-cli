import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {setVisibilityFilter} from '../actions/index';

class FilterLink extends React.Component {
    render() {
        const {active, title, children, onClick} = this.props;
        if (active) {
            return <span style={{color: "green"}} title={title}><b>{children}</b></span>
        }
        return (
            <a href="" title={title} onClick={e => {
                e.preventDefault();
                onClick();
            }}
            >
                {children}
            </a>
        );
    }
}

FilterLink.propTypes = {
    active: PropTypes.bool.isRequired,
    children: PropTypes.node.isRequired,
    onClick: PropTypes.func.isRequired
};

const mapStateToProps = (state, ownProps) => {
    return {
        active: ownProps.filter === state.visibilityFilter.filter, title: ownProps.title
    }
};

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        onClick: () => {
            dispatch(setVisibilityFilter(ownProps.filter))
        }
    }
};

/**
 * получает текущий фильтр видимости и рендерит FilterLink
 */
export default FilterLink = connect(mapStateToProps, mapDispatchToProps)(FilterLink);