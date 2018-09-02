import React from 'react';
import connect from 'react-redux-fetch';
import {CLEAR} from "react-redux-fetch/lib/constants/actionTypes";
import {SETTINGS_CHOOSE_WISOR_ROUTE} from "../../routes";
import _ from 'lodash';
import {chosenWisorChanged} from "../../../redux/reducer/settings";
import {goBack} from "connected-react-router";
import {profilePartChanged} from "../../../redux/reducer/profile";
import {noticeSuccess} from "../../../component/notification/noticeSuccess";
import {SUCCESS_CHANGED_WISOR} from "../../../lang/langSuccess";

class SettingsChangeWisorFetch extends React.PureComponent {

    componentDidMount() {
        this.maybeFetch({});
    }

    componentDidUpdate(prevProps) {
        this.maybeFetch(prevProps);
        const {settingsChangeWisorFetch, chosenWisor, dispatch} = this.props;
        if (!prevProps.settingsChangeWisorFetch.fulfilled && settingsChangeWisorFetch.fulfilled && !_.isNil(chosenWisor)) {
            dispatch(chosenWisorChanged(undefined));
            if (settingsChangeWisorFetch.value.code === 1) {
                dispatch(profilePartChanged({wisorType: settingsChangeWisorFetch.value.wisorType}));
                dispatch(goBack());
                noticeSuccess(SUCCESS_CHANGED_WISOR);
            }
        }
    }

    componentWillUnmount() {
        clearSettingsChangeWisorFetch(this.props.dispatch);
    }

    maybeFetch(prevProps) {
        const {path, chosenWisor, dispatchSettingsChangeWisorPost} = this.props;
        if (path === SETTINGS_CHOOSE_WISOR_ROUTE
            && !_.isNil(chosenWisor)
            && (prevProps.path !== path || prevProps.chosenWisor !== chosenWisor)) {
            dispatchSettingsChangeWisorPost(chosenWisor);
        }
    }

    render() {
        return null;
    }
}

export function clearSettingsChangeWisorFetch(dispatch) {
    dispatch({type: CLEAR, resource: {name: 'settingsChangeWisor'}});
}

export default connect([{
    method: 'post',
    resource: 'settingsChangeWisor',
    request: (wisor) => ({
        url: `/profile/changeWisor`,
        body: {wisor}
    })
}])(SettingsChangeWisorFetch);