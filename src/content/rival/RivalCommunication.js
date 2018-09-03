import {rivalInProgressContent, rivalTypeChanged, statusChanged as rivalStatusChanged} from "../../redux/reducer/rival";
import {BATTLE_ROUTE, WAR_ROUTE} from "../routes";
import {push} from 'connected-react-router'
import {RIVAL_STATUS_CLOSED, RIVAL_STATUS_IN_PROGRESS, RIVAL_TYPE_BATTLE, RIVAL_TYPE_WAR} from "../../util/rivalHelper";
import {clearRivalStartRandomOpponentFetch} from "./fetch/RivalStartRandomOpponentFetch";

export default class RivalCommunication {
    constructor(communicationWebSocket) {
        this.communicationWebSocket = communicationWebSocket;
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
        if (id === 'BATTLE_CONTENT') {
            const content = JSON.parse(data.content);
            this.communicationWebSocket.dispatch(rivalTypeChanged(RIVAL_TYPE_BATTLE));
            this.rivalInProgress(content)
        } else if (id === 'BATTLE_READY') {
            this.communicationWebSocket.dispatch(push(BATTLE_ROUTE));
        } else if (id === 'WAR_CONTENT') {
            const content = JSON.parse(data.content);
            this.communicationWebSocket.dispatch(rivalTypeChanged(RIVAL_TYPE_WAR));
            this.rivalInProgress(content);
        } else if (id === 'WAR_READY') {
            this.communicationWebSocket.dispatch(push(WAR_ROUTE));
        }
    };

    rivalInProgress(content) {
        this.communicationWebSocket.dispatch(rivalInProgressContent(content));
        if (content.status === 'CLOSED') {
            this.communicationWebSocket.dispatch(rivalStatusChanged(RIVAL_STATUS_CLOSED));
        }
    }

    battleReadyFriend() {
        this.communicationWebSocket.dispatch(rivalStatusChanged(RIVAL_STATUS_IN_PROGRESS));
        this.send('BATTLE_READY_FOR_START');
    }

    warReadyFriend() {
        this.communicationWebSocket.dispatch(rivalStatusChanged(RIVAL_STATUS_IN_PROGRESS));
        this.send('WAR_READY_FOR_START');
    }

    battleReadyRandomOpponent() {
        clearRivalStartRandomOpponentFetch(this.communicationWebSocket.dispatch);
        this.communicationWebSocket.dispatch(rivalStatusChanged(RIVAL_STATUS_IN_PROGRESS));
        this.send('BATTLE_READY_FOR_START');
    }

    warReadyRandomOpponent() {
        clearRivalStartRandomOpponentFetch(this.communicationWebSocket.dispatch);
        this.communicationWebSocket.dispatch(rivalStatusChanged(RIVAL_STATUS_IN_PROGRESS));
        this.send('WAR_READY_FOR_START');
    }


}
