import React from 'react';
import {ObjectGroup} from "../../component/object-group/ObjectGroup";
import {Anime} from "../../component/anime/Anime";
import PropTypes from "prop-types";
import {calculateObjectDimension, objectFontSize} from "../../component/object-group/objectHelper";
import _ from 'lodash';
import {DARK_BLUE_COLOR, LIGHT_BLUE_COLOR} from "../../util/style/constant";

export default class TaskObjectGroup extends React.PureComponent {

    static propTypes = {
        questionObjects: PropTypes.array,
        answerObjects: PropTypes.array,
        screen: PropTypes.object,
        onObjectClick: PropTypes.func,
        anime: PropTypes.bool,
    };

    static defaultProps = {
        questionObjects: [],
        answerObjects: [],
        anime: true,
    };

    rendererTransformerCreator = (o) => {
        const {screen, anime} = this.props;
        const {resolution} = screen;
        const fontSize = objectFontSize(resolution);
        if (!anime) {
            return (rendered) => <div style={{fontSize}}>{rendered}</div>;
        }
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
        const {contentHeight, moreHeightThanWidth, isSmallHeight} = screen;
        return contentHeight / 10 * ((!moreHeightThanWidth && isSmallHeight) ? 7 : 8)
    }

    questionHeight() {
        return this.contentHeight() / 4;
    }

    answerHeight() {
        return this.contentHeight() * 3 / 4;
    }

    prepareContent(e, background) {
        return <div className='groupObjectContainer'>
            <div className='groupObjectBackground' style={{background}}/>
            {e.content && <div className='groupObjectContent'>{e.content}</div>}
            {e.contentHTML && <div className='groupObjectContent' dangerouslySetInnerHTML={{__html: e.contentHTML}}/>}
        </div>;
    }

    prepareQuestionObjects() {
        const {questionObjects, screen} = this.props;
        const {contentWidth} = screen;
        const questionObjectWidth = calculateObjectDimension({
            dim: contentWidth,
            count: questionObjects.length,
            max: 400
        });
        return questionObjects.map(o => {
            const objectHeight = this.questionHeight();
            const top = o.yTarget * this.questionHeight() - objectHeight / 2;
            const left = o.xTarget * contentWidth - questionObjectWidth / 2;
            const background = DARK_BLUE_COLOR;
            return {
                rendererTransformer: this.rendererTransformerCreator(o),
                ...o,
                content: this.prepareContent(o, background),
                objectStyle: {
                    background: null,
                    height: objectHeight,
                    width: questionObjectWidth,
                    top,
                    left,
                    borderRadius: '0.5rem',
                }
            }
        });
    }

    prepareAnswerObjects() {
        const {answerObjects, screen} = this.props;
        const {contentWidth, isSmallHeight, isSmallWidth} = screen;
        const factorHeight = isSmallHeight ? 1 : 1.5;
        const factorWidth = isSmallWidth ? 1 : 1.2;
        const answerObjectWidth = calculateObjectDimension({
            dim: contentWidth,
            count: (answerObjects.length) / factorWidth
        });
        return answerObjects.map(o => {
            const objectHeight = calculateObjectDimension({
                dim: this.answerHeight(),
                count: (answerObjects.length) / factorHeight,
                min: 40
            }) * _.defaultTo(o.heightFactor, 1);
            const top = o.yTarget * this.answerHeight() - objectHeight / 2;
            const left = o.xTarget * contentWidth - answerObjectWidth / 2;
            const background = _.get(o, 'material.background', LIGHT_BLUE_COLOR);
            return {
                rendererTransformer: this.rendererTransformerCreator(o),
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
                    boxShadow: `0 0 4px #444`,
                }
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
