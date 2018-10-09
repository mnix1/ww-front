import {rivalInProgressContent, rivalTypeChanged, statusChanged as rivalStatusChanged} from "../../redux/reducer/rival";
import {RIVAL_STATUS_CLOSED, RIVAL_TYPE_ROUTE} from "../../util/rivalHelper";
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
    sendKidnapping() {
        this.send(JSON.stringify({id: 'KIDNAPPING'}));
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
        this.send(JSON.stringify({id: 'CHOOSE_TASK_PROPS', difficultyLevel}));
    }
    sendChosenCategory(category) {
        this.send(JSON.stringify({id: 'CHOOSE_TASK_PROPS', category}));
    }

    onMessage = (id, data) => {
        const rivalType = id.replace('_CONTENT', '');
        if (!RIVAL_TYPE_ROUTE[rivalType]) {
            return;
        }
        const content = JSON.parse(data.content);
        this.changeRivalTypeIfDifferenct(rivalType);
        this.rivalInProgress(content);
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
