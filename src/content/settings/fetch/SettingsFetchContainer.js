import React from 'react';
import {connect} from 'react-redux';
import SettingsChangeWisorFetch from "./SettingsChangeWisorFetch";
import SettingsChangeNickFetch from "./SettingsChangeNickFetch";
import _ from 'lodash';

class SettingsFetchContainer extends React.PureComponent {
    componentDidUpdate(prevProps) {
    }

    render() {
        const {path, chosenWisor, chosenNick, chosenNickAccept} = this.props;
        return <div>
            <SettingsChangeWisorFetch path={path} chosenWisor={chosenWisor}/>
            <SettingsChangeNickFetch path={path} chosenNickAccept={chosenNickAccept} chosenNick={chosenNick}/>
        </div>;
    }
}

export default connect(
    (state) => ({
        path: state.router.location.pathname,
        chosenWisor: state.settings.chosenWisor,
        chosenNick: _.defaultTo(state.settings.chosenNick, state.profile.profile.name),
        chosenNickAccept: state.settings.chosenNickAccept,
    }),
    (dispatch) => ({})
)(SettingsFetchContainer);
