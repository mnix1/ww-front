import React from 'react';
import {connect} from 'react-redux';
import swordShield from '../../../../media/image/menu/swordShield.svg';
import {getText, TEXT_WAR} from "../../../../lang/langText";
import RandomTaskProps from "../../component/RandomTaskProps";
import Teams from "../../component/Teams";
import {isRanking} from "../../../../util/rivalHelper";

class WarPageIntro extends React.PureComponent {

    state = {component: 0, waiting: false};

    componentDidMount() {
        this.componentDidUpdate();
    }

    componentWillUnmount() {
        clearInterval(this.interval);
    }

    componentDidUpdate() {
        const {component, waiting} = this.state;
        if (component === 0 && !waiting) {
            this.nextComponentRender(1, 6000);
        }
    }

    nextComponentRender(component, interval) {
        this.setState({waiting: true});
        this.interval = setInterval(() => {
            if (this.state.waiting && component !== this.state.component) {
                this.setState({component, waiting: false});
            }
        }, interval);
    }

    renderTeamBig() {
        const {content, screen} = this.props;
        return <div className='team justifyCenter flexColumn'>
            <Teams renderElo={isRanking(content)} content={content}>
                <img alt='' src={swordShield} height={screen.wisieImgHeight}/>
            </Teams>
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
        content: state.rival.content,
    }),
    (dispatch) => ({})
)(WarPageIntro);
