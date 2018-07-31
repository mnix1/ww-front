import {getAnimationContent} from "../../util/taskRenderer";
import _ from "lodash";
import React from 'react';
import {objectFontSize} from "../object-group/objectHelper";
import {getText, TEXT_CLICK_ON_ANY_TO_CONTINUE, TEXT_REMEMBER_DETAILS} from "../../lang";

export function prepareAnimationTiles(rival) {
    const {question, screen} = rival.props;
    const objects = JSON.parse(atob(getAnimationContent(question)));
    return objects.map((object, i) => {
        let imageData = atob(object.shape);
        imageData = imageData.replace('svg', `svg fill="${object.backgroundColor}"`);
        const content = <div style={{height: '100%', width: '100%'}}>
            <span style={{fontSize: objectFontSize(screen.resolution, 1, 18)}}>{object.key}</span>
            <img alt='' src={'data:image/svg+xml,' + imageData} height='100%' width='100%'/>
        </div>;
        return {
            onMouseOver: _.noop,
            onMouseOut: _.noop,
            id: object.key,
            objectStyle: {zIndex: 1},
            additionalStyle: {padding: '0'},
            content,
            yTarget: 0.6,
            xTarget: (i + 1) / (objects.length + 1),
            widthFactor: 0.7
        };
    }).concat([{
        id: 'desc',
        yTarget: 0.3,
        xTarget: 0.5,
        heightFactor: 0.5,
        widthFactor: 1.1,
        content: <div className="taskDescription">
            {getText(TEXT_REMEMBER_DETAILS)}
            <br/>
            {getText(TEXT_CLICK_ON_ANY_TO_CONTINUE)}
        </div>
    }])
}