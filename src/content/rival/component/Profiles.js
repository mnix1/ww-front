import React from 'react';
import {connect} from 'react-redux';
import {prepareScoreMessage} from "../../../util/textHelper";
import Profile from "../../../component/profile/Profile";
import {renderBattleElo, renderWarElo} from "../../../util/rivalHelper";

class Profiles extends React.PureComponent {

    static defaultProps = {
        renderScore: true
    };

    renderProfile(profile, score, color, eloStyle) {
        const {screen, battleElo, warElo, renderScore, content} = this.props;
        return <Profile
            eloStyle={eloStyle}
            renderBattleElo={battleElo && renderBattleElo(content)}
            renderWarElo={warElo && renderWarElo(content)}
            {...profile}
            imgHeight={screen.wisieImgHeight}
        >
            {renderScore && <div className='' style={{color}}>{prepareScoreMessage(score)}</div>}
        </Profile>
    }

    render() {
        const {content, className, scoreColor, opponentScoreColor, eloStyle, opponentEloStyle} = this.props;
        if (!content) {
            return;
        }
        return <div className={`profiles width100 justifyBetween ${className}`}>
            <div className='profile'>
                {this.renderProfile(content.profile, content.score, scoreColor, eloStyle)}
            </div>
            <div className='opponentProfile'>
                {this.renderProfile(content.opponent, content.opponentScore, opponentScoreColor, opponentEloStyle)}
            </div>
        </div>;
    }
}

export default connect(
    (state) => ({
        screen: state.screen,
    }),
    (dispatch) => ({})
)(Profiles);
