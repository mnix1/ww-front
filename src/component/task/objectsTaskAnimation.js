import {getAnimationContent} from "../../util/taskRenderer";
import _ from "lodash";
import React from 'react';
import {objectFontSize} from "../object-group/objectHelper";
import {getText, TEXT_CLICK_ON_ANY_TO_CONTINUE, TEXT_REMEMBER_DETAILS} from "../../lang";

export function prepareAnimationTiles(rival) {
    const {question, screen} = rival.props;
    const objects = JSON.parse(atob(getAnimationContent(question)));
    const objectsCount = objects.length;
    const df = 2 * Math.PI / objectsCount;
    const factorX = objectsCount === 2 ? 0.25 : 0.30;
    const factorY = objectsCount === 2 ? 0.25 : 0.30;
    return objects.map((object, i) => {
        let imageData = atob(object.shape);
        imageData = imageData.replace('svg', `svg fill="${object.backgroundColor}"`).replace(/#/g, '%23');
        const content = <div style={{height: '100%', width: '100%'}}>
            <span style={{fontSize: objectFontSize(screen.resolution, 1, 18)}}>{object.key}</span>
            <img alt='' src={'data:image/svg+xml,' + imageData} height='100%' width='100%'/>
        </div>;
        let f = i * df;
        if (objectsCount % 2 === 1) {
            f -= Math.PI / 2;
        } else if (objectsCount !== 2) {
            f -= df / 2;
        }
        const v1 = 0.5 + Math.cos(f) * factorX;
        const v2 = 0.5 - Math.sin(f) * factorY;
        return {
            onMouseOver: _.noop,
            onMouseOut: _.noop,
            id: object.key,
            objectStyle: {zIndex: 1},
            additionalStyle: {padding: '0'},
            content,
            xTarget: v1,
            yTarget: v2,
        };
    })
}

export function prepareAnimationDescription(rival) {
    return [{
        id: 'desc',
        yTarget: 0.5,
        xTarget: 0.5,
        content: <div className="taskDescription">
            {getText(TEXT_REMEMBER_DETAILS)}
            <br/>
            {getText(TEXT_CLICK_ON_ANY_TO_CONTINUE)}
        </div>
    }];
}