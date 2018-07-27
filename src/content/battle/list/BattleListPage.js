import React from 'react';
import {connect} from 'react-redux';
import _ from 'lodash';
import BattleListFetch from "./fetch/BattleListFetch";
import {CREAM_COLOR} from "../../../util/style/constant";
import FaGavel from "react-icons/lib/fa/gavel";
import './styles.css';
import {getText, TEXT_IN_PROGRESS_BATTLES, TEXT_NONE_IN_PROGRESS_BATTLES} from "../../../lang";
import {Battle} from "../../../component/battle/Battle";
import {inProgressIdChanged} from "../../../redux/reducer/battle";

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
        const {onBattleResponseClick} = this.props;
        return <div key={battle.id} className='battle'>
            <Battle battle={battle} actions={<div className='actions'>
                <FaGavel color={CREAM_COLOR} onClick={() => onBattleResponseClick(battle.id)}/>
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
            <BattleListFetch battleListRep={battleListRep}
            />
        </div>
    }
}

export default connect(
    (state) => ({
        battleListRep: state.repository.battleList
    }),
    (dispatch) => ({
        onBattleResponseClick: (id) => {
            dispatch(inProgressIdChanged(id))
        }
    })
)(BattleListPage);
