import React from 'react';
import Surrender from "./Surrender";
import Modal from "../modal/Modal";
import {connect} from "react-redux";
import {optionShowChanged} from "../../redux/reducer/option";
import _ from "lodash";

class Option extends React.PureComponent {

    renderSurrender() {
        const {onOptionShowChange, communication, screen} = this.props;
        return <Surrender
            screen={screen}
            communication={communication}
            onOptionShowChange={onOptionShowChange}
        />;
    }

    render() {
        const {onOptionShowChange, show} = this.props;
        if (!show) {
            return null;
        }
        return <Modal renderExit={true} onExitClick={() => onOptionShowChange(false)}>
            <div>
                {this.renderSurrender()}
            </div>
        </Modal>
    }
}

export default connect(
    (state) => ({
        path: state.router.location.pathname,
        screen: state.screen,
        show: state.option.show,
    }),
    (dispatch) => ({
        onOptionShowChange: (show) => dispatch(optionShowChanged(_.defaultTo(show, true)))
    })
)(Option);
