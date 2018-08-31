import {battleInProgressContent, statusChanged as battleStatusChanged} from "../../redux/reducer/battle";
import {warInProgressContent, statusChanged as warStatusChanged} from "../../redux/reducer/war";
import {BATTLE_ROUTE} from "../routes";
import {push} from 'connected-react-router'
import {
    BATTLE_STATUS_CLOSED,
    BATTLE_STATUS_IN_PROGRESS_FAST,
    BATTLE_STATUS_IN_PROGRESS_FRIEND
} from "../../util/battleHelper";
import {clearBattleStartFastFetch} from "./battle/fetch/BattleStartFastFetch";
import _ from 'lodash';
import {WAR_ROUTE} from "../routes";
import {WAR_STATUS_CLOSED, WAR_STATUS_IN_PROGRESS_FRIEND} from "../../util/warHelper";

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
            this.battleInProgress(content);
        } else if (id === 'BATTLE_READY_FAST') {
            this.communicationWebSocket.dispatch(push(BATTLE_ROUTE));
        } else if (id === 'WAR_CONTENT') {
            const content = JSON.parse(data.content);
            this.warInProgress(content);
        } else if (id === 'WAR_READY_FAST') {
            this.communicationWebSocket.dispatch(push(WAR_ROUTE));
        }
    };

    battleInProgress(content) {
        this.communicationWebSocket.dispatch(battleInProgressContent(content));
        if (!_.isNil(content.winnerTag)) {
            this.communicationWebSocket.dispatch(battleStatusChanged(BATTLE_STATUS_CLOSED));
        }
    }

    warInProgress(content) {
        this.communicationWebSocket.dispatch(warInProgressContent(content));
        if (!_.isNil(content.winnerTag)) {
            this.communicationWebSocket.dispatch(warStatusChanged(WAR_STATUS_CLOSED));
        }
    }

    battleReady() {
        this.communicationWebSocket.dispatch(battleStatusChanged(BATTLE_STATUS_IN_PROGRESS_FRIEND));
        this.send('BATTLE_READY_FOR_START');
    }

    battleReadyFast() {
        clearBattleStartFastFetch(this.communicationWebSocket.dispatch);
        this.communicationWebSocket.dispatch(battleStatusChanged(BATTLE_STATUS_IN_PROGRESS_FAST));
        this.send('BATTLE_READY_FOR_START');
    }

    warReady() {
        this.communicationWebSocket.dispatch(warStatusChanged(WAR_STATUS_IN_PROGRESS_FRIEND));
        this.send('WAR_READY_FOR_START');
    }

    warReadyFast() {
        clearBattleStartFastFetch(this.communicationWebSocket.dispatch);
        this.communicationWebSocket.dispatch(warStatusChanged(WAR_STATUS_IN_PROGRESS_FRIEND));
        this.send('WAR_READY_FOR_START');
    }


}
