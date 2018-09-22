import React from 'react';
import {connect} from "react-redux";
import {getText, TEXT_OPPONENT_TEAM, TEXT_POINTS, TEXT_YOUR_TEAM} from "../../../lang/langText";
import Team from "./Team";
import {getElo} from "../../../util/rivalHelper";
import {remToPixels} from "../../../util/fontHelper";

class Teams extends React.PureComponent {

    renderRelative() {
        const {content, screen, children} = this.props;
        if (screen.isSmallHeight && !screen.moreHeightThanWidth) {
            return this.renderAbsolute();
        }
        return <div>
            <div className='pageHeader'>{getText(TEXT_YOUR_TEAM)}{this.renderElo(content.profile)}</div>
            <div className='pageHeader fontSize08Rem'>
                <Team renderHobbies={true} team={content.team}
                      className='justifyCenter overflowHidden width100'
                      contentClassName='overflowXAuto justifyStart'
                      presentIndexes={content.presentIndexes}/>
            </div>
            <div className='justifyCenter'>{children}</div>
            {content.opponent && <div className='pageHeader'>{getText(TEXT_OPPONENT_TEAM)}{this.renderElo(content.opponent)}</div>}
            {content.opponent && <div className='pageHeader fontSize08Rem'>
                <Team renderHobbies={true} team={content.opponentTeam}
                      className='justifyCenter overflowHidden width100'
                      contentClassName='overflowXAuto justifyStart'
                      presentIndexes={content.opponentPresentIndexes}/>
            </div>}
        </div>
    }

    renderAbsolute() {
        const {content, screen} = this.props;
        const renderImg = screen.contentHeight - 40 > 480;
        const imgHeight = (screen.contentHeight - 40)/5 - remToPixels(3);
        return <div className='contentHeader justifyBetween top0 fontSize07Rem' style={{zIndex: 0}}>
            <div className='marginLeftRem'>
                <div className='justifyStart'>{getText(TEXT_YOUR_TEAM)}{this.renderElo(content.profile)}</div>
                <div className='justifyStart'>
                    <Team
                        memberClassName='justifyCenter'
                        renderImg={renderImg}
                        renderHobbies={true}
                        imgHeight={imgHeight}
                        renderHorizontal={true}
                        team={content.team}
                        presentIndexes={content.presentIndexes}
                    />
                </div>
            </div>
            {content.opponent && <div className='marginRightRem'>
                <div className='justifyEnd'>{getText(TEXT_OPPONENT_TEAM)}{this.renderElo(content.opponent)}</div>
                <div className='justifyEnd'>
                    <Team
                        memberClassName='justifyCenter'
                        renderImg={renderImg}
                        renderHobbies={true}
                        imgHeight={imgHeight}
                        renderHorizontal={true}
                        team={content.opponentTeam}
                        presentIndexes={content.opponentPresentIndexes}
                    />
                </div>
            </div>}
        </div>;
    }

    renderElo(profile) {
        const {renderElo, content} = this.props;
        if (!renderElo) {
            return null;
        }
        return <div className='justifyCenter'>
            {getElo(profile, content.type)}
            <div className='paddingLeftRem'>{getText(TEXT_POINTS)}</div>
        </div>
    }

    render() {
        const {forceAbsolute} = this.props;
        if (forceAbsolute) {
            return this.renderAbsolute();
        }
        return this.renderRelative();
    }
}


export default connect(
    (state) => ({
        screen: state.screen,
    }),
    (dispatch) => ({})
)(Teams);
