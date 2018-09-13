import {rivalInProgressContent, rivalTypeChanged, statusChanged as rivalStatusChanged} from "../../redux/reducer/rival";
import {
    RIVAL_STATUS_CLOSED,
    RIVAL_TYPE_BATTLE,
    RIVAL_TYPE_CAMPAIGN_WAR,
    RIVAL_TYPE_CHALLENGE,
    RIVAL_TYPE_WAR
} from "../../util/rivalHelper";

export default class RivalCommunication {
    constructor(communicationWebSocket, app) {
        this.communicationWebSocket = communicationWebSocket;
        this.app = app;
        this.communicationWebSocket.socket.addEventListener('message', this.onMessage);
    }

    dispose() {
        this.communicationWebSocket.socket.removeEventListener('message', this.onMessage);
    }

    send(message) {
        this.communicationWebSocket.send(message);
    }

    onMessage = (e) => {
        const data = JSON.parse(e.data);
        const id = data.id;
        if (id === `${RIVAL_TYPE_BATTLE}_CONTENT`) {
            const content = JSON.parse(data.content);
            this.changeRivalTypeIfDifferenct(RIVAL_TYPE_BATTLE);
            this.rivalInProgress(content)
        } else if (id === `${RIVAL_TYPE_WAR}_CONTENT`) {
            const content = JSON.parse(data.content);
            this.changeRivalTypeIfDifferenct(RIVAL_TYPE_WAR);
            this.rivalInProgress(content);
        } else if (id === `${RIVAL_TYPE_CAMPAIGN_WAR}_CONTENT`) {
            const content = JSON.parse(data.content);
            this.changeRivalTypeIfDifferenct(RIVAL_TYPE_CAMPAIGN_WAR);
            this.rivalInProgress(content);
        } else if (id === `${RIVAL_TYPE_CHALLENGE}_CONTENT`) {
            const content = JSON.parse(data.content);
            this.changeRivalTypeIfDifferenct(RIVAL_TYPE_CHALLENGE);
            this.rivalInProgress(content);
        }
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
