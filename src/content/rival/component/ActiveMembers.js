import React from 'react';
import {connect} from "react-redux";
import ActiveMember from "./ActiveMember";

class ActiveMembers extends React.PureComponent {

    static defaultProps = {
        className: 'absolute justifyBetween'
    };

    render() {
        const {content, memberClassName, className} = this.props;
        return <div className={`width100 ${className}`}>
            <div>
                <ActiveMember className={memberClassName} team={content.team} activeIndex={content.activeIndex}/>
            </div>
            {content.opponent && <div>
                <ActiveMember className={memberClassName} team={content.opponentTeam} activeIndex={content.opponentActiveIndex}/>
            </div>}
        </div>;
    }
}

export default connect(
    (state) => ({
        profile: state.profile.profile,
    }),
    (dispatch) => ({})
)(ActiveMembers);
