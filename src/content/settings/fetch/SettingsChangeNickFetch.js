import React from 'react';
import connect from 'react-redux-fetch';
import {CLEAR} from "react-redux-fetch/lib/constants/actionTypes";
import {SETTINGS_ROUTE} from "../../routes";
import _ from 'lodash';
import {chosenNickAcceptChanged, chosenNickChanged} from "../../../redux/reducer/settings";
import {profilePartChanged} from "../../../redux/reducer/profile";
import {noticeSuccess} from "../../../component/notification/noticeSuccess";
import {SUCCESS_CHANGED_NICK} from "../../../lang/langSuccess";
import {noticeError} from "../../../component/notification/noticeError";
import {ERROR_NOT_ALLOWED_CHARS_IN_NICK} from "../../../lang/langError";

class SettingsChangeNickFetch extends React.PureComponent {

    componentDidMount() {
        this.maybeFetch({});
    }

    componentDidUpdate(prevProps) {
        this.maybeFetch(prevProps);
        const {settingsChangeNickFetch, chosenNickAccept, dispatch} = this.props;
        if (!prevProps.settingsChangeNickFetch.fulfilled && settingsChangeNickFetch.fulfilled && !_.isNil(chosenNickAccept)) {
            dispatch(chosenNickAcceptChanged(undefined));
            dispatch(chosenNickChanged(undefined));
            const code = settingsChangeNickFetch.value.code;
            if (code === 1) {
                dispatch(profilePartChanged({name: settingsChangeNickFetch.value.name}));
                noticeSuccess(SUCCESS_CHANGED_NICK);
            } else if(code === -3){
                noticeError(ERROR_NOT_ALLOWED_CHARS_IN_NICK);
            }
        }
    }

    componentWillUnmount() {
        clearSettingsChangeNickFetch(this.props.dispatch);
    }

    maybeFetch(prevProps) {
        const {path, chosenNick, chosenNickAccept, dispatchSettingsChangeNickPost} = this.props;
        if (path === SETTINGS_ROUTE
            && !_.isNil(chosenNickAccept)
            && (prevProps.path !== path || prevProps.chosenNickAccept !== chosenNickAccept)) {
            dispatchSettingsChangeNickPost(chosenNick);
        }
    }

    render() {
        return null;
    }
}

export function clearSettingsChangeNickFetch(dispatch) {
    dispatch({type: CLEAR, resource: {name: 'settingsChangeNick'}});
}

export default connect([{
    method: 'post',
    resource: 'settingsChangeNick',
    request: (name) => ({
        url: `/profile/changeName`,
        body: {name}
    })
}])(SettingsChangeNickFetch);