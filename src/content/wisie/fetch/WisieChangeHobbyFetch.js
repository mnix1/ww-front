import React from 'react';
import connect from 'react-redux-fetch';
import {CLEAR} from "react-redux-fetch/lib/constants/actionTypes";
import {profileChanged} from "../../../redux/reducer/profile";
import {profileWisiesChanged, wisieDetailsChanged} from "../../../redux/reducer/wisie";
import {isRepFulfilled, isRepValueCode1} from "../../../util/repositoryHelper";

class WisieChangeHobbyFetch extends React.PureComponent {

    componentDidMount() {
        this.maybeFetch({});
    }

    componentDidUpdate(prevProps) {
        this.maybeFetch(prevProps);
        const {wisieChangeHobbyFetch, dispatch} = this.props;
        if (isRepFulfilled(wisieChangeHobbyFetch)) {
            if (isRepValueCode1(wisieChangeHobbyFetch)) {
                const value = wisieChangeHobbyFetch.value;
                dispatch(profileChanged(value.profile));
                dispatch(wisieDetailsChanged(value.profileWisie));
                dispatch(profileWisiesChanged(value.profileWisie));
            }
            clearWisieChangeHobbyFetch(dispatch);
        }
    }

    componentWillUnmount() {
        clearWisieChangeHobbyFetch(this.props.dispatch);
    }

    maybeFetch(prevProps) {
        const {changeHobbyProps, dispatchWisieChangeHobbyPost} = this.props;
        if (changeHobbyProps && prevProps.changeHobbyProps !== changeHobbyProps) {
            dispatchWisieChangeHobbyPost(changeHobbyProps);
        }
    }

    render() {
        return null;
    }
}

export function clearWisieChangeHobbyFetch(dispatch) {
    dispatch({type: CLEAR, resource: {name: 'wisieChangeHobby'}});
}

export default connect([{
    resource: 'wisieChangeHobby',
    method: 'post',
    request: ({id, hobby}) => ({
        url: `/wisie/changeHobby`,
        body: {id, hobby}
    })
}])(WisieChangeHobbyFetch);