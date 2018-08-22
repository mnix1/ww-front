import React from 'react';
import connect from 'react-redux-fetch';
import {CLEAR} from "react-redux-fetch/lib/constants/actionTypes";
import {experimentChanged} from "../../../redux/reducer/hero";
import {isRepValueCode1} from "../../../util/responseHelper";
import {clearProfileHeroListFetch} from "./ProfileHeroListFetch";
import {clearProfileFetch} from "../../app/ProfileFetch";
import {noticeExperiment} from "../../../component/notification/noticeExperiment";

class HeroExperimentFetch extends React.PureComponent {

    componentDidMount() {
        this.maybeFetch({});
    }

    componentDidUpdate(prevProps) {
        this.maybeFetch(prevProps);
        const {heroExperimentFetch, experiment, dispatch} = this.props;
        if (!prevProps.heroExperimentFetch.fulfilled && heroExperimentFetch.fulfilled && experiment) {
            dispatch(experimentChanged(false));
            if (isRepValueCode1(heroExperimentFetch)) {
                noticeExperiment(heroExperimentFetch.value.heroType);
                clearProfileHeroListFetch(dispatch);
                clearProfileFetch(dispatch);
            }
        }
    }

    componentWillUnmount() {
        clearHeroExperimentFetch(this.props.dispatch);
    }

    maybeFetch(prevProps) {
        const {experiment, dispatchHeroExperimentGet} = this.props;
        if (experiment && prevProps.experiment !== experiment) {
            dispatchHeroExperimentGet();
        }
    }

    render() {
        return null;
    }
}

export function clearHeroExperimentFetch(dispatch) {
    dispatch({type: CLEAR, resource: {name: 'heroExperiment'}});
}

export default connect([{
    resource: 'heroExperiment',
    request: () => ({
        url: `/hero/experiment`,
    })
}])(HeroExperimentFetch);