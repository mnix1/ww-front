import React from 'react';
import connect from 'react-redux-fetch';
import {CLEAR} from "react-redux-fetch/lib/constants/actionTypes";
import {CLASSIFICATION_BATTLE_ROUTE, CLASSIFICATION_WAR_ROUTE} from "../../routes";
import {fetchOnPathAndIfNotExists} from "../../../util/repositoryHelper";
import {ROUTE_RIVAL_TYPE} from "../../../util/rivalHelper";

class ClassificationListFetch extends React.PureComponent {

    componentDidMount() {
        this.maybeFetch({classificationListFetch: {}});
    }

    componentDidUpdate(prevProps) {
        this.maybeFetch(prevProps);
    }

    componentWillUnmount() {
        clearClassificationListFetch(this.props.dispatch);
    }

    maybeFetch(prevProps) {
        const {path, dispatchClassificationListPost, classificationListFetch} = this.props;
        if (fetchOnPathAndIfNotExists(prevProps.path, path, CLASSIFICATION_WAR_ROUTE, prevProps.classificationListFetch, classificationListFetch)
            || fetchOnPathAndIfNotExists(prevProps.path, path, CLASSIFICATION_BATTLE_ROUTE, prevProps.classificationListFetch, classificationListFetch)) {
            dispatchClassificationListPost(ROUTE_RIVAL_TYPE[path]);
        }
    }

    render() {
        return null;
    }
}

export function clearClassificationListFetch(dispatch) {
    dispatch({type: CLEAR, resource: {name: 'classificationList'}});
}

export default connect([{
    method: 'post',
    resource: 'classificationList',
    request: (type) => ({
        url: `/rival/classification`,
        body: {type}
    })
}])(ClassificationListFetch);