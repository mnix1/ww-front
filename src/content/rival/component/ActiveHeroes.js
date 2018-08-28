import React from 'react';
import Hero from "../../../component/hero/Hero";
import Profile from "../../../component/profile/Profile";
import {prepareScoreMessage} from "../../../util/textHelper";
import {connect} from "react-redux";
import ActiveHero from "./ActiveHero";

class ActiveHeroes extends React.PureComponent {

    render() {
        const {profile, content, heroClassName, className} = this.props;
        return <div className={`width100 justifyBetween ${className}`}>
            <div>
                <ActiveHero className={heroClassName} profile={profile} team={content.team} activeIndex={content.activeIndex}/>
            </div>
            <div>
                <ActiveHero className={heroClassName} profile={content.opponent} team={content.opponentTeam} activeIndex={content.opponentActiveIndex}/>
            </div>
        </div>;
    }
}

export default connect(
    (state) => ({
        profile: state.profile.profile,
        screen: state.screen,
    }),
    (dispatch) => ({})
)(ActiveHeroes);
