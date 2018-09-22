import _ from 'lodash';
import {friendAdded, friendDeleted, friendSignedIn, friendSignedOut} from "../../redux/reducer/friend";
import {rivalCleared, rivalInvited} from "../../redux/reducer/rival";
import {noticeReward} from "../../component/notification/noticeReward";
import {clearProfileFetch} from "./ProfileFetch";
import {openChanged} from "../../redux/reducer/socket";
import {signedInChanged} from "../../redux/reducer/profile";
import {noticeError} from "../../component/notification/noticeError";
import {ERROR_FRIEND_RIVAL_CANCELED, ERROR_FRIEND_RIVAL_REJECTED} from "../../lang/langError";

export default class CommunicationWebSocket {
    constructor(onInit) {
        this.onInit = onInit;
        this.init();
        this.onInit(this);
    }

    init = () => {
        this.connect();
        this.socket.addEventListener('message', this.onMessage);
        this.socket.addEventListener('close', this.onClose);
        this.socket.addEventListener('error', this.onError);
        this.socket.addEventListener('open', this.onOpen);
        if (this.dispatch) {
            this.dispatch(openChanged(undefined));
        }
    };

    dispose() {
        this.socket.removeEventListener('message', this.onMessage);
        this.socket.removeEventListener('close', this.onClose);
        this.socket.removeEventListener('error', this.onError);
        this.socket.removeEventListener('open', this.onOpen);
        this.dispatch(openChanged(false));
    }

    onClose = (e) => {
        console.log('onclose', e);
        if (e.code === 1008) {
            this.dispatch(signedInChanged(false));
            // this.dispatch(push(LOGIN_ROUTE));
            // this.dispatch(profileChanged(undefined));
            // clearProfileFetch(this.dispatch);
        }
        this.dispose();
    };

    onError = (e) => {
        console.log('onerror', e);
    };

    onOpen = (e) => {
        console.log('onopen', e);
        this.dispatch(openChanged(true));
    };

    connect() {
        let socket;
        if (_.includes(window.location.host, 'localhost')) {
            socket = new WebSocket("ws://localhost:8080/wisiemaniaWebSocket");
        } else if (_.includes(window.location.host, ':3000')) {
            socket = new WebSocket(((window.location.protocol === "https:") ? "wss://" : "ws://") + window.location.host.replace(':3000', '') + ":8080/wisiemaniaWebSocket");
        } else {
            socket = new WebSocket(((window.location.protocol === "https:") ? "wss://" : "ws://") + window.location.host + "/wisiemaniaWebSocket");
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
        if (_.includes(id, 'FRIEND')) {
            if (id === 'FRIEND_ADD') {
                this.dispatch(friendAdded(JSON.parse(data.content)));
            } else if (id === 'FRIEND_DELETE') {
                this.dispatch(friendDeleted(data.content));
            } else if (id === 'FRIEND_SIGN_IN') {
                this.dispatch(friendSignedIn(data.content));
            } else if (id === 'FRIEND_SIGN_OUT') {
                this.dispatch(friendSignedOut(data.content));
            }
        } else if (id === 'RIVAL_INVITE') {
            this.dispatch(rivalInvited(JSON.parse(data.content)));
        } else if (id === 'REWARD') {
            noticeReward(JSON.parse(data.content));
            clearProfileFetch(this.dispatch);
        } else if (_.includes(['RIVAL_CANCEL_INVITE', 'RIVAL_REJECT_INVITE', 'RIVAL_ACCEPT_INVITE'], id)) {
            this.dispatch(rivalCleared());
            if (id === 'RIVAL_REJECT_INVITE') {
                noticeError(ERROR_FRIEND_RIVAL_REJECTED);
            } else if (id === 'RIVAL_CANCEL_INVITE') {
                noticeError(ERROR_FRIEND_RIVAL_CANCELED);
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
