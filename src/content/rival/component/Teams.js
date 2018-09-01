import React from 'react';
import {connect} from "react-redux";
import {getText, TEXT_OPPONENT_TEAM, TEXT_YOUR_TEAM} from "../../../lang/langText";
import Team from "./Team";

class Teams extends React.PureComponent {

    renderRelative() {
        const {content, profile, screen, children} = this.props;
        if (screen.isSmallHeight && !screen.moreHeightThanWidth) {
            return this.renderAbsolute();
        }
        return <div>
            <div className='pageHeader'>{getText(TEXT_YOUR_TEAM)}</div>
            <div className='pageHeader fontSize08Rem'>
                <Team renderHobbies={true} profile={profile} team={content.team}
                      presentIndexes={content.presentIndexes}/>
            </div>
            <div className='justifyCenter'>{children}</div>
            <div className='pageHeader'>{getText(TEXT_OPPONENT_TEAM)}</div>
            <div className='pageHeader fontSize08Rem'>
                <Team renderHobbies={true} profile={content.opponent} team={content.opponentTeam}
                      presentIndexes={content.opponentPresentIndexes}/>
            </div>
        </div>
    }

    renderAbsolute() {
        const {content, profile, children, screen} = this.props;
        const renderImg = screen.contentHeight - 40 > 480;
        return <div className='contentHeader justifyBetween top0 fontSize07Rem' style={{zIndex: 0}}>
            <div style={{marginLeft: '0.25rem'}}>
                <div>{getText(TEXT_YOUR_TEAM)}</div>
                <div>
                    <Team renderImg={renderImg} renderHobbies={true} imgHeight={40}
                          contentClassName='flexColumn'
                          className='justifyStart' profile={profile} team={content.team}
                          presentIndexes={content.presentIndexes}/>
                </div>
            </div>
            <div style={{marginRight: '0.25rem'}}>
                <div>{getText(TEXT_OPPONENT_TEAM)}</div>
                <div>
                    <Team renderImg={renderImg} renderHobbies={true} imgHeight={40}
                          contentClassName='flexColumn'
                          className='justifyEnd' profile={content.opponent} team={content.opponentTeam}
                          presentIndexes={content.opponentPresentIndexes}/>
                </div>
            </div>
        </div>;
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
        profile: state.profile.profile,
    }),
    (dispatch) => ({})
)(Teams);
