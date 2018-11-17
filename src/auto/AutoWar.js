import {logAuto} from "./autoHelper";
import _ from 'lodash';
import {push} from 'connected-react-router'
import {WAR_RANKING_ROUTE} from "../content/routes";
import {
    RIVAL_CONTENT_STATUS_ANSWERING, RIVAL_CONTENT_STATUS_CHOOSING_TASK_PROPS,
    RIVAL_CONTENT_STATUS_CHOOSING_WHO_ANSWER, RIVAL_CONTENT_STATUS_CLOSED,
    RIVAL_IMPORTANCE_RANKING,
    RIVAL_STATUS_IN_PROGRESS,
    RIVAL_TYPE_WAR
} from "../util/rivalHelper";
import {startRandomOpponent} from "../redux/reducer/rival";
import {isTeamMemberWisie} from "../util/heroHelper";
import request from '../util/fetchHelper';
import {DIFFICULTY_LEVEL_NAMES} from "../util/difficultyHelper";

function getStatus(auto) {
    return auto.redux.rival.status;
}

function getContentStatus(auto) {
    return auto.redux.rival.content.status;
}

export async function manageWar(auto) {
    logAuto('start manage war');
    return new Promise((resolve, reject) => {
        auto.communication.onMessageEvent = () => {
            resolveAction(auto, auto.redux.rival.content, resolve);
        };
        if (getStatus(auto) !== RIVAL_STATUS_IN_PROGRESS) {
            initWar(auto);
        } else {
            resolveAction(auto, auto.redux.rival.content, resolve);
        }
    });
}

function resolveAction(auto, content, resolve) {
    if (content.status === RIVAL_CONTENT_STATUS_ANSWERING) {
        answering(auto, content);
    } else if (content.status === RIVAL_CONTENT_STATUS_CHOOSING_WHO_ANSWER) {
        whoAnswer(auto, content);
    } else if (content.status === RIVAL_CONTENT_STATUS_CHOOSING_TASK_PROPS) {
        taskProps(auto, content);
    } else if (content.status === RIVAL_CONTENT_STATUS_CLOSED) {
        resolve();
    }
}

function initWar(auto) {
    logAuto('initWar');
    startRandomOpponent(auto.dispatch, RIVAL_TYPE_WAR, RIVAL_IMPORTANCE_RANKING);
    auto.dispatch(push(WAR_RANKING_ROUTE));
}

function taskProps(auto, content) {
    logAuto('taskProps', 'content', content);
    if (!content.meChoosingTaskProps) {
        return;
    }
    const interval = Math.random() * 1000 + 2000;
    const difficultyLevel = _.shuffle(DIFFICULTY_LEVEL_NAMES)[0];
    setTimeout(() => {
        auto.communication.sendChosenDifficulty(difficultyLevel);
    }, interval);
    const available = content.presentIndexes.map(e => content.team[e]);
    const availableWisies = available.filter(isTeamMemberWisie);
    const availableWisors = available.filter(e => !isTeamMemberWisie(e));
    const possibleCategories = [];
    if (!_.isEmpty(availableWisors)) {
        possibleCategories.push(auto.props.hobbies);
    }
    if (!_.isEmpty(availableWisies)) {
        const wisiesCategories = availableWisies.map(e => e.content.hobbies);
        possibleCategories.push(_.flatten(wisiesCategories));
    }
    const category = _.shuffle(_.flatten(possibleCategories))[0];
    logAuto('taskProps', 'category', category, 'difficultyLevel', difficultyLevel);
    setTimeout(() => {
        auto.communication.sendChosenCategory(category);
    }, interval * 2);
}

function whoAnswer(auto, content) {
    const interval = Math.random() * 4000 + 2000;
    const whoAnswerIndex = findWhoAnswerIndex(auto, content);
    logAuto('whoAnswer', 'whoAnswerIndex', whoAnswerIndex);
    setTimeout(() => {
        auto.communication.sendWhoAnswer(whoAnswerIndex);
    }, interval);
}

function findWhoAnswerIndex(auto, content) {
    const available = content.presentIndexes.map(e => content.team[e]);
    logAuto('whoAnswer', 'available', available);
    if (available.length === 1) {
        return available[0].index;
    }
    const isHobbyTask = _.includes(auto.props.hobbies, content.task.category);
    if (isHobbyTask) {
        const wisors = available.filter(e => !isTeamMemberWisie(e));
        if (wisors.length > 0) {
            return wisors[0].index;
        }
    }
    const availableWisies = available.filter(isTeamMemberWisie);
    if (availableWisies.length === 1) {
        return availableWisies[0].index;
    }
    const hobbyWisies = availableWisies.filter(e => _.includes(e.content.hobbies, content.task.category));
    if (hobbyWisies.length > 0) {
        return _.shuffle(hobbyWisies)[0].index;
    }
    return _.shuffle(availableWisies)[0].index;
}

function answering(auto, content) {
    if (isTeamMemberWisie(content.team[content.activeIndex])) {
        return false;
    }
    logAuto('answering', 'content', content);
    const difficulty = _.random(0, 7);
    const difficultyImpact = auto.props.difficultyImpact * difficulty;
    const isHobbyTask = _.includes(auto.props.hobbies, content.task.category);
    const hobbyImpact = isHobbyTask ? auto.props.hobbyImpact : 0;
    const chanceToCorrect = auto.props.baseWisdomSkill
        - difficultyImpact
        + hobbyImpact;
    const minSkillAnswerIntervalImpact = (1 - auto.props.baseMentalSkill + difficultyImpact - hobbyImpact) * 5000;
    const noAnswerInterval = 1000
        + Math.random() * 2000
        + minSkillAnswerIntervalImpact
        + (Math.random() * 2 * minSkillAnswerIntervalImpact);
    const isAnswer = chanceToCorrect * 1.5 > Math.random();
    const isCorrect = chanceToCorrect >= Math.random();
    logAuto('answering', 'wisor', 'chanceToCorrect', chanceToCorrect, 'noAnswerInterval', noAnswerInterval, 'isAnswer', isAnswer, 'isCorrect', isCorrect);
    if (!isAnswer) {
        return false;
    }
    setTimeout(() => {
        if (getContentStatus(auto) !== RIVAL_CONTENT_STATUS_ANSWERING) {
            return;
        }
        const randomId = _.shuffle(content.task.answers)[0].id;
        if (!isCorrect) {
            logAuto('answering', 'randomId', randomId);
            auto.communication.sendAnswer(randomId);
            return;
        }
        request('/auto/correctAnswer').then(e => {
            if (getContentStatus(auto) !== RIVAL_CONTENT_STATUS_ANSWERING) {
                return;
            }
            logAuto('answering', 'correct', e.id)
            auto.communication.sendAnswer(e.id);
        })
    }, noAnswerInterval)
}