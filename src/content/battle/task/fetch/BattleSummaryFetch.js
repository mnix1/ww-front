import React from 'react';
import connect from 'react-redux-fetch';
import {CLEAR} from "react-redux-fetch/lib/constants/actionTypes";
import _ from 'lodash';
class BattleSummaryFetch extends React.PureComponent {

    componentDidMount() {
        this.maybeFetch({});
    }

    componentDidUpdate(prevProps) {
        this.maybeFetch(prevProps);
    }

    componentWillUnmount() {
        clearBattleSummaryFetch(this.props.dispatch);
    }

    maybeFetch(prevProps) {
        const {battleId, dispatchBattleSummaryPost} = this.props;
        if (!_.isNil(battleId) && prevProps.battleId !== battleId) {
            dispatchBattleSummaryPost(battleId);
        }
    }

    render() {
        return null;
    }
}

export function clearBattleSummaryFetch(dispatch) {
    dispatch({type: CLEAR, resource: {name: 'battleSummary'}});
}

export default connect([{
    resource: 'battleSummary',
    method: 'post',
    request: (battleId) => ({
        url: `/battle/summary`,
        body: {battleId}
    })
}])(BattleSummaryFetch);