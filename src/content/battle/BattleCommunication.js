import _ from 'lodash';
import {battleInProgressContent} from "../../redux/reducer/battle";

export default class BattleCommunication {
    constructor(communicationWebSocket) {
        this.communicationWebSocket = communicationWebSocket;
        this.communicationWebSocket.processMessage = false;
        this.communicationWebSocket.socket.addEventListener('message', this.onMessage);
    }

    dispose() {
        this.communicationWebSocket.processMessage = true;
        this.communicationWebSocket.socket.removeEventListener('message', this.onMessage);
    }

    send(message) {
        this.communicationWebSocket.send(message);
    };

    onMessage = (e) => {
        const data = JSON.parse(e.data);
        const id = data.id;
        if (id === 'BATTLE_START' || id === 'BATTLE_ANSWER' || id === 'BATTLE_NEXT_QUESTION') {
            const content = JSON.parse(data.content);
            this.communicationWebSocket.dispatch(battleInProgressContent(content));
        }
    };

    ready() {
        this.send('BATTLE_READY_FOR_START');
    }


}
