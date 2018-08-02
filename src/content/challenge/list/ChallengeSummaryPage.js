import React from 'react';
import {connect} from 'react-redux';
import _ from 'lodash';
import './styles.css';
import {getText, TEXT_SUMMARY} from "../../../lang";
import Position from "../../../component/position/Position";

class ChallengeSummaryPage extends React.PureComponent {

    renderPositions(positions) {
        return <div className='positions'>
            {positions.map((e, i) => this.renderPosition(e, i))}
        </div>
    }

    renderPosition(position, i) {
        return <Position key={i} position={position}/>;
    }

    render() {
        const {rep} = this.props;
        const positions = _.get(rep, 'value.positions');
        if (!positions) {
            return null;
        }
        return <div>
            <div className="pageHeader">
                <span>{getText(TEXT_SUMMARY)}</span>
            </div>
            {this.renderPositions(positions)}
        </div>
    }
}

export default connect(
    (state) => ({}),
    (dispatch) => ({})
)(ChallengeSummaryPage);
