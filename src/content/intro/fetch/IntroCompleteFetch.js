import React from 'react';
import connect from 'react-redux-fetch';
import {CLEAR} from "react-redux-fetch/lib/constants/actionTypes";
import {isRepValueCode1} from "../../../util/repositoryHelper";
import {enableChanged} from "../../../redux/reducer/intro";
import {profileChanged} from "../../../redux/reducer/profile";

class IntroCompleteFetch extends React.PureComponent {

    componentDidMount() {
        this.maybeFetch({});
    }

    componentDidUpdate(prevProps) {
        this.maybeFetch(prevProps);
        const {dispatch, introCompleteFetch} = this.props;
        if (!prevProps.introCompleteFetch.fulfilled && introCompleteFetch.fulfilled && isRepValueCode1(introCompleteFetch)) {
            dispatch(enableChanged(false));
            dispatch(profileChanged(introCompleteFetch.value.profile));
        }
    }

    componentWillUnmount() {
        clearIntroCompleteFetch(this.props.dispatch);
    }

    maybeFetch(prevProps) {
        const {complete, dispatchIntroCompletePost} = this.props;
        if (prevProps.complete !== complete && complete) {
            dispatchIntroCompletePost();
        }
    }

    render() {
        return null;
    }
}

export function clearIntroCompleteFetch(dispatch) {
    dispatch({type: CLEAR, resource: {name: 'introComplete'}});
}

export default connect([{
    method: 'post',
    resource: 'introComplete',
    request: () => ({
        url: `/intro/complete`,
    })
}])(IntroCompleteFetch);