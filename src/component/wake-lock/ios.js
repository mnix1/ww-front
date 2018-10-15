import React from 'react';
import PropTypes from 'prop-types';

export default class WakeLockIOS extends React.PureComponent {


    static propTypes = {
        preventSleep: PropTypes.bool
    };

    static defaultProps = {
        preventSleep: true
    };

    componentDidMount() {
        this.syncState(this.props.preventSleep);
    }


    componentWillUnmount() {
        this.syncState(false);
    }


    componentWillReceiveProps(nextProps) {
        this.syncState(nextProps.preventSleep);
    }


    syncState(preventSleep) {
        if (preventSleep && !this.timer) {
            this.timer = setInterval(() => {
                if (!document.hidden) {
                    // window.location.href = window.location.href;
                    setTimeout(window.stop, 0);
                }
            }, 15000);

        }
        if (!preventSleep && this.timer) {
            clearInterval(this.timer);
            this.timer = null;
        }
    }


    render() {
        return null;
    }

}
