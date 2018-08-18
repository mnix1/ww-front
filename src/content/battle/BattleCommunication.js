import {battleInProgressContent, statusChanged} from "../../redux/reducer/battle";
import {BATTLE_ROUTE} from "../routes";
import {push} from 'connected-react-router'
import {
    BATTLE_STATUS_CLOSED,
    BATTLE_STATUS_IN_PROGRESS_FAST,
    BATTLE_STATUS_IN_PROGRESS_FRIEND
} from "../../util/battleHelper";
import {clearBattleStartFastFetch} from "./fetch/BattleStartFastFetch";
import _ from 'lodash';

export default class BattleCommunication {
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
        }
        if (id === 'BATTLE_READY_FAST') {
            this.communicationWebSocket.dispatch(push(BATTLE_ROUTE));
        }
    };

    battleInProgress(content) {
        this.communicationWebSocket.dispatch(battleInProgressContent(content));
        if (!_.isNil(content.winnerTag)) {
            this.communicationWebSocket.dispatch(statusChanged(BATTLE_STATUS_CLOSED));
        }
    }

    ready() {
        this.communicationWebSocket.dispatch(statusChanged(BATTLE_STATUS_IN_PROGRESS_FRIEND));
        this.send('BATTLE_READY_FOR_START');
    }

    readyFast() {
        clearBattleStartFastFetch(this.communicationWebSocket.dispatch);
        this.communicationWebSocket.dispatch(statusChanged(BATTLE_STATUS_IN_PROGRESS_FAST));
        this.send('BATTLE_READY_FOR_START');
    }


}
