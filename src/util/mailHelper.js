import {POLISH} from "../redux/reducer/language";
import React from 'react';
import {AvailableResourcesComponent} from "../component/resource/AvailableResources";
import {RESOURCE_SMALL} from "../component/resource/Resource";
import Grade from "../component/grade/Grade";

export const MAIL_TYPE_CUSTOM = 'CUSTOM';
export const MAIL_TYPE_CHALLENGE_ENDED = 'CHALLENGE_ENDED';
export const MAIL_TYPE_SEASON_ENDED = 'SEASON_ENDED';
export const MAIL_TYPE_NEW_LEVEL = 'NEW_LEVEL';

export function prepareMailFromType(mail, lang) {
    if (mail.type === MAIL_TYPE_CUSTOM) {
        return mail;
    }
    const mailContent = JSON.parse(mail.content);
    let title;
    let content;
    if (mail.type === MAIL_TYPE_CHALLENGE_ENDED) {
        if (lang === POLISH) {
            title = `Wyzwanie #${mailContent.id} zakończone`;
            content = prepareMailContentForChallengeEndedPolish(mail, mailContent);
        } else {
            title = `Challenge #${mailContent.id} ended`;
            content = prepareMailContentForChallengeEndedEnglish(mail, mailContent);
        }
    } else if (mail.type === MAIL_TYPE_SEASON_ENDED) {
        if (lang === POLISH) {
            title = `Koniec sezonu ${mailContent.name}`;
            content = prepareMailContentForSeasonEndedPolish(mail, mailContent);
        } else {
            title = `End of season ${mailContent.name}`;
            content = prepareMailContentForSeasonEndedEnglish(mail, mailContent);
        }
    } else if (mail.type === MAIL_TYPE_NEW_LEVEL) {
        if (lang === POLISH) {
            title = `Osiągnięto poziom ${mailContent.level}`;
            content = prepareMailContentForNewLevelPolish(mail, mailContent);
        } else {
            title = `Level ${mailContent.level} reached`;
            content = prepareMailContentForNewLevelEnglish(mail, mailContent);
        }
    }
    return {...mail, content, title};
}

function prepareMailContentForNewLevelPolish(mail, mailContent) {
    return <div>
        {`Udało Ci się osiągnąć poziom ${mailContent.level}.`}
        <br/>
        <br/>
        {prepareMailContentEndPolish(mail)}
    </div>
}

function prepareMailContentForNewLevelEnglish(mail, mailContent) {
    return <div>
        {`You managed to reach level ${mailContent.level}.`}
        <br/>
        <br/>
        {prepareMailContentEndEnglish(mail)}
    </div>
}
function prepareMailContentForChallengeEndedPolish(mail, mailContent) {
    return <div>
        {`Wyzwanie #${mailContent.id} zakończyło się.`}
        <br/>
        <br/>
        {`Twoja drużyna uzyskała w nim ${mailContent.score}pkt, co pozwoliło jej zająć ${mailContent.position} miejsce.`}
        <br/>
        <br/>
        {prepareMailContentEndPolish(mail)}
    </div>
}

function prepareMailContentForChallengeEndedEnglish(mail, mailContent) {
    return <div>
        {`Challenge #${mailContent.id} ended.`}
        <br/>
        <br/>
        {`Your team scored ${mailContent.score}p, which allowed it to take No. ${mailContent.position}.`}
        <br/>
        <br/>
        {prepareMailContentEndEnglish(mail)}
    </div>
}

function prepareMailContentForSeasonEndedPolish(mail, mailContent) {
    return <div>
        {`Sezon ${mailContent.name} dobiegł końca.`}
        <br/>
        <br/>
        <div className='justifyStart'>
            <div className='justifyCenter flexColumn'>{`Udało Ci się uzyskać w nim rangę`}</div>
            <div className='justifyCenter flexColumn marginLeftRem marginRightRem'><Grade className=''
                                                                                          grade={mailContent.grade}/>
            </div>
            <div className='justifyCenter flexColumn'>{`.`}</div>
        </div>
        <br/>
        <br/>
        {prepareMailContentEndPolish(mail)}
    </div>
}

function prepareMailContentForSeasonEndedEnglish(mail, mailContent) {
    return <div>
        {`Season #${mailContent.name} ended.`}
        <br/>
        <br/>
        <div className='justifyStart'>
            <div className='justifyCenter flexColumn'> {`You obtained the`}</div>
            <div className='justifyCenter flexColumn marginLeftRem marginRightRem'><Grade grade={mailContent.grade}/>
            </div>
            <div className='justifyCenter flexColumn'> {`grade in it.`}</div>
        </div>
        <br/>
        <br/>
        {prepareMailContentEndEnglish(mail)}
    </div>
}

function prepareMailContentEndPolish(mail) {
    if (mail.hasResources) {
        return <div>
            {`Za ten wynik otrzymujesz następującą nagrodę:`}
            <AvailableResourcesComponent autoHide0={true} styleBoxShadow={false} renderTitle={false}
                                         size={RESOURCE_SMALL} {...mail}/>
            {`Gratulacje!`}
        </div>
    }
    return <div>
        {`Niestety, ten wynik nie pozwolił Ci osiągnąć żadnej nagrody.`}
        <br/>
        <br/>
        {`Powodzenia następnym razem...`}
    </div>
}

function prepareMailContentEndEnglish(mail) {
    if (mail.hasResources) {
        return <div>
            {`For this result you get the following reward:`}
            <AvailableResourcesComponent autoHide0={true} styleBoxShadow={false} renderTitle={false}
                                         size={RESOURCE_SMALL} {...mail}/>
            {`Congratulations!`}
        </div>
    }
    return <div>
        {`Unfortunately, this result did not allow you to get any reward.`}
        <br/>
        <br/>
        {`Good luck next time...`}
    </div>
}