import React from 'react';
import {connect} from 'react-redux';
import _ from 'lodash';
import RandomTaskProps from "../../component/RandomTaskProps";
import Profiles from "../../component/Profiles";
import ChoosingTaskProps from "../../component/ChoosingTaskProps";
import TaskDescription from "../../component/TaskDescription";
import {
    getText,
    TEXT_DRAW_WHO_ANSWER,
    TEXT_OPPONENT_CHOOSING,
    TEXT_QUESTION,
    TEXT_TIME,
    TEXT_WAR
} from "../../../../lang/text";
import sleep from '../../../../media/image/icon/sleep.svg';
import Timer from "../../../../component/timer/Timer";
import {categoryChanged, difficultLevelChanged} from "../../../../redux/reducer/war";
import {DIFFICULT_LEVEL_TO_NAME} from "../../../../util/difficultyHelper";
import ActiveHeroes from "../../component/ActiveHeroes";
import RandomTeamHero from "../../component/RandomTeamHero";

class WarPageChoosingTaskProps extends React.PureComponent {

    state = {component: 0, waiting: false};

    componentDidMount() {
        this.componentDidUpdate();
    }

    componentDidUpdate() {
        const {component, waiting} = this.state;
        if (component === 0 && !waiting) {
            this.nextComponentRender(1, 10000);
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

    renderContent() {
        const {component} = this.state;
        const {content, profile} = this.props;
        return <div className='pageContent warPageIntro'>
            {component === 0 && <div>
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
            {component === 1 && <div>
                <ActiveHeroes content={content} className='absolute'/>
                <RandomTaskProps className='taskProps' content={content}/>
            </div>}
        </div>;
    }

    render() {
        return <div className='pageContent warPageChoosingTaskProps'>
            {this.renderContent()}
        </div>;
    }
}

export default connect(
    (state) => ({
        screen: state.screen,
        content: state.war.content,
        profile: state.profile.profile,
    }),
    (dispatch) => ({
    })
)(WarPageChoosingTaskProps);
