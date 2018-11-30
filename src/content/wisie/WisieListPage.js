import React from 'react';
import {connect} from 'react-redux';
import {getText, TEXT_HIDE, TEXT_NOT_OWNED_WISIES, TEXT_OWNED_WISIES, TEXT_SHOW} from "../../lang/langText";
import './styles.css';
import _ from 'lodash';
import {calculateWisieWidth, getWisieName, WISIE_TEAM_COUNT, WISIES} from "../../util/wisieHelper";
import {Loading} from "../../component/loading/Loading";
import {showNotOwnedChanged, teamChanged, wisieDetailsChanged} from "../../redux/reducer/wisie";
import Wisie from "../../component/wisie/Wisie";
import {FaMinusCircle, FaPlusCircle} from "react-icons/fa";
import {Button} from "../../component/button/Button";
import {MdDescription} from 'react-icons/md';
import {isRepFulfilled} from "../../util/repositoryHelper";
import cn from 'classnames';
import {INTRO_STEP_NEW_WISIE, showIntro, STEP_INDEX_TO_STEP_ID} from "../intro/introHelper";

export class WisieListPageComponent extends React.PureComponent {

    get wisieWidth() {
        const {screen} = this.props;
        return calculateWisieWidth(screen.contentWidth - 20) + 8;
    }

    renderWisies(wisiesGroups) {
        return <div className='justifyCenter flexColumn'>
            {wisiesGroups.map((e, i) => this.renderWisiesGroup(e, i))}
        </div>;
    }

    renderWisiesGroup(wisies, i) {
        return <div key={i} className='wisies justifyEvenly'>
            {wisies.map(e => this.renderWisie(e))}
        </div>;
    }

    renderWisieEdit(wisie) {
        const {team, screen, onTeamAddClick, onWisieDetailsClick, onTeamRemoveClick} = this.props;
        const isInTeam = _.some(team, (e) => e.id === wisie.id);
        return <Wisie
            renderSkills={true}
            hobbiesAndSkillsWidth100={true}
            blackBackground={true}
            imgHeight={screen.standardImgHeight + screen.fontSizeRem / 2}
            key={wisie.type} className='pointer '
            style={{width: this.wisieWidth}}
            onClick={() => isInTeam
                ? onTeamRemoveClick(team, wisie)
                : team.length < WISIE_TEAM_COUNT
                    ? onTeamAddClick(team, wisie)
                    : _.noop}
            {...wisie}>
            <div className='justifyStart'>
                {!isInTeam
                && <Button
                    padding={false}
                    iconMarginLeft={false}
                    className='paddingRightRem paddingTopRem'
                    disabled={team.length >= WISIE_TEAM_COUNT}
                    icon={<FaPlusCircle size={16}/>}
                    onClick={(e) => {
                        e.stopPropagation();
                        onTeamAddClick(team, wisie);
                    }}/>}
                {isInTeam
                && <Button
                    className='paddingRightRem paddingTopRem'
                    padding={false}
                    iconMarginLeft={false}
                    icon={<FaMinusCircle size={16}/>}
                    onClick={(e) => {
                        e.stopPropagation();
                        onTeamRemoveClick(team, wisie);
                    }}/>}
                <Button
                    className='paddingRightRem paddingTopRem'
                    padding={false}
                    iconMarginLeft={false}
                    onClick={(e) => {
                        e.stopPropagation();
                        onWisieDetailsClick(wisie)
                    }}
                    icon={<MdDescription size={16}/>}/>
            </div>
        </Wisie>
    }

