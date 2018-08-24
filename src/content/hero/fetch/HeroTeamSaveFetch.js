import React from 'react';
import connect from 'react-redux-fetch';
import {CLEAR} from "react-redux-fetch/lib/constants/actionTypes";
import {experimentChanged} from "../../../redux/reducer/hero";
import {isRepValueCode1} from "../../../util/responseHelper";
import {clearProfileHeroListFetch} from "./ProfileHeroListFetch";
import {clearProfileFetch} from "../../app/ProfileFetch";
import {noticeTeamSave} from "../../../component/notification/noticeTeamSave";

class HeroTeamSaveFetch extends React.PureComponent {

    componentDidMount() {
        this.maybeFetch({});
    }

    componentDidUpdate(prevProps) {
        this.maybeFetch(prevProps);
        const {heroTeamSaveFetch, experiment, dispatch} = this.props;
        if (!prevProps.heroTeamSaveFetch.fulfilled && heroTeamSaveFetch.fulfilled && experiment) {
            dispatch(experimentChanged(false));
            if (isRepValueCode1(heroTeamSaveFetch)) {
                noticeTeamSave(heroTeamSaveFetch.value.heroType);
                clearProfileHeroListFetch(dispatch);
                clearProfileFetch(dispatch);
            }
        }
    }

    componentWillUnmount() {
        clearHeroTeamSaveFetch(this.props.dispatch);
    }

    maybeFetch(prevProps) {
        const {experiment, dispatchHeroTeamSaveGet} = this.props;
        if (experiment && prevProps.experiment !== experiment) {
            dispatchHeroTeamSaveGet();
        }
    }

    render() {
        return null;
    }
}

export function clearHeroTeamSaveFetch(dispatch) {
    dispatch({type: CLEAR, resource: {name: 'heroTeamSave'}});
}

export default connect([{
    resource: 'heroTeamSave',
    request: () => ({
        url: `/hero/experiment`,
    })
}])(HeroTeamSaveFetch);