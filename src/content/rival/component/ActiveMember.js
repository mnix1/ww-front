import React from 'react';
import Wisie from "../../../component/wisie/Wisie";
import Profile from "../../../component/profile/Profile";
import {connect} from "react-redux";

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
            imgHobbyHeight={this.imgHeight / 3}
            renderDetails={true}
            {...wisie}>
        </Wisie>;
    }

    renderProfileOrWisie(profile, team, activeIndex) {
        if (activeIndex === 0) {
            return this.renderProfile(profile);
        }
        return this.renderWisie(team[activeIndex - 1]);
    }

    render() {
        const {profile, team, activeIndex, className} = this.props;
        return <div className={`${className} zIndex1`}>
            {this.renderProfileOrWisie(profile, team, activeIndex)}
        </div>
    }
}

export default connect(
    (state) => ({
        screen: state.screen,
    }),
    (dispatch) => ({})
)(ActiveMember);
