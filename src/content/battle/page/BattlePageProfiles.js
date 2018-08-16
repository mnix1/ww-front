import React from 'react';
import {connect} from 'react-redux';
import {prepareScoreMessage} from "../../../util/textHelper";
import Profile from "../../../component/profile/Profile";

export class BattlePageProfilesComponent extends React.PureComponent {

    get imgHeight() {
        const {screen} = this.props;
        if (screen.isSmallHeight || screen.moreHeightThanWidth) {
            return 40;
        }
        return 60;
    }

    renderProfile(profile, score) {
        return <Profile {...profile} imgHeight={this.imgHeight}>
            <div>{prepareScoreMessage(score)}</div>
        </Profile>
    }

    render() {
        const {profile, content, className} = this.props;
        if (!content) {
            return;
        }
        return <div className={`profiles ${className}`}>
            <div className='profile'>
                {this.renderProfile(profile, content.score)}
            </div>
            <div className='opponentProfile'>
                {this.renderProfile(content.opponent, content.opponentScore)}
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
    (dispatch) => ({
    })
)(BattlePageProfilesComponent);
