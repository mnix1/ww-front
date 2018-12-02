import _ from 'lodash';
import {friendAdded, friendDeleted, friendSignedIn, friendSignedOut} from "../../redux/reducer/friend";
import {rivalCleared, rivalInvited} from "../../redux/reducer/rival";
import {noticeReward} from "../../component/notification/noticeReward";
import {openChanged} from "../../redux/reducer/socket";
import {experienceChanged, resourcesChanged, signedInChanged} from "../../redux/reducer/profile";
import {noticeError} from "../../component/notification/noticeError";
import {ERROR_FRIEND_RIVAL_CANCELED, ERROR_FRIEND_RIVAL_REJECTED} from "../../lang/langError";
import {LOGIN_ROUTE, MAIL_ROUTE, PROFILE_ROUTE} from "../routes";
import {push} from 'connected-react-router'
import {noticeExperience} from "../../component/notification/noticeExperience";
import {noticeMail} from "../../component/notification/noticeMail";
import {clearMailListFetch} from "../mail/fetch/MailListFetch";

export default class CommunicationWebSocket {
    constructor() {
        this.init();
        this.onRivalMessage = _.noop;
    }

    init = () => {
        this.connect();
        this.addHandlers();
        if (this.dispatch) {
            this.dispatch(openChanged(undefined));
        }
    };

    dispose() {
        this.removeHandlers();
        this.dispatch(openChanged(false));
    }

    addHandlers() {
        this.socket.addEventListener('message', this.onMessage);
        this.socket.addEventListener('close', this.onClose);
        this.socket.addEventListener('error', this.onError);
        this.socket.addEventListener('open', this.onOpen);
    }

    removeHandlers() {
        this.socket.removeEventListener('message', this.onMessage);
        this.socket.removeEventListener('close', this.onClose);
        this.socket.removeEventListener('error', this.onError);
        this.socket.removeEventListener('open', this.onOpen);
    }

    onClose = (e) => {
        clearTimeout(this.connectionTimeout);
        // console.log('onclose ' + e.code + ' ' + e.reason, e);
        if (e.code === 1008 || e.code === 1000) {
            this.dispatch(push(LOGIN_ROUTE));
            this.dispatch(signedInChanged(false));
            this.dispose();
        } else if (this.connected) {
            this.removeHandlers();
            this.connect();
            this.addHandlers();
        } else {
            this.dispose();
        }
        this.connected = false;
    };

    onError = (e) => {
        clearTimeout(this.connectionTimeout);
        if (this.connecting) {
            this.connecting = false;
            this.dispose();
        }
        // console.log('onerror', e);
    };

    onOpen = (e) => {
        clearTimeout(this.connectionTimeout);
        this.connected = true;
        this.connecting = false;
        // console.log('onopen', e);
        this.dispatch(openChanged(true));
    };


    connect() {
        this.connecting = true;
        this.connectionTimeout = setTimeout(() => {
            if (!this.connected && this.connecting) {
                this.socket.close();
            }
        }, 5000);
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

    onMessage = (e) => {
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
        } else if (id === 'EXPERIENCE') {
            const obj = JSON.parse(data.content);
            noticeExperience(obj, () => this.dispatch(push(PROFILE_ROUTE)));
            this.dispatch(experienceChanged(obj.experience, obj.level));
        } else if (id === 'REWARD') {
            const obj = JSON.parse(data.content);
            noticeReward(obj);
            this.dispatch(resourcesChanged(obj.resources));
        } else if (id === 'NEW_MAIL') {
            clearMailListFetch(this.dispatch);
            noticeMail(() => this.dispatch(push(MAIL_ROUTE)));
        } else if (_.includes(['RIVAL_CANCEL_INVITE', 'RIVAL_REJECT_INVITE', 'RIVAL_ACCEPT_INVITE'], id)) {
            this.dispatch(rivalCleared());
            if (id === 'RIVAL_REJECT_INVITE') {
                noticeError(ERROR_FRIEND_RIVAL_REJECTED);
            } else if (id === 'RIVAL_CANCEL_INVITE') {
                noticeError(ERROR_FRIEND_RIVAL_CANCELED);
            }
        } else if (id === 'RIVAL_CONTENT') {
            this.onRivalMessage(data);
        }
    };

    send(message) {
        this.socket.send(message);
    }

    setDispatch(dispatch) {
        this.dispatch = dispatch;
    }
}
