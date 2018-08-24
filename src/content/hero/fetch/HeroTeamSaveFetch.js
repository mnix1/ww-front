import React from 'react';
import connect from 'react-redux-fetch';
import {CLEAR} from "react-redux-fetch/lib/constants/actionTypes";
import {teamSaveChanged} from "../../../redux/reducer/hero";
import {isRepValueCode1} from "../../../util/responseHelper";
import {noticeSuccess} from "../../../component/notification/noticeSuccess";
import {SUCCESS_TEAM_SAVED} from "../../../lang/success";

class HeroTeamSaveFetch extends React.PureComponent {

    componentDidMount() {
        this.maybeFetch({});
    }

    componentDidUpdate(prevProps) {
        this.maybeFetch(prevProps);
        const {heroTeamSaveFetch, teamSave, dispatch} = this.props;
        if (!prevProps.heroTeamSaveFetch.fulfilled && heroTeamSaveFetch.fulfilled && teamSave) {
            dispatch(teamSaveChanged(false));
            if (isRepValueCode1(heroTeamSaveFetch)) {
                noticeSuccess(SUCCESS_TEAM_SAVED);
            }
        }
    }

    componentWillUnmount() {
        clearHeroTeamSaveFetch(this.props.dispatch);
    }

    maybeFetch(prevProps) {
        const {team, teamSave, dispatchHeroTeamSavePost} = this.props;
        if (teamSave && prevProps.teamSave !== teamSave) {
            dispatchHeroTeamSavePost(team.map(e => e.id));
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
    method: 'post',
    request: (ids) => ({
        url: `/hero/teamSave`,
        body: {ids}
    })
}])(HeroTeamSaveFetch);