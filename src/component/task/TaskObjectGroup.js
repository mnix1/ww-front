import React from 'react';
import {ObjectGroup} from "../../component/object-group/ObjectGroup";
import {Anime} from "../../component/anime/Anime";
import PropTypes from "prop-types";
import {calculateObjectDimension, objectFontSize} from "../../component/object-group/objectHelper";
import _ from 'lodash';

export default class TaskObjectGroup extends React.PureComponent {

    static propTypes = {
        objects: PropTypes.array,
        screen: PropTypes.object,
        onObjectClick: PropTypes.func
    };

    render() {
        const {objects, onObjectClick, screen} = this.props;
        const answerObjectWidth = calculateObjectDimension({dim: screen.contentWidth, count: (objects.length) / 1.5});
        const questionObjectWidth = calculateObjectDimension({dim: screen.contentWidth, count: 0.5, max: 400});
        const {contentHeight, contentWidth, resolution} = screen;
        const fontSize = objectFontSize(resolution);
        const rendererTransformerCreator = (o) => (rendered) => <Anime
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
        return <ObjectGroup
            height={contentHeight}
            width={contentWidth}
            onObjectClick={onObjectClick}
            objects={objects.map(o => {
                const objectWidth = (o.id === 'questionText' ? questionObjectWidth :
                    o.id === 'questionImage' ? questionObjectWidth / 3 : answerObjectWidth) * _.defaultTo(o.widthFactor, 1);
                const objectHeight = calculateObjectDimension({
                    dim: screen.contentHeight,
                    count: (objects.length) / 1.5,
                    min: 40
                }) * _.defaultTo(o.heightFactor, 1);
                const top = o.yTarget * contentHeight - objectHeight / 2;
                const left = o.xTarget * contentWidth - objectWidth / 2;
                return {
                    rendererTransformer: rendererTransformerCreator(o),
                    ...o,
                    additionalStyle: {
                        ...o.material,
                        border: o.border,
                        borderColor: o.borderColor,
                        boxShadow: o.material ? `0 0 4px #${_.get(o, 'material.isDark', true) ? 'CCC' : '666'}` : undefined,
                        top,
                        left,
                        height: objectHeight,
                        width: objectWidth,
                        ...o.additionalStyle
                    },
                }
            })}
        />
    }
}
