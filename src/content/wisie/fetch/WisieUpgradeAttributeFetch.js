import React from 'react';
import connect from 'react-redux-fetch';
import {CLEAR} from "react-redux-fetch/lib/constants/actionTypes";
import {profileChanged} from "../../../redux/reducer/profile";
import {profileWisiesChanged, wisieDetailsChanged} from "../../../redux/reducer/wisie";
import {isRepFulfilledOnceWithCode1} from "../../../util/repositoryHelper";

class WisieUpgradeAttributeFetch extends React.PureComponent {

    componentDidMount() {
        this.maybeFetch({});
    }

    componentDidUpdate(prevProps) {
        this.maybeFetch(prevProps);
        const {wisieUpgradeAttributeFetch, dispatch} = this.props;
        if (isRepFulfilledOnceWithCode1(wisieUpgradeAttributeFetch, prevProps.wisieUpgradeAttributeFetch)) {
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
        const {upgradeAttributeProps, dispatchWisieUpgradeAttributePost} = this.props;
        if (upgradeAttributeProps && prevProps.upgradeAttributeProps !== upgradeAttributeProps) {
            dispatchWisieUpgradeAttributePost(upgradeAttributeProps);
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