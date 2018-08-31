import React from 'react';
import {connect} from 'react-redux';
import play from '../../../../media/image/icon/play.svg';
import {getText, TEXT_OPPONENT_TEAM, TEXT_WAR, TEXT_YOUR_TEAM} from "../../../../lang/langText";
import RandomTaskProps from "../../component/RandomTaskProps";
import Team from "../../component/Team";

class WarPageIntro extends React.PureComponent {

    state = {component: 0, waiting: false};

    componentDidMount() {
        this.componentDidUpdate();
    }

    componentDidUpdate() {
        const {component, waiting} = this.state;
        if (component === 0 && !waiting) {
            this.nextComponentRender(1, 6000);
        }
    }

    nextComponentRender(component, interval) {
        this.setState({waiting: true});
        setInterval(() => {
            if (this.state.waiting && component !== this.state.component) {
                this.setState({component, waiting: false});
            }
        }, interval);
    }

    renderTeamBig() {
        const {profile, content} = this.props;
        return <div className='team justifyCenter flexColumn'>
            <div className='pageHeader'>{getText(TEXT_YOUR_TEAM)}</div>
            <Team profile={profile} presentIndexes={content.presentIndexes} team={content.team}/>
            <img alt='' src={play} height={80}/>
            <div className='pageHeader'>{getText(TEXT_OPPONENT_TEAM)}</div>
            <Team profile={content.opponent} presentIndexes={content.opponentPresentIndexes}
                  team={content.opponentTeam}/>
        </div>;
    }

    render() {
        const {component} = this.state;
        const {content} = this.props;
        return <div className='pageContent warPageIntro'>
            {component === 0 && <div>
                <div className='pageHeader title'>{getText(TEXT_WAR)}</div>
                {this.renderTeamBig()}
            </div>}
            {component === 1 && <div>
                <RandomTaskProps className='taskProps' content={content}/>
            </div>}
        </div>;
    }
}

export default connect(
    (state) => ({
        screen: state.screen,
        content: state.war.content,
        profile: state.profile.profile,
    }),
    (dispatch) => ({})
)(WarPageIntro);
