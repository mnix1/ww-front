import React from 'react';
import _ from 'lodash';
import './styles.css';
import PropTypes from "prop-types";
import {CREAME_COLOR, DARK_BLUE_COLOR} from "../../util/style/constant";

export class ObjectGroup extends React.PureComponent {

    static propTypes = {
        height: PropTypes.number,
        width: PropTypes.number,
        objects: PropTypes.array,
        onObjectClick: PropTypes.func,
        onObjectMouseOver: PropTypes.func,
        onObjectMouseOut: PropTypes.func,
        objectContainerClassName: PropTypes.string,
        objectContentClassName: PropTypes.string,
        objectStyle: PropTypes.object,
    };

    static defaultProps = {
        objects: [],
        onObjectClick: _.noop,
        onObjectMouseOver: _.noop,
        onObjectMouseOut: _.noop,
        objectContainerClassName: 'objectContainer',
        objectContentClassName: 'objectContent',
        objectStyle: {
            backgroundColor: CREAME_COLOR,
            color: DARK_BLUE_COLOR,
            // border: '1px solid rgb(165, 169, 165)',
            // boxShadow: '0 0 4px #444',
            borderRadius: 8
        },
    };

    prepareObjects() {
        const {
            objects, onObjectClick, onObjectMouseOver, onObjectMouseOut, objectStyle,
            objectContainerClassName, objectContentClassName
        } = this.props;
        return objects.map((e, i) => {
            return {
                id: i,
                rendererTransformer: (t) => t,
                onClick: () => onObjectClick(e),
                onMouseOver: () => onObjectMouseOver(e),
                onMouseOut: () => onObjectMouseOut(e),
                containerClassName: objectContainerClassName,
                contentClassName: objectContentClassName,
                style: {..._.defaultTo(e.objectStyle, objectStyle), ...e.additionalStyle},
                ...e,
            }
        });
    }

    renderObject(o, i) {
        return <div
            key={o.id}
            className={o.containerClassName}
            style={o.style}
            onClick={o.onClick}
            onMouseOver={o.onMouseOver}
            onMouseOut={o.onMouseOut}
        >
            <div className={o.contentClassName}>{o.content}</div>
        </div>;
    }

    renderObjects() {
        return this.prepareObjects().map((object, i) => object.rendererTransformer(this.renderObject(object, i)));
    }

    render() {
        const {height, width} = this.props;
        return <div className='objectGroup' style={{height, width}}>
            {this.renderObjects()}
        </div>
    }
}
