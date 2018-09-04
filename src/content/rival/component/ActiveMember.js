import React from 'react';
import Wisie from "../../../component/wisie/Wisie";
import Profile from "../../../component/profile/Profile";
import {connect} from "react-redux";
import {isTeamMemberWisie} from "../../../util/heroHelper";

class ActiveMember extends React.PureComponent {

    get imgHeight() {
        const {imgHeight, screen} = this.props;
        if (imgHeight) {
            return imgHeight;
        }
        return screen.wisieImgHeight;
    }

    renderProfile(profile) {
        return <Profile {...profile} imgHeight={this.imgHeight}/>;
    }

    renderWisie(wisie) {
        return <Wisie
            isOwned={true}
            renderHobbies={true}
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
