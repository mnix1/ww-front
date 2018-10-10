import React from 'react';
import {ObjectGroup} from "../../component/object-group/ObjectGroup";
import PropTypes from "prop-types";
import {calculateObjectDimension} from "../../component/object-group/objectHelper";
import _ from 'lodash';
import {BLUE_COLOR, DARK_BLUE_COLOR} from "../../util/style/constant";

export default class TaskObjectGroup extends React.PureComponent {

    static propTypes = {
        questionObjects: PropTypes.array,
        answerObjects: PropTypes.array,
        screen: PropTypes.object,
        onObjectClick: PropTypes.func,
        contentHeightCalculator: PropTypes.func
    };

    static defaultProps = {
        questionObjects: [],
        answerObjects: [],
    };

    contentHeight() {
        const {contentHeightCalculator, screen} = this.props;
        return contentHeightCalculator(screen);
    }

    questionHeight() {
        const {screen} = this.props;
        if (screen.verticalOrientation) {
            return this.contentHeight() * 13 / 48;
        }
        return this.contentHeight() * 17 / 48;
    }

    answerHeight() {
        const {screen} = this.props;
        if (screen.verticalOrientation) {
            return this.contentHeight() * 35 / 48;
        }
        return this.contentHeight() * 31 / 48;
    }

    prepareContent(e, background) {
        return <div className='groupObjectContainer'>
            <div className='groupObjectBackground' style={{background}}/>
            {e.content && <div className='groupObjectContent'>{e.content}</div>}
            {e.contentHtml && <div className='groupObjectContent' dangerouslySetInnerHTML={{__html: e.contentHtml}}/>}
        </div>;
    }

    prepareQuestionObjects() {
        const {questionObjects, screen} = this.props;
        const {contentWidth} = screen;
        const questionObjectWidth = calculateObjectDimension({
            dim: contentWidth,
            count: questionObjects.length,
        });
        return questionObjects.map(o => {
            const widthFactor = _.defaultTo(o.widthFactor, 1);
            const objectHeight = this.questionHeight();
            const top = o.yTarget * this.questionHeight() - objectHeight / 2;
            const left = o.xTarget * contentWidth - (questionObjectWidth * widthFactor) / 2;
            const background = _.defaultTo(o.background, DARK_BLUE_COLOR);
            return {
                ...o,
                content: this.prepareContent(o, background),
                objectStyle: {
                    background: null,
                    height: objectHeight,
                    width: questionObjectWidth * widthFactor,
                    top,
                    left,
                    borderRadius: '0.5rem',
                }
            }
        });
    }

    prepareCount(forWidth) {
        const {answerObjects, screen} = this.props;
        const screenFactor = forWidth
            ? (screen.verticalOrientation ? 4 : 2)
            : (screen.verticalOrientation ? 2 : 4);
        return Math.ceil(Math.max(answerObjects.length, 5) / screenFactor);
    }

    prepareAnswerObjects() {
        const {answerObjects, screen} = this.props;
        const {contentWidth} = screen;
        const answerObjectWidth = calculateObjectDimension({
            dim: contentWidth,
            count: this.prepareCount(true),
        });
        return answerObjects.map(o => {
            const objectHeight = calculateObjectDimension({
                dim: this.answerHeight(),
                count: this.prepareCount(false),
            }) * _.defaultTo(o.heightFactor, 1);
            const top = o.yTarget * this.answerHeight() - objectHeight / 2;
            const left = o.xTarget * contentWidth - answerObjectWidth / 2;
            const background = _.get(o, 'material.background', BLUE_COLOR);
            return {
                ...o,
                content: this.prepareContent(o, background),
                objectStyle: {
                    border: o.border,
                    borderColor: o.borderColor,
                    background: null,
                    height: objectHeight,
                    width: answerObjectWidth,
                    top,
                    left,
                    borderRadius: '0.5rem',
                }
            }
        });
    }

    render() {
        const {onObjectClick, screen} = this.props;
        const {contentWidth} = screen;
        return <div>
            <ObjectGroup
                height={this.questionHeight()}
                width={contentWidth}
                onObjectClick={onObjectClick}
                objects={this.prepareQuestionObjects()}
            />
            <ObjectGroup
                height={this.answerHeight()}
                width={contentWidth}
                onObjectClick={onObjectClick}
                objects={this.prepareAnswerObjects()}
            />
        </div>;
    }
}
