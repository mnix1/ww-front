import React from 'react';
import Wisie from "../../../component/wisie/Wisie";
import Profile from "../../../component/profile/Profile";
import _ from 'lodash';
import {connect} from "react-redux";
import {isTeamMemberWisie} from "../../../util/heroHelper";
import SkillLifebuoy from "../../../component/skill/SkillLifebuoy";
import {getSkill, SKILL_LIFEBUOY} from "../../../util/skillHelper";

class Team extends React.PureComponent {

    static defaultProps = {
        className: 'justifyCenter',
        memberClassName: '',
        contentClassName: '',
        renderHorizontal: false,
        renderHobbies: false,
        renderLifebuoyChoose: false,
        renderImg: true,
        onClick: _.noop,
        onLifebuoyClick: _.noop,
    };

    get imgHeight() {
        const {screen, imgHeight} = this.props;
        if (imgHeight) {
            return imgHeight;
        }
        return screen.wisieImgHeight - 10;
    }

    renderTeam() {
        const {team} = this.props;
        return team.map(this.renderProfileOrWisie);
    }

    renderProfileOrWisie = (teamMember) => {
        if (isTeamMemberWisie(teamMember)) {
            return this.renderWisie(teamMember);
        }
        return this.renderProfile(teamMember);
    };

    renderWisie(teamMember) {
        const wisie = teamMember.content;
        const {renderHobbies, renderLifebuoyChoose, onLifebuoyClick, onClick, renderImg, memberClassName, activeIndex, presentIndexes} = this.props;
        const disabled = !_.includes(presentIndexes, teamMember.index);
        const canUseLifebuoy = disabled && renderLifebuoyChoose;
        const wisieComponent = <Wisie
            onClick={() => onClick(teamMember.index)}
            customBackgroundImgSrc={canUseLifebuoy ? getSkill(SKILL_LIFEBUOY) : undefined}
            disabled={disabled}
            className={memberClassName}
            key={wisie.type}
            active={activeIndex === teamMember.index}
            imgHeight={this.imgHeight}
            renderImg={renderImg}
            renderDetails={true}
            renderHobbies={renderHobbies}
            isOwned={true}
            {...wisie}/>;
        // if (!renderLifebuoyChoose || !disabled) {
            return wisieComponent;
        // }
        // return <div className='justifyStart flexColumn'>
        //     <div className='justifyCenter'>{wisieComponent}</div>
        //     <SkillLifebuoy onClick={() => onLifebuoyClick(teamMember.index)}/>
        // </div>;
    }

    renderProfile(teamMember) {
        const {onClick, activeIndex, memberClassName, presentIndexes} = this.props;
        return <Profile
            key={teamMember.type}
            onClick={() => onClick(teamMember.index)}
            disabled={!_.includes(presentIndexes, teamMember.index)}
            active={activeIndex === teamMember.index}
            {...teamMember.content}
            imgHeight={this.imgHeight + 18}
            className={memberClassName}
        />;
    }

    render() {
        const {renderHorizontal, contentClassName, className} = this.props;
        const customClassName = `${className} ${renderHorizontal ? 'justifyStart' : ''}`;
        const customContentClassName = `${contentClassName} ${renderHorizontal ? 'flexColumn' : ''}`;
        return <div className={customClassName}>
            <div className={`justifyCenter ${customContentClassName} `}>
                {this.renderTeam()}
            </div>
        </div>
    }
}


export default connect(
    (state) => ({
        screen: state.screen,
    }),
    (dispatch) => ({})
)(Team);
