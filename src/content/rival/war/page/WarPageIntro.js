import React from 'react';
import {connect} from 'react-redux';
import play from '../../../../media/image/icon/play.svg';
import {getText, TEXT_DRAW_WHO_ANSWER, TEXT_QUESTION, TEXT_WAR} from "../../../../lang/text";
import RandomTaskProps from "../../component/RandomTaskProps";
import Team from "../../component/Team";
import RandomTeamHero from "../../component/RandomTeamHero";
import ActiveHeroes from "../../component/ActiveHeroes";

class WarPageIntro extends React.PureComponent {

    state = {component: 0, waiting: false};

    componentDidMount() {
        this.componentDidUpdate();
    }

    componentDidUpdate() {
        const {component, waiting} = this.state;
        if (component === 0 && !waiting) {
            this.nextComponentRender(1, 6000);
        } else if (component === 1 && !waiting) {
            this.nextComponentRender(2, 10000);
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
            <Team profile={profile} presentIndexes={content.presentIndexes} team={content.team}/>
            <img alt='' src={play} height={80}/>
            <Team profile={content.opponent} presentIndexes={content.opponentPresentIndexes}
                  team={content.opponentTeam}/>
        </div>;
    }

    render() {
        const {component} = this.state;
        const {content, profile} = this.props;
        return <div className='pageContent warPageIntro'>
            {component === 0 && <div>
                <div className='pageHeader title'>{getText(TEXT_WAR)}</div>
                {this.renderTeamBig()}
            </div>}
            {component === 1 && <div>
                <div
                    className='pageHeader task'>{`${getText(TEXT_QUESTION)} ${content.task.id}`}</div>
                <div className='pageHeader drawWhoAnswer'>{getText(TEXT_DRAW_WHO_ANSWER)}</div>
                <RandomTeamHero
                    className='randomTeamHero1'
                    presentIndexes={content.presentIndexes}
                    profile={profile}
                    team={content.team}
                    targetIndex={content.activeIndex}
                    delay={3000} duration={2500}
                />
                <RandomTeamHero
                    className='randomTeamHero2'
                    presentIndexes={content.opponentPresentIndexes}
                    profile={content.opponent}
                    team={content.opponentTeam}
                    targetIndex={content.opponentActiveIndex}
                    delay={6000}
                    duration={2500}
                />
            </div>}
            {component === 2 && <div>
                <ActiveHeroes content={content} className='absolute'/>
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
