import React from 'react';
import {connect} from 'react-redux';
import {getName, getText, TEXT_CANCEL, TEXT_CLEAR, TEXT_EDIT, TEXT_SAVE, TEXT_WISIES_TEAM,} from "../../lang/langText";
import './styles.css';
import _ from 'lodash';
import Wisie from "../../component/wisie/Wisie";
import {WISIE_TEAM_COUNT} from "../../util/wisieHelper";
import FaEdit from "react-icons/lib/fa/edit";
import FaEraser from "react-icons/lib/fa/eraser";
import MdSave from "react-icons/lib/md/save";
import FaTimesCircle from 'react-icons/lib/fa/times-circle';
import {Button, BUTTON_MATERIAL_BOX_SHADOW} from "../../component/button/Button";
import {goBack, push} from "connected-react-router";
import {WISIES_TEAM_EDIT_ROUTE} from "../routes";
import {teamChanged, teamSaveChanged, wisieDetailsChanged} from "../../redux/reducer/wisie";

class WisieTeamPage extends React.PureComponent {
    renderWisies(wisies) {
        const maybeEmptyWisies = _.take(_.flatten([wisies, _.fill(Array(WISIE_TEAM_COUNT), null)]), WISIE_TEAM_COUNT);
        return <div className='justifyCenter flexWrap'>
            {maybeEmptyWisies.map((e, i) => _.isNil(e) ? this.renderEmptySlot(i) : this.renderWisie(e))}
        </div>;
    }

    renderWisie(wisie) {
        const {edit, screen, onTeamRemoveClick, onWisieDetailsClick, team} = this.props;
        return <Wisie
            key={wisie.type}
            imgHeight={screen.wisieImgHeight}
            className='pointer'
            onClick={edit ? () => onTeamRemoveClick(team, wisie) : () => onWisieDetailsClick(wisie)}
            renderDetails={false}
            {...wisie}/>;
    }

    renderEmptySlot(i) {
        return <div key={i} className='boxShadow marginRem' style={{minWidth: 40, minHeight: 40}}>
        </div>;
    }

    renderTeamActions(inTeamWisies) {
        const {onTeamEditClick, onRouteBack, edit, onEraseTeamClick, onTeamSaveClick} = this.props;
        if (!edit) {
            return <Button className='marginRem' material={BUTTON_MATERIAL_BOX_SHADOW}
                           onClick={() => onTeamEditClick(inTeamWisies)}
                           icon={<FaEdit size={16}/>}>{getText(TEXT_EDIT)}</Button>;
        }
        const saveDisabled = inTeamWisies.length !== WISIE_TEAM_COUNT;
        return <div>
            <Button className='marginRem' material={BUTTON_MATERIAL_BOX_SHADOW} onClick={onRouteBack}
                    icon={<FaTimesCircle size={16}/>}>{getText(TEXT_CANCEL)}</Button>
            <Button className='marginRem' material={BUTTON_MATERIAL_BOX_SHADOW} onClick={onEraseTeamClick}
                    icon={<FaEraser size={16}/>}>{getText(TEXT_CLEAR)}</Button>
            <Button className='marginRem' disabled={saveDisabled} material={BUTTON_MATERIAL_BOX_SHADOW}
                    onClick={saveDisabled ? _.noop : onTeamSaveClick}
                    icon={<MdSave size={16}/>}>{getText(TEXT_SAVE)}</Button>
        </div>
    }

    render() {
        const {wisieListRep, profileWisies, edit, team} = this.props;
        if (!wisieListRep || !wisieListRep.fulfilled) {
            return null;
        }
        if (profileWisies.length < WISIE_TEAM_COUNT) {
            return null;
        }
        const inTeamWisies = edit ? team : profileWisies.filter(e => e.inTeam);
        const inTeamWisiesMap = _.keyBy(inTeamWisies, 'type');
        const wisies = _.chain(wisieListRep.value.filter(e => inTeamWisiesMap[e.type]))
            .defaultTo([])
            .sortBy(e => getName(e))
            .map(e => ({...e, ...inTeamWisiesMap[e.type], isOwned: true}))
            .value();
        return <div>
            <div className='title textAlignCenter paddingRem'>
                {getText(TEXT_WISIES_TEAM)}
                {this.renderTeamActions(inTeamWisies)}
            </div>
            {this.renderWisies(wisies)}
        </div>;
    }

}

export default connect(
    (state) => ({
        screen: state.screen,
        path: state.router.location.pathname,
        team: state.wisie.team,
        wisieListRep: state.repository.wisieList,
        profileWisies: state.wisie.profileWisies
    }),
    (dispatch) => ({
        onWisieDetailsClick: (wisie) => dispatch(wisieDetailsChanged(wisie)),
        onTeamEditClick: (team) => {
            dispatch(teamChanged(team));
            dispatch(push(WISIES_TEAM_EDIT_ROUTE));
        },
        onRouteBack: () => {
            dispatch(goBack());
        },
        onEraseTeamClick: () => {
            dispatch(teamChanged([]));
        },
        onTeamSaveClick: () => {
            dispatch(teamSaveChanged(true));
            // dispatch(goBack());
        },
        onTeamRemoveClick: (team, wisie) => {
            const newTeam = team.filter(e => e.id !== wisie.id);
            dispatch(teamChanged(newTeam))
        }
    })
)(WisieTeamPage);
