import React from 'react';
import {connect} from 'react-redux';
import _ from 'lodash';
import {BATTLE_STATUS_IN_PROGRESS, BATTLE_STATUS_OPEN} from "../../../util/battleHelper";
import BattleFriendInitPage from "./BattleFriendInit";
import BattleFriendTask from "./BattleFriendTask";
import BattleFriendResult from "./BattleFriendSolution";
import BattleFriendStartFetch from "./fetch/BattleFriendStartFetch";
import BattleFriendEndFetch from "./fetch/BattleFriendEndFetch";

class BattleFriendPage extends React.PureComponent {

    renderPage() {
        const {status} = this.props;
        if (_.isNil(status)) {
            return <BattleFriendInitPage/>;
        }
        if (status === BATTLE_STATUS_OPEN) {
            return <BattleFriendTask/>;
        }
        if (status === BATTLE_STATUS_IN_PROGRESS) {
            return <BattleFriendResult/>;
        }
        return null;
    }

    render() {
        const {battleFriendStartRep, battleFriendEndRep, tags, status, questionIdAnswerIdMap} = this.props;
        return <div>
            {this.renderPage()}
            <BattleFriendStartFetch
                battleFriendStartRep={battleFriendStartRep}
                tags={tags}
                status={status}
            />
            <BattleFriendEndFetch
                battleFriendEndRep={battleFriendEndRep}
                battleId={_.get(battleFriendStartRep, 'value.battle.id')}
                questionIdAnswerIdMap={questionIdAnswerIdMap}
                status={status}
            />
        </div>
    }
}

export default connect(
    (state) => ({
        tags: state.battle.tags,
        status: state.battle.status,
        questionIdAnswerIdMap: state.battle.questionIdAnswerIdMap,
        battleFriendStartRep: state.repository.battleFriendStart,
        battleFriendEndRep: state.repository.battleFriendEnd
    }),
    (dispatch) => ({})
)(BattleFriendPage);
