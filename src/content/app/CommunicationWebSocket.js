import _ from 'lodash';
import {friendAdded, friendDeleted, friendOffline, friendOnline} from "../../redux/reducer/friend";

export default class CommunicationWebSocket {
    constructor() {
        let socket;
        if (_.includes(window.location.host, 'localhost')) {
            socket = new WebSocket("ws://localhost:8080/websocket");
        } else if (_.includes(window.location.host, ':3000')) {
            socket = new WebSocket(((window.location.protocol === "https:") ? "wss://" : "ws://") + window.location.host.replace(':3000', '') + ":8080/websocket");
        } else {
            socket = new WebSocket(((window.location.protocol === "https:") ? "wss://" : "ws://") + window.location.host + "/websocket");
        }
        socket.addEventListener('message', (e) => {
            const data = JSON.parse(e.data);
            const id = data.id;
            if (id === 'FRIEND_ADD') {
                this.dispatch(friendAdded(JSON.parse(data.content)));
            } else if (id === 'FRIEND_DELETE') {
                this.dispatch(friendDeleted(data.content));
            } else if (id === 'FRIEND_ONLINE') {
                this.dispatch(friendOnline(data.content));
            } else if (id === 'FRIEND_OFFLINE') {
                this.dispatch(friendOffline(data.content));
            }
        });
        socket.addEventListener('close', (e) => {
            console.log('onclose', e);
        });

        socket.addEventListener('error', (e) => {
            console.log('onerror', e);
        });
        socket.addEventListener('open', (e) => {
            // console.log('onopen', e)
        });
        this.socket = socket;
    }

    send(message) {
        this.socket.send(message);
    }

    setDispatch(dispatch) {
        this.dispatch = dispatch;
    }
}
