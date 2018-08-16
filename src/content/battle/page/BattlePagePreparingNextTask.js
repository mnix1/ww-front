import React from 'react';
import {connect} from 'react-redux';
import Profile from "../../../component/profile/Profile";
import play from '../../../media/image/icon/play.svg';
import {Anime} from "../../../component/anime/Anime";
import {
    getCategoryLabel,
    getText,
    TEXT_BATTLE,
    TEXT_DRAW_CATEGORY,
    TEXT_DRAW_DIFFICULT,
    TEXT_QUESTION, TEXT_QUESTION_PREPARING, TEXT_WAIT
} from "../../../lang";
import {OBJECTS_CATEGORY} from "../../object-group/objectsCategory";
import SimpleObjectGroup from "../../object-group/SimpleObjectGroup";
import {CATEGORY_RANDOM} from "../../../util/categoryHelper";
import _ from 'lodash';
import {renderDifficultyLevelStars, STARS_DIFFICULTY_LEVEL} from "../../../util/taskDifficultyLevel";
import DifficultLevelStars from "../../../component/difficult/DifficultLevelStars";
import Timer from "../../../component/timer/Timer";
import BattlePageTaskDescription from "./BattlePageTaskDescription";
import BattlePageProfiles from "./BattlePageProfiles";

class BattlePagePreparingNextTask extends React.PureComponent {

    render() {
        const {content} = this.props;
        return <div className='pageContent battlePagePreparingNextTask'>
            <BattlePageTaskDescription className='pageHeader'/>
            <div className='pageHeader'>
                <div>{getText(TEXT_QUESTION_PREPARING) + ' '}
                    <Timer from={content.nextTaskInterval}/>
                </div>
            </div>
            <BattlePageProfiles className={'profilesRelative'}/>
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
)(BattlePagePreparingNextTask);
