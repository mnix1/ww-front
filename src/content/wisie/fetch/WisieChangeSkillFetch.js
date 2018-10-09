import React from 'react';
import connect from 'react-redux-fetch';
import {CLEAR} from "react-redux-fetch/lib/constants/actionTypes";
import {profileChanged} from "../../../redux/reducer/profile";
import {profileWisiesChanged, wisieDetailsChanged} from "../../../redux/reducer/wisie";
import {isRepFulfilled, isRepValueCode1} from "../../../util/repositoryHelper";

class WisieChangeSkillFetch extends React.PureComponent {

    componentDidMount() {
        this.maybeFetch({});
    }

    componentDidUpdate(prevProps) {
        this.maybeFetch(prevProps);
        const {wisieChangeSkillFetch, dispatch} = this.props;
        if (isRepFulfilled(wisieChangeSkillFetch)) {
            if (isRepValueCode1(wisieChangeSkillFetch)) {
                const value = wisieChangeSkillFetch.value;
                dispatch(profileChanged(value.profile));
                dispatch(wisieDetailsChanged(value.profileWisie));
                dispatch(profileWisiesChanged(value.profileWisie));
            }
            clearWisieChangeSkillFetch(dispatch);
        }
    }

    componentWillUnmount() {
        clearWisieChangeSkillFetch(this.props.dispatch);
    }

    maybeFetch(prevProps) {
        const {changeSkillProps, dispatchWisieChangeSkillPost} = this.props;
        if (changeSkillProps && prevProps.changeSkillProps !== changeSkillProps) {
            dispatchWisieChangeSkillPost(changeSkillProps);
        }
    }

    render() {
        return null;
    }
}

export function clearWisieChangeSkillFetch(dispatch) {
    dispatch({type: CLEAR, resource: {name: 'wisieChangeSkill'}});
}

export default connect([{
    resource: 'wisieChangeSkill',
    method: 'post',
    request: ({id, skill}) => ({
        url: `/wisie/changeSkill`,
        body: {id, skill}
    })
}])(WisieChangeSkillFetch);