import React from 'react';
import PropTypes from "prop-types";
import anime from 'animejs';
import _ from 'lodash';

export class Anime extends React.PureComponent {

    static propTypes = {
        from: PropTypes.object,
        to: PropTypes.object,
        config: PropTypes.object,
        playOnlyOnMount: PropTypes.bool,
        childrenProperty: PropTypes.string,
    };

    static defaultProps = {
        playOnlyOnMount: false,
        childrenProperty: 'style'
    };

    constructor(props) {
        super(props);
        this.target = _.clone(props.from);
        this.state = {target: _.clone(this.target)};
    }

    componentDidMount() {
        this.init();
    }

    componentDidUpdate(prevProps) {
        if (!_.isEqual(prevProps, this.props) && !this.props.playOnlyOnMount) {
            this.init();
        }
    }

    init() {
        if (this.anime && !this.anime.completed) {
            this.anime.pause();
        }
        this.anime = anime({
            targets: this.target,
            ...this.props.to,
            ...this.props.config,
            easing: 'linear',
            update: () => {
                this.setState({target: {...this.target}});
            }
        });
        console.log(this.anime);
    }

    render() {
        const {children, childrenProperty} = this.props;
        if (_.isArray(children)) {
            return children.map(e => React.cloneElement(e, {[childrenProperty]: this.state.target}));
        }
        return React.cloneElement(children, {[childrenProperty]: this.state.target});
    }
}
