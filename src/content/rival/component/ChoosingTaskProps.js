import React from 'react';
import {getText, TEXT_ACCEPT, TEXT_CHOOSE_CATEGORY, TEXT_CHOOSE_DIFFICULT, TEXT_TIME} from "../../../lang/text";
import {OBJECTS_CATEGORY} from "../../object-group/objectsCategory";
import SimpleObjectGroup from "../../object-group/SimpleObjectGroup";
import Timer from "../../../component/timer/Timer";
import Rating from "../../../component/rating/Rating";
import {Button, BUTTON_MATERIAL_BOX_SHADOW} from "../../../component/button/Button";
import {prepareRatingPointsMessage} from "../../../util/textHelper";
import {NAME_TO_POINTS} from "../../../util/difficultyHelper";

export default class ChoosingTaskProps extends React.PureComponent {

    static defaultProps = {
        renderPoints: true
    };

    renderChooseDifficult() {
        const {content, onDifficultLevelChange, onDifficultLevelAcceptChange, communication, acceptMsg, renderPoints} = this.props;
        return <div className='justifyCenter flexColumn'>
            <div className='justifyCenter marginRem'>
                <Rating onChange={onDifficultLevelChange} valueString={content.chosenDifficulty}/>
                {renderPoints && <div className='justifyCenter flexColumn'>&nbsp;{prepareRatingPointsMessage(NAME_TO_POINTS[content.chosenDifficulty])}</div>}
            </div>
            <div className='justifyCenter marginRem'>
                <Button onClick={() => {
                    communication.send(acceptMsg + JSON.stringify({difficultyLevel: content.chosenDifficulty}));
                    onDifficultLevelAcceptChange(true);
                }} material={BUTTON_MATERIAL_BOX_SHADOW}>{getText(TEXT_ACCEPT)}</Button>
            </div>
            <div className='justifyCenter'>
            </div>
        </div>;
    }

    renderChooseCategory() {
        const {screen, content, communication, acceptMsg, onCategoryChange} = this.props;
        return <SimpleObjectGroup
            setHeight={false}
            objects={OBJECTS_CATEGORY}
            selectedId={content.chosenCategory}
            onObjectClick={(categoryObject) => {
                communication.send(acceptMsg + JSON.stringify({category: categoryObject.id}))
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