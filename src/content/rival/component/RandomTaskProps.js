import React from 'react';
import {connect} from 'react-redux';
import {Anime} from "../../../component/anime/Anime";
import {getText, TEXT_DRAW_CATEGORY, TEXT_DRAW_DIFFICULT} from "../../../lang/langText";
import {OBJECTS_CATEGORY_CIRCLE} from "../../object-group/objectsCategory";
import SimpleObjectGroup from "../../object-group/SimpleObjectGroup";
import _ from 'lodash';
import Rating from "../../../component/rating/Rating";
import {DIFFICULTY_LEVELS, NAME_TO_DIFFICULT_LEVEL} from "../../../util/difficultyHelper";

class RandomTaskProps extends React.PureComponent {

    renderRandomCategory() {
        const objectsCategory = _.shuffle(OBJECTS_CATEGORY_CIRCLE);
        const {screen, content} = this.props;
        const targetCategory = content.task.category;
        const targetSelectedIdValue = objectsCategory.length * 3;
        return <Anime
            targetAsChildProp={null}
            targetTransformer={(t) => ({selectedId: targetSelectedIdValue <= t.selectedId ? targetCategory : objectsCategory[Math.floor((t.selectedId) % objectsCategory.length)].id})}
            from={{selectedId: 0}}
            to={{selectedId: {value: targetSelectedIdValue * 1.5, duration: 1500, delay: 500}}}>
            <SimpleObjectGroup
                objects={objectsCategory}
                screen={{...screen, contentHeight: screen.isSmallHeight ? screen.height - 70 : screen.contentHeight - 70}}
            />
        </Anime>;
    }

    renderRandomDifficult() {
        const {content} = this.props;
        const objectsDifficult = DIFFICULTY_LEVELS;
        const targetDifficult = NAME_TO_DIFFICULT_LEVEL[content.task.difficultyLevel];
        const targetSelectedIdValue = objectsDifficult.length * 3;
        return <Anime
            targetAsChildProp={null}
            targetTransformer={(t) => ({value: targetSelectedIdValue <= t.value ? targetDifficult : objectsDifficult[Math.floor((t.value) % objectsDifficult.length)]})}
            from={{value: 0}}
            to={{value: {value: targetSelectedIdValue * 1.5, duration: 1500, delay: 500}}}>
            {<Rating/>}
        </Anime>;
    }

    render() {
        const {className} = this.props;
        return <div className={className}>
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
    }),
    (dispatch) => ({})
)(RandomTaskProps);
