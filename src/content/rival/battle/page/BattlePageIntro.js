import React from 'react';
import {connect} from 'react-redux';
import Profile from "../../../../component/profile/Profile";
import play from '../../../../media/image/icon/play.svg';
import {getText, TEXT_BATTLE} from "../../../../lang/langText";
import RandomTaskProps from "../../component/RandomTaskProps";
import Profiles from "../../component/Profiles";

class BattlePageIntro extends React.PureComponent {

    state = {component: 0};

    componentDidMount() {
        this.nextComponentRender(1, 4000);
    }

    nextComponentRender(component, interval) {
        setInterval(() => {
            this.setState({component})
        }, interval);
    }

    renderProfilesBig() {
        const {profile, content} = this.props;
        return <div className='profilesBig justifyCenter'>
            <Profile {...profile}/>
            <img alt='' src={play} height={80}/>
            <Profile {...content.opponent}/>
        </div>;
    }

    render() {
        const {component} = this.state;
        const {content} = this.props;
        return <div className='pageContent battlePageIntro'>
            {component === 0 && <div>
                <div className='pageHeader title'>{getText(TEXT_BATTLE)}</div>
                {this.renderProfilesBig()}
                {/*<div className='pageHeader task'>{`${getText(TEXT_QUESTION)} ${content.task.id}/${content.taskCount}`}</div>*/}
            </div>}
            {component === 1 && <div>
                <Profiles content={content} className='absolute'/>
                <RandomTaskProps className='taskProps' content={content}/>
            </div>}
        </div>;
    }
}

export default connect(
    (state) => ({
        screen: state.screen,
        content: state.battle.content,
        profile: state.profile.profile,
    }),
    (dispatch) => ({})
)(BattlePageIntro);
