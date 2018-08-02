import React from 'react';
import {getObjectLabel} from "../../lang";
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
        const objectHeight = calculateObjectDimension({dim: screen.contentHeight, count: (objects.length) / 1.5, min: 60});
        const objectWidth = calculateObjectDimension({dim: screen.contentWidth, count: (objects.length) / 1.5});
        const {contentHeight, contentWidth, resolution} = screen;
        const fontSize = objectFontSize(resolution);
        const rendererTransformerCreator = (o, top, left) => (rendered) => <Anime
            key={o.id}
            from={{
                width: 0,
                fontSize: 0
            }}
            to={{
                width: {value: objectWidth, duration: 100},
                fontSize: {value: fontSize, duration: 100, delay: 100}
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
                    content: getObjectLabel([o.id]),
                    rendererTransformer: rendererTransformerCreator(o, top, left),
                    additionalStyle: {
                        ...o.material,
                        height: objectHeight,
                        top,
                        left,
                        boxShadow: `0 0 4px #${o.material.isDark ? 'CCC' : '666'}`,
                    }
                }
            })}
        />
    }
}
