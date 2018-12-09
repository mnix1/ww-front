import React from 'react';
import {getCategoryLabel} from "../../lang/langCategory";
import {ObjectGroup} from "../../component/object-group/ObjectGroup";
import PropTypes from "prop-types";
import './styles.css';

export default class SimpleObjectGroup extends React.PureComponent {

    static propTypes = {
        objects: PropTypes.array,
        screen: PropTypes.object,
        remOffsetHeight: PropTypes.number,
        onObjectClick: PropTypes.func,
        selectedId: PropTypes.string,
        setHeight: PropTypes.bool,
        style: PropTypes.object,
    };

    static defaultProps = {
        setHeight: true,
        remOffsetHeight: 0,
    };

    render() {
        const {objects, onObjectClick, screen, setHeight, selectedId, remOffsetHeight} = this.props;
        const {contentHeight, fontSizeRem, contentWidth} = screen;
        const objectWidth = screen.rivalImgHeight + fontSizeRem;
        const objectHeight = screen.rivalImgHeight + fontSizeRem;
        const height = contentHeight - remOffsetHeight * fontSizeRem;
        return <ObjectGroup
            height={setHeight ? height: 'auto'}
            width={contentWidth}
            onObjectClick={onObjectClick}
            objects={objects.map(o => {
                const top = o.yTarget * height - objectHeight / 2;
                const left = o.xTarget * contentWidth - objectWidth / 2;
                let objectStyle = {
                    height: objectHeight,
                    width: objectWidth,
                    top,
                    left,
                };
                if (selectedId === o.id) {
                    objectStyle = {
                        ...objectStyle,
                        borderRadius: '0.5rem',
                        boxShadow: `0 0 4px #cccccc`,
                    };
                }
                return {
                    ...o,
                    content: <div className='justifyCenter flexColumn'>
                        <span className='fontSize08Rem justifyCenter'>{getCategoryLabel([o.id])}</span>
                        <img draggable="false" alt='' src={o.imgSrc} height={objectHeight - 2 * fontSizeRem}/>
                    </div>,
                    objectStyle
                }
            })}
        />
    }
}
