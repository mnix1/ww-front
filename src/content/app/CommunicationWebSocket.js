import _ from 'lodash';
import {friendAdded, friendDeleted, friendSignedIn, friendSignedOut} from "../../redux/reducer/friend";
import {rivalCleared, rivalInviteCancelled, rivalInvited, statusChanged} from "../../redux/reducer/rival";
import {clearRivalStartFriendFetch} from "../rival/fetch/RivalStartFriendFetch";
import {RIVAL_STATUS_READY_TO_BEGIN_FRIEND, RIVAL_TYPE_BATTLE, RIVAL_TYPE_WAR} from "../../util/rivalHelper";
import {push} from 'connected-react-router'
import {BATTLE_ROUTE, WAR_ROUTE} from "../routes";
import {noticeReward} from "../../component/notification/noticeReward";
import {clearProfileFetch} from "./ProfileFetch";

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
        } else if (id === 'RIVAL_INVITE') {
            this.dispatch(rivalInvited(JSON.parse(data.content)));
        } else if (id === 'REWARD') {
            noticeReward(JSON.parse(data.content));
            clearProfileFetch(this.dispatch);
        } else if (id === 'RIVAL_CANCEL_INVITE') {
            this.dispatch(rivalInviteCancelled());
        } else if (id === 'RIVAL_REJECT_INVITE') {
            clearRivalStartFriendFetch(this.dispatch);
            this.dispatch(rivalCleared());
        } else if (id === 'RIVAL_ACCEPT_INVITE') {
            clearRivalStartFriendFetch(this.dispatch);
            this.dispatch(rivalCleared());
            this.dispatch(statusChanged(RIVAL_STATUS_READY_TO_BEGIN_FRIEND));
            if (data.content === RIVAL_TYPE_BATTLE) {
                this.dispatch(push(BATTLE_ROUTE));
            } else if (data.content === RIVAL_TYPE_WAR) {
                this.dispatch(push(WAR_ROUTE));
            }

        }
    };

    send(message) {
        this.socket.send(message);
    }

    setDispatch(dispatch) {
        this.dispatch = dispatch;
    }
}
