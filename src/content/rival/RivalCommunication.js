import {rivalInProgressContent, rivalTypeChanged, statusChanged as rivalStatusChanged} from "../../redux/reducer/rival";
import {BATTLE_ROUTE, WAR_ROUTE} from "../routes";
import {push} from 'connected-react-router'
import {
    RIVAL_STATUS_CLOSED,
    RIVAL_STATUS_IN_PROGRESS,
    RIVAL_TYPE_BATTLE,
    RIVAL_TYPE_CAMPAIGN_WAR,
    RIVAL_TYPE_WAR
} from "../../util/rivalHelper";
import {clearRivalStartRandomOpponentFetch} from "./fetch/RivalStartRandomOpponentFetch";

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
    };

    onMessage = (e) => {
        const data = JSON.parse(e.data);
        const id = data.id;
        if (id === `${RIVAL_TYPE_BATTLE}_CONTENT`) {
            const content = JSON.parse(data.content);
            this.changeRivalTypeIfDifferenct(RIVAL_TYPE_BATTLE);
            this.rivalInProgress(content)
        } else if (id === `${RIVAL_TYPE_BATTLE}_READY`) {
            this.communicationWebSocket.dispatch(push(BATTLE_ROUTE));
        } else if (id === `${RIVAL_TYPE_WAR}_CONTENT`) {
            const content = JSON.parse(data.content);
            this.changeRivalTypeIfDifferenct(RIVAL_TYPE_WAR);
            this.rivalInProgress(content);
        } else if (id === `${RIVAL_TYPE_WAR}_READY`) {
            this.communicationWebSocket.dispatch(push(WAR_ROUTE));
        } else if (id === `${RIVAL_TYPE_CAMPAIGN_WAR}_CONTENT`) {
            const content = JSON.parse(data.content);
            this.changeRivalTypeIfDifferenct(RIVAL_TYPE_CAMPAIGN_WAR);
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

    readyFriend(rivalType) {
        this.communicationWebSocket.dispatch(rivalStatusChanged(RIVAL_STATUS_IN_PROGRESS));
        this.send(`${rivalType}_^_READY_FOR_START`);
    }

    readyRandomOpponent(rivalType) {
        clearRivalStartRandomOpponentFetch(this.communicationWebSocket.dispatch);
        this.communicationWebSocket.dispatch(rivalStatusChanged(RIVAL_STATUS_IN_PROGRESS));
        this.send(`${rivalType}_^_READY_FOR_START`);
    }

}
