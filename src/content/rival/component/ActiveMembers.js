import React from 'react';
import {connect} from "react-redux";
import ActiveMember from "./ActiveMember";

class ActiveMembers extends React.PureComponent {

    render() {
        const {profile, content, wisieClassName, className} = this.props;
        return <div className={`width100 justifyBetween ${className}`}>
            <div>
                <ActiveMember className={wisieClassName} profile={profile} team={content.team} activeIndex={content.activeIndex}/>
            </div>
            <div>
                <ActiveMember className={wisieClassName} profile={content.opponent} team={content.opponentTeam} activeIndex={content.opponentActiveIndex}/>
            </div>
        </div>;
    }
}

export default connect(
    (state) => ({
        profile: state.profile.profile,
    }),
    (dispatch) => ({})
)(ActiveMembers);
