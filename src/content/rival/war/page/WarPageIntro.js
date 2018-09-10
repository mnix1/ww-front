import React from 'react';
import {connect} from 'react-redux';
import swordShield from '../../../../media/image/menu/swordShield.svg';
import {getText} from "../../../../lang/langText";
import Teams from "../../component/Teams";
import {isRanking, RIVAL_TYPE_WELCOME_MSG} from "../../../../util/rivalHelper";

class WarPageIntro extends React.PureComponent {

    renderTeamBig() {
        const {content, screen} = this.props;
        return <div className='team justifyCenter flexColumn'>
            <Teams renderElo={isRanking(content)} content={content}>
                {content.opponent && <img alt='' src={swordShield} height={screen.wisieImgHeight}/>}
            </Teams>
        </div>;
    }

    render() {
        const {content} = this.props;
        return <div className='pageContent warPageIntro'>
             <div>
                <div className='pageHeader title'>{getText(RIVAL_TYPE_WELCOME_MSG[content.type])}</div>
                {this.renderTeamBig()}
            </div>
        </div>;
    }
}

export default connect(
    (state) => ({
        screen: state.screen,
        content: state.rival.content,
    }),
    (dispatch) => ({})
)(WarPageIntro);
