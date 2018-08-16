import React from 'react';
import PropTypes from "prop-types";

export class AnimeContainer extends React.PureComponent {

    static propTypes = {
        component: PropTypes.node
    };

    static defaultProps = {
        component: null
    };

    render() {
        const {component} = this.props;
        return component;
    }
}
