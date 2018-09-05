import celebrity from '../media/image/campaign/celebrity.jpg';
import space from '../media/image/campaign/space.jpg';
import underwater from '../media/image/campaign/underwater.jpg';
import moon from '../media/image/campaign/moon.png';
import mars from '../media/image/campaign/mars.png';
import sun from '../media/image/campaign/sun.png';
import lake from '../media/image/campaign/lake.jpg';
import sea from '../media/image/campaign/sea.jpg';
import ocean from '../media/image/campaign/ocean.jpg';
import party from '../media/image/campaign/party.jpg';
import premiere from '../media/image/campaign/premiere.jpg';
import awards from '../media/image/campaign/awards.jpg';
import FaRocket from "react-icons/lib/fa/rocket";
import FaAnchor from "react-icons/lib/fa/anchor";
import FaCamera from "react-icons/lib/fa/camera";
import React from "react";

export const TYPE_SPACE_EXPEDITION = 'SPACE_EXPEDITION';
export const TYPE_UNDERWATER_WORLD = 'UNDERWATER_WORLD';
export const TYPE_CELEBRITY_LIFE = 'CELEBRITY_LIFE';

export const DESTINATION_EASY = 'EASY';
export const DESTINATION_NORMAL = 'NORMAL';
export const DESTINATION_HARD = 'HARD';

export function getStartButtonIcon(type) {
    return CAMPAIGN_ICON[type];
}

const CAMPAIGN_ICON = {
    [TYPE_SPACE_EXPEDITION]: <FaRocket/>,
    [TYPE_UNDERWATER_WORLD]: <FaAnchor/>,
    [TYPE_CELEBRITY_LIFE]: <FaCamera/>,
};

export function getCampaignImg(type, destination) {
    const o = CAMPAIGN_IMG[type];
    return destination ? o[destination] : o.img;
}

const CAMPAIGN_IMG = {
    [TYPE_SPACE_EXPEDITION]: {
        img: space,
        [DESTINATION_EASY]: moon,
        [DESTINATION_NORMAL]: mars,
        [DESTINATION_HARD]: sun,
    },
    [TYPE_UNDERWATER_WORLD]: {
        img: underwater,
        [DESTINATION_EASY]: lake,
        [DESTINATION_NORMAL]: sea,
        [DESTINATION_HARD]: ocean,
    },
    [TYPE_CELEBRITY_LIFE]: {
        img: celebrity,
        [DESTINATION_EASY]: party,
        [DESTINATION_NORMAL]: premiere,
        [DESTINATION_HARD]: awards,
    },
};