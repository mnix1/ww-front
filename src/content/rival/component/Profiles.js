import React from 'react';
import {connect} from 'react-redux';
import {prepareScoreMessage} from "../../../util/textHelper";
import Profile from "../../../component/profile/Profile";

export class ProfilesComponent extends React.PureComponent {

    renderProfile(profile, score, color) {
        const {screen} = this.props;
        return <Profile {...profile} imgHeight={screen.heroImgHeight}>
            <div style={{color}}>{prepareScoreMessage(score)}</div>
        </Profile>
    }

    render() {
        const {profile, content, className, scoreColor, opponentScoreColor} = this.props;
        if (!content) {
            return;
        }
        return <div className={`profiles width100 justifyBetween ${className}`}>
            <div className='profile'>
                {this.renderProfile(profile, content.score, scoreColor)}
            </div>
            <div className='opponentProfile'>
                {this.renderProfile(content.opponent, content.opponentScore, opponentScoreColor)}
            </div>
        </div>;
    }
}

export default connect(
    (state) => ({
        screen: state.screen,
        profile: state.profile.profile,
        // content: state.battle.content,
    }),
    (dispatch) => ({})
)(ProfilesComponent);
