import React from 'react';
import {getCategoryLabel} from "../../lang";
import {ObjectGroup} from "../../component/object-group/ObjectGroup";
import {Anime} from "../../component/anime/Anime";
import PropTypes from "prop-types";
import {calculateObjectDimension, objectFontSize} from "../../component/object-group/objectHelper";
import './styles.css';

export default class SimpleObjectGroup extends React.PureComponent {

    static propTypes = {
        objects: PropTypes.array,
        screen: PropTypes.object,
        onObjectClick: PropTypes.func
    };

    render() {
        const {objects, onObjectClick, screen} = this.props;
        const objectHeight = calculateObjectDimension({
            dim: screen.contentHeight,
            count: (objects.length) / 1.5,
            min: 60
        });
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
                    content: <div className='simpleGroupObject'>
                        <div className='simpleGroupObjectBackground'/>
                        <div className='simpleGroupObjectContent'><img src={o.imgSrc}
                                                                       height={objectHeight / 2}/><span>{getCategoryLabel([o.id])}</span>
                        </div>
                    </div>,
                    rendererTransformer: rendererTransformerCreator(o, top, left),
                    objectStyle: {
                        padding: 0,
                        background: null,
                        height: objectHeight,
                        top,
                        left,
                        borderRadius: '0.5rem',
                        boxShadow: `0 0 4px #cccccc`,
                    }
                }
            })}
        />
    }
}
