import {getAnimationContent} from "../../util/taskRenderer";
import {wordsByLength} from "../../util/textHelper";
import _ from "lodash";

export function prepareAnimationTiles(rival) {
    const {question} = rival.props;
    const objects = JSON.parse(atob(getAnimationContent(question)));
    const a = 0;
    return objects.map((object, i) => {
        let imageData = atob(object.shape);
        imageData = imageData.replace('svg', `svg fill="${object.backgroundColor}"`);
        return {
            customMouseOver: _.noop,
            customMouseOut: _.noop,
            id: object.key,
            outsideLabel: wordsByLength(object.key, 40),
            strokeWidthFactor: 10,
            material: {
                background: object.backgroundColor,
                color: object.fontColor
            },
            imageCreator: (el) => {
                const image = new Image();
                image.src = 'data:image/svg+xml,' + imageData;
                image.onload = () => {
                    el.append('image')
                        .attr('xlink:href', 'data:image/svg+xml,' + imageData)
                        .attr('transform', () => {
                            const scale = Math.min(a / image.width, a / image.height);
                            const newWidth = scale * image.width;
                            return `translate(${-newWidth / 2},0)scale(${scale})`;
                        })
                };
            },
            yTarget: 0.5,
            xTarget: i / 3
            // yTarget: objects.length > 1 ? (i + 1) % 2 ? -1 / 3 : 1 / 3 : 0,
            // xTarget: objects.length > 1 ? (2 * i / (objects.length - 1) - 1) / 5 : 0
        };
    })
}