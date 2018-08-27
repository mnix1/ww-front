import React from 'react';
import {connect} from 'react-redux';
// import WarStartFriendFetch from "./WarStartFriendFetch";
// import WarCancelFriendFetch from "./WarCancelFriendFetch";
// import WarRejectFriendFetch, {clearWarRejectFriendFetch} from "./WarRejectFriendFetch";
// import WarAcceptFriendFetch, {clearWarAcceptFriendFetch} from "./WarAcceptFriendFetch";
import {statusChanged} from "../../../../redux/reducer/war";
import {
    WAR_STATUS_ACCEPTED_FRIEND,
    WAR_STATUS_CANCELED_FRIEND,
    WAR_STATUS_ERROR_FAST,
    WAR_STATUS_ERROR_FRIEND,
    WAR_STATUS_REJECTED_FRIEND,
    WAR_STATUS_WAITING_FAST,
    WAR_STATUS_WAITING_FRIEND
} from "../../../../util/warHelper";
import _ from 'lodash';
import WarStartFastFetch from "./WarStartFastFetch";
import WarCancelFastFetch from "./WarCancelFastFetch";

class WarFetchContainer extends React.PureComponent {

    resolveFriend(){
        const {warStartFriendRep, warRejectFriendRep, warCancelFriendRep, warAcceptFriendRep, onStatusChange, status, onWarFriendClear, onWarFriendInProgress} = this.props;
        if (status === WAR_STATUS_WAITING_FRIEND) {
            return;
        }
        const code = _.get(warStartFriendRep, 'value.code');
        if (code === -1) {
            onStatusChange(WAR_STATUS_ERROR_FRIEND);
        } else if (code === 1) {
            onStatusChange(WAR_STATUS_WAITING_FRIEND);
        }
        if (status === WAR_STATUS_REJECTED_FRIEND && warRejectFriendRep && warRejectFriendRep.fulfilled) {
            onWarFriendClear();
        }
        if (status === WAR_STATUS_CANCELED_FRIEND && warCancelFriendRep && warCancelFriendRep.fulfilled) {
            onWarFriendClear();
        }
        if (status === WAR_STATUS_ACCEPTED_FRIEND && warAcceptFriendRep && warAcceptFriendRep.fulfilled) {
            onWarFriendInProgress();
        }
    }

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
       this.resolveFriend();
       this.resolveFast();
    }

    render() {
        const {tag, status} = this.props;
        return <div>
            {/*<WarStartFriendFetch status={status} tag={tag}/>*/}
            {/*<WarCancelFriendFetch status={status}/>*/}
            {/*<WarRejectFriendFetch status={status}/>*/}
            {/*<WarAcceptFriendFetch status={status}/>*/}

            <WarStartFastFetch status={status}/>
            <WarCancelFastFetch status={status}/>
        </div>;
    }
}

export default connect(
    (state) => ({
        status: state.war.status,
        tag: state.war.tag,
        warStartFriendRep: state.repository.warStartFriend,
        warRejectFriendRep: state.repository.warRejectFriend,
        warCancelFriendRep: state.repository.warCancelFriend,
        warAcceptFriendRep: state.repository.warAcceptFriend,

        warStartFastRep: state.repository.warStartFast,
        warCancelFastRep: state.repository.warCancelFast,
    }),
    (dispatch) => ({
        // onWarFriendClear: () => {
        //     clearWarRejectFriendFetch(dispatch);
        //     dispatch(warCleared());
        // },
        // onWarFriendInProgress: () => {
        //     clearWarAcceptFriendFetch(dispatch);
        //     dispatch(warCleared());
        //     dispatch(statusChanged(WAR_STATUS_READY_TO_BEGIN_FRIEND));
        //     dispatch(push(WAR_ROUTE));
        // },
        onStatusChange: (status) => {
            dispatch(statusChanged(status));
        },
    })
)(WarFetchContainer);
