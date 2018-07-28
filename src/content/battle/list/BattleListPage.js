import React from 'react';
import {connect} from 'react-redux';
import _ from 'lodash';
import BattleListFetch from "./fetch/BattleListFetch";
import {CREAM_COLOR} from "../../../util/style/constant";
import FaGavel from "react-icons/lib/fa/gavel";
import FaListOl from "react-icons/lib/fa/list-ol";
import './styles.css';
import {getText, TEXT_IN_PROGRESS_BATTLES, TEXT_NONE_IN_PROGRESS_BATTLES} from "../../../lang";
import {Battle} from "../../../component/battle/Battle";
import {inProgressIdChanged, statusChanged, summaryIdChanged} from "../../../redux/reducer/battle";
import {BATTLE_STATUS_OPEN} from "../../../util/battleHelper";
import {idChanged} from "../../../redux/reducer/content";
import {OBJECT_APP_BATTLE} from "../../object-group/objectsApp";

class BattleListPage extends React.PureComponent {

    renderBattles() {
        const {battleListRep} = this.props;
        if (!battleListRep || !battleListRep.fulfilled) {
            return null;
        }
        const battles = _.sortBy(battleListRep.value, 'inProgressDate');
        return <div>
            <div className='pageInsideContainer battlesContainer'>
                {battles.map(e => this.renderBattle(e))}
            </div>
        </div>;
    }

    renderBattle(battle) {
        const {onBattleResponseClick, onBattleSummaryClick} = this.props;
        return <div key={battle.id} className='battle'>
            <Battle battle={battle} actions={<div className='actions'>
                <FaGavel color={CREAM_COLOR} onClick={() => onBattleResponseClick(battle.id)}/>
                <FaListOl color={CREAM_COLOR} onClick={() => onBattleSummaryClick(battle.id)}/>
            </div>}/>
        </div>
    }

    render() {
        const {battleListRep} = this.props;
        return <div>
            <div className="pageHeader" style={{position: 'relative'}}>
                <span>{getText(_.isEmpty(_.get(battleListRep, 'value')) ? TEXT_NONE_IN_PROGRESS_BATTLES : TEXT_IN_PROGRESS_BATTLES)}</span>
            </div>
            {this.renderBattles()}
            <BattleListFetch battleListRep={battleListRep}/>
        </div>
    }
}

export default connect(
    (state) => ({
        battleListRep: state.repository.battleList
    }),
    (dispatch) => ({
        onBattleResponseClick: (id) => {
            dispatch(inProgressIdChanged(id));
            dispatch(statusChanged(BATTLE_STATUS_OPEN));
            dispatch(idChanged(OBJECT_APP_BATTLE));
        },
        onBattleSummaryClick: (id) => {
            dispatch(summaryIdChanged(id));
        }
    })
)(BattleListPage);
