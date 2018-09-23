import {rivalInProgressContent, rivalTypeChanged, statusChanged as rivalStatusChanged} from "../../redux/reducer/rival";
import {
    RIVAL_STATUS_CLOSED,
    RIVAL_TYPE_BATTLE,
    RIVAL_TYPE_CAMPAIGN_WAR,
    RIVAL_TYPE_CHALLENGE,
    RIVAL_TYPE_WAR
} from "../../util/rivalHelper";
import _ from 'lodash';

export default class RivalCommunication {
    constructor(communicationWebSocket, app) {
        this.communicationWebSocket = communicationWebSocket;
        this.app = app;
        this.communicationWebSocket.onRivalMessage = this.onMessage;
        this.onMessageEvent = _.noop;
    }

    dispose() {
        this.communicationWebSocket.socket.removeEventListener('message', this.onMessage);
    }

    send(message) {
        this.communicationWebSocket.send(message);
    }

    sendAnswer(rivalType, answerId) {
        this.send(`${rivalType}_^_ANSWER` + JSON.stringify({answerId}));
    }

    sendWhoAnswer(rivalType, activeIndex) {
        this.send(`${rivalType}_^_CHOOSE_WHO_ANSWER` + JSON.stringify({activeIndex}));
    }

    sendChosenDifficulty(rivalType, difficultyLevel) {
        this.send(`${rivalType}_^_CHOOSE_TASK_PROPS` + JSON.stringify({difficultyLevel}));
    }

    sendChosenCategory(rivalType, category) {
        this.send(`${rivalType}_^_CHOOSE_TASK_PROPS` + JSON.stringify({category}));
    }

    onMessage = (id, data) => {
        console.log('onMessage', id, data);
        if (!_.includes(id, '_CONTENT')) {
            return;
        }
        const content = JSON.parse(data.content);
        if (id === `${RIVAL_TYPE_BATTLE}_CONTENT`) {
            this.changeRivalTypeIfDifferenct(RIVAL_TYPE_BATTLE);
            this.rivalInProgress(content)
        } else if (id === `${RIVAL_TYPE_WAR}_CONTENT`) {
            this.changeRivalTypeIfDifferenct(RIVAL_TYPE_WAR);
            this.rivalInProgress(content);
        } else if (id === `${RIVAL_TYPE_CAMPAIGN_WAR}_CONTENT`) {
            this.changeRivalTypeIfDifferenct(RIVAL_TYPE_CAMPAIGN_WAR);
            this.rivalInProgress(content);
        } else if (id === `${RIVAL_TYPE_CHALLENGE}_CONTENT`) {
            this.changeRivalTypeIfDifferenct(RIVAL_TYPE_CHALLENGE);
            this.rivalInProgress(content);
        }
        this.onMessageEvent(id, content);
    };

    changeRivalTypeIfDifferenct(type) {
        if (this.app.props.rivalType !== type) {
            this.communicationWebSocket.dispatch(rivalTypeChanged(type));
        }
    }

    rivalInProgress(content) {
        this.communicationWebSocket.dispatch(rivalInProgressContent(content));
        if (content.status === 'CLOSED') {
            this.communicationWebSocket.dispatch(rivalStatusChanged(RIVAL_STATUS_CLOSED));
        }
    }

}
