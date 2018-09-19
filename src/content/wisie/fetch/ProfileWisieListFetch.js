import React from 'react';
import connect from 'react-redux-fetch';
import {CLEAR} from "react-redux-fetch/lib/constants/actionTypes";
import {CAMPAIGN_TEAM_EDIT_ROUTE, WISIES_PICK_ROUTE, WISIES_ROUTE, WISIES_TEAM_EDIT_ROUTE} from "../../routes";
import {fetchOnPathAndIfNotExists, fetchOnPathOrIfNotExistsAnymore, repFulfilled} from "../../../util/repositoryHelper";
import {isProfileWisiesActualChanged, profileWisiesChanged, teamChanged} from "../../../redux/reducer/wisie";

class ProfileWisieListFetch extends React.PureComponent {

    componentDidMount() {
        this.maybeFetch({profileWisieListFetch: {}});
    }

    componentDidUpdate(prevProps) {
        this.maybeFetch(prevProps);
        const {profileWisieListFetch, dispatch} = this.props;
        if (!repFulfilled(prevProps.profileWisieListFetch) && repFulfilled(profileWisieListFetch)) {
            dispatch(profileWisiesChanged(profileWisieListFetch.value));
            dispatch(isProfileWisiesActualChanged(true));
            dispatch(teamChanged(profileWisieListFetch.value.filter(e => e.inTeam)));
        }
    }

    componentWillUnmount() {
        clearProfileWisieListFetch(this.props.dispatch);
    }

    maybeFetch(prevProps) {
        const {path, profileWisieListFetch, dispatchProfileWisieListGet, dispatch} = this.props;
        if (fetchOnPathOrIfNotExistsAnymore(prevProps.path, path, WISIES_ROUTE, prevProps.profileWisieListFetch, profileWisieListFetch)
            || fetchOnPathAndIfNotExists(prevProps.path, path, CAMPAIGN_TEAM_EDIT_ROUTE, prevProps.profileWisieListFetch, profileWisieListFetch)
            || fetchOnPathAndIfNotExists(prevProps.path, path, WISIES_PICK_ROUTE, prevProps.profileWisieListFetch, profileWisieListFetch)
            || fetchOnPathAndIfNotExists(prevProps.path, path, WISIES_TEAM_EDIT_ROUTE, prevProps.profileWisieListFetch, profileWisieListFetch)
        ) {
            dispatchProfileWisieListGet();
            dispatch(isProfileWisiesActualChanged(false));
        }
    }

    render() {
        return null;
    }
}

export function clearProfileWisieListFetch(dispatch) {
    dispatch({type: CLEAR, resource: {name: 'profileWisieList'}});
}

export default connect([{
    resource: 'profileWisieList',
    request: () => ({
        url: `/wisie/listProfileWisie`,
    })
}])(ProfileWisieListFetch);