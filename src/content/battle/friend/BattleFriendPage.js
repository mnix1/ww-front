import React from 'react';
import {connect} from 'react-redux';
import _ from 'lodash';
import {BATTLE_STATUS_OPEN} from "../../../util/battleHelper";
import BattleFriendInitPage from "./BattleFriendInit";
import BattleFriendTask from "./BattleFriendTask";

class BattleFriendPage extends React.PureComponent {

    render() {
        const {status} = this.props;
        if (_.isNil(status)) {
            return <BattleFriendInitPage/>;
        }
        if (status === BATTLE_STATUS_OPEN) {
            return <BattleFriendTask/>;
        }
        return null;
    }
}

export default connect(
    (state) => ({
        status: state.battle.status,
    }),
    (dispatch) => ({})
)(BattleFriendPage);
