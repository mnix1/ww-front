import React from 'react';
import {getTileLabel} from "../../lang";
import {ObjectGroup} from "../../component/object-group/ObjectGroup";
import {Anime} from "../../component/anime/Anime";
import PropTypes from "prop-types";
import {objectFontSize} from "../../component/object-group/objectHelper";
import {calculateObjectDimension} from "../../component/object-group/objectHelper";

export default class SimpleObjectGroup extends React.PureComponent {

    static propTypes = {
        objects: PropTypes.array,
        screen: PropTypes.object,
        onObjectClick: PropTypes.func
    };

    render() {
        const {objects, onObjectClick, screen} = this.props;
        const objectWidth = calculateObjectDimension({dim: screen.contentWidth, count: (objects.length) / 1.5});
        const objectHeight = calculateObjectDimension({dim: screen.contentHeight, count: (objects.length) / 1.5, min: 60});
        const {contentHeight, contentWidth, resolution} = screen;
        const fontSize = objectFontSize(resolution);
        const rendererTransformerCreator = (o, top, left) => (rendered) => <Anime
            key={o.id}
            from={{
                top: top - contentHeight / 2 < 0 ? 0 : contentHeight - objectHeight,
                left: left - contentWidth / 2 < 0 ? 0 : contentWidth - objectWidth,
                height: 0,
                width: 0,
                fontSize: 0
            }}
            to={{
                top: {value: top, duration: 500, delay: 1000},
                left: {value: left, duration: 500, delay: 1000},
                height: {value: objectHeight, duration: 500},
                width: {value: objectWidth, duration: 500},
                fontSize: {value: fontSize, duration: 500, delay: 500}
            }}
        >{rendered}</Anime>;
        return <ObjectGroup
            height={contentHeight}
            width={contentWidth}
            onObjectClick={onObjectClick}
            objects={objects.map(o => {
                const top = o.yTarget * contentHeight - objectHeight / 2;
                const left = o.xTarget * contentWidth - objectWidth / 2;
                return {
                    ...o,
                    content: getTileLabel([o.id]),
                    rendererTransformer: rendererTransformerCreator(o, top, left),
                    additionalStyle: {
                        ...o.material,
                        boxShadow: `0 0 4px #${o.material.isDark ? 'CCC' : '666'}`,
                        lineHeight: `${objectHeight}px`
                    }
                }
            })}
        />
    }
}
