import React from 'react';
import connect from 'react-redux-fetch';
import {CLEAR} from "react-redux-fetch/lib/constants/actionTypes";
import {CAMPAIGN_TEAM_EDIT_ROUTE, WISIES_ROUTE} from "../../routes";
import {fetchOnPathAndIfNotExists} from "../../../util/repositoryHelper";
import {profileWisiesChanged} from "../../../redux/reducer/wisie";

class ProfileWisieListFetch extends React.PureComponent {

    componentDidMount() {
        this.maybeFetch({profileWisieListFetch: {}});
    }

    componentDidUpdate(prevProps) {
        this.maybeFetch(prevProps);
        const {profileWisieListFetch, dispatch} = this.props;
        if (!prevProps.profileWisieListFetch.fulfilled && profileWisieListFetch.fulfilled) {
            dispatch(profileWisiesChanged(profileWisieListFetch.value));
        }
    }

    componentWillUnmount() {
        clearProfileWisieListFetch(this.props.dispatch);
    }

    maybeFetch(prevProps) {
        const {path, profileWisieListFetch, dispatchProfileWisieListGet} = this.props;
        if (fetchOnPathAndIfNotExists(prevProps.path, path, WISIES_ROUTE, prevProps.profileWisieListFetch, profileWisieListFetch)
            // || fetchOnPathAndIfNotExists(prevProps.path, path, CAMPAIGN_TEAM_EDIT_ROUTE, prevProps.profileWisieListFetch, profileWisieListFetch)
        ) {
            dispatchProfileWisieListGet();
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