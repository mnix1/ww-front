import {
    rivalCleared,
    rivalInProgressContent,
    rivalTypeChanged,
    statusChanged as rivalStatusChanged
} from "../../redux/reducer/rival";
import {RIVAL_STATUS_CLOSED} from "../../util/rivalHelper";
import _ from 'lodash';

export default class RivalCommunication {
    constructor(communicationWebSocket, propsGetter) {
        this.communicationWebSocket = communicationWebSocket;
        this.propsGetter = propsGetter;
        this.communicationWebSocket.onRivalMessage = this.onMessage;
        this.onMessageEvent = _.noop;
    }

    dispose() {
        this.communicationWebSocket.socket.removeEventListener('message', this.onMessage);
    }

    send(message) {
        this.communicationWebSocket.send(message);
    }

    sendSurrender() {
        this.send(JSON.stringify({id: 'SURRENDER'}));
    }

    sendAnswer(answerId) {
        this.send(JSON.stringify({id: 'ANSWER', answerId}));
    }

    sendHint(answerId) {
        this.send(JSON.stringify({id: 'HINT', answerId}));
    }

    sendWaterPistol() {
        this.send(JSON.stringify({id: 'WATER_PISTOL'}));
    }

    sendNinja() {
        this.send(JSON.stringify({id: 'NINJA'}));
    }

    sendGhost() {
        this.send(JSON.stringify({id: 'GHOST'}));
    }

    sendPizza() {
        this.send(JSON.stringify({id: 'PIZZA'}));
    }

    sendCoverall() {
        this.send(JSON.stringify({id: 'COVERALL'}));
    }

    sendChangeTask() {
        this.send(JSON.stringify({id: 'CHANGE_TASK'}));
    }

    sendLifebuoy(index) {
        this.send(JSON.stringify({id: 'LIFEBUOY', index}));
    }

    sendWhoAnswer(activeIndex) {
        this.send(JSON.stringify({id: 'CHOOSE_WHO_ANSWER', activeIndex}));
    }

    sendChosenDifficulty(difficultyLevel) {
        this.send(JSON.stringify({id: 'CHOOSE_TASK_DIFFICULTY', difficultyLevel}));
    }

    sendChosenCategory(category) {
        this.send(JSON.stringify({id: 'CHOOSE_TASK_CATEGORY', category}));
    }

    onMessage = (data) => {
        const content = JSON.parse(data.content);
        if (content.status === 'INTRO') {
            this.communicationWebSocket.dispatch(rivalCleared());
        }
        if (content.type) {
            this.changeRivalTypeIfDifferenct(content.type);
        }
        this.rivalInProgress(content);
        this.onMessageEvent(content);
    };

    changeRivalTypeIfDifferenct(type) {
        if (this.propsGetter().rivalType !== type) {
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
