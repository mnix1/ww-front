import React from 'react';
import {connect} from 'react-redux';
import SettingsChangeWisorFetch from "./SettingsChangeWisorFetch";

class SettingsFetchContainer extends React.PureComponent {
    componentDidUpdate(prevProps) {
    }

    render() {
        const {path, chosenWisor} = this.props;
        return <div>
            <SettingsChangeWisorFetch path={path} chosenWisor={chosenWisor}/>
        </div>;
    }
}

export default connect(
    (state) => ({
        path: state.router.location.pathname,
        chosenWisor: state.settings.chosenWisor
    }),
    (dispatch) => ({
    })
)(SettingsFetchContainer);