    renderWisie(wisie) {
        const {onWisieDetailsClick, screen, edit, level, introductionStepIndex} = this.props;
        if (edit) {
            return this.renderWisieEdit(wisie);
        }
        const className = cn({
            pointer: wisie.isOwned,
            [INTRO_STEP_NEW_WISIE]: wisie.isOwned && showIntro(introductionStepIndex, level) && STEP_INDEX_TO_STEP_ID[introductionStepIndex] === INTRO_STEP_NEW_WISIE
        });
        return <Wisie
            renderSkills={wisie.isOwned === true}
            hobbiesAndSkillsWidth100={wisie.isOwned === true}
            renderHobbies={wisie.isOwned === true}
            blackBackground={true}
            imgHeight={screen.standardImgHeight + screen.fontSizeRem / 2}
            key={wisie.type}
            style={{width: this.wisieWidth}}
            {...wisie}
            className={className}
            onClick={wisie.isOwned ? () => onWisieDetailsClick(wisie) : _.noop}
        />;
    }

    renderOwned(wisies, ownedWisiesMap, groupCount) {
        const ownedWisies = _.chain(wisies.owned).defaultTo([])
            .map(e => ({...ownedWisiesMap[e], name: getWisieName(e), isOwned: true}))
            .sortBy('name')
            .value();
        return !_.isEmpty(ownedWisies) && <div className='contentFragment'>
            <div className='title textAlignCenter'>{getText(TEXT_OWNED_WISIES)}</div>
            {this.renderWisies(_.chunk(ownedWisies, groupCount))}
        </div>
    }

    renderToogleShowNotOwned() {
        const {showNotOwned, onToggleShowNotOwnedClick} = this.props;
        return <div className='title justifyCenter'>
            <div className='pointer'
                 onClick={() => onToggleShowNotOwnedClick(showNotOwned)}>
                {`${getText(showNotOwned ? TEXT_HIDE : TEXT_SHOW)} ${getText(TEXT_NOT_OWNED_WISIES).toLowerCase()}`}
                <span className='paddingLeftRem fontSize08Rem'>{showNotOwned ? <FaMinusCircle/> :
                    <FaPlusCircle/>}</span>
            </div>
        </div>
    }

    renderNotOwned(notOwnedWisies, groupCount) {
        const {edit, showNotOwned} = this.props;
        return !_.isEmpty(notOwnedWisies) && !edit && <div className='contentFragment'>
            {this.renderToogleShowNotOwned()}
            {showNotOwned && this.renderWisies(_.chunk(notOwnedWisies, groupCount))}
        </div>
    }

    render() {
        const {profileWisieListRep, profileWisies, screen, className} = this.props;
        if (!isRepFulfilled(profileWisieListRep)) {
            return <Loading/>;
        }
        const ownedWisiesMap = _.keyBy(profileWisies, 'type');
        const groupCount = Math.floor(screen.contentWidth / this.wisieWidth);
        const wisies = _.groupBy(WISIES, e => ownedWisiesMap[e] ? 'owned' : 'notOwned');
        const notOwnedWisies = _.chain(wisies.notOwned).defaultTo([]).map(e => ({type: e, name: getWisieName(e)})).sortBy('name').value();
        return <div className={className}>
            {this.renderOwned(wisies, ownedWisiesMap, groupCount)}
            {this.renderNotOwned(notOwnedWisies, groupCount)}
        </div>;
    }

}

export default connect(
    (state) => ({
        screen: state.screen,
        team: state.wisie.team,
        introductionStepIndex: state.intro.introductionStepIndex,
        level: state.profile.level,
        showNotOwned: state.wisie.showNotOwned,
        path: state.router.location.pathname,
        profileWisies: state.wisie.profileWisies,
        profileWisieListRep: state.repository.profileWisieList
    }),
    (dispatch) => ({
        onWisieDetailsClick: (wisie) => dispatch(wisieDetailsChanged(wisie)),
        onToggleShowNotOwnedClick: (showNotOwned) => dispatch(showNotOwnedChanged(!showNotOwned)),
        onTeamAddClick: (team, wisie) => {
            const newTeam = team.concat([wisie]);
            dispatch(teamChanged(newTeam))
        },
        onTeamRemoveClick: (team, wisie) => {
            const newTeam = team.filter(e => e.id !== wisie.id);
            dispatch(teamChanged(newTeam))
        }
    })
)(WisieListPageComponent);
