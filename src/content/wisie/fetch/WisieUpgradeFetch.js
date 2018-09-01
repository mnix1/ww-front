import React from 'react';
import connect from 'react-redux-fetch';
import {CLEAR} from "react-redux-fetch/lib/constants/actionTypes";
import {profileChanged} from "../../../redux/reducer/profile";
import {wisieDetailsChanged, profileWisiesChanged} from "../../../redux/reducer/wisie";

class WisieUpgradeFetch extends React.PureComponent {

    componentDidMount() {
        this.maybeFetch({});
    }

    componentDidUpdate(prevProps) {
        this.maybeFetch(prevProps);
        const {wisieUpgradeFetch, dispatch} = this.props;
        if (!prevProps.wisieUpgradeFetch.fulfilled && wisieUpgradeFetch.fulfilled) {
            const value = wisieUpgradeFetch.value;
            dispatch(profileChanged(value.profile));
            dispatch(wisieDetailsChanged(value.profileWisie));
            dispatch(profileWisiesChanged(value.profileWisie));
        }
    }

    componentWillUnmount() {
        clearWisieUpgradeFetch(this.props.dispatch);
    }

    maybeFetch(prevProps) {
        const {upgradeProps, dispatchWisieUpgradePost} = this.props;
        if (upgradeProps && prevProps.upgradeProps !== upgradeProps) {
            dispatchWisieUpgradePost(upgradeProps);
        }
    }

    render() {
        return null;
    }
}

export function clearWisieUpgradeFetch(dispatch) {
    dispatch({type: CLEAR, resource: {name: 'wisieUpgrade'}});
}

export default connect([{
    resource: 'wisieUpgrade',
    method: 'post',
    request: ({id, attribute}) => ({
        url: `/wisie/upgradeWisie`,
        body: {id, attribute}
    })
}])(WisieUpgradeFetch);