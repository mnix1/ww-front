import React from 'react';
import {connect} from 'react-redux';
import swordShield from '../../../../media/image/menu/swordShield.svg';
import {getText, TEXT_WAR} from "../../../../lang/langText";
import Teams from "../../component/Teams";
import {isRanking} from "../../../../util/rivalHelper";

class WarPageIntro extends React.PureComponent {

    renderTeamBig() {
        const {content, screen} = this.props;
        return <div className='team justifyCenter flexColumn'>
            <Teams renderElo={isRanking(content)} content={content}>
                <img alt='' src={swordShield} height={screen.wisieImgHeight}/>
            </Teams>
        </div>;
    }

    render() {
        return <div className='pageContent warPageIntro'>
             <div>
                <div className='pageHeader title'>{getText(TEXT_WAR)}</div>
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
