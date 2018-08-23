import React from 'react';
import {connect} from 'react-redux';
import Profile from "../../../component/profile/Profile";
import play from '../../../media/image/icon/play.svg';
import {Anime} from "../../../component/anime/Anime";
import {getText, TEXT_BATTLE, TEXT_DRAW_CATEGORY, TEXT_DRAW_DIFFICULT, TEXT_QUESTION} from "../../../lang/text";
import {OBJECTS_CATEGORY} from "../../object-group/objectsCategory";
import SimpleObjectGroup from "../../object-group/SimpleObjectGroup";
import {CATEGORY_RANDOM} from "../../../util/categoryHelper";
import _ from 'lodash';
import Rating from "../../../component/rating/Rating";
import {DIFFICULTY_LEVELS, NAME_TO_DIFFICULT_LEVEL} from "../../../util/difficultyHelper";

class BattlePageIntro extends React.PureComponent {

    state = {component: 0};

    renderProfiles() {
        const {component} = this.state;
        if (component === 2 || component === 3) {
            return this.renderProfilesSmall();
        }
        return this.renderProfilesBig();
    }

    renderProfilesBig() {
        const {profile, content} = this.props;
        return <Anime
            from={{opacity: 0}}
            to={{opacity: {value: 1, duration: 500, delay: 1000}}}>
            <div className='introProfiles'>
                <Profile {...profile}/>
                <img alt='' src={play} height={80}/>
                <Profile {...content.opponent}/>
            </div>
        </Anime>
    }

    renderProfilesSmall() {
        const {profile, content, screen} = this.props;
        const imgHeight = screen.isNotBigHeight ? 60 : 80;
        return <div className='profiles' style={{position: 'absolute'}}>
            <Profile {...profile} imgHeight={imgHeight}/>
            <Profile {...content.opponent} imgHeight={imgHeight}/>
        </div>;
    }

    renderRandom() {
        const {component} = this.state;
        return <Anime
            from={{opacity: 0}}
            to={{opacity: {value: 1, duration: 500, delay: 500}}}>
            <div>
                <div className='pageHeader introRandomDifficult'>
                    <div>{getText(TEXT_DRAW_DIFFICULT)}</div>
                    {this.renderRandomDifficult()}
                </div>
                {component === 3 && <div className='pageHeader introRandomCategory'>
                    <div>{getText(TEXT_DRAW_CATEGORY)}</div>
                    {this.renderRandomCategory()}
                </div>}
            </div>
        </Anime>;
    }

    renderRandomCategory() {
        const objectsCategory = _.shuffle(OBJECTS_CATEGORY.filter(e => e.id !== CATEGORY_RANDOM));
        const {screen, communication, content} = this.props;
        const targetCategory = content.task.category;
        const targetSelectedIdValue = objectsCategory.length * 6;
        return <Anime
            targetAsChildProp={null}
            targetTransformer={(t) => ({selectedId: targetSelectedIdValue <= t.selectedId ? targetCategory : objectsCategory[Math.floor((t.selectedId) % objectsCategory.length)].id})}
            from={{selectedId: 0}}
            to={{selectedId: {value: targetSelectedIdValue * 1.5, duration: 5000, delay: 1000}}}>
            <SimpleObjectGroup
                objects={objectsCategory}
                onObjectClick={(id) => {
                    communication.send('BATTLE_CATEGORY' + JSON.stringify({id}))
                }}
                screen={{...screen, contentHeight: screen.contentHeight - 60}}
            />
        </Anime>;
    }

    renderRandomDifficult() {
        const {content} = this.props;
        const objectsDifficult = DIFFICULTY_LEVELS;
        const targetDifficult = NAME_TO_DIFFICULT_LEVEL[content.task.difficultyLevel];
        const targetSelectedIdValue = objectsDifficult.length * 6;
        return <Anime
            config={{complete: () => this.setState({component: 3})}}
            targetAsChildProp={null}
            targetTransformer={(t) => ({value: targetSelectedIdValue <= t.value ? targetDifficult : objectsDifficult[Math.floor((t.value) % objectsDifficult.length)]})}
            from={{value: 0}}
            to={{value: {value: targetSelectedIdValue * 1.5, duration: 5000, delay: 0}}}>
            {<Rating/>}
        </Anime>;
    }

    renderText(text, component, to = {
        opacity: [{value: 1, duration: 500, delay: 500}, {
            value: 0,
            duration: 500,
            delay: 2000
        }]
    }) {
        return <Anime
            config={{complete: () => this.setState({component})}}
            from={{opacity: 0}}
            to={to}>
            <div className='pageHeader battlePageIntroHeader'>{text}</div>
        </Anime>;
    }

    render() {
        const {component} = this.state;
        const {content} = this.props;
        return <div className='pageContent battlePageIntro'>
            {component === 0 && this.renderText(getText(TEXT_BATTLE), 1)}
            {this.renderProfiles()}
            {component === 1 && this.renderText(`${getText(TEXT_QUESTION)} ${content.task.id}/${content.taskCount}`, 2)}
            {(component === 2 || component === 3) && this.renderRandom()}
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
