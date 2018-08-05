import React from 'react';
import {ObjectGroup} from "../../component/object-group/ObjectGroup";
import {Anime} from "../../component/anime/Anime";
import PropTypes from "prop-types";
import {calculateObjectDimension, objectFontSize} from "../../component/object-group/objectHelper";
import _ from 'lodash';

export default class TaskObjectGroup extends React.PureComponent {

    static propTypes = {
        questionObjects: PropTypes.array,
        answerObjects: PropTypes.array,
        screen: PropTypes.object,
        onObjectClick: PropTypes.func
    };

    static defaultProps = {
        questionObjects: [],
        answerObjects: [],
    };

    rendererTransformerCreator = (o) => {
        const {screen} = this.props;
        const {resolution} = screen;
        const fontSize = objectFontSize(resolution);
        return (rendered) => <Anime
            key={o.id}
            from={{
                opacity: 0,
                fontSize: 0
            }}
            to={{
                opacity: {value: 1, duration: 500},
                fontSize: {value: fontSize, duration: 100, delay: 100}
            }}
        >{rendered}</Anime>;
    };

    contentHeight() {
        const {screen} = this.props;
        const {contentHeight} = screen;
        return contentHeight / 10 * 8
    }

    questionHeight() {

        return this.contentHeight() / 4;
    }

    answerHeight() {
        return this.contentHeight() * 3 / 4;
    }

    prepareQuestionObjects() {
        const {questionObjects, screen} = this.props;
        const {contentWidth} = screen;
        const questionObjectWidth = calculateObjectDimension({dim: contentWidth, count: questionObjects.length, max: 400});
        return questionObjects.map(o => {
            const objectHeight = this.questionHeight();
            const top = o.yTarget * this.questionHeight() - objectHeight / 2;
            const left = o.xTarget * contentWidth - questionObjectWidth / 2;
            return {
                rendererTransformer: this.rendererTransformerCreator(o),
                ...o,
                additionalStyle: {
                    ...o.material,
                    border: o.border,
                    borderColor: o.borderColor,
                    boxShadow: o.material ? `0 0 4px #${_.get(o, 'material.isDark', true) ? 'CCC' : '666'}` : undefined,
                    top,
                    left,
                    height: objectHeight,
                    width: questionObjectWidth,
                    ...o.additionalStyle
                },
            }
        });
    }

    prepareAnswerObjects() {
        const {answerObjects, screen} = this.props;
        const {contentWidth} = screen;
        const answerObjectWidth = calculateObjectDimension({dim: contentWidth, count: (answerObjects.length) / 1.5});
        return answerObjects.map(o => {
            const objectHeight = calculateObjectDimension({
                dim: this.answerHeight(),
                count: (answerObjects.length) / 1.5,
                min: 40
            }) * _.defaultTo(o.heightFactor, 1);
            const top = o.yTarget * this.answerHeight() - objectHeight / 2;
            const left = o.xTarget * contentWidth - answerObjectWidth / 2;
            return {
                rendererTransformer: this.rendererTransformerCreator(o),
                ...o,
                additionalStyle: {
                    ...o.material,
                    border: o.border,
                    borderColor: o.borderColor,
                    boxShadow: o.material ? `0 0 4px #${_.get(o, 'material.isDark', true) ? 'CCC' : '666'}` : undefined,
                    top,
                    left,
                    height: objectHeight,
                    width: answerObjectWidth,
                    ...o.additionalStyle
                },
            }
        });
    }

    render() {
        const {onObjectClick, screen} = this.props;
        const {contentHeight, contentWidth} = screen;
        return <div>
            <ObjectGroup
                // objectContainerClassName=''
                height={this.questionHeight()}
                width={contentWidth}
                onObjectClick={onObjectClick}
                objects={this.prepareQuestionObjects()}
            />
            <ObjectGroup
                // objectContainerClassName=''
                height={this.answerHeight()}
                width={contentWidth}
                onObjectClick={onObjectClick}
                objects={this.prepareAnswerObjects()}
            />
        </div>;
    }
}
