import React from 'react';
import {connect} from 'react-redux';
import {prepareScoreMessage} from "../../../../util/textHelper";
import Profile from "../../../../component/profile/Profile";

export class ProfilesComponent extends React.PureComponent {

    get imgHeight() {
        const {screen} = this.props;
        if (screen.isSmallHeight || screen.moreHeightThanWidth) {
            return 40;
        }
        return 60;
    }

    renderProfile(profile, score, color) {
        return <Profile {...profile} imgHeight={this.imgHeight}>
            <div style={{color}}>{prepareScoreMessage(score)}</div>
        </Profile>
    }

    render() {
        const {profile, content, className, scoreColor, opponentScoreColor} = this.props;
        if (!content) {
            return;
        }
        return <div className={`profiles ${className}`}>
            <div className='profile'>
                {this.renderProfile(profile, content.score, scoreColor)}
            </div>
            <div className='opponentProfile'>
                {this.renderProfile(content.opponent, content.opponentScore, opponentScoreColor)}
            </div>
        </div>
    }
}

export default connect(
    (state) => ({
        screen: state.screen,
        profile: state.profile.profile,
        content: state.battle.content,
    }),
    (dispatch) => ({})
)(ProfilesComponent);
