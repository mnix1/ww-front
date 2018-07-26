import React from 'react';
import {connect} from 'react-redux';

class BattleFriendPage extends React.PureComponent {

    render() {
        const {tags} = this.props;
        return <div>
            <div></div>
        </div>
    }
}

export default connect(
    (state) => ({
        screen: state.screen,
        tags: state.battle.tags
    }),
    (dispatch) => ({})
)(BattleFriendPage);
