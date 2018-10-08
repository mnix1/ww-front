import React from 'react';
import {connect} from "react-redux";
import ActiveMember from "./ActiveMember";

class ActiveMembers extends React.PureComponent {

    static defaultProps = {
        className: 'absolute justifyBetween',
        renderHobbies: true,
        addWidthStyle: true
    };

    render() {
        const {content, memberClassName, className, renderHobbies, children, addWidthStyle} = this.props;
        const style = addWidthStyle ? {width:'12rem'} : {};
        return <div className={`width100 ${className}`}>
            <div style={style}>
                <ActiveMember
                    renderHobbies={renderHobbies}
                    className={`${memberClassName ? memberClassName : 'justifyStart'}`}
                    team={content.team}
                    activeIndex={content.activeIndex}/>
            </div>
            {children}
            <div style={style}>
                {content.opponent &&
                <ActiveMember
                    renderHobbies={renderHobbies}
                    className={`${memberClassName ? memberClassName : 'justifyEnd'}`}
                    team={content.opponentTeam}
                    activeIndex={content.opponentActiveIndex}/>}
            </div>
        </div>;
    }
}

export default connect(
    (state) => ({
        profile: state.profile.profile,
        content: state.rival.content,
    }),
    (dispatch) => ({})
)(ActiveMembers);
