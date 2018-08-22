import React from 'react';
import {connect} from 'react-redux';
import {getText, TEXT_CHOOSE_CATEGORY, TEXT_CHOOSE_DIFFICULT, TEXT_TIME} from "../../../../lang";
import {OBJECTS_CATEGORY} from "../../../object-group/objectsCategory";
import SimpleObjectGroup from "../../../object-group/SimpleObjectGroup";
import {categoryChanged, difficultLevelChanged} from "../../../../redux/reducer/battle";
import seal from '../../../../media/image/icon/seal.svg';
import Timer from "../../../../component/timer/Timer";
import Rating from "../../../../component/rating/Rating";
import {DIFFICULT_LEVEL_TO_NAME} from "../../../../util/difficultyHelper";

class ChoosingTaskProps extends React.PureComponent {

    renderChooseCategory() {
        const {screen, category, onCategoryChange} = this.props;
        return <SimpleObjectGroup
            objects={OBJECTS_CATEGORY}
            selectedId={category}
            onObjectClick={onCategoryChange}
            screen={{...screen, contentHeight: screen.contentHeight - 100}}
        />
    }

    renderChooseDifficult() {
        const {onDifficultLevelChange, difficultyLevel} = this.props;
        return <div className='justifyCenter'><Rating onChange={onDifficultLevelChange} valueString={difficultyLevel}/></div>;
    }

    renderHorizontally() {
        const {content, communication, category, difficultyLevel} = this.props;
        return <div>
            <div className='choosingTaskProps'>
                <div>
                    <div>{getText(TEXT_CHOOSE_DIFFICULT)}</div>
                    {this.renderChooseDifficult()}
                </div>
                <div className='timeWithSeal'>
                    <span className='time'>{`${getText(TEXT_TIME)}: `}<Timer from={content.choosingTaskPropsInterval}/></span>
                    <img alt='' className='seal' src={seal} height={30} onClick={() => {
                        communication.send('BATTLE_CHOOSE_TASK_PROPS' + JSON.stringify({category, difficultyLevel}))
                    }}/>
                </div>
            </div>
            <div className='pageHeader'>
                <div>{getText(TEXT_CHOOSE_CATEGORY)}</div>
                {this.renderChooseCategory()}
            </div>
        </div>;
    }


    renderVertically() {
        const {content, communication, category, difficultyLevel} = this.props;
        return <div>
            <div className='pageHeader'>
                <span>{`${getText(TEXT_TIME)}: `}<Timer from={content.choosingTaskPropsInterval}/></span>
                <img alt='' className='seal' src={seal} height={30} onClick={() => {
                    communication.send('BATTLE_CHOOSE_TASK_PROPS' + JSON.stringify({category, difficultyLevel}))
                }}/>
            </div>
            <div className='pageHeader'>
                <div>{getText(TEXT_CHOOSE_DIFFICULT)}</div>
                {this.renderChooseDifficult()}
            </div>
            <div className='pageHeader'>
                <div>{getText(TEXT_CHOOSE_CATEGORY)}</div>
                {this.renderChooseCategory()}
            </div>
        </div>;
    }

    render() {
        const {screen} = this.props;
        if (screen.moreHeightThanWidth) {
            return this.renderVertically();
        }
        return this.renderHorizontally();
    }
}

export default connect(
    (state) => ({
        screen: state.screen,
        content: state.battle.content,
        category: state.battle.category,
        difficultyLevel: state.battle.difficultyLevel,
    }),
    (dispatch) => ({
        onCategoryChange: (categoryObject) => dispatch(categoryChanged(categoryObject.id)),
        onDifficultLevelChange: (id) => dispatch(difficultLevelChanged(DIFFICULT_LEVEL_TO_NAME[id]))
    })
)(ChoosingTaskProps);
