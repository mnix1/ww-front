import _ from 'lodash';
import {friendAdded, friendDeleted, friendSignedIn, friendSignedOut} from "../../redux/reducer/friend";
import {battleCleared, battleInviteCancelled, battleInvited, statusChanged} from "../../redux/reducer/battle";
import {clearBattleStartFetch} from "../battle/friend/fetch/BattleStartFetch";
import {BATTLE_STATUS_IN_PROGRESS} from "../../util/battleHelper";
import {OBJECT_BATTLE} from "../object-group/objectsBattle";
import {push} from 'connected-react-router'
import {BATTLE_ROUTE} from "../routes";

export default class CommunicationWebSocket {
    constructor() {
        this.init();
        this.socket.addEventListener('message', this.onMessage);
        this.socket.addEventListener('close', (e) => {
            console.log('onclose', e);
        });
        this.socket.addEventListener('error', (e) => {
            console.log('onerror', e);
        });
        this.socket.addEventListener('open', (e) => {
            // console.log('onopen', e)
        });
    }

    init() {
        let socket;
        if (_.includes(window.location.host, 'localhost')) {
            socket = new WebSocket("ws://localhost:8080/websocket");
        } else if (_.includes(window.location.host, ':3000')) {
            socket = new WebSocket(((window.location.protocol === "https:") ? "wss://" : "ws://") + window.location.host.replace(':3000', '') + ":8080/websocket");
        } else {
            socket = new WebSocket(((window.location.protocol === "https:") ? "wss://" : "ws://") + window.location.host + "/websocket");
        }
        this.socket = socket;
    }

    processMessage = true;

    onMessage = (e) => {
        if (!this.processMessage) {
            return;
        }
        const data = JSON.parse(e.data);
        const id = data.id;
        if (id === 'FRIEND_ADD') {
            this.dispatch(friendAdded(JSON.parse(data.content)));
        } else if (id === 'FRIEND_DELETE') {
            this.dispatch(friendDeleted(data.content));
        } else if (id === 'FRIEND_SIGN_IN') {
            this.dispatch(friendSignedIn(data.content));
        } else if (id === 'FRIEND_SIGN_OUT') {
            this.dispatch(friendSignedOut(data.content));
        } else if (id === 'BATTLE_INVITE') {
            this.dispatch(battleInvited(JSON.parse(data.content)));
        } else if (id === 'BATTLE_CANCEL_INVITE') {
            this.dispatch(battleInviteCancelled());
        } else if (id === 'BATTLE_REJECT_INVITE') {
            clearBattleStartFetch(this.dispatch);
            this.dispatch(battleCleared());
        } else if (id === 'BATTLE_ACCEPT_INVITE') {
            clearBattleStartFetch(this.dispatch);
            this.dispatch(battleCleared());
            this.dispatch(statusChanged(BATTLE_STATUS_IN_PROGRESS));
            this.dispatch(push(BATTLE_ROUTE));
        }
    };

    send(message) {
        this.socket.send(message);
    }

    setDispatch(dispatch) {
        this.dispatch = dispatch;
    }
}
