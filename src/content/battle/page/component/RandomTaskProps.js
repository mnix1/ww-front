import React from 'react';
import {connect} from 'react-redux';
import {Anime} from "../../../../component/anime/Anime";
import {getText, TEXT_DRAW_CATEGORY, TEXT_DRAW_DIFFICULT} from "../../../../lang";
import {OBJECTS_CATEGORY} from "../../../object-group/objectsCategory";
import SimpleObjectGroup from "../../../object-group/SimpleObjectGroup";
import {CATEGORY_RANDOM} from "../../../../util/categoryHelper";
import _ from 'lodash';
import {STARS_DIFFICULTY_LEVEL} from "../../../../util/taskDifficultyLevel";
import DifficultLevelStars from "../../../../component/difficult/DifficultLevelStars";

class RandomTaskProps extends React.PureComponent {

    renderRandomCategory() {
        const objectsCategory = _.shuffle(OBJECTS_CATEGORY.filter(e => e.id !== CATEGORY_RANDOM));
        const {screen, content} = this.props;
        const targetCategory = content.task.category;
        const targetSelectedIdValue = objectsCategory.length * 6;
        return <Anime
            targetAsChildProp={null}
            targetTransformer={(t) => ({selectedId: targetSelectedIdValue <= t.selectedId ? targetCategory : objectsCategory[Math.floor((t.selectedId) % objectsCategory.length)].id})}
            from={{selectedId: 0}}
            to={{selectedId: {value: targetSelectedIdValue * 1.5, duration: 5000, delay: 1000}}}>
            <SimpleObjectGroup
                objects={objectsCategory}
                screen={{...screen, contentHeight: screen.contentHeight - 70}}
            />
        </Anime>;
    }

    renderRandomDifficult() {
        const {content} = this.props;
        const objectsDifficult = _.keys(STARS_DIFFICULTY_LEVEL);
        const targetDifficult = content.task.taskDifficultyLevel;
        const targetSelectedIdValue = objectsDifficult.length * 6;
        return <Anime
            targetAsChildProp={null}
            targetTransformer={(t) => ({selectedId: targetSelectedIdValue <= t.selectedId ? targetDifficult : objectsDifficult[Math.floor((t.selectedId) % objectsDifficult.length)]})}
            from={{selectedId: 0}}
            to={{selectedId: {value: targetSelectedIdValue * 1.5, duration: 5000, delay: 0}}}>
            {<DifficultLevelStars/>}
        </Anime>;
    }

    render() {
        return <div>
            {this.props.children}
            <div className='pageHeader'>
                <div>{getText(TEXT_DRAW_DIFFICULT)}</div>
                {this.renderRandomDifficult()}
            </div>
            <div className='pageHeader'>
                <div>{getText(TEXT_DRAW_CATEGORY)}</div>
                {this.renderRandomCategory()}
            </div>
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
)(RandomTaskProps);
