import {logBot} from "./botHelper";
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

function getStatus(bot) {
    return bot.redux.rival.status;
}

function getContentStatus(bot) {
    return bot.redux.rival.content.status;
}

export async function manageWar(bot) {
    logBot('start manage war');
    return new Promise((resolve, reject) => {
        bot.communication.onMessageEvent = () => {
            resolveAction(bot, bot.redux.rival.content, resolve);
        };
        if (getStatus(bot) !== RIVAL_STATUS_IN_PROGRESS) {
            initWar(bot);
        } else {
            resolveAction(bot, bot.redux.rival.content, resolve);
        }
    });
}

function resolveAction(bot, content, resolve) {
    if (content.status === RIVAL_CONTENT_STATUS_ANSWERING) {
        answering(bot, content);
    } else if (content.status === RIVAL_CONTENT_STATUS_CHOOSING_WHO_ANSWER) {
        whoAnswer(bot, content);
    } else if (content.status === RIVAL_CONTENT_STATUS_CHOOSING_TASK_PROPS) {
        taskProps(bot, content);
    } else if (content.status === RIVAL_CONTENT_STATUS_CLOSED) {
        resolve();
    }
}

function initWar(bot) {
    logBot('initWar');
    startRandomOpponent(bot.dispatch, RIVAL_TYPE_WAR, RIVAL_IMPORTANCE_RANKING);
    bot.dispatch(push(WAR_RANKING_ROUTE));
}

function taskProps(bot, content) {
    logBot('taskProps', 'content', content);
    const meChoosing = bot.redux.profile.profile.tag === content.choosingTaskPropsTag;
    if (!meChoosing) {
        return;
    }
    const interval = Math.random() * 1000 + 2000;
    const difficultyLevel = _.shuffle(DIFFICULTY_LEVEL_NAMES)[0];
    setTimeout(() => {
        bot.communication.sendChosenDifficulty(RIVAL_TYPE_WAR, difficultyLevel);
    }, interval);
    const available = content.presentIndexes.map(e => content.team[e]);
    const availableWisies = available.filter(isTeamMemberWisie);
    const availableWisors = available.filter(e => !isTeamMemberWisie(e));
    const possibleCategories = [];
    if (!_.isEmpty(availableWisors)) {
        possibleCategories.push(bot.props.hobbies);
    }
    if (!_.isEmpty(availableWisies)) {
        const wisiesCategories = availableWisies.map(e => e.content.hobbies);
        possibleCategories.push(_.flatten(wisiesCategories));
    }
    const category = _.shuffle(_.flatten(possibleCategories))[0];
    logBot('taskProps', 'category', category, 'difficultyLevel', difficultyLevel);
    setTimeout(() => {
        bot.communication.sendChosenCategory(RIVAL_TYPE_WAR, category);
    }, interval * 2);
}

function whoAnswer(bot, content) {
    const interval = Math.random() * 4000 + 2000;
    const whoAnswerIndex = findWhoAnswerIndex(bot, content);
    logBot('whoAnswer', 'whoAnswerIndex', whoAnswerIndex);
    setTimeout(() => {
        bot.communication.sendWhoAnswer(RIVAL_TYPE_WAR, whoAnswerIndex);
    }, interval);
}

function findWhoAnswerIndex(bot, content) {
    const available = content.presentIndexes.map(e => content.team[e]);
    logBot('whoAnswer', 'available', available);
    if (available.length === 1) {
        return available[0].index;
    }
    const isHobbyTask = _.includes(bot.props.hobbies, content.task.category);
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

function answering(bot, content) {
    if (isTeamMemberWisie(content.team[content.activeIndex])) {
        return false;
    }
    logBot('answering', 'content', content);
    const difficulty = (content.task.points - 1);
    const difficultyImpact = bot.props.difficultyImpact * difficulty;
    const isHobbyTask = _.includes(bot.props.hobbies, content.task.category);
    const hobbyImpact = isHobbyTask ? bot.props.hobbyImpact : 0;
    const chanceToCorrect = bot.props.baseWisdomSkill
        - difficultyImpact
        + hobbyImpact;
    const minSkillAnswerIntervalImpact = (1 - bot.props.baseMentalSkill + difficultyImpact - hobbyImpact) * 5000;
    const noAnswerInterval = 1000
        + Math.random() * 2000
        + minSkillAnswerIntervalImpact
        + (Math.random() * 2 * minSkillAnswerIntervalImpact);
    const isAnswer = chanceToCorrect * 1.5 > Math.random();
    const isCorrect = chanceToCorrect >= Math.random();
    logBot('answering', 'wisor', 'chanceToCorrect', chanceToCorrect, 'noAnswerInterval', noAnswerInterval, 'isAnswer', isAnswer, 'isCorrect', isCorrect);
    if (!isAnswer) {
        return false;
    }
    setTimeout(() => {
        if (getContentStatus(bot) !== RIVAL_CONTENT_STATUS_ANSWERING) {
            return;
        }
        const randomId = _.shuffle(content.task.answers)[0].id;
        if (!isCorrect) {
            logBot('answering', 'randomId', randomId);
            bot.communication.sendAnswer(RIVAL_TYPE_WAR, randomId);
            return;
        }
        request('/bot/correctAnswer').then(e => {
            if (getContentStatus(bot) !== RIVAL_CONTENT_STATUS_ANSWERING) {
                return;
            }
            logBot('answering', 'correct', e.id)
            bot.communication.sendAnswer(RIVAL_TYPE_WAR, e.id);
        })
    }, noAnswerInterval)
}