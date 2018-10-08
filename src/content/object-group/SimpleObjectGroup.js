import React from 'react';
import {getCategoryLabel} from "../../lang/langCategory";
import {ObjectGroup} from "../../component/object-group/ObjectGroup";
import PropTypes from "prop-types";
import {objectFontSize} from "../../component/object-group/objectHelper";
import './styles.css';
import {remToPixels} from "../../util/fontHelper";

export default class SimpleObjectGroup extends React.PureComponent {

    static propTypes = {
        objects: PropTypes.array,
        screen: PropTypes.object,
        onObjectClick: PropTypes.func,
        selectedId: PropTypes.string,
        setHeight: PropTypes.bool,
        style: PropTypes.object,
    };

    static defaultProps = {
        setHeight: true,
    };

    render() {
        const {objects, onObjectClick, screen, setHeight, selectedId} = this.props;
        const objectWidth = screen.wisieImgHeight;
        const objectHeight = screen.wisieImgHeight;
        const {contentHeight, contentWidth, resolution} = screen;
        const fontSize = objectFontSize(resolution);
        return <ObjectGroup
            height={setHeight ? contentHeight : 'auto'}
            width={contentWidth}
            onObjectClick={onObjectClick}
            objects={objects.map(o => {
                const top = o.yTarget * contentHeight - objectHeight / 2;
                const left = o.xTarget * contentWidth - objectWidth / 2;
                let objectStyle = {
                    height: objectHeight,
                    width: objectWidth,
                    top,
                    left,
                    fontSize,
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
                        <span style={{zIndex: 1}}>{getCategoryLabel([o.id])}</span>
                        <img alt='' src={o.imgSrc} height={objectHeight - remToPixels(2)}/>
                    </div>,
                    objectStyle
                }
            })}
        />
    }
}
