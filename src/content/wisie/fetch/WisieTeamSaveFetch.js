import React from 'react';
import connect from 'react-redux-fetch';
import {CLEAR} from "react-redux-fetch/lib/constants/actionTypes";
import {teamSaveChanged} from "../../../redux/reducer/wisie";
import {isRepValueCode1} from "../../../util/responseHelper";
import {noticeSuccess} from "../../../component/notification/noticeSuccess";
import {SUCCESS_TEAM_SAVED} from "../../../lang/langSuccess";

class WisieTeamSaveFetch extends React.PureComponent {

    componentDidMount() {
        this.maybeFetch({});
    }

    componentDidUpdate(prevProps) {
        this.maybeFetch(prevProps);
        const {wisieTeamSaveFetch, teamSave, dispatch} = this.props;
        if (!prevProps.wisieTeamSaveFetch.fulfilled && wisieTeamSaveFetch.fulfilled && teamSave) {
            dispatch(teamSaveChanged(false));
            if (isRepValueCode1(wisieTeamSaveFetch)) {
                noticeSuccess(SUCCESS_TEAM_SAVED);
            }
        }
    }

    componentWillUnmount() {
        clearWisieTeamSaveFetch(this.props.dispatch);
    }

    maybeFetch(prevProps) {
        const {team, teamSave, dispatchWisieTeamSavePost} = this.props;
        if (teamSave && prevProps.teamSave !== teamSave) {
            dispatchWisieTeamSavePost(team.map(e => e.id));
        }
    }

    render() {
        return null;
    }
}

export function clearWisieTeamSaveFetch(dispatch) {
    dispatch({type: CLEAR, resource: {name: 'wisieTeamSave'}});
}

export default connect([{
    resource: 'wisieTeamSave',
    method: 'post',
    request: (ids) => ({
        url: `/wisie/teamSave`,
        body: {ids}
    })
}])(WisieTeamSaveFetch);