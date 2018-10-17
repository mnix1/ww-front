import React from 'react';
import connect from 'react-redux-fetch';
import {CLEAR} from "react-redux-fetch/lib/constants/actionTypes";
import {experimentChanged} from "../../../redux/reducer/wisie";
import {isRepValueCode1} from "../../../util/repositoryHelper";
import {clearProfileWisieListFetch} from "./ProfileWisieListFetch";
import {noticeExperiment} from "../../../component/notification/noticeExperiment";
import {profileChanged} from "../../../redux/reducer/profile";

class WisieExperimentFetch extends React.PureComponent {

    componentDidMount() {
        this.maybeFetch({});
    }

    componentDidUpdate(prevProps) {
        this.maybeFetch(prevProps);
        const {wisieExperimentFetch, experiment, dispatch} = this.props;
        if (!prevProps.wisieExperimentFetch.fulfilled && wisieExperimentFetch.fulfilled && experiment) {
            dispatch(experimentChanged(false));
            if (isRepValueCode1(wisieExperimentFetch)) {
                noticeExperiment(wisieExperimentFetch.value.type);
                dispatch(profileChanged(wisieExperimentFetch.value.profile));
                clearProfileWisieListFetch(dispatch);
            }
        }
    }

    componentWillUnmount() {
        clearWisieExperimentFetch(this.props.dispatch);
    }

    maybeFetch(prevProps) {
        const {experiment, dispatchWisieExperimentGet} = this.props;
        if (experiment && prevProps.experiment !== experiment) {
            dispatchWisieExperimentGet();
        }
    }

    render() {
        return null;
    }
}

export function clearWisieExperimentFetch(dispatch) {
    dispatch({type: CLEAR, resource: {name: 'wisieExperiment'}});
}

export default connect([{
    resource: 'wisieExperiment',
    request: () => ({
        url: `/wisie/experiment`,
    })
}])(WisieExperimentFetch);