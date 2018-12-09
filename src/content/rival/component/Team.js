import React from 'react';
import Wisie from "../../../component/wisie/Wisie";
import Profile from "../../../component/profile/Profile";
import _ from 'lodash';
import {connect} from "react-redux";
import {isTeamMemberWisie} from "../../../util/heroHelper";
import {getSkill, SKILL_LIFEBUOY} from "../../../util/skillHelper";
import {profileImgHeightAdd} from "../../../util/screenHelper";
import {getWisieName} from "../../../util/wisieHelper";

class Team extends React.PureComponent {

    static defaultProps = {
        className: 'justifyCenter',
        memberClassName: '',
        contentClassName: 'justifyCenter',
        renderHorizontal: false,
        renderLifebuoyChoose: false,
        renderImg: true,
        onClick: _.noop,
        renderSkills: false,
        onLifebuoyClick: _.noop,
    };

    get imgHeight() {
        const {screen, imgHeight} = this.props;
        if (imgHeight) {
            return imgHeight;
        }
        return screen.standardImgHeight - 10;
    }

    renderTeam() {
        const {team, lang} = this.props;
        return _.sortBy(team, e => {
            const isWisie = isTeamMemberWisie(e);
            if (!isWisie) {
                return e.index;
            }
            return getWisieName(e.content.type, lang);
        }).map(this.renderProfileOrWisie);
    }

    renderProfileOrWisie = (teamMember) => {
        if (isTeamMemberWisie(teamMember)) {
            return this.renderWisie(teamMember);
        }
        return this.renderProfile(teamMember);
    };

    renderLifebuoy(teamMember) {
        const {onLifebuoyClick} = this.props;
        return <div className='absoluteBackgroundMix opacity1 pointer'
                    onClick={() => onLifebuoyClick(teamMember.index)}>
            <img draggable="false" className='height100 width100' alt='' src={getSkill(SKILL_LIFEBUOY)}/>
        </div>;
    }

    renderWisie(teamMember) {
        const wisie = teamMember.content;
        const {renderLifebuoyChoose, renderSkills, onClick, renderImg, memberClassName, activeIndex, presentIndexes} = this.props;
        const disabled = !_.includes(presentIndexes, teamMember.index);
        const canUseLifebuoy = disabled && renderLifebuoyChoose;
        return <Wisie
            renderSkills={renderSkills}
            hobbiesAndSkillsWidth100={renderSkills}
            hobbiesAndSkillsUnderName={true}
            onClick={() => onClick(teamMember.index)}
            disabled={disabled}
            className={memberClassName}
            key={wisie.type}
            active={activeIndex === teamMember.index}
            imgHeight={this.imgHeight}
            renderImg={renderImg}
            renderDetails={true}
            outsideChildren={canUseLifebuoy && this.renderLifebuoy(teamMember)}
            {...wisie}/>;
    }

    renderProfile(teamMember) {
        const {onClick, activeIndex, memberClassName, presentIndexes, screen} = this.props;
        return <Profile
            key={teamMember.type}
            onClick={() => onClick(teamMember.index)}
            disabled={!_.includes(presentIndexes, teamMember.index)}
            active={activeIndex === teamMember.index}
            {...teamMember.content}
            imgHeight={this.imgHeight + profileImgHeightAdd(screen) + 18}
            className={memberClassName}
        />;
    }

    render() {
        const {renderHorizontal, contentClassName, className} = this.props;
        const customClassName = `${className} ${renderHorizontal ? 'justifyStart' : ''}`;
        const customContentClassName = `${contentClassName} ${renderHorizontal ? 'flexColumn' : ''}`;
        return <div className={customClassName}>
            <div className={customContentClassName}>
                {this.renderTeam()}
            </div>
        </div>
    }
}


export default connect(
    (state) => ({
        screen: state.screen,
        lang: state.language.lang,
    }),
    (dispatch) => ({})
)(Team);
