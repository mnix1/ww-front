import React from 'react';
import {ObjectGroup} from "../../component/object-group/ObjectGroup";
import {Anime} from "../../component/anime/Anime";
import PropTypes from "prop-types";
import {calculateObjectDimension, objectFontSize} from "../../component/object-group/objectHelper";
import _ from 'lodash';
import {BLUE_COLOR, DARK_BLUE_COLOR} from "../../util/style/constant";

export default class TaskObjectGroup extends React.PureComponent {

    static propTypes = {
        questionObjects: PropTypes.array,
        answerObjects: PropTypes.array,
        screen: PropTypes.object,
        onObjectClick: PropTypes.func,
        anime: PropTypes.bool,
        contentHeightCalculator: PropTypes.func
    };

    static defaultProps = {
        questionObjects: [],
        answerObjects: [],
        anime: true,
        contentHeightCalculator: (screen) => {
            const {contentHeight, moreHeightThanWidth, isSmallHeight} = screen;
            return contentHeight / 10 * ((!moreHeightThanWidth && isSmallHeight) ? 7 : 8);
        }
    };

    rendererTransformerCreator = (o) => {
        const {screen, anime} = this.props;
        const {resolution} = screen;
        const fontSize = objectFontSize(resolution);
        if (!anime) {
            return (rendered) => <div key={o.id} style={{fontSize}}>{rendered}</div>;
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
        const {contentHeightCalculator, screen} = this.props;
        return contentHeightCalculator(screen);
    }

    questionHeight() {
        return this.contentHeight() * 13 / 48;
    }

    answerHeight() {
        return this.contentHeight() * 35 / 48;
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
            max: 400
        });
        return questionObjects.map(o => {
            const widthFactor = _.defaultTo(o.widthFactor, 1);
            const objectHeight = this.questionHeight();
            const top = o.yTarget * this.questionHeight() - objectHeight / 2;
            const left = o.xTarget * contentWidth - (questionObjectWidth * widthFactor) / 2;
            const background = _.defaultTo(o.background, DARK_BLUE_COLOR);
            return {
                rendererTransformer: this.rendererTransformerCreator(o),
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

    prepareAnswerObjects() {
        const {answerObjects, screen} = this.props;
        const {contentWidth, isSmallHeight, isSmallWidth} = screen;
        const answerObjectWidth = calculateObjectDimension({
            dim: contentWidth,
            count: Math.ceil((answerObjects.length) / (screen.moreHeightThanWidth ? 4 : 2)),
            max: isSmallWidth ? 150 : 200
        });
        return answerObjects.map(o => {
            const objectHeight = calculateObjectDimension({
                dim: this.answerHeight(),
                count: Math.ceil((answerObjects.length) / (screen.moreHeightThanWidth ? 2 : 4)),
                min: 40,
                max: isSmallHeight ? 90 : 100
            }) * _.defaultTo(o.heightFactor, 1);
            const top = o.yTarget * this.answerHeight() - objectHeight / 2;
            const left = o.xTarget * contentWidth - answerObjectWidth / 2;
            const background = _.get(o, 'material.background', BLUE_COLOR);
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
