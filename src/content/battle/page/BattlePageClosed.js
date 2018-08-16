import React from 'react';
import {connect} from 'react-redux';
import Profile from "../../../component/profile/Profile";
import play from '../../../media/image/icon/play.svg';
import {Anime} from "../../../component/anime/Anime";
import {
    getCategoryLabel,
    getText,
    TEXT_BATTLE, TEXT_BATTLE_OVER,
    TEXT_DRAW_CATEGORY,
    TEXT_DRAW_DIFFICULT,
    TEXT_QUESTION, TEXT_QUESTION_PREPARING, TEXT_THE_WINNER_IS, TEXT_WAIT
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

class BattlePageClosed extends React.PureComponent {

    render() {
        const {content, profile} = this.props;
        const {winnerTag} = content;
        const winner = winnerTag === profile.tag ? profile.name : content.opponent.name;
        return <div className='pageContent battlePageClosed'>
            <div className='pageHeader'>
                <div>
                    {getText(TEXT_BATTLE_OVER)}
                    {` ${getText(TEXT_THE_WINNER_IS)}: ${winner}`}
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
)(BattlePageClosed);
