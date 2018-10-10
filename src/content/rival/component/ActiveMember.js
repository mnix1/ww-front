import React from 'react';
import Wisie from "../../../component/wisie/Wisie";
import Profile from "../../../component/profile/Profile";
import {connect} from "react-redux";
import {isTeamMemberWisie} from "../../../util/heroHelper";
import {profileImgHeightAdd} from "../../../util/screenHelper";

class ActiveMember extends React.PureComponent {

    get imgHeight() {
        const {imgHeight, screen} = this.props;
        if (imgHeight) {
            return imgHeight;
        }
        return screen.standardImgHeight - 10;
    }

    renderProfile(profile) {
        const {screen} = this.props;
        return <Profile {...profile} imgHeight={this.imgHeight + profileImgHeightAdd(screen)}/>;
    }

    renderWisie(wisie) {
        const {renderHobbies} = this.props;
        return <Wisie
            renderHobbies={renderHobbies}
            key={wisie.type}
            imgHeight={this.imgHeight}
            renderDetails={true}
            {...wisie}>
        </Wisie>;
    }

    renderProfileOrWisie(team, activeIndex) {
        const teamMember = team[activeIndex];
        if (isTeamMemberWisie(teamMember)) {
            return this.renderWisie(teamMember.content);
        }
        return this.renderProfile(teamMember.content);
    }

    render() {
        const {team, activeIndex, className} = this.props;
        return <div className={`${className} zIndex1`}>
            {this.renderProfileOrWisie(team, activeIndex)}
        </div>
    }
}

export default connect(
    (state) => ({
        screen: state.screen,
    }),
    (dispatch) => ({})
)(ActiveMember);
