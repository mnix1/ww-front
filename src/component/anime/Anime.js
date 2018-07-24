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
        childrenPropsCreator: PropTypes.func,
        targetTransformer: PropTypes.func,
        targetAsChildProp: PropTypes.string,
    };

    static defaultProps = {
        playOnlyOnMount: false,
        targetAsChildProp: 'style',
        targetTransformer: (t) => t,
        childrenPropsCreator: (target, childOriginalProps, animeProps) => {
            const newChildProps = {...childOriginalProps};
            const transformedTarget = animeProps.targetTransformer(target);
            if (newChildProps[animeProps.targetAsChildProp]) {
                newChildProps[animeProps.targetAsChildProp] = {
                    ...newChildProps[animeProps.targetAsChildProp],
                    ...transformedTarget
                }
            } else {
                newChildProps[animeProps.targetAsChildProp] = transformedTarget;
            }
            return newChildProps;
        }
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

    componentWillUnmount(){
        this.stop();
    }

    stop(){
        if (this.anime && !this.anime.completed) {
            this.anime.pause();
        }
    }

    init() {
        this.stop();
        this.anime = anime({
            targets: this.target,
            easing: 'linear',
            ...this.props.to,
            ...this.props.config,
            update: () => {
                this.setState({target: {...this.target}});
            }
        });
    }

    render() {
        const {children, childrenPropsCreator} = this.props;
        if (_.isArray(children)) {
            return children.map(e => React.cloneElement(e, childrenPropsCreator(this.state.target, e.props, this.props)));
        }
        return React.cloneElement(children, childrenPropsCreator(this.state.target, children.props, this.props));
    }
}
