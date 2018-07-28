import React from 'react';
import {connect} from 'react-redux';
import {idChanged} from "../../redux/reducer/content";
import SimpleObjectGroup from "../object-group/SimpleObjectGroup";
import {OBJECTS_BATTLE} from "../object-group/objectsBattle";
import BattleTask from "./task/BattleTask";
import {BATTLE_STATUS_IN_PROGRESS, BATTLE_STATUS_OPEN} from "../../util/battleHelper";
import _ from "lodash";
import BattleStartResponseFetch from "./task/fetch/BattleStartResponseFetch";
import BattleEndFetch from "./friend/fetch/BattleEndFetch";
import BattleSolution from "./task/BattleSolution";

class BattlePage extends React.PureComponent {

    renderContent() {
        const {screen, onContentIdChange, inProgressId, battleStartResponseRep, battleEndRep, status} = this.props;
        if (!_.isNil(inProgressId)) {
            if (status === BATTLE_STATUS_OPEN) {
                return <BattleTask rep={battleStartResponseRep}/>;
            }
            if (status === BATTLE_STATUS_IN_PROGRESS) {
                return <BattleSolution questions={battleStartResponseRep.value.questions} rep={battleEndRep}/>;
            }
        }
        return <div>
            <SimpleObjectGroup
                objects={OBJECTS_BATTLE}
                onObjectClick={onContentIdChange}
                screen={screen}
            />
        </div>;
    }

    render() {
        const {battleStartResponseRep, battleEndRep, status, questionIdAnswerIdMap, inProgressId} = this.props;
        return <div>
            {this.renderContent()}
            <BattleStartResponseFetch
                battleStartResponseRep={battleStartResponseRep}
                battleId={inProgressId}
                status={status}
            />
            <BattleEndFetch
                battleEndRep={battleEndRep}
                battleId={_.get(battleStartResponseRep, 'value.id')}
                questionIdAnswerIdMap={questionIdAnswerIdMap}
                status={status}
            />
        </div>;
    }
}

export default connect(
    (state) => ({
        screen: state.screen,
        inProgressId: state.battle.inProgressId,
        status: state.battle.status,
        questionIdAnswerIdMap: state.battle.questionIdAnswerIdMap,
        battleStartResponseRep: state.repository.battleStartResponse,
        battleEndRep: state.repository.battleEnd
    }),
    (dispatch) => ({
        onContentIdChange: (e) => dispatch(idChanged(e.id)),
    })
)(BattlePage);
