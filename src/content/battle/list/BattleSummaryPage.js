import React from 'react';
import {connect} from 'react-redux';
import _ from 'lodash';
import './styles.css';
import {getText, TEXT_SUMMARY} from "../../../lang";
import {Friend} from "../../../component/friend/Friend";

class BattleSummaryPage extends React.PureComponent {

    renderPositions(positions) {
        return <ul>
            {positions.map(e => <li>{this.renderPosition(e)}</li>)}
        </ul>
    }

    renderPosition(position) {
        return <div>
            <div>{position.position}</div>
            <Friend friend={position.profile}/>
            <div>{position.score}</div>
            <div>{position.answerInterval}</div>
        </div>
    }

    render() {
        const {rep} = this.props;
        const positions = _.get(rep, 'value.positions');
        if (!positions) {
            return null;
        }
        return <div>
            <div className="pageHeader" style={{position: 'relative'}}>
                <span>{getText(TEXT_SUMMARY)}</span>
            </div>
            {this.renderPositions(positions)}
        </div>
    }
}

export default connect(
    (state) => ({}),
    (dispatch) => ({})
)(BattleSummaryPage);
