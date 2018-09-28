import React from 'react';
import connect from 'react-redux-fetch';
import {CLEAR} from "react-redux-fetch/lib/constants/actionTypes";
import {profileChanged} from "../../../redux/reducer/profile";
import {wisieDetailsChanged, profileWisiesChanged} from "../../../redux/reducer/wisie";

class WisieUpgradeAttributeFetch extends React.PureComponent {

    componentDidMount() {
        this.maybeFetch({});
    }

    componentDidUpdate(prevProps) {
        this.maybeFetch(prevProps);
        const {wisieUpgradeAttributeFetch, dispatch} = this.props;
        if (!prevProps.wisieUpgradeAttributeFetch.fulfilled && wisieUpgradeAttributeFetch.fulfilled) {
            const value = wisieUpgradeAttributeFetch.value;
            dispatch(profileChanged(value.profile));
            dispatch(wisieDetailsChanged(value.profileWisie));
            dispatch(profileWisiesChanged(value.profileWisie));
        }
    }

    componentWillUnmount() {
        clearWisieUpgradeAttributeFetch(this.props.dispatch);
    }

    maybeFetch(prevProps) {
        const {upgradeProps, dispatchWisieUpgradeAttributePost} = this.props;
        if (upgradeProps && prevProps.upgradeProps !== upgradeProps) {
            dispatchWisieUpgradeAttributePost(upgradeProps);
        }
    }

    render() {
        return null;
    }
}

export function clearWisieUpgradeAttributeFetch(dispatch) {
    dispatch({type: CLEAR, resource: {name: 'wisieUpgradeAttribute'}});
}

export default connect([{
    resource: 'wisieUpgradeAttribute',
    method: 'post',
    request: ({id, attribute}) => ({
        url: `/wisie/upgradeAttribute`,
        body: {id, attribute}
    })
}])(WisieUpgradeAttributeFetch);