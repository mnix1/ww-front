import {warInProgressContent, statusChanged} from "../../../redux/reducer/war";
import {WAR_ROUTE} from "../../routes";
import {push} from 'connected-react-router'
import {
    WAR_STATUS_CLOSED,
    WAR_STATUS_IN_PROGRESS_FAST,
    WAR_STATUS_IN_PROGRESS_FRIEND
} from "../../../util/warHelper";
import {clearWarStartFastFetch} from "./fetch/WarStartFastFetch";
import _ from 'lodash';

export default class WarCommunication {
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
        if (id === 'WAR_CONTENT') {
            const content = JSON.parse(data.content);
            this.warInProgress(content);
        }
        if (id === 'WAR_READY_FAST') {
            this.communicationWebSocket.dispatch(push(WAR_ROUTE));
        }
    };

    warInProgress(content) {
        this.communicationWebSocket.dispatch(warInProgressContent(content));
        if (!_.isNil(content.winnerTag)) {
            this.communicationWebSocket.dispatch(statusChanged(WAR_STATUS_CLOSED));
        }
    }

    ready() {
        this.communicationWebSocket.dispatch(statusChanged(WAR_STATUS_IN_PROGRESS_FRIEND));
        this.send('WAR_READY_FOR_START');
    }

    readyFast() {
        clearWarStartFastFetch(this.communicationWebSocket.dispatch);
        this.communicationWebSocket.dispatch(statusChanged(WAR_STATUS_IN_PROGRESS_FAST));
        this.send('WAR_READY_FOR_START');
    }


}
