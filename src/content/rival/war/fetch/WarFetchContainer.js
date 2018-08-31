import React from 'react';
import {connect} from 'react-redux';
import {statusChanged} from "../../../../redux/reducer/war";
import {WAR_STATUS_ERROR_FAST, WAR_STATUS_WAITING_FAST,} from "../../../../util/warHelper";
import _ from 'lodash';
import WarStartFastFetch from "./WarStartFastFetch";
import WarCancelFastFetch from "./WarCancelFastFetch";

class WarFetchContainer extends React.PureComponent {

    resolveFast(){
        const {warStartFastRep, onStatusChange, status} = this.props;
        if (status === WAR_STATUS_WAITING_FAST) {
            return;
        }
        const code = _.get(warStartFastRep, 'value.code');
        if (code === -1) {
            onStatusChange(WAR_STATUS_ERROR_FAST);
        } else if (code === 1) {
            onStatusChange(WAR_STATUS_WAITING_FAST);
        }
    }

    componentDidUpdate() {
       this.resolveFast();
    }

    render() {
        const {status} = this.props;
        return <div>
            <WarStartFastFetch status={status}/>
            <WarCancelFastFetch status={status}/>
        </div>;
    }
}

export default connect(
    (state) => ({
        status: state.war.status,
        tag: state.war.tag,
        warStartFastRep: state.repository.warStartFast,
        warCancelFastRep: state.repository.warCancelFast,
    }),
    (dispatch) => ({
        onStatusChange: (status) => {
            dispatch(statusChanged(status));
        },
    })
)(WarFetchContainer);
