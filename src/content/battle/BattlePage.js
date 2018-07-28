import React from 'react';
import {connect} from 'react-redux';
import {idChanged} from "../../redux/reducer/content";
import SimpleObjectGroup from "../object-group/SimpleObjectGroup";
import {OBJECTS_BATTLE} from "../object-group/objectsBattle";
import BattleTask from "./task/BattleTask";
import {BATTLE_STATUS_IN_PROGRESS, BATTLE_STATUS_OPEN} from "../../util/battleHelper";
import _ from "lodash";
import BattleStartResponseFetch from "./task/fetch/BattleStartResponseFetch";
import BattleEndFetch from "./task/fetch/BattleEndFetch";
import BattleSolution from "./task/BattleSolution";
import BattleSummaryPage from "./list/BattleSummaryPage";
import BattleSummaryFetch from "./task/fetch/BattleSummaryFetch";

class BattlePage extends React.PureComponent {

    renderContent() {
        const {screen, onContentIdChange, summaryId, inProgressId, battleStartResponseRep, battleEndRep, battleSummaryRep, status} = this.props;
        if (!_.isNil(summaryId)) {
            return <BattleSummaryPage rep={battleSummaryRep}/>;
        }
        if (!_.isNil(inProgressId)) {
            if (status === BATTLE_STATUS_OPEN) {
                return <BattleTask rep={battleStartResponseRep}/>;
            }
            if (status === BATTLE_STATUS_IN_PROGRESS) {
                const repValue = battleStartResponseRep.value;
                return <BattleSolution questions={repValue.questions} battleId={repValue.id} rep={battleEndRep}/>;
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
        const {battleStartResponseRep, battleEndRep, status, summaryId, questionIdAnswerIdMap, inProgressId} = this.props;
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
            <BattleSummaryFetch
                battleId={summaryId}
            />
        </div>;
    }
}

export default connect(
    (state) => ({
        screen: state.screen,
        summaryId: state.battle.summaryId,
        inProgressId: state.battle.inProgressId,
        status: state.battle.status,
        questionIdAnswerIdMap: state.battle.questionIdAnswerIdMap,
        battleStartResponseRep: state.repository.battleStartResponse,
        battleEndRep: state.repository.battleEnd,
        battleSummaryRep: state.repository.battleSummary
    }),
    (dispatch) => ({
        onContentIdChange: (e) => dispatch(idChanged(e.id)),
    })
)(BattlePage);
