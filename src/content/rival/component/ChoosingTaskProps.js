import React from 'react';
import {getText, TEXT_ACCEPT, TEXT_CHOOSE_CATEGORY, TEXT_CHOOSE_DIFFICULT, TEXT_TIME} from "../../../lang/langText";
import {
    OBJECTS_CATEGORY,
    OBJECTS_CATEGORY_HEIGHT_WITH_RANDOM,
    OBJECTS_CATEGORY_WIDTH_WITH_RANDOM
} from "../../object-group/objectsCategory";
import SimpleObjectGroup from "../../object-group/SimpleObjectGroup";
import Timer from "../../../component/timer/Timer";
import Rating from "../../../component/rating/Rating";
import {Button, BUTTON_MATERIAL_BOX_SHADOW} from "../../../component/button/Button";
import {prepareRatingPointsMessage} from "../../../util/textHelper";
import {NAME_TO_POINTS} from "../../../util/difficultyHelper";
import {TiInputChecked} from "react-icons/ti";

export default class ChoosingTaskProps extends React.PureComponent {

    static defaultProps = {
        renderPoints: true
    };

    renderChooseDifficult() {
        const {content, onDifficultLevelChange, onDifficultLevelAcceptChange, communication, rivalType, renderPoints} = this.props;
        return <div className='justifyCenter flexColumn'>
            <div className='justifyCenter marginRem'>
                <Rating onChange={onDifficultLevelChange} valueString={content.chosenDifficulty}/>
                {renderPoints && <div
                    className='justifyCenter flexColumn'>&nbsp;{prepareRatingPointsMessage(NAME_TO_POINTS[content.chosenDifficulty])}</div>}
            </div>
            <div className='justifyCenter marginRem'>
                <Button
                    icon={<TiInputChecked/>}
                    onClick={() => {
                        communication.sendChosenDifficulty(rivalType, content.chosenDifficulty);
                        onDifficultLevelAcceptChange(true);
                    }} material={BUTTON_MATERIAL_BOX_SHADOW}>{getText(TEXT_ACCEPT)}</Button>
            </div>
        </div>;
    }

    renderChooseCategory() {
        const {screen, content, communication, rivalType, onCategoryChange} = this.props;
        const objects = screen.moreHeightThanWidth ? OBJECTS_CATEGORY_HEIGHT_WITH_RANDOM : OBJECTS_CATEGORY_WIDTH_WITH_RANDOM;
        return <SimpleObjectGroup
            setHeight={false}
            objects={objects}
            selectedId={content.chosenCategory}
            onObjectClick={(categoryObject) => {
                communication.sendChosenCategory(rivalType, categoryObject.id);
                onCategoryChange(categoryObject);
            }}
            screen={screen}
        />
    }

    render() {
        const {content} = this.props;
        return <div>
            <div className='pageHeader'>
                <span>{`${getText(TEXT_TIME)}: `}<Timer from={content.choosingTaskPropsInterval}/></span>
            </div>
            {!content.isChosenDifficulty && <div className='pageHeader'>
                <div>{getText(TEXT_CHOOSE_DIFFICULT)}</div>
                {this.renderChooseDifficult()}
            </div>}
            {!content.isChosenCategory && content.isChosenDifficulty && <div className='pageHeader'>
                <div>{getText(TEXT_CHOOSE_CATEGORY)}</div>
                {this.renderChooseCategory()}
            </div>}
        </div>;
    }
}