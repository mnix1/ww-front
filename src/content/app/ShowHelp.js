import React from 'react';
import {connect} from "react-redux";
import {push} from "connected-react-router";
import {HELP_ROUTE, isHelpPage, WISIES_ROUTE} from "../routes";
import {FaQuestion} from "react-icons/fa";

class ShowHelp extends React.PureComponent {
    render() {
        const {onRouteChange, screen, path} = this.props;
        if (isHelpPage(path) || path !== WISIES_ROUTE) {
            return null;
        }
        const imgHeight = screen.topBarFontSizeRem;
        return <div className='justifyCenter flexColumn'>
            <FaQuestion size={imgHeight * .8} onClick={() => onRouteChange(HELP_ROUTE)}/>
        </div>;
    }
}

export default connect(
    (state) => ({
        path: state.router.location.pathname,
        screen: state.screen,
    }),
    (dispatch) => ({
        onRouteChange: (e) => dispatch(push(e)),
    })
)(ShowHelp);


