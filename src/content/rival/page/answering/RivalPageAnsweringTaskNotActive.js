import React from 'react';
import {connect} from 'react-redux';
import _ from 'lodash';
import Wisie from "../../../../component/wisie/Wisie";
import Profile from "../../../../component/profile/Profile";
import WisieActions from "../../../../component/wisie/WisieActions";
import {isTeamMemberWisie} from "../../../../util/heroHelper";
import {remToPixels} from "../../../../util/fontHelper";
import AvailableSkills from "../../../../component/skill/AvailableSkills";
import {
    SKILL_GHOST,
    SKILL_HINT,
    SKILL_KIDNAPPING,
    SKILL_LIFEBUOY,
    SKILL_PIZZA,
    SKILL_WATER_PISTOL
} from "../../../../util/skillHelper";

class RivalPageAnsweringTaskNotActive extends React.PureComponent {

    handleHintClick = (answerId) => {
        const {communication} = this.props;
        communication.sendHint(answerId);
    };

    handleWaterPistolClick = () => {
        const {communication} = this.props;
        communication.sendWaterPistol();
    };

    handleKidnappingClick = () => {
        const {communication} = this.props;
        communication.sendKidnapping();
    };

    handleGhostClick = () => {
        const {communication} = this.props;
        communication.sendGhost();
    };
    handlePizzaClick = () => {
        const {communication} = this.props;
        communication.sendPizza();
    };

    renderAvailableSkills(isOpponentWisie) {
        const {content} = this.props;
        const {opponentActiveMemberAddOn} = content;
        const isOpponentPresent = _.isNil(opponentActiveMemberAddOn) ? true : opponentActiveMemberAddOn.present;
        const mySkills = isOpponentWisie
            ? _.pickBy(content.skills, (v, k) => k !== SKILL_LIFEBUOY && v.type !== 'PASSIVE')
            : _.pickBy(content.skills, (v, k) => k === SKILL_HINT && v.type !== 'PASSIVE');
        return <AvailableSkills
            key={'as1'}
            className='justifyStart'
            disabled={!isOpponentPresent}
            skills={mySkills}
            skillClickHandlers={{
                [SKILL_WATER_PISTOL]: this.handleWaterPistolClick,
                [SKILL_KIDNAPPING]: this.handleKidnappingClick,
                [SKILL_GHOST]: this.handleGhostClick,
                [SKILL_PIZZA]: this.handlePizzaClick,
            }}
        />;
    }

    renderTeamMember(isOpponentWisie) {
        const {activeMember, content, imgHeight} = this.props;
        return [
            <Wisie
                key={'w1'}
                renderSkills={false}
                className='justifyStart'
                detailsClassName='justifyStart'
                nearImgChildren={<WisieActions
                    className='textAlignStart paddingLeftRem'
                    actions={content.wisieActions}/>}
                imgHeight={imgHeight}
                {...activeMember.content}
                disguise={_.get(content, 'activeMemberAddOn.disguise')}
                renderDetails={true}
            />,
            this.renderAvailableSkills(isOpponentWisie)
        ];
    }

    renderOpponentAvailableSkills() {
        const {content} = this.props;
        const {activeMemberAddOn} = content;
        const isActivePresent = _.isNil(activeMemberAddOn) ? true : activeMemberAddOn.present;
        return <AvailableSkills
            key='as2'
            disabled={!isActivePresent}
            className='justifyEnd'
            skills={_.pickBy(content.opponentSkills, (v, k) => k !== SKILL_LIFEBUOY && v.type !== 'PASSIVE')}
        />;
    }

    renderOpponentTeamMember(isOpponentWisie, opponentActiveMember) {
        const {content, imgHeight} = this.props;
        if (!content.opponent) {
            return null;
        }
        if (!isOpponentWisie) {
            return <Profile
                className='justifyEnd'
                imgHeight={imgHeight + remToPixels(0.85)}
                {...opponentActiveMember.content}
            />
        }
        return [
            <Wisie
                key='w2'
                detailsClassName='justifyEnd'
                nearImgChildrenAfter={false}
                renderSkills={false}
                disguise={_.get(content, 'opponentActiveMemberAddOn.disguise')}
                nearImgChildren={<WisieActions
                    className='textAlignEnd paddingRightRem'
                    actions={content.opponentWisieActions}/>}
                className='pointer justifyEnd'
                onClick={this.handleWaterPistolClick}
                imgHeight={imgHeight}
                {...opponentActiveMember.content}
                renderDetails={true}/>,
            this.renderOpponentAvailableSkills()
        ];
    }

    render() {
        console.log('RivalPageAnsweringTaskNotActive render');
        const {content, taskDescription, renderTaskFunction} = this.props;
        const {opponentTeam, opponentActiveIndex} = content;
        const opponentActiveMember = opponentTeam && opponentTeam[opponentActiveIndex];
        const isOpponentWisie = content.opponent && isTeamMemberWisie(opponentActiveMember);
        return <div className='width100 height100 absolute'>
            <div className='width100 justifyBetween absolute'>
                <div style={{width: '14rem'}}>
                    {this.renderTeamMember(isOpponentWisie)}
                </div>
                {taskDescription}
                <div style={{width: '14rem'}}>
                    {this.renderOpponentTeamMember(isOpponentWisie, opponentActiveMember)}
                </div>
            </div>
            {renderTaskFunction(this.handleHintClick)}
        </div>;
    }
}

export default connect(
    (state) => ({
        screen: state.screen,
        content: state.rival.content,
    }),
    (dispatch) => ({})
)(RivalPageAnsweringTaskNotActive);
