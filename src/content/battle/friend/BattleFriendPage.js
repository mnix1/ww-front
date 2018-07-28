import React from 'react';
import {connect} from 'react-redux';
import _ from 'lodash';
import {BATTLE_STATUS_IN_PROGRESS, BATTLE_STATUS_OPEN} from "../../../util/battleHelper";
import BattleFriendInitPage from "./BattleFriendInit";
import BattleTask from "../task/BattleTask";
import BattleFriendStartFetch from "./fetch/BattleFriendStartFetch";
import BattleEndFetch from "./fetch/BattleEndFetch";
import BattleSolution from "../task/BattleSolution";

class BattleFriendPage extends React.PureComponent {

    renderPage() {
        const {status, battleFriendStartRep, battleEndRep} = this.props;
        if (_.isNil(status)) {
            return <BattleFriendInitPage/>;
        }
        if (status === BATTLE_STATUS_OPEN) {
            return <BattleTask rep={battleFriendStartRep}/>;
        }
        if (status === BATTLE_STATUS_IN_PROGRESS) {
            return <BattleSolution questions={battleFriendStartRep.value.questions} rep={battleEndRep}/>;
        }
        return null;
    }

    render() {
        const {battleFriendStartRep, battleEndRep, tags, status, questionIdAnswerIdMap} = this.props;
        return <div>
            {this.renderPage()}
            <BattleFriendStartFetch
                battleFriendStartRep={battleFriendStartRep}
                tags={tags}
                status={status}
            />
            <BattleEndFetch
                battleEndRep={battleEndRep}
                battleId={_.get(battleFriendStartRep, 'value.id')}
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
        battleEndRep: state.repository.battleEnd
    }),
    (dispatch) => ({})
)(BattleFriendPage);
