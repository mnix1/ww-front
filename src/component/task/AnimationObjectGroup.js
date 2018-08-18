import React from 'react';
import {ObjectGroup} from "../../component/object-group/ObjectGroup";
import {Anime} from "../../component/anime/Anime";
import PropTypes from "prop-types";
import {calculateObjectDimension, objectFontSize} from "../../component/object-group/objectHelper";
import _ from 'lodash';

export default class AnimationObjectGroup extends React.PureComponent {

    static propTypes = {
        questionObjects: PropTypes.array,
        animationObjects: PropTypes.array,
        screen: PropTypes.object,
        onObjectClick: PropTypes.func,
        anime: PropTypes.bool,
    };

    static defaultProps = {
        questionObjects: [],
        animationObjects: [],
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
        return this.contentHeight() / 6;
    }

    animationHeight() {
        return this.contentHeight() * 5 / 6;
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
            return {
                rendererTransformer: this.rendererTransformerCreator(o),
                ...o,
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
        const {animationObjects, screen} = this.props;
        const {contentWidth} = screen;
        const animationObjectWidth = calculateObjectDimension({dim: contentWidth, count: animationObjects.length});
        return animationObjects.map(o => {
            const objectHeight = calculateObjectDimension({
                dim: this.animationHeight(),
                count: (animationObjects.length) / 1.5,
                min: 40
            }) * _.defaultTo(o.heightFactor, 1);
            const top = o.yTarget * this.animationHeight() - objectHeight / 2 - 20;
            const left = o.xTarget * contentWidth - animationObjectWidth / 2;
            return {
                rendererTransformer: this.rendererTransformerCreator(o),
                ...o,
                objectStyle: {
                    background: null,
                    height: objectHeight,
                    width: animationObjectWidth,
                    top,
                    left,
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
                height={this.animationHeight()}
                width={contentWidth}
                onObjectClick={onObjectClick}
                objects={this.prepareAnswerObjects()}
            />
        </div>;
    }
}
